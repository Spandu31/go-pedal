import React, { useEffect, useState } from 'react';

const availableCities = {
  Mumbai: [
    { name: 'Gateway Hub', cycles: 8 },
    { name: 'Marine Lines Hub', cycles: 5 },
  ],
  Bangalore: [
    { name: 'MG Road Hub', cycles: 10 },
    { name: 'Indiranagar Hub', cycles: 7 },
  ],
};

const LocationChecker = () => {
  const [locationStatus, setLocationStatus] = useState('Detecting location...');
  const [userCity, setUserCity] = useState('');
  const [hubs, setHubs] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setLocationStatus('Geolocation is not supported by your browser.');
    }
  }, []);

  const successCallback = async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || 'Unknown';
      setUserCity(city);

      if (availableCities[city]) {
        setHubs(availableCities[city]);
        setLocationStatus(`Go Pedal is available in ${city}!`);
      } else {
        setLocationStatus(`Go Pedal is not yet available in ${city}.`);
      }
    } catch (error) {
      setLocationStatus('Failed to get location details.');
    }
  };

  const errorCallback = () => {
    setLocationStatus('Unable to retrieve your location.');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{locationStatus}</h2>
      {hubs.length > 0 && (
        <div>
          <h3>Nearest Hubs:</h3>
          <ul>
            {hubs.map((hub, index) => (
              <li key={index}>
                {hub.name} – {hub.cycles} cycles available
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationChecker;
