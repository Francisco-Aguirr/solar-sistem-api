import express from 'express';
import passport from 'passport';
import {
  login,
  register,
  auth0Callback,
  logout,
  getCurrentUser
} from '../controllers/authController.js';

const router = express.Router();

// Rutas locales
router.post('/register', register);
router.post('/login', login);

// Rutas Auth0
router.get('/auth0', passport.authenticate('auth0'));
router.get('/auth0/callback', auth0Callback);
router.get('/logout', logout);
router.get('/me', getCurrentUser);

export default router;