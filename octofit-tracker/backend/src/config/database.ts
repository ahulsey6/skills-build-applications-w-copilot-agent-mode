import mongoose from 'mongoose';

const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
};
