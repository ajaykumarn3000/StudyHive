import bcrypt from "bcrypt"

const cryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (plainPass, hashword) => {
  return await bcrypt.compare(plainPass, hashword);
};

export { cryptPassword, comparePassword };
