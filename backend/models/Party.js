import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const partySchema = new mongoose.Schema({
  partyName: { type: String, required: true },
  djs: { type: [String], required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  genres: { type: [String], required: true },
  location: { type: String, required: true },
  isFree: { type: Boolean, required: true },
  show: { type: Boolean, default: false },
});

// Ensure `id` is indexed and unique
partySchema.index({ id: 1 }, { unique: true });

const Party = mongoose.model('Party', partySchema);

export default Party;
