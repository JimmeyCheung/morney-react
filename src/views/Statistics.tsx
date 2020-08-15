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

  return (
    <MyLayout>
      <CategoryWrapper>
        <CategorySection
          isUpdate={false}
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      <TabsSection tabs={tabs} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <ChartsSection
        selectedTab={tabs[tabIndex]}
        chartData={chartData}
        category={category}
      />
      <BillSection records={pageRecords} />
    </MyLayout>
  );
};
export default Statistics;
