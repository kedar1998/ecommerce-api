const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url).then(() =>{console.log("DB Connected");})
};

module.exports = connectDB;
