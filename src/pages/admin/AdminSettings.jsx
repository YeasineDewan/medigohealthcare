import { useState } from 'react';
import { Save, Globe, Bell, Shield } from 'lucide-react';

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('Medigo Healthcare');
  const [supportEmail, setSupportEmail] = useState('support@medigo.com');

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Settings</h1>
        <p className="text-gray-500 mt-1">Platform configuration</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#5DBB63]" />
            General
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#5DBB63]" />
            Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email notifications</span>
              <input type="checkbox" defaultChecked className="rounded text-[#5DBB63]" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">New appointment alerts</span>
              <input type="checkbox" defaultChecked className="rounded text-[#5DBB63]" />
            </label>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#5DBB63]" />
            Security
          </h2>
          <p className="text-gray-600 text-sm">Two-factor authentication and session management.</p>
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#165028] text-white font-medium hover:bg-[#0f3d1c]">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
