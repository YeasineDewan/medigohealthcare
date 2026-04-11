import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Stethoscope, Camera, Save, X, Plus, Trash2, Award, 
  Clock, DollarSign, Languages, Check, Edit2, Shield, Activity, FileText, Download,
  Upload, Building, GraduationCap, Briefcase, Star, Calendar, Globe, Heart, Loader2
} from 'lucide-react';
import { doctorService } from '../../services/api';
import { Toaster, toast } from 'sonner'; // Assume sonner for toasts

export default function DoctorProfilePro() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({});
  const fileInputRef = useRef(null);
  const currentDoctorId = 1; // From auth context

  const loadProfile = async () => {
    try {
      const res = await doctorService.getById(currentDoctorId);
      setProfile(res.data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (key === 'personal') formData.append('personal', JSON.stringify(profile.personal));
        else if (typeof profile[key] === 'object') formData.append(key, JSON.stringify(profile[key]));
        else formData.append(key, profile[key]);
      });

      await doctorService.updateProfile(currentDoctorId, formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'professional', label: 'Professional', icon: Stethoscope },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-8 border border-white/50">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                  <User className="w-12 h-12 text-white" />
                </div>
                {isEditing && (
                  <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-full shadow-lg hover:bg-emerald-600 transition-all">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
                  Doctor Profile
                </h1>
                <p className="text-xl text-slate-600 mt-1">Professional management system</p>
              </div>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <motion.button whileHover={{ scale: 0.98 }} onClick={() => setIsEditing(false)} className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
                    Cancel
                  </motion.button>
                  <motion.button whileHover={{ scale: 0.98 }} onClick={handleSave} disabled={saving} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Save Profile'}
                  </motion.button>
                </>
              ) : (
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => setIsEditing(true)} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all">
                  <Edit2 className="w-5 h-5 inline mr-2" />
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-1 mb-8">
          <nav className="flex gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all flex-1 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                {label}
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          >
            <div className="p-8">
              {/* Dynamic content based on tab */}
              {activeTab === 'personal' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                          <div className="flex gap-3">
                            <input type="text" placeholder="First Name" className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
                            <input type="text" placeholder="Last Name" className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Email & Phone</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Address</label>
                          <textarea rows="3" placeholder="Full address" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-vertical" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Profile Photo</h3>
                      <div className="space-y-6">
                        <div className="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center hover:border-emerald-400 transition-colors cursor-pointer group">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4 group-hover:text-emerald-500 transition-colors" />
                          <p className="font-semibold text-slate-700 mb-2">Upload Profile Photo</p>
                          <p className="text-sm text-slate-500">JPG, PNG up to 2MB</p>
                          <input ref={fileInputRef} type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Date of Birth</label>
                          <input type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}

