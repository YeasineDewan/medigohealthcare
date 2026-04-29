import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Inbox, Star, Trash2, Search, Plus, Paperclip, Eye, Edit } from 'lucide-react';

const mockEmails = [
  { id: 1, from: 'patient@example.com', subject: 'Appointment Confirmation', preview: 'Thank you for confirming my appointment...', date: '2024-01-15', read: false, starred: true },
  { id: 2, from: 'doctor@medigo.com', subject: 'Lab Results Ready', preview: 'The lab results for patient #1234 are now...', date: '2024-01-15', read: true, starred: false },
  { id: 3, from: 'admin@medigo.com', subject: 'Monthly Report', preview: 'Please find attached the monthly performance...', date: '2024-01-14', read: true, starred: false },
  { id: 4, from: 'supplier@pharma.com', subject: 'Medicine Stock Update', preview: 'Your order #5678 has been dispatched...', date: '2024-01-14', read: false, starred: false },
];

export default function EmailManagement() {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [view, setView] = useState('inbox');
  const [search, setSearch] = useState('');
  const [showCompose, setShowCompose] = useState(false);

  const filteredEmails = emails.filter(email => {
    if (view === 'starred' && !email.starred) return false;
    if (view === 'sent') return false; // Would filter sent emails
    if (search && !email.subject.toLowerCase().includes(search.toLowerCase()) &&
        !email.from.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const unreadCount = emails.filter(e => !e.read).length;

  const toggleStar = (id) => {
    setEmails(emails.map(e => e.id === id ? { ...e, starred: !e.starred } : e));
  };

  const markAsRead = (id) => {
    setEmails(emails.map(e => e.id === id ? { ...e, read: true } : e));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Management</h2>
          <p className="text-gray-500 mt-1">{unreadCount} unread messages</p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Compose
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="space-y-2">
              {[
                { id: 'inbox', label: 'Inbox', icon: Inbox, count: unreadCount },
                { id: 'starred', label: 'Starred', icon: Star, count: emails.filter(e => e.starred).length },
                { id: 'sent', label: 'Sent', icon: Send, count: 0 },
                { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    view === item.id
                      ? 'bg-[#5DBB63] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      view === item.id ? 'bg-white text-[#5DBB63]' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredEmails.map((email) => (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !email.read ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => {
                    setSelectedEmail(email);
                    markAsRead(email.id);
                  }}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className="mt-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          email.starred ? 'fill-amber-400 text-amber-400' : 'text-gray-400'
                        }`}
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-medium text-gray-900 ${!email.read ? 'font-bold' : ''}`}>
                          {email.from}
                        </span>
                        <span className="text-sm text-gray-500">{email.date}</span>
                      </div>
                      <h3 className={`text-gray-900 mb-1 ${!email.read ? 'font-semibold' : ''}`}>
                        {email.subject}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">{email.preview}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">New Message</h3>
              <button
                onClick={() => setShowCompose(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input
                  type="email"
                  placeholder="recipient@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Email subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows="8"
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent resize-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  Attach File
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCompose(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
