import { Router } from "express";
// Middleware
import authentication from "../Middleware/authentication.js";
// Controllers
import {
  createGroup,
  joinGroup,
  getAllGroups,
  getGroupMembers,
} from "../Controllers/groupControllers.js";
import { 
  getAllChats, 
  newChat 
} from "../Controllers/chatControllers.js";

const router = Router();

router.use(authentication);

// Create a Group
router.post("/group/new", createGroup);

// Join a Group
router.post("/group/join/:groupID", joinGroup);

// Get all Groups
router.get("/group/all", getAllGroups);

// Get a Group Members
router.get("/group/members/:groupID", getGroupMembers);

// Get a Group Chat
router.get("/chat/all/:groupID", getAllChats);

// New Chat
router.post("/chat/new/:groupID", newChat);

export default router;
