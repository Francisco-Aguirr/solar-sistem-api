import express from 'express';
import {
  getAllPlanets,
  getPlanetById,
  createPlanet,
  updatePlanet,
  deletePlanet
} from '../controllers/planetsController.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.get('/', getAllPlanets);
router.get('/:id', getPlanetById);
router.post('/', isAuthenticated, createPlanet);
router.put('/:id', isAuthenticated, updatePlanet);
router.delete('/:id', isAuthenticated, deletePlanet);

export default router;
