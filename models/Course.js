import mongoose from 'mongoose';
import Student from './Student.js';

const schema = new mongoose.Schema({
  code: { type: String, required: true, maxlength: 16 },
  title: { type: String, required: true, maxlength: 255 },
  description: { type: String, maxlength: 2048 },
  url: { type: String, maxlength: 512 },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});
const Model = mongoose.model('Course', schema);

export default Model;
