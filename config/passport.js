import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';
import bcrypt from 'bcryptjs'; // ¡Esta línea es crucial!

// Estrategia local (email/password)
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email, authProvider: 'local' });
    
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));