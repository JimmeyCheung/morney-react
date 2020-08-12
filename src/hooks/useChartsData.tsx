import moment from "moment";
import { useReducer } from "react";
import { DateTypeEnum } from "Enums/DateTypeEnum";

let totalAmount = 0,
  averageAmount = 0;
const getAmountByDate = (
  records: RecordItem[],
  date: moment.Moment,
  formatStr: string = "YYYY-MM-DD"
) => {
  let amount = records
    .filter(
      (v) => moment(v.createdDate).format(formatStr) === date.format(formatStr)
    )
    .reduce((preVal, currVal) => {
      return preVal + currVal.amount;
    }, 0);
  totalAmount += amount;
  return amount;
};
const tabReducer = (
  state: ChartData,
  action: { tabValue: DateTypeEnum; records: RecordItem[] }
) => {
  let xAxis = [],
    series = [];
  totalAmount = averageAmount = 0;
  const { tabValue, records } = action;
  switch (tabValue) {
    case DateTypeEnum.week:
      const weekStart = moment().day(1); // 获取本周一
      xAxis = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      for (let i = 0; i < xAxis.length; i++) {
        const date = moment(weekStart).add(i, "d");
        series.push(getAmountByDate(records, date));
      }
      break;
    case DateTypeEnum.month:
      const monthDays = moment(new Date().getMonth() + 1, "MM").daysInMonth(); // 获取本月份天数
      const monthStart = moment().format("YYYY-MM") + "-01"; // 获取本月开始日期
      for (let i = 1; i <= monthDays; i++) {
        const date = moment(monthStart).add(i, "d");
        xAxis.push(i.toString());
        series.push(getAmountByDate(records, date));
      }
      break;
    case DateTypeEnum.year:
      const yearStart = moment().year() + "-01";
      for (let i = 0; i < 12; i++) {
        const date = moment(yearStart).add(i, "M");
        xAxis.push(`${i}月`);
        series.push(getAmountByDate(records, date, "YYYY-MM"));
      }
      break;
    default:
      throw new Error("未匹配到数据");
  }
  // 计算平均每日消费
  averageAmount =
    xAxis.length !== 0
      ? Math.round((totalAmount * 100) / xAxis.length) / 100
      : 0;
  return {
    xAxis,
    series,
    totalAmount,
    averageAmount,
  };
};
export const useChartsData = () => {
  const [chartData, dispatchChart] = useReducer(tabReducer, {
    xAxis: [],
    series: [],
    totalAmount: 0,
    averageAmount: 0,
  });
  return {
    chartData,
    dispatchChart,
  };
};
