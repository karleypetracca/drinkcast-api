const moment = require('moment');
const schedule = require('node-schedule');
const DataBase = require('../models/functions');

const cleanupBar = async () => {
  const hourBefore = moment().subtract(1.5, 'hours');

  const response = await DataBase.getLastAccess();

  response.forEach(async (bar) => {
    const lastAccess = moment(bar.lastaccess);
    if (lastAccess.isSameOrBefore(hourBefore)) {
      console.log('is before');
      const deletedBar = await DataBase.deleteBar(bar.id);
    }
  });
};

const closingTime = schedule.scheduleJob('0 0 * * *', cleanupBar);

module.exports = closingTime;
