/**
 * @param {Date} dateObj
 * @returns {Date}
 */
export function cloneDate(dateObj) {
  return new Date(dateObj.getTime());
}

/**
 * day and date is same
 * @param {Date} dateObj
 * @param {Number} n
 * @param {"year"
 *   | "month" 
 *   | "day"
 *   | "date"
 *   | "hour"
 *   | "minute"
 *   | "second"
 *   | "millisecond"} type
 * @returns {Date}
 */
export function addDate(dateObj, n, type) {
  if (!["year", "month", "day", "date"].includes(type)) {
    type += "s";
  }
  let type2 = studlyCase(type);
  if (type2 === "Day") {
    type2 = "Date";
  }
  var setFuncName = "set" + type2;
  var getFuncName = "get" + type2;
  dateObj[setFuncName](dateObj[getFuncName]() + n);
  return dateObj;
}

/**
 * @param {Date} dateObj
 * @returns {Date}
 */
export function getMonthStart(dateObj) {
  const clonedObj = cloneDate(dateObj);
  clonedObj.setDate(1);
  return clonedObj;
}

/**
 * @param {Date} dateObj
 * @returns {Date}
 */
export function getMonthEnd(dateObj) {
  const r = cloneDate(dateObj);
  addDate(r, 1, "month");
  r.setDate(0);
  return r;
}

/**
 * startWeekDay: 0 is Sunday
 * return: [getCalendar_Day x 7][]
 * @param {Number} year
 * @param {Number} month
 * @param {Number} [startWeekDay]
 * @returns {{
 *   year: number,
 *   month: number,
 *   date: number,
 *   text: number,
 *   prevMonth?: boolean,
 *   currentMonth?: boolean,
 *   nextMonth?: boolean,
 * }}
 */
export function getCalendar(year, month, startWeekDay = 0) {
  const results = [];
  const date = new Date(year, month - 1);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  const monthStart = getMonthStart(date);
  const monthStartDay = monthStart.getDay();
  const calendarStart = addDate(
    cloneDate(monthStart),
    -(monthStartDay + startWeekDay),
    "day"
  );
  if (monthStartDay > startWeekDay) {
    const startDate = calendarStart.getDate();
    const year = calendarStart.getFullYear();
    const month = calendarStart.getMonth() + 1;
    for (let i = startWeekDay; i < monthStartDay; i++) {
      const date = startDate + i;
      results.push({
        year,
        month,
        date: date,
        text: date,
        prevMonth: true,
      });
    }
  }
  //
  const monthEnd = getMonthEnd(date);
  const monthEndtDate = monthEnd.getDate();
  for (let i = 1; i <= monthEndtDate; i++) {
    const date = i;
    results.push({
      year: year,
      month: month,
      date,
      text: date,
      currentMonth: true,
    });
  }
  //
  const monthEndDay = monthEnd.getDay();
  const endWeekDay = 6 - startWeekDay;
  if (monthEndDay < endWeekDay) {
    const nextMonth = addDate(cloneDate(date), 1, "month");
    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth() + 1;
    for (let i = monthEndDay + 1, date = 1; i <= endWeekDay; i++, date++) {
      results.push({
        year: year,
        month: month,
        date: date,
        text: date,
        nextMonth: true,
      });
    }
  }
  //
  return splitArray(results, 7);
}

/**
 * eg: 2018-09-07T03:38:37.888Z
 * timezone must be UTC
 * @param {string} str
 */
export function isIsoFormat(str) {
  return Boolean(
    str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/)
  );
}

/**
 * timestamp eg: 2018-09-07T03:38:37.888Z
 * @param {string} timestamp
 * @returns {Date}
 */
export function parseISO(timestamp) {
  const [datePart, timePart] = timestamp.split("T");
  let y,
    m,
    d,
    h = 0,
    min = 0,
    s = 0;
  [y, m, d] = datePart.split("-").map((v) => parseInt(v));
  m = m - 1;
  if (timePart) {
    const t = timePart.split(":").map((v) => parseFloat(v));
    h = t[0];
    if (t[1] != null) {
      min = t[1];
    }
    if (t[2] != null) {
      s = t[2];
    }
  }
  const dt = new Date();
  dt.setUTCFullYear(y);
  dt.setUTCMonth(m);
  dt.setUTCDate(d);
  dt.setUTCHours(h);
  dt.setUTCMinutes(min);
  dt.setUTCSeconds(s);
  return dt;
}
