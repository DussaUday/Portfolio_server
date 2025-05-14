import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
});

export default mongoose.model('Certificate', certificateSchema);