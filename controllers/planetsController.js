import Planet from '../models/planet.js';

export const getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.find();
    res.json(planets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) return res.status(404).json({ message: 'Planet not found' });
    res.json(planet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPlanet = async (req, res) => {
  try {
    const planet = new Planet(req.body);
    await planet.validate();
    const savedPlanet = await planet.save();
    res.status(201).json(savedPlanet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePlanet = async (req, res) => {
  try {
    const updated = await Planet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Planet not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePlanet = async (req, res) => {
  try {
    const deleted = await Planet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Planet not found' });
    res.json({ message: 'Planet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
