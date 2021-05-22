const cron = require('node-cron');
const userModel = require('../v1/users/user.model');
const { infoLog } = require('../util/log');

/**
 * Node Cron Job
 * Accept 6 values (* * * * * *)
 * second (0-59, optional), minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-7)
 */

const sampleCronOne = () => {
  cron.schedule('*/30 * * * * *', async () => {
    console.log('I run every 30 seconds');
    try {
      let row = await userModel.joinSales({});
      infoLog('Execute sample cron one successfully')
    } catch (err) {
      infoLog('Fail to execute sample cron one')
    }
  });
}

const sampleCronTwo = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('I run every hour at 0 minute');
      // do something
      infoLog('Execute sample cron two successfully')
    } catch (err) {
      infoLog('Fail to execute sample cron two')
    }
  });
}

module.exports.cronJob = () => {
  sampleCronOne();
  sampleCronTwo();
}