const moment = require('moment');
const schedule = require('node-schedule');
const DataBase = require('../models/functions');

const cleanBar = async (barId) => {
  // eslint-disable-next-line no-unused-vars
  const deletedBar = await DataBase.deleteBar(barId);
  return deletedBar;
};

const cleanupBars = async () => {
  const hourBefore = moment().subtract(1, 'days');

  const response = await DataBase.getLastAccess();

  response.forEach(async (bar) => {
    const lastAccess = moment(bar.lastaccess);
    if (lastAccess.isSameOrBefore(hourBefore)) {
      await setTimeout(cleanBar(bar.id), 1000);
    }
  });
};

const closingTime = schedule.scheduleJob('0 0 * * *', cleanupBars);

module.exports = closingTime;
