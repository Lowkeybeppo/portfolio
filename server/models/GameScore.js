import mongoose from 'mongoose';

const gameScoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    won: {
      type: Boolean,
      required: true,
    },
    time: {
      type: Number, // time in seconds
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('GameScore', gameScoreSchema);
