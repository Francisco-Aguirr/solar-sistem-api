// controllers/moonsController.js
import Moon from '../models/moon.js';

export const getAllMoons = async (req, res) => {
  try {
    const moons = await Moon.find();
    res.json(moons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMoonById = async (req, res) => {
  try {
    const moon = await Moon.findById(req.params.id);
    if (!moon) return res.status(404).json({ message: 'Moon not found' });
    res.json(moon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMoon = async (req, res) => {
  try {
    const moon = new Moon(req.body);
    await moon.validate();
    const savedMoon = await moon.save();
    res.status(201).json(savedMoon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMoon = async (req, res) => {
  try {
    const updated = await Moon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Moon not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteMoon = async (req, res) => {
  try {
    const deleted = await Moon.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Moon not found' });
    res.json({ message: 'Moon deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
