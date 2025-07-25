import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  })(req, res, next);
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const user = new User({ email, password, name, authProvider: 'local' });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const auth0Callback = passport.authenticate('auth0', {
  successRedirect: '/',
  failureRedirect: '/login'
});

export const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

export const getCurrentUser = (req, res) => {
  res.json(req.user || null);
};