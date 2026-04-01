import { useState, useEffect } from 'react';
import { adminService } from '../services/api.js';

const FALLBACK_STATS = {
  totalPatients: 2847,
  totalDoctors: 156,
  todayAppointments: 42,
  monthlyRevenue: 125430,
  totalOrders: 892,
  totalProducts: 1247,
  pendingReports: 18,
  totalNotices: 12,
  totalBanners: 8,
  labTests: 156,
  emergencyCases: 7,
  activeCampaigns: 3,
  totalEmployees: 89,
  inventoryValue: 284750,
  satisfactionRate: 94.5,
  bedOccupancy: 78.3,
  avgWaitTime: 12,
  systemUptime: 99.9
};

const FALLBACK_ACTIVITY = [
  {
    id: 1,
    user: 'Dr. Sarah Johnson',
    action: 'Completed patient consultation',
    time: '2 minutes ago',
    type: 'appointment',
    status: 'completed',
    department: 'Cardiology',
    priority: 'normal'
  },
  // ... (rest of fallback data from original)
];

const FALLBACK_APPOINTMENTS = [
  { id: 1, patient: 'Alice Johnson', doctor: 'Dr. Smith', time: '09:00 AM', type: 'Consultation', department: 'Cardiology' },
  // ... (rest)
];

export const useAdminData = () => {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [recentActivity, setRecentActivity] = useState(FALLBACK_ACTIVITY);
  const [upcomingAppointments, setUpcomingAppointments] = useState(FALLBACK_APPOINTMENTS);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Parallel fetches
      const [statsRes, activityRes, appointmentsRes, deptRes] = await Promise.all([
        adminService.getStats().catch(() => ({ data: { data: FALLBACK_STATS } })),
        adminService.getRecentActivity().catch(() => ({ data: { data: FALLBACK_ACTIVITY } })),
        adminService.getUpcomingAppointments().catch(() => ({ data: { data: FALLBACK_APPOINTMENTS } })),
        adminService.getDepartmentStats().catch(() => ({ data: { data: [] } }))
      ]);

      setStats(statsRes.data.data || FALLBACK_STATS);
      setRecentActivity(statsRes.data.data || FALLBACK_ACTIVITY);
      setUpcomingAppointments(appointmentsRes.data.data || FALLBACK_APPOINTMENTS);
      setDepartmentStats(deptRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setError('Failed to load dashboard data. Showing fallback data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    recentActivity,
    upcomingAppointments,
    departmentStats,
    loading,
    error,
    refetch: fetchData
  };
};

