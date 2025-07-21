/// controllers\getAvailableCyclesGroupedByHub
import Cycle from '../models/cycleModel.js';  // ✅ This matches the default export
  // Adjust the path according to your project structure

// Controller to get available cycles grouped by hub
export const getAvailableCyclesGroupedByHub = async (_req, res) => {
  try {
    // Fetch cycles with status 'available' from the database
    const availableCycles = await Cycle.findAll({
      where: { status: 'available' },  // Fetch only cycles that are available
      attributes: ['id', 'hub', 'battery'],  // Select only relevant attributes
    });

    if (!availableCycles || availableCycles.length === 0) {
      return res.status(404).json({ message: 'No available cycles found' });
    }

    // Group cycles by their 'hub' field
    const grouped = availableCycles.reduce((acc, cycle) => {
      // Check if 'hub' exists and is a valid value
      if (!cycle.hub) {
        console.warn(`Cycle with ID ${cycle.id} does not have a valid hub.`);
        return acc; // Skip cycles with no valid hub
      }

      if (!acc[cycle.hub]) {
        acc[cycle.hub] = [];  // If the hub doesn't exist, create an empty array
      }

      // Add cycle information to the correct hub group
      acc[cycle.hub].push({
        id: cycle.id,
        battery: cycle.battery,
        rentedBy: null,  // Can be populated with rental info if needed
      });

      return acc;
    }, {});

    // Transform the grouped object into an array of hubs with their cycles
    const result = Object.keys(grouped).map(hub => ({
      hub,
      cycles: grouped[hub],
    }));

    // Send the result as the response
    res.status(200).json(result);

  } catch (error) {
    // Catch any errors and respond with a 500 status code
    console.error('Error fetching available cycles:', error);  // Log the error to the console
    res.status(500).json({
      message: 'Error fetching available cycles',
      error: error.message,
    });
  }
};
