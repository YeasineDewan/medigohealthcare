import { useMemo, useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Calendar, Pill, Package, Filter } from 'lucide-react';

const seedNotifications = [
  { id: 1, type: 'appointment', title: 'Appointment Reminder', message: 'Your consultation with Dr. Fatima Rahman is tomorrow at 10:00 AM.', time: '5 min ago', read: false },
  { id: 2, type: 'medication', title: 'Medication Reminder', message: 'Time to take your Metformin 500mg dose.', time: '1 hour ago', read: false },
  { id: 3, type: 'order', title: 'Order Delivered', message: 'Your pharmacy order #1052 has been delivered.', time: '3 hours ago', read: true },
  { id: 4, type: 'appointment', title: 'Appointment Confirmed', message: 'Your follow-up appointment has been confirmed.', time: 'Yesterday', read: true },
];

const typeMeta = {
  appointment: { icon: Calendar, color: 'text-blue-600 bg-blue-100' },
  medication: { icon: Pill, color: 'text-amber-600 bg-amber-100' },
  order: { icon: Package, color: 'text-green-600 bg-green-100' },
  default: { icon: AlertCircle, color: 'text-gray-600 bg-gray-100' },
};

export default function PatientNotifications() {
  const [notifications, setNotifications] = useState(seedNotifications);
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === filter);
  }, [notifications, filter]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with appointments, medications, and orders.</p>
        </div>
        <button
          onClick={markAllRead}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5DBB63] text-white hover:bg-[#4a9a4f]"
        >
          <CheckCircle className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="font-medium">Unread: {unreadCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="appointment">Appointments</option>
            <option value="medication">Medication</option>
            <option value="order">Orders</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const meta = typeMeta[item.type] || typeMeta.default;
          const Icon = meta.icon;
          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 ${item.read ? 'bg-white border-gray-200' : 'bg-[#5DBB63]/5 border-[#5DBB63]/30'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${meta.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
