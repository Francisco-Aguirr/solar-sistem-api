import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import planetsRoutes from './routes/planets.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/swagger.json'));
import indexRoutes from './routes/index.js'; 
import moonsRoutes from './routes/moons.js';
import passport from 'passport';
import { Strategy as Auth0Strategy } from 'passport-auth0';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import session from 'express-session';
import User from './models/user.js';
import authRoutes from './routes/auth.js';
import './config/passport.js';
import bcrypt from 'bcryptjs';










dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Configuración de sesión (antes de las rutas)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());
// Configuración de Auth0
const auth0Strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL,
  scope: 'openid email profile'
}, async (accessToken, refreshToken, extraParams, profile, done) => {
  try {
    let user = await User.findOne({ auth0Id: profile.id });
    
    if (!user) {
      user = new User({
        auth0Id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        authProvider: 'auth0'
      });
      await user.save();
    }
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use(auth0Strategy);

// Configuración de JWT para APIs
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, (jwtPayload, done) => {
  return done(null, jwtPayload);
}));

// Serialización de usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
// Routes
app.use('/', indexRoutes);
app.use('/api/planets', planetsRoutes);
app.use('/api/moons', moonsRoutes);
app.use('/auth', authRoutes);


// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
