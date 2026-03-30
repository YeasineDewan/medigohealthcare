import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../components/core/Button';
import DoctorCard from '../components/features/DoctorCard';

const features = [
  { icon: Video, title: 'HD Video', desc: 'Crystal clear consultation' },
  { icon: Shield, title: 'Secure', desc: 'Encrypted & private' },
  { icon: Clock, title: '24/7', desc: 'Book anytime' },
];

const availableDoctors = [
  { id: 1, name: 'Dr. Ahmed Hassan', specialty: 'Cardiology', rating: 4.9, reviewCount: 234, available: true },
  { id: 2, name: 'Dr. Fatima Khan', specialty: 'Pediatrics', rating: 4.8, reviewCount: 189, available: true },
  { id: 3, name: 'Dr. Rahman Ali', specialty: 'General Medicine', rating: 4.7, reviewCount: 312, available: true },
];

export default function Consult() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5DBB63]/20 flex items-center justify-center">
              <Video className="w-7 h-7 text-[#165028]" />
            </div>
            <h1 className="text-4xl font-bold text-[#165028]">Video Consultation</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Consult doctors online from the comfort of your home. Secure, convenient, and available 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((f, i) => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 bg-white text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#f0fdf2] flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-[#5DBB63]" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#165028] mb-6">Available for Video Call</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {availableDoctors.map((doc) => (
                <div key={doc.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white">
                  <div className="w-20 h-20 rounded-xl bg-[#f0fdf2] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#165028]">{doc.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111827]">{doc.name}</h3>
                    <p className="text-sm text-[#5DBB63]">{doc.specialty}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <span>★ {doc.rating}</span>
                      <span>({doc.reviewCount} reviews)</span>
                    </div>
                    <Button size="sm" className="mt-3">Book Video Call</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sticky top-24">
              <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#5DBB63]" />
                How it works
              </h3>
              <ol className="space-y-4">
                {['Choose a doctor', 'Select date & time', 'Join the video call'].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#5DBB63] text-white text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-[#165028]">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Prescription delivered digitally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
