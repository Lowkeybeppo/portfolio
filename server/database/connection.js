import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Sovellus lopetetaan, jos MongoDB-yhteyttä ei saada muodostettua,
// koska backend ei voi toimia ilman tietokantaa.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
