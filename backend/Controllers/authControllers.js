import { cryptPassword, comparePassword } from "../crypt.js";
import { UserModel } from "../models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Token generator
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "invalid username" });
  } else {
    comparePassword(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          const token = generateToken(user._id);
          return res
            .status(200)
            .json({ _id: user._id, username: user.username, token });
        } else {
          return res.status(400).json({ message: "passeord doesn't match" });
        }
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
};

const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }
  const user = await UserModel.findOne({ username });
  console.log(user);
  if (user) {
    return res.status(400).json({ message: "username already exist" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be at least 8 characters" });
  }
  cryptPassword(password)
    .then(async (hash) => {
      try {
        const user = await UserModel.create({
          username,
          password: hash,
        });
        const token = generateToken(user._id);
        return res
          .status(200)
          .json({ _id: user._id, username: user.username, token });
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
};

export { loginController, registerController };
