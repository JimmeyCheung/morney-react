import Layout from "../components/Layout";
import React, { useState } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { useRecords } from "../hooks/useRecords";
import day from "dayjs";
import { ChartsSection } from './Statistics/ChartsSection';
import { TabsSection } from './Statistics/TabsSection';
import { BillSection } from './Statistics/BillSection';

const MyLayout = styled(Layout)`
  background:#fff;
`;
const CategoryWrapper = styled.div`
  background: white;
`;

const Statistics = () => {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { records } = useRecords();
  const hash: { [K: string]: RecordItem[] } = {}; // {'2020-05-11': [item, item], '2020-05-10': [item, item], '2020-05-12': [item, item, item, item]}
  const selectedRecords = records.filter((r) => r.category === category);
  selectedRecords.forEach((r) => {
    const key = day(r.createdDate).format("YYYY年MM月DD日");
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });


  return (
    <MyLayout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      <TabsSection />
      <ChartsSection records={records} />
      <BillSection />
    </MyLayout>
  );
};
export default Statistics;
