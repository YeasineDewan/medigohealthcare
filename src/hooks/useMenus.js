import { useState, useEffect } from 'react';
import { menuService, fallbackServices, fallbackEmergencyServices } from '../services/api';

export function useServicesMenu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuService.getServices()
      .then(({ data }) => {
        const servicesData = data.data || data || [];
        setServices(Array.isArray(servicesData) ? servicesData : fallbackServices);
      })
      .catch(() => setServices(fallbackServices))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}

export function useEmergencyMenu() {
  const [emergencyServices, setEmergencyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuService.getEmergencyServices()
      .then(({ data }) => {
        const emergencyData = data.data || data || [];
        setEmergencyServices(Array.isArray(emergencyData) ? emergencyData : fallbackEmergencyServices);
      })
      .catch(() => setEmergencyServices(fallbackEmergencyServices))
      .finally(() => setLoading(false));
  }, []);

  return { emergencyServices, loading };
}
