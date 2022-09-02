const mongoose = require("mongoose");
const Data = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: String,
    required: true,
  },
});

mongoose.model("Data", Data);
