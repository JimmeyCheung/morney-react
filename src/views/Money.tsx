import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { TagsSection } from "./Money/TagsSection";
import { CategorySection } from "./Money/CategorySection";
import { NoteSection } from "./Money/NoteSection";
import { NumberPadSection } from "./Money/NumberPadSection";
const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;
type Category = "-" | "+";

const Money = () => {
  const [selected, setSelected] = useState({
    tags: [] as string[],
    note: "",
    category: "-" as Category,
    amount: 0,
  });
  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({ ...selected, ...obj });
  };
  return (
    <div>
      <MyLayout>
        <TagsSection
          value={selected.tags}
          onChange={(tags) => onChange({ tags })}
        />
        <NoteSection
          value={selected.note}
          onChange={(note) => onChange({ note })}
        />
        <CategorySection
          value={selected.category}
          onChange={(category) => onChange({ category })}
        />
        <NumberPadSection
          value={selected.amount}
          onChange={(amount) => onChange({ amount })}
          onOk={() => {}}
        />
      </MyLayout>
    </div>
  );
};
export default Money;
