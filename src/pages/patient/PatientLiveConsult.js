import { useState } from 'react';
import { Video, Mic, MicOff, PhoneOff, Stethoscope } from 'lucide-react';

const availableDoctors = [
  { id: 1, name: 'Dr. Ahmed Hassan', specialty: 'Cardiology', available: true },
  { id: 2, name: 'Dr. Fatima Khan', specialty: 'Pediatrics', available: true },
  { id: 3, name: 'Dr. Rahman Ali', specialty: 'General Medicine', available: false },
];

export default function PatientLiveConsult() {
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">24/7 Live Consultation</h1>
        <p className="text-gray-500 mt-1">Connect with a doctor instantly, any time of day</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 aspect-video relative">
            {inCall ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 rounded-full bg-[#5DBB63]/30 flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-12 h-12" />
                  </div>
                  <p className="font-semibold">Connected with Dr. Ahmed Hassan</p>
                  <p className="text-sm text-white/70 mt-1">Cardiology · Video call in progress</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Video className="w-20 h-20 mx-auto mb-4 text-[#5DBB63]" />
                  <p className="font-semibold text-lg">Start a Live Consultation</p>
                  <p className="text-sm text-white/70 mt-1 mb-6">Available 24/7. Connect with a doctor in minutes.</p>
                  <button
                    onClick={() => setInCall(true)}
                    className="px-8 py-3 rounded-xl bg-[#5DBB63] text-white font-semibold hover:bg-[#4a9a4f] flex items-center gap-2 mx-auto"
                  >
                    <Video className="w-5 h-5" />
                    Connect Now
                  </button>
                </div>
              </div>
            )}
            {inCall && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-xl bg-black/50">
                <button
                  onClick={() => setMuted(!muted)}
                  className={`p-3 rounded-lg ${muted ? 'bg-red-500' : 'bg-white/20'} text-white`}
                >
                  {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button onClick={() => setInCall(false)} className="p-3 rounded-lg bg-red-500 text-white">
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <div className="mt-4 p-4 rounded-xl bg-[#f0fdf2] border border-[#5DBB63]/20">
            <p className="text-sm text-[#165028] font-medium">✓ 24/7 availability · ✓ HD video · ✓ Digital prescription</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-[#111827] mb-4">Doctors Online Now</h3>
          <div className="space-y-3">
            {availableDoctors.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f0fdf2] flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-[#5DBB63]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#111827]">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.specialty}</p>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-[#5DBB63]' : 'bg-gray-400'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
