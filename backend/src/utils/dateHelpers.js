// backend/src/utils/dateHelpers.js

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
 
dayjs.extend(utc);
dayjs.extend(timezone);
 
module.exports = {
  formatDate: (date, format = 'YYYY-MM-DD HH:mm:ss', tz = 'UTC') => {
    return dayjs(date).tz(tz).format(format);
  },
 
  now: (tz = 'UTC') => {
    return dayjs().tz(tz).format('YYYY-MM-DD HH:mm:ss');
  },
 
  daysBetween: (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    return endDate.diff(startDate, 'day');
  },
};