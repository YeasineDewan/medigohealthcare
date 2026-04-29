import { useState } from 'react';
import { Stethoscope, Video, Pill, FlaskConical, FolderOpen, Plus } from 'lucide-react';

const iconMap = { Stethoscope, Video, Pill, FlaskConical, FolderOpen };

const mockServices = [
  { id: 1, title: 'Specialist Doctor', slug: 'specialist-doctor', icon: 'Stethoscope', route: '/doctors', active: true },
  { id: 2, title: 'Video Consultation', slug: 'video-consultation', icon: 'Video', route: '/consult', active: true },
  { id: 3, title: 'Pharmacy', slug: 'pharmacy', icon: 'Pill', route: '/pharmacy', active: true },
  { id: 4, title: 'Lab Tests', slug: 'lab-tests', icon: 'FlaskConical', route: '/lab-tests', active: true },
  { id: 5, title: 'Health Records', slug: 'health-records', icon: 'FolderOpen', route: '/records', active: true },
];

export default function AdminServices() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Services Menu</h1>
          <p className="text-gray-500 mt-1">Manage main navigation services</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#165028] text-white font-medium">
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockServices.map((s) => {
          const Icon = iconMap[s.icon] || FolderOpen;
          return (
            <div
              key={s.id}
              className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#5DBB63]/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#5DBB63]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#111827]">{s.title}</p>
                    <p className="text-sm text-gray-500">{s.route}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    s.active ? 'bg-[#f0fdf2] text-[#165028]' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {s.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
