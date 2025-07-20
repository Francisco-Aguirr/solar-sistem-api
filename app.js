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




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', indexRoutes);
app.use('/api/planets', planetsRoutes);
app.use('/api/moons', moonsRoutes);


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
