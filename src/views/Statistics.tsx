import Layout from "../components/Layout";
import React, { useState, useEffect, useReducer } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { useRecords } from "../hooks/useRecords";
import { ChartsSection } from "./Statistics/ChartsSection";
import { TabsSection } from "./Statistics/TabsSection";
import { BillSection } from "./Statistics/BillSection";
import moment from 'moment';

const MyLayout = styled(Layout)`
  background: #fff;
`;
const CategoryWrapper = styled.div`
  background: white;
`;
const tabs = [
  { text: "周", value: 'week' },
  { text: "月", value: 'month' },
  { text: "年", value: 'year' }
];
const tabReducer = (state: { xAxis: string[], series: number[], records: RecordItem[] }, action: string) => {
  const { xAxis, series, records } = state;
  console.log(state)
  switch (action) {
    case "week":
      const lastWeekStart = moment().day(-6);
      for (let i = 0; i < 7; i++) {
        const date = lastWeekStart.add(i).format('YYYY-MM-DD');
        records.filter(v => moment(v.createdDate).format('YYYY-MM-DD') === date).map(v => v.amount);
        console.log(records.filter(v => moment(v.createdDate).format('YYYY-MM-DD') === date).map(v => v.amount));
      }
      return {
        xAxis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        series: [820, 932, 901, 934, 1290, 1330, 1320],
        records
      };
    case "month":
      // 获取本月份天数
      const lastYearDays = moment(new Date().getMonth() + 1, "MM").daysInMonth();
      for (let i = 1; i <= lastYearDays; i++) {
        xAxis.push(i.toString());
        series.push(i)
      }
      return {
        xAxis,
        series,
        records
      };
    case "year":
      for (let i = 1; i <= 12; i++) {
        xAxis.push(`${i}月`);
        series.push(i);
      }
      return {
        xAxis,
        series,
        records
      };
    default: throw new Error("未匹配到数据");
  }
}
const Statistics = () => {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { records } = useRecords();
  const [tabIndex, setTabIndex] = useState(0);
  const [chartData, dispatch] = useReducer(tabReducer, {
    xAxis: [],
    series: [],
    records: records
  });

  useEffect(() => {
    const { value } = tabs[tabIndex];
    dispatch(value);
  }, [tabIndex])

  return (
    <MyLayout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      <TabsSection tabs={tabs} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <ChartsSection chartData={chartData} />
      <BillSection records={records} />
    </MyLayout>
  );
};
export default Statistics;
