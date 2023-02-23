const express = require("express");
const { FlightModel } = require("../models/flights.model");
const flightRouter = express.Router();
flightRouter.get("/", async (req, res) => {
  try {
    let data = await FlightModel.find();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});
flightRouter.get("/:id", async (req, res) => {
  try {
    let data = await FlightModel.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});
flightRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new FlightModel(payload);
    await new_note.save();
    res.status(200).send("created new flight");
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

flightRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send("updated the flight");
    console.log("updated the flight");
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

flightRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await FlightModel.findByIdAndDelete({ _id: id });
    res.status(202).send("deleted the flight");
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

module.exports = { flightRouter };
