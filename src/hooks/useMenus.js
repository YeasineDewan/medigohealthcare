import { useState, useEffect } from 'react';
import { menuService } from '../services/api';
import { defaultServicesMenu } from '../data/defaultServicesMenu';

function extractArray(maybeResponse) {
  // Axios responses can vary; normalize a few common nesting patterns.
  const data = maybeResponse ?? null;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  // PHP api/index.php: { data: { data: [...], count } } inside axios response.data
  if (Array.isArray(data?.data?.data)) return data.data.data;
  if (Array.isArray(data?.services)) return data.services;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function normalizeServiceMenuItem(item) {
  const id = item?.id ?? item?.service_id ?? item?.slug ?? item?.path ?? item?.route_url ?? item?.label ?? item?.title;
  const route_url =
    item?.route_url ??
    item?.route ??
    item?.path ??
    item?.url;

  return {
    id,
    title: item?.title ?? item?.label ?? item?.name ?? '',
    description: item?.description ?? item?.desc ?? item?.subtitle ?? '',
    slug: item?.slug,
    route_url,
    icon: item?.icon ?? item?.icon_name ?? item?.iconName ?? '',
    bg_color_hex: item?.bg_color_hex ?? '#f0fdf4',
  };
}

export function useServicesMenu() {
  const [services, setServices] = useState(defaultServicesMenu);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    // Try to fetch from API but always have fallback ready
    menuService.getServices()
      .then((response) => {
        const raw = response?.data ?? response;
        const data = extractArray(raw);
        const mapped = data.map(normalizeServiceMenuItem).filter((s) => s.title);
        const apiServices = mapped.filter(s => s.title);
        console.log('API services loaded:', apiServices.length, apiServices.slice(0,2));
        // Only use API services if we have valid data
        if (apiServices.length > 0) {
          setServices(apiServices);
        } else {
          console.log('API returned empty, using default services');
          setServices(defaultServicesMenu);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch services, using default:', err);
        console.log('Fallback services count:', defaultServicesMenu.length);
        setError(err.message || 'API unavailable - using fallback');
        // Always ensure we have the default services
        setServices(defaultServicesMenu);
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
        const raw = response?.data ?? response;
        const data = extractArray(raw);
        setEmergencyServices(data);
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
