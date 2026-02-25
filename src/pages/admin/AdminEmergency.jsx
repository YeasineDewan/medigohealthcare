import { useState } from 'react';
import { Ambulance, PhoneCall, Droplet } from 'lucide-react';

const mockEmergency = [
  { id: 1, title: 'Ambulance Request', description: 'Live Tracking', icon: Ambulance, active: true },
  { id: 2, title: 'Emergency Doctor', description: '24/7 Available', icon: PhoneCall, active: true },
  { id: 3, title: 'Blood Bank', description: 'Find Donors', icon: Droplet, active: true },
];

export default function AdminEmergency() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Emergency Services</h1>
        <p className="text-gray-500 mt-1">Manage emergency menu options</p>
      </div>

      <div className="p-6 rounded-2xl bg-red-50/50 border border-red-100">
        <p className="text-sm text-red-700 font-medium mb-4">Emergency Helpline: 999</p>
        <p className="text-gray-600 text-sm">Configure emergency contact and ambulance dispatch settings.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEmergency.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-red-200 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <s.icon className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-[#111827]">{s.title}</p>
                <p className="text-sm text-red-600">{s.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
