import mongoose from "mongoose";
const Schema = mongoose.Schema;

const _Schema = Schema({
  name: String,
  lastname: String,
  dni: String,
  email: String,
  password: String,
  created: String,
});
export const User = mongoose.model("users", _Schema);
