import { Cycle, Rental, User } from '../models/index.js';

// Get all cycles with current rental user info
export const getAllCycles = async (_req, res) => {
  try {
    const cycles = await Cycle.findAll({
      include: [
        {
          model: Rental,
          as: 'rentals',
          where: { end_time: null },
          required: false,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username'],
            },
          ],
        },
      ],
    });

    const formattedCycles = cycles.map(cycle => {
      const activeRental = cycle.rentals.length > 0 ? cycle.rentals[0] : null;
      const rentedBy = activeRental?.user
        ? { id: activeRental.user.id, username: activeRental.user.username }
        : null;

      return {
        id: cycle.id,
        battery: cycle.battery,
        hub: cycle.hub,
        status: cycle.status,
        rentedBy,
      };
    });

    res.status(200).json(formattedCycles);
  } catch (error) {
    console.error('Error fetching cycles:', error);
    res.status(500).json({ message: 'Error fetching cycles', error: error.message });
  }
};

// Add a new cycle
export const addCycle = async (req, res) => {
  const { battery, hub } = req.body;

  if (!battery || !hub) {
    return res.status(400).json({ message: 'Battery and Hub are required.' });
  }

  if (isNaN(battery) || battery < 0 || battery > 100) {
    return res.status(400).json({ message: 'Battery must be a number between 0 and 100.' });
  }

  try {
    const cycle = await Cycle.create({ battery, hub, status: 'available' });
    res.status(201).json(cycle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding cycle', error: error.message });
  }
};

// Delete a cycle
export const deleteCycle = async (req, res) => {
  const { id } = req.params;

  try {
    const cycle = await Cycle.findOne({ where: { id } });

    if (!cycle) {
      return res.status(404).json({ message: 'Cycle not found' });
    }

    const activeRental = await Rental.findOne({
      where: { cycle_id: id, end_time: null },
    });

    if (activeRental) {
      return res.status(400).json({ message: 'Cycle is rented and cannot be deleted' });
    }

    if (cycle.status === 'maintenance') {
      return res.status(400).json({ message: 'Cycle is in maintenance and cannot be deleted' });
    }

    await cycle.destroy();

    res.status(200).json({ message: 'Cycle deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting cycle', error: error.message });
  }
};

// Rent a cycle
export const rentCycle = async (req, res) => {
  const { user_id, cycle_id } = req.body;

  try {
    const cycle = await Cycle.findOne({ where: { id: cycle_id } });

    if (!cycle) return res.status(404).json({ message: 'Cycle not found' });

    if (cycle.status === 'rented') {
      return res.status(400).json({ message: 'Cycle is already rented' });
    }

    await Cycle.update({ status: 'rented' }, { where: { id: cycle_id } });

    const rental = await Rental.create({
      user_id,
      cycle_id,
      start_time: new Date(),
    });

    res.status(201).json({ message: 'Cycle rented successfully', rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error renting cycle', error: error.message });
  }
};

// Complete a rental
export const completeRental = async (req, res) => {
  const { rental_id } = req.body;

  try {
    const rental = await Rental.findOne({ where: { id: rental_id } });

    if (!rental) return res.status(404).json({ message: 'Rental not found' });

    const cycle = await Cycle.findOne({ where: { id: rental.cycle_id } });

    if (!cycle) return res.status(404).json({ message: 'Cycle not found' });

    await Cycle.update({ status: 'available' }, { where: { id: cycle.id } });

    await rental.update({ end_time: new Date() });

    res.status(200).json({ message: 'Rental completed and cycle returned', rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error completing rental', error: error.message });
  }
};
