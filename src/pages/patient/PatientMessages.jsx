import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Stethoscope, Clock } from 'lucide-react';

const threads = [
  { id: 1, from: 'Dr. Ahmed Hassan', preview: 'Your recent CBC results look normal. We can discuss in the next visit.', time: '2 hours ago', unread: true },
  { id: 2, from: 'Medigo Support', preview: 'Your appointment on Mar 10 is confirmed.', time: '1 day ago', unread: false },
  { id: 3, from: 'Pharmacy', preview: 'Order #ORD-1002 has been shipped.', time: '2 days ago', unread: false },
];

export default function PatientMessages() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Messages</h1>
        <p className="text-gray-500 mt-1">Chat with your doctors and support</p>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="md:col-span-1">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 transition-colors ${
                  selected === t.id ? 'bg-[#f0fdf2] border-l-4 border-[#5DBB63]' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#165028] flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#111827] truncate">{t.from}</p>
                  <p className="text-sm text-gray-500 truncate">{t.preview}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {t.time}
                  </p>
                </div>
                {t.unread && <span className="w-2 h-2 rounded-full bg-[#5DBB63] flex-shrink-0 mt-2" />}
              </button>
            ))}
          </div>
          <div className="md:col-span-2 flex flex-col min-h-[320px]">
            {selected ? (
              <>
                <div className="p-4 border-b border-gray-100 flex-1 overflow-y-auto">
                  <p className="text-sm text-gray-600">
                    {threads.find((t) => t.id === selected)?.preview}
                  </p>
                  <p className="text-xs text-gray-400 mt-4">Reply from the doctor will appear here. For urgent matters, please call or book a consultation.</p>
                </div>
                <div className="p-4 border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                  <button className="p-2 rounded-xl bg-[#5DBB63] text-white hover:bg-[#4CAF50]">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select a conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
