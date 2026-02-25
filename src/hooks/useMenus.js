import { useState, useEffect } from 'react';
import { menuService, fallbackServices, fallbackEmergencyServices } from '../services/api';

export function useServicesMenu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuService.getServices()
      .then(({ data }) => setServices(data.data || data || []))
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
      .then(({ data }) => setEmergencyServices(data.data || data || []))
      .catch(() => setEmergencyServices(fallbackEmergencyServices))
      .finally(() => setLoading(false));
  }, []);

  return { emergencyServices, loading };
}
