import Model from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const getAll = async (req, res) => {};
export const get = async (req, res) => {
  try {
    Model.findById(req.params.id).then(
      function (success) {
        return res
          .status(200)
          .send({ message: "User data retreived", data: success });
      },
      function (reject) {
        return res
          .status(400)
          .send({ message: "we could not get user data ", data: reject });
      }
    );
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res) => {
  try {
    Model.updateOne({ _id: req.params.id }, req.body).then(
      function (success) {
        return res
          .status(200)
          .send({ message: "User data updated", data: success });
      },
      function (reject) {
        return res
          .status(400)
          .send({ message: "we could not update user data ", data: reject });
      }
    );
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res) => {};

export const add = async (req, res) => {
  //res.send({message:"whaaaaaaaa"})
  console.log(req.body);
  //return res.send({msg:"yy"})
  try {
    console.log("batata");
    let { firstName, lastName, password, phone, role } = req.body;
    let hashed = await bcrypt.hash(password, 10);

    let newUser = new Model({
      firstName: firstName,
      lastName: lastName,
      password: hashed,
      role: role,
      phone: phone,
    });
    newUser.save().then(
      function (success) {
        return res
          .status(201)
          .send({ success: true, message: "New user added" });
      },
      function (reject) {
        return res.status(400).send({ msg: "Incorrect data", error: reject });
      }
    );
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res) => {
  //res.send({message:"whaaaaaaaa"})
  console.log(req.body);
  //return res.send({msg:"yy"})
  try {
    console.log("batata");
    let { firstName, lastName, password, phone, role } = req.body;
    let hashed = await bcrypt.hash(password, 10);

    let newUser = new Model({
      firstName: firstName,
      lastName: lastName,
      password: hashed,
      role: "passenger",
      phone: phone,
    });
    newUser.save().then(
      function (success) {
        return res
          .status(201)
          .send({ success: true, message: "New user added" });
      },
      function (reject) {
        return res.status(400).send({ msg: "Incorrect data", error: reject });
      }
    );
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res) => {
  try {
    const user = await Model.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    let verified = await bcrypt.compare(req.body.password, user.password);
    if (!verified) {
      return res
        .status(402)
        .send({ message: "Wrong phone number or password" });
    }
    if (verified) {
      const token = jwt.sign(
        { userId: user._id, userPhone: user.phone, role: user.role },
        process.env.JWT_SECRET
      );
      return res
        .status(200)
        .send({
          success: true,
          message: "Logged in successfully",
          token: token,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: true, error });
  }
};
const controllers = { register, getAll, get, update, remove, login };
export default controllers;
