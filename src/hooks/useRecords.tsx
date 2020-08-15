import { useEffect, useState } from "react";
import { useUpdate } from "./useUpdate";
import { message } from "antd";
import { createId } from "lib/createId";

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem("records") || "[]"));
  }, []);
  useUpdate(() => {
    window.localStorage.setItem("records", JSON.stringify(records));
  }, records);

  const addRecord = (newRecord: RecordItem) => {
    if (!checkRecord(newRecord)) {
      return false;
    }
    const record = { ...newRecord, id: createId() };
    setRecords([...records, record]);
    return true;
  };
  const updateRecord = (newRecord: RecordItem) => {
    if (!newRecord) {
      message.error("修改的记录不存在，请刷新页面重试");
      return false;
    }
    if (!checkRecord(newRecord)) {
      return false;
    }
    records.find(v => {
      if (v.id === newRecord.id) {
        Object.assign(v, newRecord);
        return true;
      }
      return false;
    })
    setRecords([...records]);
    return true;
  }
  const deleteRecord = (recordId: number) => {
    const newRecords = records.filter(v => v.id !== recordId);
    setRecords(newRecords);
    return true;
  }
  const checkRecord = (newRecord: RecordItem) => {
    if (newRecord.amount <= 0) {
      message.warning("请输入金额");
      return false;
    }
    if (newRecord.tagIds.length === 0) {
      message.warning("请选择标签");
      return false;
    }
    return true;
  }

  return { records, addRecord, updateRecord, deleteRecord };
};
