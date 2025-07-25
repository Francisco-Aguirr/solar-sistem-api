import passport from 'passport';

export const isAuthenticated = passport.authenticate('jwt', { session: false });

export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
};