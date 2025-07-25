import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  authProvider: { type: String, enum: ['local', 'auth0'], default: 'local' },
  auth0Id: { type: String }
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.authProvider === 'local') {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model('User', userSchema);