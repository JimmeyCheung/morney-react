import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { TagsSection } from "./Money/TagsSection";
import { CategorySection } from "./Money/CategorySection";
import { NoteSection } from "./Money/NoteSection";
import { NumberPadSection } from "./Money/NumberPadSection";
import { useRecords } from "../hooks/useRecords";
import moment from "moment";
import { TagModal } from "components/TagModal";
import { message } from "antd";
import { useTags } from "hooks/useTags";
const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;
const defaultFormData = {
  tagIds: [] as number[],
  note: "",
  category: "-" as Category,
  amount: 0,
  createdDate: moment(new Date()).format("YYYY-MM-DD"),
};
const CategoryWrapper = styled.div`
  background: #c4c4c4;
`;

const Money = () => {
  const [selected, setSelected] = useState(defaultFormData);
  const { tags, addTag } = useTags();
  const { addRecord } = useRecords();
  const [modalState, setModalState] = useState(false);
  const onChange = (obj: Partial<typeof selected>) => {
    // 切换目录，刷新tags列表
    if (obj.hasOwnProperty("category")) {
    }
    setSelected({ ...selected, ...obj });
  };
  const submit = () => {
    if (addRecord(selected)) {
      message.success("保存成功");
      setSelected(defaultFormData);
    }
  };
  return (
    <div>
      <MyLayout>
        <CategoryWrapper>
          <CategorySection
            value={selected.category}
            onChange={(category) => onChange({ category })}
          />
        </CategoryWrapper>
        <TagsSection
          data={{ tagIds: selected.tagIds, category: selected.category }}
          tags={tags}
          onChange={(tagIds) => onChange({ tagIds })}
          showModal={() => {
            setModalState(true);
          }}
        />
        <NoteSection
          value={selected.note}
          onChange={(note) => onChange({ note })}
        />
        <NumberPadSection
          data={{ amount: selected.amount, createdDate: selected.createdDate }}
          onChange={(amount, createdDate) => onChange({ amount, createdDate })}
          onOk={() => {
            submit();
          }}
        />
      </MyLayout>
      <TagModal
        visible={modalState}
        addTag={addTag}
        hide={() => {
          setModalState(false);
        }}
      />
    </div>
  );
};
export default Money;
