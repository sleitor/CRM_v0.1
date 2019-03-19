const moment = require('moment');
const { Order } = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

function mapPerDay(allOrders = []) {
  const mapped = {};

  allOrders.forEach(order => {
    const day = moment(order.date).format('DD.MM.YYYY');
    if (!mapped[day]) mapped[day] = [];

    mapped[day].push(order);
  });
  return mapped;
}

function calculateGain(allOrders = []) {
  return allOrders.reduce((total, order) => {
    const orderTotal = order.list.reduce((total, item) => total + item.quantity * item.cost, 0);
    return total + orderTotal;
  }, 0);
}

module.exports.overview = async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ date: 1 }).lean();

    // Orders count
    const ordersCount = allOrders.length;

    // Orders per day
    const ordersPerDay = mapPerDay(allOrders);

    // yesterdayOrders
    const yesterdayOrders = ordersPerDay[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];
    const yesterdayOrdersNumber = yesterdayOrders.length;

    // Orders per day number
    const ordersPerDayNumber = Object.keys(ordersPerDay).length;

    // averageOrdersPerDay
    const averageOrdersPerDay = (ordersCount / ordersPerDayNumber).toFixed(0);

    // percent from average orders number on yesterday
    const yesterdayPercent = (((yesterdayOrdersNumber / averageOrdersPerDay) - 1) * 100).toFixed(2);

    //total gain
    const totalGain = calculateGain(allOrders);

    //average gain per day
    const averageGainPerDay = (totalGain / ordersPerDayNumber).toFixed(2);

    // yesterdayGain
    const yesterdayGain = calculateGain(yesterdayOrders);

    // percent from average gain on yesterday
    const yesterdayGainPercent = (((yesterdayGain / averageGainPerDay) - 1) * 100).toFixed(2);

    // compare gain
    const compareGain = yesterdayGain - averageGainPerDay;

    //compare orders number
    const compareOrderNumber = yesterdayOrdersNumber - averageOrdersPerDay;


    res.status(200).json({
      gain: {
        percent: Math.abs(+yesterdayGainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +yesterdayGainPercent > 0,
      },
      orders: {
        percent: Math.abs(+yesterdayPercent),
        compare: Math.abs(+compareOrderNumber),
        yesterday: yesterdayOrdersNumber,
        isHigher: +yesterdayPercent > 0,
      },
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.analytics = async (req, res) => {

  try {
    const
      allOrders = await Order.find().sort({ date: 1 }).lean(),
      ordersPerDay = mapPerDay(allOrders),
      // I think it's a average by day, and not by order
      average = +(calculateGain(allOrders) / Object.keys(ordersPerDay).length).toFixed(2),
      chart = Object.keys(ordersPerDay).map(label => {
        const
          gain = calculateGain(ordersPerDay[label]),
          order = ordersPerDay[label].length;

        return { label, gain, order };
      });

    res.status(200).json({ average, chart });
  } catch
    (e) {
    errorHandler(res, e);
  }

};
