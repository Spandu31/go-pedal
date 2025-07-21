import Cycle from '../models/cycleModel.js';
import Rental from '../models/rentalModel.js';
import User from '../models/userModel.js';

// Create a rental (basic)
export const createRental = async (req, res) => {
  try {
    const { cycleId, userId } = req.body;

    const cycle = await Cycle.findByPk(cycleId);
    if (!cycle || cycle.status !== 'available') {
      return res.status(400).json({ message: 'Cycle is not available.' });
    }

    await Rental.create({ cycleId, userId, startTime: new Date(), isDeleted: false });

    cycle.status = 'rented';
    await cycle.save();

    res.status(200).json({ message: 'Rental created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating rental.', error: error.message });
  }
};

// Rent a cycle
export const rentCycle = async (req, res) => {
  const { userId } = req.query;
  const { cycleId } = req.params;

  try {
    const user = await User.findByPk(userId);
    const cycle = await Cycle.findByPk(cycleId);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!cycle) return res.status(404).json({ message: 'Cycle not found' });

    const existingRental = await Rental.findOne({
      where: { userId, endTime: null, isDeleted: false },
    });
    if (existingRental) {
      return res.status(400).json({ message: 'User already has an active rental.' });
    }

    if (cycle.status === 'rented') {
      return res.status(400).json({ message: 'Cycle is already rented.' });
    }

    const rental = await Rental.create({
      userId,
      cycleId,
      startTime: new Date(),
      isDeleted: false
    });

    cycle.status = 'rented';
    await cycle.save();

    res.status(201).json({ rental });
  } catch (error) {
    res.status(500).json({ message: 'Error renting cycle', error: error.message });
  }
};

// Return a cycle
export const returnCycle = async (req, res) => {
  const { cycleId } = req.params;

  try {
    const rental = await Rental.findOne({
      where: { cycleId, endTime: null, isDeleted: false },
    });

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found or already returned.' });
    }

    const cycle = await Cycle.findByPk(cycleId);
    if (!cycle) {
      return res.status(404).json({ message: 'Cycle not found.' });
    }

    cycle.status = 'available';
    await cycle.save();

    rental.endTime = new Date();
    await rental.save();

    res.status(200).json({ message: 'Cycle returned successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error returning cycle', error: error.message });
  }
};

// Get all cycles with rental info
export const getAllCyclesWithRentalInfo = async (_req, res) => {
  try {
    const cycles = await Cycle.findAll({
      include: [{
        model: Rental,
        as: 'Rentals',
        where: { isDeleted: false, endTime: null },
        required: false
      }]
    });

    const result = cycles.map(cycle => ({
      id: cycle.id,
      battery: cycle.battery,
      hub: cycle.hub,
      status: cycle.status,
      rentedBy: cycle.Rentals?.[0]?.userId || null
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all rentals
export const getAllRentals = async (_req, res) => {
  try {
    const rentals = await Rental.findAll({ where: { isDeleted: false } });
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rentals', error: error.message });
  }
};

// Get rentals by user
export const getRentalsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const rentals = await Rental.findAll({
      where: { userId, isDeleted: false },
      include: [{ model: Cycle }]
    });

    if (rentals.length === 0) {
      return res.status(404).json({ message: 'No rentals found for this user' });
    }

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user rentals', error: error.message });
  }
};
// Delete a rental
export const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found.' });
    }

    await rental.destroy();  // This will permanently delete the rental
    res.status(200).json({ message: 'Rental deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rental.', error });
  }
};

// Get all cycles
export const getAllCycles = async (_req, res) => {
  try {
    const cycles = await Cycle.find();
    res.status(200).json(cycles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cycles.', error });
  }
};
// Return a rental
export const returnRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found.' });
    }

    const cycle = await Cycle.findById(rental.cycleId);
    if (cycle.rentedBy) {
      cycle.rentedBy = null;
      await cycle.save();
    }

    await rental.remove();
    res.status(200).json({ message: 'Cycle returned successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error returning rental.', error });
  }
};

// Soft delete rental
export const softDeleteRental = async (req, res) => {
  const rentalId = req.params.id;

  try {
    const rental = await Rental.findByPk(rentalId);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    const wasActive = !rental.endTime;

    rental.isDeleted = true;
    await rental.save();

    if (wasActive) {
      const cycle = await Cycle.findByPk(rental.cycleId);
      if (cycle?.status === 'rented') {
        cycle.status = 'available';
        await cycle.save();
      }
    }

    res.status(200).json({ message: 'Rental soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rental', error: error.message });
  }
};
