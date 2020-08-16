import { useEffect, useState } from "react";
import { useUpdate } from "./useUpdate";
import { message } from "antd";
import { createId } from "lib/createId";
import moment from 'moment';

type DateType = "d" | "M" | "y";
const getDate = (number: number = 0, type: DateType = "d") => {
  return moment().add(number, type).format("YYYY-MM-DD");
};

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    let localRecords = JSON.parse(window.localStorage.getItem("records") || "[]");
    if (localRecords.length === 0) {
      localRecords = [
        { id: createId(), tagIds: [3], note: "地铁卡充值", category: "-", amount: 200, createdDate: getDate(-3, "d") },
        { id: createId(), tagIds: [2], note: "请客", category: "-", amount: 260, createdDate: getDate(-2, "d") },
        { id: createId(), tagIds: [2], note: "吃西餐", category: "-", amount: 500, createdDate: getDate(-3, "d") },
        { id: createId(), tagIds: [1], note: "买了一套西装", category: "-", amount: 1000, createdDate: getDate(-1, "d") },
        { id: createId(), tagIds: [9], note: "送礼", category: "-", amount: 520, createdDate: "2020-05-20" },
        { id: createId(), tagIds: [4], note: "出去旅游", category: "-", amount: 2000, createdDate: getDate() },
        { id: createId(), tagIds: [10], note: "基本工资", category: "+", amount: 10000, createdDate: getDate(-6, "M") },
        { id: createId(), tagIds: [10], note: "基本工资", category: "+", amount: 10000, createdDate: getDate(-5, "M") },
        { id: createId(), tagIds: [10], note: "基本工资", category: "+", amount: 12000, createdDate: getDate(-4, "M") },
        { id: createId(), tagIds: [10], note: "基本工资", category: "+", amount: 13000, createdDate: getDate(-3, "M") },
        { id: createId(), tagIds: [10], note: "基本工资", category: "+", amount: 13000, createdDate: getDate(-2, "M") },
        { id: createId(), tagIds: [10], note: "基本工资", category: "+", amount: 13000, createdDate: getDate(-1, "M") },
        { id: createId(), tagIds: [10], note: "基本工资", category: "+", amount: 13000, createdDate: getDate() },
        { id: createId(), tagIds: [11], note: "项目提成", category: "+", amount: 2366, createdDate: getDate(-4, "M") },
        { id: createId(), tagIds: [11], note: "项目提成", category: "+", amount: 3521, createdDate: getDate(-3, "M") },
        { id: createId(), tagIds: [11], note: "项目提成", category: "+", amount: 2485, createdDate: getDate(-2, "M") },
        { id: createId(), tagIds: [11], note: "项目提成", category: "+", amount: 4500, createdDate: getDate(-1, "M") },
        { id: createId(), tagIds: [11], note: "项目提成", category: "+", amount: 5000, createdDate: getDate() },
      ];
    }
    setRecords(localRecords);
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
