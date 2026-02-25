import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Heart, FileText, Camera, Save, X, Plus, Trash2, AlertCircle, Check, Edit2, Shield, Activity, Droplet, Syringe, Clock } from 'lucide-react';

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Backup for cancel functionality
  const [backupData, setBackupData] = useState({});

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Ahmed',
    lastName: 'Khan',
    email: 'ahmed.khan@email.com',
    phone: '+880 1712 345678',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: 'Dhaka, Bangladesh',
    emergencyContact: '+880 1712 987654',
    maritalStatus: 'Single',
    occupation: 'Software Engineer'
  });

  // Medical History State
  const [medicalHistory, setMedicalHistory] = useState({
    allergies: ['Penicillin', 'Dust'],
    chronicConditions: ['Hypertension'],
    pastSurgeries: ['Appendectomy - 2015'],
    currentMedications: ['Lisinopril 10mg', 'Vitamin D3'],
    familyHistory: ['Diabetes (Father)', 'Heart Disease (Mother)']
  });

  // Lifestyle Information State
  const [lifestyleInfo, setLifestyleInfo] = useState({
    smokingStatus: 'Non-smoker',
    alcoholConsumption: 'Occasional',
    exerciseFrequency: '3-4 times per week',
    diet: 'Balanced',
    sleepHours: '7-8 hours'
  });

  useEffect(() => {
    // Check for changes when editing
    if (isEditing) {
      const hasPersonalChanges = JSON.stringify(personalInfo) !== JSON.stringify(backupData.personalInfo);
      const hasMedicalChanges = JSON.stringify(medicalHistory) !== JSON.stringify(backupData.medicalHistory);
      const hasLifestyleChanges = JSON.stringify(lifestyleInfo) !== JSON.stringify(backupData.lifestyleInfo);
      
      setHasChanges(hasPersonalChanges || hasMedicalChanges || hasLifestyleChanges);
    }
  }, [personalInfo, medicalHistory, lifestyleInfo, isEditing, backupData]);

  const startEditing = () => {
    setBackupData({
      personalInfo: { ...personalInfo },
      medicalHistory: { ...medicalHistory },
      lifestyleInfo: { ...lifestyleInfo }
    });
    setIsEditing(true);
    setHasChanges(false);
  };

  const cancelEditing = () => {
    setPersonalInfo(backupData.personalInfo);
    setMedicalHistory(backupData.medicalHistory);
    setLifestyleInfo(backupData.lifestyleInfo);
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

  // const handleMedicalHistoryChange = (field, value) => {
  //   setMedicalHistory(prev => ({ ...prev, [field]: value }));
  // };

  const handleLifestyleChange = (field, value) => {
    setLifestyleInfo(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (category, item) => {
    if (category === 'allergies') {
      setMedicalHistory(prev => ({ ...prev, allergies: [...prev.allergies, item] }));
    } else if (category === 'medications') {
      setMedicalHistory(prev => ({ ...prev, currentMedications: [...prev.currentMedications, item] }));
    }
  };

  const removeArrayItem = (category, index) => {
    if (category === 'allergies') {
      setMedicalHistory(prev => ({ 
        ...prev, 
        allergies: prev.allergies.filter((_, i) => i !== index) 
      }));
    } else if (category === 'medications') {
      setMedicalHistory(prev => ({ 
        ...prev, 
        currentMedications: prev.currentMedications.filter((_, i) => i !== index) 
      }));
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-8">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
              <User className="w-16 h-16 text-white" />
            </div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-110">
                <Camera className="w-5 h-5 text-blue-600" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {personalInfo.firstName} {personalInfo.lastName}
              </h2>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
            <p className="text-gray-600 mb-4">Patient ID: PT-2024-001234</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Age: {new Date().getFullYear() - new Date(personalInfo.dateOfBirth).getFullYear()} years</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Droplet className="w-4 h-4" />
                <span>Blood: {personalInfo.bloodGroup}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Gender: {personalInfo.gender}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Details Form */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'First Name', field: 'firstName', type: 'text', required: true },
              { label: 'Last Name', field: 'lastName', type: 'text', required: true },
              { label: 'Email', field: 'email', type: 'email', required: true },
              { label: 'Phone', field: 'phone', type: 'tel', required: true },
              { label: 'Date of Birth', field: 'dateOfBirth', type: 'date', required: true },
            ].map(({ label, field, type, required }) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  value={personalInfo[field]}
                  onChange={(e) => handlePersonalInfoChange(field, e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isEditing 
                      ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                value={personalInfo.gender}
                onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isEditing 
                    ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }`}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <select
                value={personalInfo.bloodGroup}
                onChange={(e) => handlePersonalInfoChange('bloodGroup', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isEditing 
                    ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }`}
              >
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select
                value={personalInfo.maritalStatus}
                onChange={(e) => handlePersonalInfoChange('maritalStatus', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isEditing 
                    ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }`}
              >
                <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Occupation</label>
              <input
                type="text"
                value={personalInfo.occupation}
                onChange={(e) => handlePersonalInfoChange('occupation', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isEditing 
                    ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                type="tel"
                value={personalInfo.emergencyContact}
                onChange={(e) => handlePersonalInfoChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isEditing 
                    ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }`}
              />
            </div>

            <div className="lg:col-span-3 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={personalInfo.address}
                onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                disabled={!isEditing}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isEditing 
                    ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6">
      {/* Allergies */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-red-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Allergies
            <span className="ml-auto text-sm text-gray-500">Critical Information</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {medicalHistory.allergies.map((allergy, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100 group hover:bg-red-100 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-medium">{allergy}</span>
                </div>
                {isEditing && (
                  <button
                    onClick={() => removeArrayItem('allergies', index)}
                    className="p-2 text-red-500 hover:bg-red-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
              <input
                type="text"
                placeholder="Add new allergy"
                className="flex-1 px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    addArrayItem('allergies', e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Add new allergy"]');
                  if (input && input.value.trim()) {
                    addArrayItem('allergies', input.value.trim());
                    input.value = '';
                  }
                }}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Syringe className="w-5 h-5 text-blue-600" />
            Current Medications
            <span className="ml-auto text-sm text-gray-500">Active Treatment</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {medicalHistory.currentMedications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 group hover:bg-blue-100 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700 font-medium">{medication}</span>
                </div>
                {isEditing && (
                  <button
                    onClick={() => removeArrayItem('medications', index)}
                    className="p-2 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <input
                type="text"
                placeholder="Add new medication"
                className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    addArrayItem('medications', e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Add new medication"]');
                  if (input && input.value.trim()) {
                    addArrayItem('medications', input.value.trim());
                    input.value = '';
                  }
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chronic Conditions */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-yellow-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-yellow-600" />
            Chronic Conditions
            <span className="ml-auto text-sm text-gray-500">Long-term Health</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {medicalHistory.chronicConditions.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100 group hover:bg-yellow-100 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-700 font-medium">{condition}</span>
                </div>
                {isEditing && (
                  <button
                    onClick={() => removeArrayItem('conditions', index)}
                    className="p-2 text-yellow-600 hover:bg-yellow-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <input
                type="text"
                placeholder="Add chronic condition"
                className="flex-1 px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    addArrayItem('conditions', e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Add chronic condition"]');
                  if (input && input.value.trim()) {
                    addArrayItem('conditions', input.value.trim());
                    input.value = '';
                  }
                }}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Past Surgeries */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Past Surgeries
            <span className="ml-auto text-sm text-gray-500">Medical History</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {medicalHistory.pastSurgeries.map((surgery, index) => (
              <div key={index} className="p-4 bg-purple-50 rounded-xl border border-purple-100 hover:bg-purple-100 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-700 font-medium">{surgery}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Family History */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            Family History
            <span className="ml-auto text-sm text-gray-500">Genetic Factors</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {medicalHistory.familyHistory.map((history, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">{history}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLifestyle = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-teal-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            Lifestyle Information
            <span className="ml-auto text-sm text-gray-500">Daily Habits</span>
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Smoking Status', field: 'smokingStatus', options: ['Non-smoker', 'Former smoker', 'Current smoker'], icon: '🚭' },
              { label: 'Alcohol Consumption', field: 'alcoholConsumption', options: ['None', 'Occasional', 'Regular'], icon: '🍷' },
              { label: 'Exercise Frequency', field: 'exerciseFrequency', options: ['Rarely', '1-2 times per week', '3-4 times per week', 'Daily'], icon: '🏃' },
              { label: 'Diet', field: 'diet', options: ['Balanced', 'Vegetarian', 'Vegan', 'Keto', 'Low-carb'], icon: '🥗' },
              { label: 'Sleep Hours', field: 'sleepHours', options: ['Less than 6 hours', '6-7 hours', '7-8 hours', 'More than 8 hours'], icon: '😴' },
              { label: 'Stress Level', field: 'stressLevel', options: ['Low', 'Moderate', 'High'], icon: '🧘' }
            ].map(({ label, field, options, icon }) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  {label}
                </label>
                <select
                  value={lifestyleInfo[field]}
                  onChange={(e) => handleLifestyleChange(field, e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    isEditing 
                      ? 'border-teal-300 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm' 
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Professional Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Medical Profile</h1>
                <p className="text-gray-600 mt-1">Complete health information and medical history</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Patient ID: PT-2024-001234
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
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl' 
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
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
              { id: 'personal', label: 'Personal Info', icon: User, color: 'blue' },
              { id: 'medical', label: 'Medical History', icon: Heart, color: 'red' },
              { id: 'lifestyle', label: 'Lifestyle', icon: Activity, color: 'green' }
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
            {activeTab === 'medical' && renderMedicalHistory()}
            {activeTab === 'lifestyle' && renderLifestyle()}
          </div>
        </div>
      </div>
    </div>
  );
}
