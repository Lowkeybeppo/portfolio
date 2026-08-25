import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 5,
    maxlength: 5,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Word', wordSchema);