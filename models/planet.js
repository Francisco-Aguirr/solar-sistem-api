import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  orderFromSun: { type: Number, required: true },
  diameter: { type: Number, required: true },
  mass: { type: String, required: true },
  hasRings: { type: Boolean, default: false },
  moonsCount: { type: Number, default: 0 },
  atmosphere: [String]
});

export default mongoose.model('Planet', planetSchema);
