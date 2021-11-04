const { User } = require("../models");

module.exports = {
  // Format date as MM/DD/YYYY
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  // Format time as H:MM:SS AM/PM
  format_time: (time) => {
    return time.toLocaleTimeString('en-US');
  },
  // format large numbers with commas
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  }
};
