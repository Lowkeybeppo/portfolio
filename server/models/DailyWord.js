import mongoose from 'mongoose';

const dailyWordSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },
    word: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('DailyWord', dailyWordSchema);