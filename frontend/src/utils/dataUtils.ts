import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const formatDate = (inputDate: string): string => {
  return dayjs.tz(inputDate).format("YYYY.MM.DD HH:mm:ss");
};
