import moment from "moment/min/moment-with-locales";

export const dateFormat = (date) => {
  return moment(date).locale("th").format("LL");
};

export const dateTimeFormat = (date) => {
  return moment(date).locale("th").format("LLL"); // แสดงวันที่และเวลาครบ
};

// ฟังก์ชันสำหรับเวลาล้วน ๆ
export const timeFormat = (date) => {
  return moment(date).locale("th").format("LT"); // แสดงเฉพาะเวลา
};
