import { useState, useEffect } from 'react';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lon: longitude });
      setLoading(false);
    };

    const error = () => {
      setError('Unable to retrieve your location');
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { location, error, loading };
};
