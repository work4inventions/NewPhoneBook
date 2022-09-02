const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

require("../models/data");
const Data = mongoose.model("Data");

router.get("/data", (req, res) => {
  Data.find().then((data) => {
    res.status(200).json(data);
  });
});
router.post("/addData", async (req, res) => {
  const { FirstName, LastName, Email, MobileNo } = req.body;

  try {
    const help = new Data({ FirstName, LastName, Email, MobileNo });
    help.save();
    res.status(200).send({ success: true });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.delete("/deleteData/:MobileNo", async (req, res) => {
  try {
    const data = await Data.findOneAndDelete({
      MobileNo: req.params.MobileNo,
    });
    if (data) {
      res.send(data);
    } else {
      res.send("data are not found");
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.put("/updateData/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const MobileNo = req.body.MobileNo;
    const data = await Data.findByIdAndUpdate(
      Id,
      {
        $set: {
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
          MobileNo: MobileNo,
        },
      },
      { new: true }
    );

    data.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
