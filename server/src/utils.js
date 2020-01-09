const futureDate = hrs => {
  var date = new Date();
  date.setHours(date.getHours() + hrs);
  return date;
};

const functions = {
  futureDate: hrs => {
    var date = new Date();
    date.setHours(date.getHours() + hrs);
    return date;
  },
};

module.exports = functions;
