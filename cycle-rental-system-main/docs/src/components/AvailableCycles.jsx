import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AvailableCycles.css';

const AvailableCycles = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasActiveRental, setHasActiveRental] = useState(false);
  const [, setActiveCycle] = useState(null); // Track rented cycle
  const [hubs, setHubs] = useState([]);
  const [paymentDone, setPaymentDone] = useState(false);
  const [status] = useState("Go Pedal is available in Mysuru.");

  useEffect(() => {
    // Load logged in user
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);

      // Check if user has an active rental from backend
      axios.get(`http://localhost:3000/api/rentals/active/${loggedInUser.id}`)
        .then(res => {
          if (res.data.activeRental) {
            setHasActiveRental(true);
            setActiveCycle(res.data.cycle);
            setPaymentDone(true); // Assuming payment done if rental active
          }
        })
        .catch(err => {
          console.error("Error checking active rental:", err);
          // optionally show toast or ignore
        });
    }

    // Fetch available cycles
    axios.get('http://localhost:3000/api/cycles/available')
      .then(response => {
        setHubs(response.data);
      })
      .catch(error => {
        console.error('Error fetching cycles:', error);
        toast.error('Failed to load cycles.');
      });
  }, []);

  const handleRent = (hubIndex, cycleIndex) => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }

    if (hasActiveRental) {
      toast.warning("Return your currently rented cycle first.");
      return;
    }

    if (!paymentDone) {
      toast.info("Redirecting to payment page...");
      navigate('/payment'); // Navigate to payment page
      return;
    }

    const cycleToRent = hubs[hubIndex].cycles[cycleIndex];
    axios.post('http://localhost:3000/api/rentals', { cycleId: cycleToRent.id, userId: user.id })
      .then(() => {
        toast.success("Cycle rented successfully!");
        setActiveCycle(cycleToRent);
        setHasActiveRental(true);

        // Update local cycle state to mark rented
        setHubs(prevHubs =>
          prevHubs.map((hub, i) =>
            i === hubIndex
              ? {
                  ...hub,
                  cycles: hub.cycles.map((cycle, j) =>
                    j === cycleIndex ? { ...cycle, rentedBy: user.email } : cycle
                  )
                }
              : hub
          )
        );
      })
      .catch(error => {
        toast.error("Error renting cycle.");
        console.error(error);
      });
  };

  const handleReturn = (hubIndex, cycleIndex) => {
    const cycleToReturn = hubs[hubIndex].cycles[cycleIndex];
    axios.put(`http://localhost:3000/api/rentals/${cycleToReturn.id}/return`)
      .then(() => {
        toast.success("Cycle returned successfully!");
        setActiveCycle(null);
        setHasActiveRental(false);
        setPaymentDone(false); // Reset payment flag

        setHubs(prevHubs =>
          prevHubs.map((hub, i) =>
            i === hubIndex
              ? {
                  ...hub,
                  cycles: hub.cycles.map((cycle, j) =>
                    j === cycleIndex ? { ...cycle, rentedBy: null } : cycle
                  )
                }
              : hub
          )
        );
      })
      .catch(error => {
        toast.error("Error returning cycle.");
        console.error(error);
      });
  };


  return (
    <div className="available-cycles">
      <h2>{status}</h2>
      {hubs.length > 0 ? (
        <div className="cycle-list">
          {hubs.map((hub, hubIndex) => (
            <div key={hubIndex} className="hub">
              <h3>{hub.hub}</h3>
              <ul>
                {hub.cycles.map((cycle, cycleIndex) => (
                  <li key={cycle.id} className="cycle-item">
                    <div>Cycle {cycle.id}</div>
                    <div>Status: {cycle.rentedBy ? `Rented by ${cycle.rentedBy}` : 'Available'}</div>
                    <div>Battery: {cycle.battery}</div>
                    {cycle.rentedBy === user?.email ? (
                      <button className="return-button" onClick={() => handleReturn(hubIndex, cycleIndex)}>Return</button>
                    ) : !cycle.rentedBy ? (
                      <button
                        className="rent-button"
                        onClick={() => handleRent(hubIndex, cycleIndex)}
                        disabled={hasActiveRental} // Disable rent button if already renting a cycle
                      >
                        Rent
                      </button>
                    ) : (
                      <button className="rented-button" disabled>Currently Unavailable</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!hasActiveRental && (
            <div className="payment-section">
             
            </div>
          )}
        </div>
      ) : (
        <p>No cycles available at the moment. Please try again later.</p>
      )}
    </div>
  );
};

export default AvailableCycles;
