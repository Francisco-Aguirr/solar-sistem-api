// models/moon.js
import mongoose from 'mongoose';

const moonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  planet: { type: String, required: true }, 
  diameter: { type: Number, required: true },
  discoveredBy: { type: String, default: "Unknown" },
  discoveryYear: { type: Number },
  orbitalPeriod: { type: Number },
  isTidallyLocked: { type: Boolean, default: false }
});

export default mongoose.model('Moon', moonSchema);
