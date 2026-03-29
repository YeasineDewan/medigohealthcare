/**
 * Fallback services menu for header dropdown - styled like EmergencyMenu
 * Uses public routes where possible, admin for management
 * bg_color_hex matches EmergencyMenu red theme but green for services
 * Matches api/menus/services.php structure
 */

export const defaultServicesMenu = [
  {
    id: 1,
    title: 'Specialist Doctor',
    slug: 'specialist-doctor',
    route_url: '/doctors',
    description: 'Book appointments with speci...',
    icon: 'stethoscope',
    bg_color_hex: '#f8fafc',
  },
  {
    id: 2,
    title: 'Video Consultation',
    slug: 'video-consultation',
    route_url: '/consult',
    description: 'Online video calls with doctors',
    icon: 'video',
    bg_color_hex: '#f8fafc',
  },
  {
    id: 3,
    title: 'Pharmacy',
    slug: 'pharmacy',
    route_url: '/pharmacy',
    description: 'Order medicines online',
    icon: 'pill',
    bg_color_hex: '#f8fafc',
  },
  {
    id: 4,
    title: 'Lab Tests',
    slug: 'lab-tests',
    route_url: '/lab-tests',
    description: 'Home collection & reports',
    icon: 'flask',
    bg_color_hex: '#f8fafc',
  },
  {
    id: 5,
    title: 'Health Records',
    slug: 'health-records',
    route_url: '/records',
    description: 'Your medical history',
    icon: 'folder',
    bg_color_hex: '#f8fafc',
  },
];
