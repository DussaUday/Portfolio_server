import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/portfolio`);
    console.log('MongoDB connected to portfolio database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;