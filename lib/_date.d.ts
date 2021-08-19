/**
 * Returns a new similar Date object
 * @param {Date} dateObj
 * @returns {Date}
 */
export function cloneDate(dateObj: Date): Date;
/**
 * Add x to a date and returns a Date object
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
export function addDate(dateObj: Date, n: number, type: "year" | "month" | "day" | "date" | "hour" | "minute" | "second" | "millisecond"): Date;
/**
 * @param {Date} dateObj
 * @returns {Date}
 */
export function getMonthStart(dateObj: Date): Date;
/**
 * @param {Date} dateObj
 * @returns {Date}
 */
export function getMonthEnd(dateObj: Date): Date;
/**
 * @typedef {{
 *   year: number,
 *   month: number,
 *   date: number,
 *   text: number,
 *   prevMonth?: boolean,
 *   currentMonth?: boolean,
 *   nextMonth?: boolean,
 * }} getCalendar_Day
 */
/**
 * startWeekDay: 0 is Sunday
 * return: [getCalendar_Day x 7][]
 * @param {Number} year
 * @param {Number} month
 * @param {Number} [startWeekDay]
 * @returns {getCalendar_Day}
 */
export function getCalendar(year: number, month: number, startWeekDay?: number): getCalendar_Day;
/**
 * eg: 2018-09-07T03:38:37.888Z
 * timezone must be UTC
 * @param {string} str
 */
export function isIsoFormat(str: string): boolean;
/**
 * timestamp eg: 2018-09-07T03:38:37.888Z
 * @param {string} timestamp
 * @returns {Date}
 */
export function parseISO(timestamp: string): Date;
export type getCalendar_Day = {
    year: number;
    month: number;
    date: number;
    text: number;
    prevMonth?: boolean;
    currentMonth?: boolean;
    nextMonth?: boolean;
};
