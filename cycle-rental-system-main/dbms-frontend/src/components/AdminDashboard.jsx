import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [cycles, setCycles] = useState([]);
  const [newCycle, setNewCycle] = useState({ battery: '', hub: '' });
  const [filter, setFilter] = useState('all');

  const fetchCycles = async () => {
    try {
      const res = await fetch('/api/cycles');
      if (!res.ok) throw new Error("Failed to fetch cycles");
      const data = await res.json();
      setCycles(data);
    } catch (error) {
      toast.error("Failed to fetch cycles.");
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'green';
      case 'rented': return 'red';
      case 'maintenance': return 'orange';
      default: return 'black';
    }
  };

  useEffect(() => {
    fetchCycles();
  }, []);

  const handleAddCycle = async () => {
    if (!newCycle.battery || !newCycle.hub) {
      toast.warning("Please fill in all fields.");
      return;
    }

    const battery = parseInt(newCycle.battery);
    if (isNaN(battery) || battery < 0 || battery > 100) {
      toast.warning("Battery % must be between 0 and 100.");
      return;
    }

    try {
      const res = await fetch('/api/cycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ battery, hub: newCycle.hub }),
      });

      if (!res.ok) throw new Error("Error adding cycle");
      const addedCycle = await res.json();

      toast.success("Cycle added!");
      setNewCycle({ battery: '', hub: '' });
      setCycles(prev => [...prev, addedCycle]);
    } catch (error) {
      toast.error("Failed to add cycle.");
      console.error(error);
    }
  };

  const handleDeleteCycle = async (cycleId, status) => {
    if (status === 'rented') {
      toast.warning("Cannot delete a rented cycle.");
      return;
    }

    try {
      const res = await fetch(`/api/cycles/${cycleId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Error deleting cycle");

      toast.success("Cycle removed.");
      setCycles(prev => prev.filter(cycle => cycle.id !== cycleId));
    } catch (error) {
      toast.error("Failed to delete cycle.");
      console.error(error);
    }
  };

  // Filter cycles based on status
  const filteredCycles = cycles.filter(cycle => filter === 'all' || cycle.status === filter);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="add-cycle-form">
        <h3>Add New Cycle</h3>
        <input
          type="text"
          placeholder="Battery %"
          value={newCycle.battery}
          onChange={e => setNewCycle({ ...newCycle, battery: e.target.value })}
        />
        <select
          value={newCycle.hub}
          onChange={e => setNewCycle({ ...newCycle, hub: e.target.value })}
        >
          <option value="">Select Hub</option>
          <option value="North campus">North campus</option>
          <option value="South campus">South campus</option>
        </select>
        <button onClick={handleAddCycle}>Add Cycle</button>
      </div>

      <div className="filter-section">
        <h4>Filter by Status:</h4>
        <select onChange={e => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <h3>All Cycles</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Battery</th>
            <th>Hub</th>
            <th>Status</th>
            <th>Rented By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCycles.map(cycle => (
            <tr key={cycle.id}>
              <td>{cycle.id}</td>
              <td>{cycle.battery}%</td>
              <td>{cycle.hub || "N/A"}</td>
              <td style={{ color: getStatusColor(cycle.status), fontWeight: 'bold' }}>
                {cycle.status}
              </td>
              <td>{cycle.rentedBy ? cycle.rentedBy.username : "-"}</td>
              <td>
                <button
                  onClick={() => handleDeleteCycle(cycle.id, cycle.status)}
                  disabled={cycle.status === 'rented'}
                >
                  {cycle.status === 'rented' ? "Cannot Delete" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
