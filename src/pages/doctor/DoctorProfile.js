import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Stethoscope, Camera, Save, X, Plus, Trash2, Award, Clock, DollarSign, Languages, Check, Edit2, Shield, Activity } from 'lucide-react';

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Backup for cancel functionality
  const [backupData, setBackupData] = useState({});

  const [personalInfo, setPersonalInfo] = useState({
    title: 'Dr.',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@medigo.com',
    phone: '+880 1712 345678',
    dateOfBirth: '1985-03-22',
    gender: 'Male',
    address: 'Dhaka, Bangladesh',
    emergencyContact: '+880 1712 987654',
    maritalStatus: 'Married'
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    specialization: 'Cardiology',
    qualifications: ['MBBS', 'FCPS (Cardiology)', 'MRCP (UK)'],
    experience: '12 years',
    currentHospital: 'Square Hospital, Dhaka',
    consultationFee: '1500',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    availableTime: '10:00 AM - 6:00 PM',
    languages: ['English', 'Bengali', 'Hindi'],
    medicalLicense: 'BMDC-12345'
  });

  const [expertiseInfo, setExpertiseInfo] = useState({
    areasOfExpertise: ['Interventional Cardiology', 'Echocardiography'],
    servicesOffered: ['Heart Check-up', 'ECG', 'Echocardiogram'],
    awards: ['Best Cardiologist Award 2022']
  });

  useEffect(() => {
    if (isEditing) {
      setHasChanges(true);
    }
  }, [personalInfo, professionalInfo, expertiseInfo, isEditing]);

  const startEditing = () => {
    setBackupData({
      personalInfo: { ...personalInfo },
      professionalInfo: { ...professionalInfo },
      expertiseInfo: { ...expertiseInfo }
    });
    setIsEditing(true);
    setHasChanges(false);
  };

  const cancelEditing = () => {
    setPersonalInfo(backupData.personalInfo);
    setProfessionalInfo(backupData.professionalInfo);
    setExpertiseInfo(backupData.expertiseInfo);
    setIsEditing(false);
    setHasChanges(false);
  };

  const saveChanges = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('');
        setIsEditing(false);
        setHasChanges(false);
      }, 1500);
    }, 1000);
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleProfessionalInfoChange = (field, value) => {
    setProfessionalInfo(prev => ({ ...prev, [field]: value }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl bg-[#f0fdf2] flex items-center justify-center">
            <Stethoscope className="w-16 h-16 text-[#5DBB63]" />
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 p-2 bg-[#165028] text-white rounded-full hover:bg-[#0f3d1c]">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">
            {personalInfo.title} {personalInfo.firstName} {personalInfo.lastName}
          </h2>
          <p className="text-[#5DBB63] font-medium">{professionalInfo.specialization}</p>
          <p className="text-sm text-gray-500 mt-1">
            {professionalInfo.qualifications.join(', ')}
          </p>
          <p className="text-gray-500 mt-2">Doctor ID: DR-2024-005678</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <select
            value={personalInfo.title}
            onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          >
            <option>Dr.</option>
            <option>Prof.</option>
            <option>Assoc. Prof.</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
          <input
            type="tel"
            value={personalInfo.emergencyContact}
            onChange={(e) => handlePersonalInfoChange('emergencyContact', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={personalInfo.address}
            onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
            disabled={!isEditing}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
          <input
            type="text"
            value={professionalInfo.specialization}
            onChange={(e) => handleProfessionalInfoChange('specialization', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
          <input
            type="text"
            value={professionalInfo.experience}
            onChange={(e) => handleProfessionalInfoChange('experience', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Hospital</label>
          <input
            type="text"
            value={professionalInfo.currentHospital}
            onChange={(e) => handleProfessionalInfoChange('currentHospital', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (BDT)</label>
          <input
            type="text"
            value={professionalInfo.consultationFee}
            onChange={(e) => handleProfessionalInfoChange('consultationFee', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Time</label>
          <input
            type="text"
            value={professionalInfo.availableTime}
            onChange={(e) => handleProfessionalInfoChange('availableTime', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Medical License</label>
          <input
            type="text"
            value={professionalInfo.medicalLicense}
            onChange={(e) => handleProfessionalInfoChange('medicalLicense', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-500" />
          Qualifications
        </h3>
        <div className="space-y-3">
          {professionalInfo.qualifications.map((qualification, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700">{qualification}</span>
              {isEditing && (
                <button
                  onClick={() => {
                    setProfessionalInfo(prev => ({
                      ...prev,
                      qualifications: prev.qualifications.filter((_, i) => i !== index)
                    }));
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new qualification"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setProfessionalInfo(prev => ({
                      ...prev,
                      qualifications: [...prev.qualifications, e.target.value.trim()]
                    }));
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Add new qualification"]');
                  if (input && input.value.trim()) {
                    setProfessionalInfo(prev => ({
                      ...prev,
                      qualifications: [...prev.qualifications, input.value.trim()]
                    }));
                    input.value = '';
                  }
                }}
                className="px-3 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9f52]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Languages className="w-5 h-5 text-green-500" />
          Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {professionalInfo.languages.map((language, index) => (
            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExpertise = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-[#111827] mb-4">Areas of Expertise</h3>
        <div className="space-y-3">
          {expertiseInfo.areasOfExpertise.map((expertise, index) => (
            <div key={index} className="p-3 bg-purple-50 rounded-lg">
              <span className="text-purple-700">{expertise}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#5DBB63]" />
          Services Offered
        </h3>
        <div className="space-y-3">
          {expertiseInfo.servicesOffered.map((service, index) => (
            <div key={index} className="p-3 bg-[#f0fdf2] rounded-lg">
              <span className="text-[#5DBB63]">{service}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Awards & Recognition
        </h3>
        <div className="space-y-3">
          {expertiseInfo.awards.map((award, index) => (
            <div key={index} className="p-3 bg-yellow-50 rounded-lg">
              <span className="text-yellow-700">{award}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Professional Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Professional Profile</h1>
                <p className="text-gray-600 mt-1">Complete professional and medical information</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Doctor ID: DR-2024-005678
                  </span>
                  <span>•</span>
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {saveStatus === 'saving' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Clock className="w-4 h-4 animate-spin" />
                  Saving...
                </div>
              )}
              {saveStatus === 'saved' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <Check className="w-4 h-4" />
                  Saved Successfully
                </div>
              )}
              
              {isEditing ? (
                <>
                  <button
                    onClick={cancelEditing}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={saveChanges}
                    disabled={!hasChanges}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                      hasChanges 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={startEditing}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Professional Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2 mb-6">
          <nav className="flex space-x-2">
            {[
              { id: 'personal', label: 'Personal Info', icon: User, color: 'purple' },
              { id: 'professional', label: 'Professional Info', icon: Award, color: 'blue' },
              { id: 'expertise', label: 'Expertise & Services', icon: Activity, color: 'green' }
            ].map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === id
                    ? `bg-gradient-to-r from-${color}-600 to-${color}-700 text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
          <div className="p-8">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'professional' && renderProfessionalInfo()}
            {activeTab === 'expertise' && renderExpertise()}
          </div>
        </div>
      </div>
    </div>
  );
}
