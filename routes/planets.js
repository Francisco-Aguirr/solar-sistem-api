import express from 'express';
import {
  getAllPlanets,
  getPlanetById,
  createPlanet,
  updatePlanet,
  deletePlanet
} from '../controllers/planetsController.js';

const router = express.Router();

router.get('/', getAllPlanets);
router.get('/:id', getPlanetById);
router.post('/', createPlanet);
router.put('/:id', updatePlanet);
router.delete('/:id', deletePlanet);

export default router;
