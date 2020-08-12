import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { useRecords } from "../hooks/useRecords";
import { ChartsSection } from "./Statistics/ChartsSection";
import { TabsSection } from "./Statistics/TabsSection";
import { BillSection } from "./Statistics/BillSection";
import { useChartsData } from "hooks/useChartsData";
import { DateTypeEnum } from "Enums/DateTypeEnum";

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
const getRecordsByCategory = (records: RecordItem[], category: string) => {
  return records.filter((v) => v.category === category);
};
const Statistics = () => {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { records } = useRecords();
  const [tabIndex, setTabIndex] = useState(0);
  const { chartData, dispatchChart } = useChartsData();

  useEffect(() => {
    const { value } = tabs[tabIndex];
    dispatchChart({
      tabValue: value,
      records: getRecordsByCategory(records, category),
    });
  }, [tabIndex, records, category, dispatchChart]);

  return (
    <MyLayout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      <TabsSection tabs={tabs} tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <ChartsSection chartData={chartData} category={category} />
      <BillSection records={getRecordsByCategory(records, category)} />
    </MyLayout>
  );
};
export default Statistics;
