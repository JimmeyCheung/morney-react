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
  return (
    <div>
      <MyLayout>
        {selected.tags.join(",")}
        <hr />
        {selected.note}
        <hr />
        {selected.category}
        <hr />
        {selected.amount}
        <TagsSection
          value={selected.tags}
          onChange={(tags) =>
            setSelected({
              ...selected,
              tags: tags,
            })
          }
        />
        <NoteSection
          value={selected.note}
          onChange={(note) => {
            setSelected({
              ...selected,
              note: note,
            });
          }}
        />
        <CategorySection
          value={selected.category}
          onChange={(category) => {
            setSelected({
              ...selected,
              category: category,
            });
          }}
        />
        <NumberPadSection
          value={selected.amount}
          onChange={(amount) => {
            setSelected({
              ...selected,
              amount: amount,
            });
          }}
          onOk={() => {}}
        />
      </MyLayout>
    </div>
  );
};
export default Money;
