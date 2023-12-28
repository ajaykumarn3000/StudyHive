import mongoose from "mongoose";

const { Schema } = mongoose;

// User document Schema
const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        ref: "groups",
        required: true,
      },
      groupName: {
        type: String,
        ref: "groups",
        required: true
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User document Model
const UserModel = mongoose.model("user", UserSchema);

// Group document Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
      },
      userName: {
        type: String,
        ref: "users",
        required: true
      },
      role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  chats: [
    {
      _id: { 
        type: mongoose.Types.ObjectId, 
        required: true 
      },
      body: { 
        type: String, 
        required: true 
      },
      userid: {
        type: mongoose.Types.ObjectId,
        ref: "usesr",
        required: true,
      },
      userName: {
        type: String,
        ref: "users",
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Group document Model
const GroupModel = mongoose.model("group", GroupSchema);

// Export
export { UserModel, GroupModel };
