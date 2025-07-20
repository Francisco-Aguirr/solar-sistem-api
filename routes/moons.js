// routes/moons.js
import express from 'express';
import {
  getAllMoons,
  getMoonById,
  createMoon,
  updateMoon,
  deleteMoon
} from '../controllers/moonsController.js';

const router = express.Router();

router.get('/', getAllMoons);
router.get('/:id', getMoonById);
router.post('/', createMoon);
router.put('/:id', updateMoon);
router.delete('/:id', deleteMoon);

export default router;
