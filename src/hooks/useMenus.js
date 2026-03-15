import { useState, useEffect } from 'react';
import { menuService } from '../services/api';

export function useServicesMenu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    menuService.getServices()
      .then((response) => {
        const data = response.data?.data ?? response.data ?? response ?? [];
        setServices(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.warn('Failed to fetch services:', err);
        setError(err);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}

export function useEmergencyMenu() {
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    menuService.getEmergencyServices()
      .then((response) => {
        const data = response.data?.data ?? response.data ?? response ?? [];
        setEmergencyServices(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.warn('Failed to fetch emergency services:', err);
        setError(err);
        setEmergencyServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { emergencyServices, loading, error };
}
