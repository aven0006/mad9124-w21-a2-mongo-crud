import mongoose from 'mongoose';
import Student from './Student.js';

const schema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  url: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});
const Model = mongoose.model('Course', schema);

export default Model;
