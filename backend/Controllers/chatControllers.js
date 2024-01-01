import { GroupModel } from "../models.js";
import mongoose from "mongoose";

// GET /api/chat/all/:groupID
const getAllChats = async (req, res) => {
  const { groupID } = req.params;
  try {
    const group = await GroupModel.findById(groupID);
    const chats = group.chats;
    return res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    console.log("We found a error");
    return res.status(400).json({ error: err.message });
  }
};

// POST /api/chat/new/:groupID
const newChat = async (req, res) => {
  const { groupID } = req.params;
  const chatID = new mongoose.Types.ObjectId();
  // Change it

  const { _id, username } = req.user;
  const { chatBody } = req.body;

  try {
    let group = await GroupModel.findById(groupID);
    group.chats.push({
      _id: chatID,
      body: chatBody,
      userid: _id,
      userName: username,
      createdAt: Date.now(),
    });

    const updatedGroup = await GroupModel.findByIdAndUpdate(groupID, group);
    return res.status(200).json(group.chats[group.chats.length - 1]);
  } catch (err) {
    console.log(err);
    console.log("We found a error");
    return res.status(400).json({ error: err.message });
  }
};

export { getAllChats, newChat };
