import Model from "../models/Bus.js";
export const getAll = async (req, res, next) => {
  try {
    Model.find({}).then(
      function (success) {
        if (success.length === 0) {
          return res
            .status(203)
            .send({ success: true, message: "No data found" });
        }
        return res
          .status(200)
          .send({ message: "Buses list retrieved", data: success });
      },
      function (reject) {
        return res
          .status(400)
          .send({ error: reject, message: "Can't retrieve buses data" });
      }
    );
  } catch (error) {
    next(error);
  }
};
export const get = async (req, res) => {};
export const update = async (req, res) => {};
export const remove = async (req, res) => {};

export const add = async (req, res, next) => {
  try {
    console.log("batata");
    
    let newBus = new Model(req.body);

    newBus.save().then(
      function (success) {
        return res
          .status(201)
          .send({ success: true, message: "New bus added" });
      },
      function (reject) {
        return res.status(400).send({ msg: "Incorrect data", error: reject });
      }
    );
  } catch (error) {
    next(error);
  }
};

const controllers = { add, getAll, get, update, remove };
export default controllers;
