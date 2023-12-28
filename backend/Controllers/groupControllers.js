import { UserModel, GroupModel } from "../models.js";

// POST /api/group/new
const createGroup = async (req, res) => {
  const { groupName } = req.body;
  const {_id, username} = req.user;
  try {
    const group = await GroupModel.create({
      name: groupName,
      users: [
        {
          _id,
          userName: username,
          role: "admin",
          joinedAt: Date.now(),
        },
      ],
    });

    let user = await UserModel.findById(_id);
    user.groups.push({ _id: group._id, groupName: groupName });
    const updatedUser = await UserModel.findByIdAndUpdate(_id, user);
    return res.status(200).json({ group, user });
  } catch (err) {
    console.log(err);
    console.log("We found a error");
    return res.status(400).json({ error: err.message });
  }
}

// POST /api/group/join/:groupID
const joinGroup = async (req, res) => {
  const { groupID } = req.params;
  const { _id, username } = req.user;

  try {
    let group = await GroupModel.findById(groupID);
    group.users.push({ _id: _id, userName: username });
    await GroupModel.findByIdAndUpdate(groupID, group);

    let user = await UserModel.findById(_id);
    user.groups.push({ _id: groupID, groupName: group.name });
    await UserModel.findByIdAndUpdate(_id, user);
    return res.status(200).json({ group, user });
  } catch (err) {
    console.log(err);
    console.log("We found a error");
    return res.status(400).json({ error: err.message });
  }
}

// GET /api/group/all
const getAllGroups = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await UserModel.findById(_id);
    const groups = user.groups;
    return res.status(200).json(groups);
  } catch (err) {
    console.log(err);
    console.log("We found a error");
    return res.status(400).json({ error: err.message });
  }
}

// GET /api/group/members/:groupID
const getGroupMembers = async (req, res) => {
  const { groupID } = req.params;
  try {
    const group = await GroupModel.findById(groupID);
    const members = group.users;
    return res.status(200).json(members);
  } catch (err) {
    console.log(err);
    console.log("We found a error");
    return res.status(400).json({ error: err.message });
  }
}


export { createGroup, joinGroup, getAllGroups, getGroupMembers}