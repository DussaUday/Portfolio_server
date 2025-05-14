import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true },
  icon: { type: String },
});

export default mongoose.model('Skill', skillSchema);