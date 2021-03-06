import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  email: String
});
const Model = mongoose.model('Student', schema);

export default Model;
