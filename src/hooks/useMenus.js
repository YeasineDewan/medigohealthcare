import { useState, useEffect } from 'react';
import { menuService, fallbackServices, fallbackEmergencyServices } from '../services/api';

export function useServicesMenu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuService.getServices()
      .then((response) => {
        // Handle different response formats
        const data = response.data || response || [];
        const services = Array.isArray(data) ? data : [];
        setServices(services);
      })
      .catch((error) => {
        console.warn('Failed to fetch services:', error);
        setServices(fallbackServices);
      })
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}

export function useEmergencyMenu() {
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuService.getEmergencyServices()
      .then((response) => {
        // Handle different response formats
        const data = response.data || response || [];
        const services = Array.isArray(data) ? data : [];
        setEmergencyServices(services);
      })
      .catch((error) => {
        console.warn('Failed to fetch emergency services:', error);
        setEmergencyServices(fallbackEmergencyServices);
      })
      .finally(() => setLoading(false));
  }, []);

  return { emergencyServices, loading };
}
