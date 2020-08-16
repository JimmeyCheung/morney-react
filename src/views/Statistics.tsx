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
import { DateModal } from './Statistics/DateModal';

// state: 返回状态值，action：reducer的行为参数
type ActionType = {
  records: RecordItem[];
  category: Category;
  tabValue: DateTypeEnum;
  dateRange: DateRange
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
// 根据时间筛选账本记录
const recordsReducer = (
  state: RecordItem[],
  { records, category, tabValue, dateRange }: ActionType
) => {
  const { startDate, endDate } = getDateRange(tabValue, dateRange);
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
  const [dateRange, setDateRange] = useState(getDateRange())
  useEffect(() => {
    dispatchRecords({
      records,
      category,
      tabValue: getTabVal(tabIndex),
      dateRange
    });
  }, [tabIndex, category, records, dateRange]);

  useEffect(() => {
    dispatchChart({
      tabValue: getTabVal(tabIndex),
      records: pageRecords,
      dateRange
    });
  }, [pageRecords]);
  const [modalState, setModalState] = useState(false);
  const onTabChange = (index: number) => {
    if (tabs[index].value === DateTypeEnum.custom) {
      setModalState(true);
    } else {
      setDateRange(getDateRange(tabs[index].value))
      setTabIndex(index);
    }
  };
  const dateModalFinished = (startDate: Date, endDate: Date) => {
    setDateRange({
      startDate: moment(startDate),
      endDate: moment(endDate)
    });
    setTabIndex(DateTypeEnum.custom);
    setModalState(false);
  };
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
      <DateModal visible={modalState} setVisible={setModalState} okFn={dateModalFinished} />
    </MyLayout>
  );
};
export default Statistics;
