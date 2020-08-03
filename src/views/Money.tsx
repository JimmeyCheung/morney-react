import React from "react";
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
const Money = () => {
  return (
    <div>
      <MyLayout>
        <TagsSection />
        <NoteSection />
        <CategorySection />
        <NumberPadSection />
      </MyLayout>
    </div>
  );
};
export default Money;
