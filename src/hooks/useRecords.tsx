import { useEffect, useState } from "react";
import { useUpdate } from "./useUpdate";
import { message } from 'antd';

export type RecordItem = {
  tagIds: number[];
  note: string;
  category: "+" | "-";
  amount: number;
  createdDate: string; // ISO 8601
};

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem("records") || "[]"));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem("records", JSON.stringify(records));
  }, records);

  const addRecord = (newRecord: RecordItem) => {
    if (newRecord.amount <= 0) {
      message.warning('请输入金额');
      return false;
    }
    if (newRecord.tagIds.length === 0) {
      message.warning('请选择标签');
      return false;
    }
    const record = { ...newRecord };
    setRecords([...records, record]);
    return true;
  };

  return { records, addRecord };
};
