

const canlenHoilday = [
  { date: "2020/01/01", publicHolidayName: "元旦", dayLisy: [] },
  { date: "2020/01/24", publicHolidayName: "除夕", dayLisy: [] },
  { date: "2020/01/25", publicHolidayName: "春节", dayLisy: [] },
  { date: "2020/04/04", publicHolidayName: "清明节", dayLisy: [] },
  { date: "2020/05/01", publicHolidayName: "劳动节", dayLisy: [] },
  { date: "2020/06/25", publicHolidayName: "端午节", dayLisy: [] },
  { date: "2020/10/01", publicHolidayName: "中秋节", dayLisy: [] },
  { date: "2020/10/01", publicHolidayName: "国庆节", dayLisy: [] }
]

const cutOffDay = [
  { date: "2020/06/24", dayMark: "409EFF" },
  { date: "2020/06/28", dayMark: "409EFF" },
  { date: "2020/07/28", dayMark: "409EFF" },
  { date: "2020/07/21", dayMark: "409EFF" },
  { date: "2020/06/24", dayMark: "96a58e" },
  { date: "2020/07/24", dayMark: "96a58e" },
  { date: "2020/06/24", dayMark: "696566" },
  { date: "2020/07/24", dayMark: "696566" },
  { date: "2020/07/20", dayMark: "f9eadb" }
]
const getNewDate = (data) => {
  let date = new Date(data);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return { year, month, day };
}

const getDate = (year, month, day) => {
  return new Date(year, month, day);
}

//时间戳转日期
function addZero(n) {
  return n < 10 ? '0' + n : n;
}
const timestampToDate = (data) => {
  const time = new Date(data);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  return `${year}/${addZero(month)}/${addZero(day)}`;
}

const getCanlenDate = (data) => {
  let obj = {};
  canlenHoilday.forEach(item => {
    obj[item.date] = { publicHolidayName: item.publicHolidayName.substring(0, 1), dayType: 3, dayLisy: item.dayLisy }
  })
  cutOffDay.forEach(item => {
    if (obj[item.date]) {
      obj[item.date].dayLisy.push({ dayMark: item.dayMark })
    } else {
      obj[item.date] = {
        dayLisy: [{
          dayMark: item.dayMark
        }]
      }
    }
  })

  let calendatArr = [];
  let { year, month } = getNewDate(
    getDate(data.year, data.month, 1)
  );

  let currentFirstDay = getDate(year, month, 1);

  // 获取当前月第一天星期几
  let weekNum = currentFirstDay.getDay();
  let weekDay = weekNum > 0 ? weekNum : 7;

  let startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000;

  let monthDayNum = 42


  for (let i = 0; i < monthDayNum; i++) {
    let dataTime = new Date(startTime + i * 24 * 60 * 60 * 1000);
    let { year, month } = getNewDate(dataTime);
    let todata = timestampToDate(dataTime);


    let noMonth = isCurMonth(data.year, data.month, dataTime);
    let day = dataTime.getDate();
    calendatArr.push({
      todata: todata,
      date: dataTime,
      year: year,
      month: month + 1,
      day: day,
      clickDay: false,
      checked: false,
      chickMonth: noMonth,
      dayLisy: [],
      ...obj[todata]
    });
  }

  return calendatArr;
}


//显示上周、本周、下周
const getDashCalender = data => {

  const calendatArr = []

  const currentFirstDay = new Date()

  // 获取当前天星期几
  const weekNum = currentFirstDay.getDay()
  const weekDay = weekNum > 0 ? weekNum : 7
  // 获取上周最后一天
  const startTime = currentFirstDay - (weekDay + 6) * 24 * 60 * 60 * 1000

  const monthDayNum = 21

  for (let i = 0; i < monthDayNum; i++) {
    const dataTime = new Date(startTime + i * 24 * 60 * 60 * 1000)
    const { year, month } = getNewDate(dataTime)
    const todata = timestampToDate(dataTime)

    const noMonth = isCurMonth(data.year, data.month, dataTime)
    const day = dataTime.getDate()
    calendatArr.push({
      todata: todata,//年/月/日
      date: dataTime,//完整日期
      year: year,//年
      month: month + 1,//月
      day: day,//日
      chickMonth: noMonth, //是否是单月日期
    })
  }

  return calendatArr
}

//是否是当月
const isCurMonth = (currentYear, currentMonth, data) => {
  let { year, month } = getNewDate(data);
  let m = month;
  return currentYear == year && m == currentMonth;
};

const formatDate = (date) => {
  date = Number(date);
  return date < 10 ? `0${date}` : date;
}




export {
  getNewDate,
  getDate,
  formatDate,
  getCanlenDate,
  timestampToDate,
  getDashCalender
}