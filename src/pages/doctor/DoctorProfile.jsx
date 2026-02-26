import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Mail, Phone, MapPin, Stethoscope, Camera, Save, X, Plus, Trash2, Award, Clock, DollarSign, Languages, Check, Edit2, Shield, Activity, AlertCircle, Upload, FileText, Calendar, Star, TrendingUp, Eye, EyeOff, Lock, Unlock, Zap, Target, ChevronRight, Info } from 'lucide-react';

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const autoSaveTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

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
    maritalStatus: 'Married',
    bio: 'Experienced cardiologist dedicated to providing comprehensive cardiovascular care with a patient-centered approach.',
    website: 'https://drahmedhassan.com',
    linkedin: 'https://linkedin.com/in/drahmedhassan'
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
    medicalLicense: 'BMDC-12345',
    department: 'Cardiology Department',
    designation: 'Senior Consultant Cardiologist',
    npiNumber: '1234567890',
    deaNumber: 'AB1234567'
  });

  const [expertiseInfo, setExpertiseInfo] = useState({
    areasOfExpertise: ['Interventional Cardiology', 'Echocardiography', 'Nuclear Cardiology'],
    servicesOffered: ['Heart Check-up', 'ECG', 'Echocardiogram', 'Stress Test', 'Cardiac Catheterization'],
    awards: ['Best Cardiologist Award 2022', 'Excellence in Patient Care 2021'],
    publications: ['Journal of Cardiology 2023', 'International Heart Conference 2022'],
    memberships: ['Bangladesh Cardiac Society', 'American College of Cardiology'],
    researchInterests: ['Preventive Cardiology', 'Heart Failure Management']
  });

  // Profile completion calculation
  useEffect(() => {
    const calculateProfileCompletion = () => {
      let completed = 0;
      let total = 0;

      // Personal info fields
      const personalFields = ['title', 'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'address', 'emergencyContact'];
      personalFields.forEach(field => {
        total++;
        if (personalInfo[field] && personalInfo[field].trim() !== '') completed++;
      });

      // Professional info fields
      const professionalFields = ['specialization', 'experience', 'currentHospital', 'consultationFee', 'availableTime', 'medicalLicense'];
      professionalFields.forEach(field => {
        total++;
        if (professionalInfo[field] && professionalInfo[field].trim() !== '') completed++;
      });

      // Array fields
      if (professionalInfo.qualifications.length > 0) completed++;
      if (professionalInfo.languages.length > 0) completed++;
      if (expertiseInfo.areasOfExpertise.length > 0) completed++;
      if (expertiseInfo.servicesOffered.length > 0) completed++;
      total += 4;

      return Math.round((completed / total) * 100);
    };

    setProfileCompletion(calculateProfileCompletion());
  }, [personalInfo, professionalInfo, expertiseInfo]);

  // Auto-save functionality
  useEffect(() => {
    if (hasChanges && isEditing) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSave();
      }, 3000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [personalInfo, professionalInfo, expertiseInfo, hasChanges, isEditing]);

  // Form validation
  const validateField = (field, value, section) => {
    const errors = { ...validationErrors };
    
    switch (section) {
      case 'personal':
        if (field === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field] = 'Please enter a valid email address';
          } else {
            delete errors[field];
          }
        } else if (field === 'phone') {
          const phoneRegex = /^\+?[0-9]{10,15}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            errors[field] = 'Please enter a valid phone number';
          } else {
            delete errors[field];
          }
        } else if (field === 'firstName' || field === 'lastName') {
          if (value.trim().length < 2) {
            errors[field] = 'Name must be at least 2 characters';
          } else {
            delete errors[field];
          }
        }
        break;
      
      case 'professional':
        if (field === 'consultationFee') {
          if (isNaN(value) || value <= 0) {
            errors[field] = 'Please enter a valid consultation fee';
          } else {
            delete errors[field];
          }
        } else if (field === 'experience') {
          if (isNaN(value) || value < 0) {
            errors[field] = 'Please enter valid years of experience';
          } else {
            delete errors[field];
          }
        }
        break;
    }
    
    setValidationErrors(errors);
  };

  const autoSave = () => {
    setAutoSaveStatus('saving');
    setTimeout(() => {
      setAutoSaveStatus('saved');
      setLastSaveTime(new Date());
      setTimeout(() => {
        setAutoSaveStatus('');
      }, 2000);
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setTimeout(() => {
              setUploadProgress(0);
            }, 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleFieldChange = (field, value, section = 'personal') => {
    setTouchedFields(prev => ({ ...prev, [`${section}-${field}`]: true }));
    validateField(field, value, section);
    
    if (section === 'personal') {
      setPersonalInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'professional') {
      setProfessionalInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'expertise') {
      setExpertiseInfo(prev => ({ ...prev, [field]: value }));
    }
  };

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
    handleFieldChange(field, value, 'personal');
  };

  const handleProfessionalInfoChange = (field, value) => {
    handleFieldChange(field, value, 'professional');
  };

  const handleExpertiseInfoChange = (field, value) => {
    handleFieldChange(field, value, 'expertise');
  };

  const renderPersonalInfo = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Profile Header with Upload */}
      <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#f0fdf2] to-[#e0f2fe] flex items-center justify-center shadow-lg"
          >
            <Stethoscope className="w-16 h-16 text-[#5DBB63]" />
          </motion.div>
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-3 bg-gradient-to-r from-[#165028] to-[#5DBB63] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              {isUploading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Upload className="w-4 h-4" />
                </motion.div>
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </motion.button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center">
              <div className="text-white text-sm font-medium">{uploadProgress}%</div>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#111827] mb-2">
            {personalInfo.title} {personalInfo.firstName} {personalInfo.lastName}
          </h2>
          <p className="text-[#5DBB63] font-medium mb-1">{professionalInfo.specialization}</p>
          <p className="text-sm text-gray-600 mb-2">
            {professionalInfo.qualifications.join(', ')}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Doctor ID: DR-2024-005678
            </span>
            <span>•</span>
            <span>Member since: March 2024</span>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          Professional Bio
        </label>
        <textarea
          value={personalInfo.bio}
          onChange={(e) => handlePersonalInfoChange('bio', e.target.value)}
          disabled={!isEditing}
          rows={3}
          placeholder="Write a brief professional biography..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-50 resize-none transition-all"
        />
        <p className="text-xs text-gray-500 mt-2">{personalInfo.bio.length}/500 characters</p>
      </div>

      {/* Form Fields with Validation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <select
            value={personalInfo.title}
            onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          >
            <option>Dr.</option>
            <option>Prof.</option>
            <option>Assoc. Prof.</option>
            <option>Asst. Prof.</option>
          </select>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <div className="relative">
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all ${
                validationErrors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.firstName && touchedFields['personal-firstName'] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.firstName}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <div className="relative">
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all ${
                validationErrors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.lastName && touchedFields['personal-lastName'] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.lastName}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all ${
                validationErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.email && touchedFields['personal-email'] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.email}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <div className="relative">
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all ${
                validationErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.phone && touchedFields['personal-phone'] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.phone}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={personalInfo.gender}
            onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
          <select
            value={personalInfo.maritalStatus}
            onChange={(e) => handlePersonalInfoChange('maritalStatus', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          >
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
          <input
            type="tel"
            value={personalInfo.emergencyContact}
            onChange={(e) => handlePersonalInfoChange('emergencyContact', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={personalInfo.website}
            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
            disabled={!isEditing}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
          <input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
            disabled={!isEditing}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={personalInfo.address}
            onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
            disabled={!isEditing}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 resize-none transition-all"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderProfessionalInfo = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-blue-500" />
            Specialization
          </label>
          <input
            type="text"
            value={professionalInfo.specialization}
            onChange={(e) => handleProfessionalInfoChange('specialization', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-500" />
            Experience
          </label>
          <div className="relative">
            <input
              type="text"
              value={professionalInfo.experience}
              onChange={(e) => handleProfessionalInfoChange('experience', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all ${
                validationErrors.experience ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.experience && touchedFields['professional-experience'] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.experience}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            Current Hospital
          </label>
          <input
            type="text"
            value={professionalInfo.currentHospital}
            onChange={(e) => handleProfessionalInfoChange('currentHospital', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-500" />
            Consultation Fee (BDT)
          </label>
          <div className="relative">
            <input
              type="text"
              value={professionalInfo.consultationFee}
              onChange={(e) => handleProfessionalInfoChange('consultationFee', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all ${
                validationErrors.consultationFee ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.consultationFee && touchedFields['professional-consultationFee'] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {validationErrors.consultationFee}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            Available Time
          </label>
          <input
            type="text"
            value={professionalInfo.availableTime}
            onChange={(e) => handleProfessionalInfoChange('availableTime', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-500" />
            Medical License
          </label>
          <input
            type="text"
            value={professionalInfo.medicalLicense}
            onChange={(e) => handleProfessionalInfoChange('medicalLicense', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <input
            type="text"
            value={professionalInfo.department}
            onChange={(e) => handleProfessionalInfoChange('department', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
          <input
            type="text"
            value={professionalInfo.designation}
            onChange={(e) => handleProfessionalInfoChange('designation', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">NPI Number</label>
          <input
            type="text"
            value={professionalInfo.npiNumber}
            onChange={(e) => handleProfessionalInfoChange('npiNumber', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">DEA Number</label>
          <input
            type="text"
            value={professionalInfo.deaNumber}
            onChange={(e) => handleProfessionalInfoChange('deaNumber', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent disabled:bg-gray-100 transition-all"
          />
        </motion.div>
      </div>

      {/* Enhanced Qualifications Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-500" />
          Qualifications
          <span className="text-sm text-gray-500 font-normal">({professionalInfo.qualifications.length})</span>
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {professionalInfo.qualifications.map((qualification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-blue-700 font-medium">{qualification}</span>
                </div>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setProfessionalInfo(prev => ({
                        ...prev,
                        qualifications: prev.qualifications.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                className="px-3 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9f52] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Enhanced Languages Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Languages className="w-5 h-5 text-green-500" />
          Languages
          <span className="text-sm text-gray-500 font-normal">({professionalInfo.languages.length})</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {professionalInfo.languages.map((language, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium border border-green-200 hover:shadow-md transition-all"
              >
                {language}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderExpertise = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Areas of Expertise */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          Areas of Expertise
          <span className="text-sm text-gray-500 font-normal">({expertiseInfo.areasOfExpertise.length})</span>
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {expertiseInfo.areasOfExpertise.map((expertise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-white rounded-lg border border-purple-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-purple-700 font-medium">{expertise}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Services Offered */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#5DBB63]" />
          Services Offered
          <span className="text-sm text-gray-500 font-normal">({expertiseInfo.servicesOffered.length})</span>
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {expertiseInfo.servicesOffered.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-white rounded-lg border border-green-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-green-700 font-medium">{service}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Awards & Recognition */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Awards & Recognition
          <span className="text-sm text-gray-500 font-normal">({expertiseInfo.awards.length})</span>
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {expertiseInfo.awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-white rounded-lg border border-amber-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-amber-700 font-medium">{award}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Publications */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Publications
          <span className="text-sm text-gray-500 font-normal">({expertiseInfo.publications.length})</span>
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {expertiseInfo.publications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-blue-700 font-medium">{publication}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Professional Memberships */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" />
          Professional Memberships
          <span className="text-sm text-gray-500 font-normal">({expertiseInfo.memberships.length})</span>
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {expertiseInfo.memberships.map((membership, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-white rounded-lg border border-indigo-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-indigo-700 font-medium">{membership}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Research Interests */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-teal-500" />
          Research Interests
          <span className="text-sm text-gray-500 font-normal">({expertiseInfo.researchInterests.length})</span>
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {expertiseInfo.researchInterests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-3 bg-white rounded-lg border border-teal-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-teal-700 font-medium">{interest}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Professional Header with Profile Completion */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mb-6"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg"
              >
                <Stethoscope className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Professional Profile</h1>
                <p className="text-gray-600 mt-1">Complete professional and medical information</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Doctor ID: DR-2024-005678
                  </span>
                  <span>•</span>
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {/* Profile Completion Indicator */}
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-right"
              >
                <div className="text-sm text-gray-500 mb-1">Profile Completion</div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${profileCompletion}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full transition-all ${
                        profileCompletion >= 80 ? 'bg-green-500' : 
                        profileCompletion >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{profileCompletion}%</span>
                </div>
                {profileCompletion < 100 && (
                  <p className="text-xs text-gray-500 mt-1">Complete your profile for better visibility</p>
                )}
              </motion.div>
              
              <div className="flex items-center gap-3">
                {/* Auto-save Status */}
                <AnimatePresence>
                  {autoSaveStatus === 'saving' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg"
                    >
                      <Clock className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Auto-saving...</span>
                    </motion.div>
                  )}
                  {autoSaveStatus === 'saved' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg"
                    >
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Auto-saved</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Manual Save Status */}
                {saveStatus === 'saving' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg"
                  >
                    <Clock className="w-4 h-4 animate-spin" />
                    Saving...
                  </motion.div>
                )}
                {saveStatus === 'saved' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-lg"
                  >
                    <Check className="w-4 h-4" />
                    Saved Successfully
                  </motion.div>
                )}
                
                {isEditing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={cancelEditing}
                      className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startEditing}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Professional Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2 mb-6"
        >
          <nav className="flex space-x-2">
            {[
              { id: 'personal', label: 'Personal Info', icon: User, color: 'purple' },
              { id: 'professional', label: 'Professional Info', icon: Award, color: 'blue' },
              { id: 'expertise', label: 'Expertise & Services', icon: Activity, color: 'green' }
            ].map(({ id, label, icon: Icon, color }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === id
                    ? `bg-gradient-to-r from-${color}-600 to-${color}-700 text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {id === 'personal' && Object.values(personalInfo).filter(v => v && v.toString().trim()).length < 9 && (
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                )}
                {id === 'professional' && Object.values(professionalInfo).filter(v => v && v.toString().trim()).length < 10 && (
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                )}
                {id === 'expertise' && Object.values(expertiseInfo).filter(v => v && v.length > 0).length < 6 && (
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                )}
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content with Enhanced Animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg"
        >
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderPersonalInfo()}
                </motion.div>
              )}
              {activeTab === 'professional' && (
                <motion.div
                  key="professional"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderProfessionalInfo()}
                </motion.div>
              )}
              {activeTab === 'expertise' && (
                <motion.div
                  key="expertise"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderExpertise()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Stats Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">Profile Views</p>
                <p className="text-xl font-bold">1,234</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">Patient Rating</p>
                <p className="text-xl font-bold">4.9/5</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Patients</p>
                <p className="text-xl font-bold">856</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-xl text-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm opacity-90">This Month</p>
                <p className="text-xl font-bold">৳84.5K</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
