import jwt from "jsonwebtoken";
import {UserModel} from "../models.js";

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findOne({ _id }).select("_id username");
    console.log("Authentication Success\n");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authentication;
