import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// Mongoose Models
import { UserModel, GroupModel } from "./models.js";

// Express Routes
import apiRoutes from "./Routes/apiRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

// Backend PORT
const port = process.env.PORT || 4000;

// Express App
const app = express();
app.use(cors());

// Middleware: To get the request body
app.use(express.json());

// Middleware: To console log incoming requests
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Middleware: To add routes
app.use("/auth/", authRoutes);

app.use("/api/", apiRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)

  // If Successful
  .then(() => {
    console.log("Connection success");
    // Listen to request
    app.listen(port, () => {
      console.log(`Server listening to port ${port}`);
    });
  })

  // If Failed
  .catch((err) => {
    console.log(err);
  });
