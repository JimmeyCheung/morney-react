import Layout from "../components/Layout";
import React, { useState, useEffect, useReducer } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { useRecords } from "../hooks/useRecords";
import { ChartsSection } from "./Statistics/ChartsSection";
import { TabsSection } from "./Statistics/TabsSection";
import { BillSection } from "./Statistics/BillSection";
import { useChartsData } from "hooks/useChartsData";
import { DateTypeEnum } from "Enums/DateTypeEnum";
import moment from "moment";
import { getDateRange } from "lib/getDateRange";
import { DatePicker, List } from 'antd-mobile';
import Modal from 'antd/lib/modal';
import 'antd-mobile/dist/antd-mobile.css'

// state: 返回状态值，action：reducer的行为参数
type ActionType = {
  records: RecordItem[];
  category: Category;
  tabValue: DateTypeEnum;
};
const MyLayout = styled(Layout)`
  background: #fff;
`;
const CategoryWrapper = styled.div`
  background: white;
`;
const tabs = [
  { text: "周", value: DateTypeEnum.week },
  { text: "月", value: DateTypeEnum.month },
  { text: "年", value: DateTypeEnum.year },
  { text: "自定义", value: DateTypeEnum.custom },
];
const recordsReducer = (
  state: RecordItem[],
  { records, category, tabValue }: ActionType
) => {
  const { startDate, endDate } = getDateRange(tabValue);
  const pageRecords = records.filter((record) => {
    return (
      record.category === category &&
      moment(record.createdDate).isBetween(startDate, endDate)
    );
  });
  return pageRecords;
};
const getTabVal = (index: number) => {
  return tabs[index].value;
};
const Statistics = () => {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { records } = useRecords();
  const [tabIndex, setTabIndex] = useState(0);
  const { chartData, dispatchChart } = useChartsData();
  const [pageRecords, dispatchRecords] = useReducer(recordsReducer, []); // 页面显示过滤后的Records

  useEffect(() => {
    dispatchRecords({
      records,
      category,
      tabValue: getTabVal(tabIndex),
    });
  }, [tabIndex, category, records]);

  useEffect(() => {
    dispatchChart({
      tabValue: getTabVal(tabIndex),
      records: pageRecords,
    });
  }, [tabIndex, pageRecords, dispatchChart]);
  // 自定义时间
  const [startDate, setStartDate] = useState(moment());
  const [modalState, setModalState] = useState(false);
  const onTabChange = (index: number) => {
    if (tabs[index].value === DateTypeEnum.custom) {
      setModalState(true);
    }
    // setTabIndex(index);
  }
  return (
    <MyLayout>
      <CategoryWrapper>
        <CategorySection
          isUpdate={false}
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      <TabsSection tabs={tabs} tabIndex={tabIndex} onTabChange={onTabChange} />
      <ChartsSection
        selectedTab={tabs[tabIndex]}
        chartData={chartData}
        category={category}
      />
      <BillSection records={pageRecords} />
      <Modal
        title="自定义时间"
        visible={modalState}
        okText="保存"
        cancelText="取消"
        onOk={() => { setModalState(false) }}
        onCancel={() => { setModalState(false) }}
      >
        <div>
          <DatePicker
            mode="date"
            title="Select Date"
            extra="Optional"
            value={new Date()}
            onChange={date => { }}
          >
            <List.Item arrow="horizontal">开始时间</List.Item>
          </DatePicker>
        </div>
        <div>
          <DatePicker
            mode="date"
            title="Select Date"
            extra="Optional"
            value={new Date()}
            onChange={date => { }}
          >
            <List.Item arrow="horizontal">结束时间</List.Item>
          </DatePicker>
        </div>
      </Modal>
    </MyLayout>
  );
};
export default Statistics;
