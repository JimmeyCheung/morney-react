import moment from "moment";
import { DateTypeEnum } from "Enums/DateTypeEnum";

const getDateRange = (dateType: DateTypeEnum = 0, dateRange?: DateRange) => {
  let startDate = moment(), endDate = moment();
  switch (dateType) {
    case DateTypeEnum.week:
      startDate = moment().day(-6); // 获取本周一
      endDate = moment().day(0);
      break;
    case DateTypeEnum.month:
      startDate = moment(moment().format("YYYY-MM")); //获取月初日期
      endDate = moment(startDate).add(1, "M").add(-1); //月末
      break;
    case DateTypeEnum.year:
      startDate = moment(moment().format("YYYY")); //年初
      endDate = moment(startDate).add(1, "y").add(-1); //年末
      break;
    case DateTypeEnum.custom:
      startDate = dateRange?.startDate || startDate;
      endDate = dateRange?.endDate || endDate;
      break;
    default:
      break;
  }
  return {
    startDate,
    endDate,
  };
};
export { getDateRange };
