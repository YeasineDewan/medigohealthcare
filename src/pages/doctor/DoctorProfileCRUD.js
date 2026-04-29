import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Stethoscope, Camera, Save, X, Plus, Trash2, Award, 
  Clock, DollarSign, Languages, Check, Edit2, Shield, Activity, FileText, Download,
  Upload, Building, GraduationCap, Briefcase, Star, Calendar, Globe, Heart,
  Brain, Eye, Bone, Baby, Syringe, FlaskConical, Pill, Hospital,
  UserCheck, BookOpen, Target, TrendingUp, Image as ImageIcon, FileImage,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle, Info, Settings
} from 'lucide-react';

export default function DoctorProfileCRUD() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [backupData, setBackupData] = useState({});
  const fileInputRef = useRef(null);
  
  // Profile state
  const [profile, setProfile] = useState({
    // Personal Information
    personal: {
      title: 'Dr.',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      email: 'dr.ahmed.hassan@medigo.com',
      phone: '+880 1712 345678',
      alternatePhone: '+880 1912 987654',
      dateOfBirth: '1980-05-15',
      gender: 'Male',
      bloodGroup: 'O+',
      nationality: 'Bangladeshi',
      religion: 'Islam',
      maritalStatus: 'Married',
      profileImage: null,
      signature: null
    },
    
    // Professional Information
    professional: {
      medicalLicense: 'BMDC-12345',
      licenseExpiry: '2025-12-31',
      specialization: 'Cardiology',
      subSpecializations: ['Interventional Cardiology', 'Echocardiography'],
      experience: [
        {
          id: 1,
          hospital: 'Square Hospital',
          position: 'Senior Consultant Cardiologist',
          duration: '2018-Present',
          responsibilities: 'Patient consultation, cardiac procedures, research'
        },
        {
          id: 2,
          hospital: 'Ibrahim Cardiac Hospital',
          position: 'Consultant Cardiologist',
          duration: '2014-2018',
          responsibilities: 'Emergency cardiac care, patient management'
        }
      ],
      consultationFee: {
        inPerson: '1500',
        online: '1000',
        emergency: '3000'
      },
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableTime: {
        start: '09:00',
        end: '17:00'
      },
      languages: ['English', 'Bengali', 'Hindi', 'Urdu']
    },
    
    // Education & Qualifications
    education: [
      {
        id: 1,
        degree: 'MBBS',
        institution: 'Dhaka Medical College',
        year: '2008',
        board: 'University of Dhaka',
        result: 'Excellent',
        achievements: 'Gold Medalist'
      },
      {
        id: 2,
        degree: 'FCPS (Cardiology)',
        institution: 'Bangladesh College of Physicians and Surgeons',
        year: '2014',
        board: 'BCPS',
        result: 'First Division',
        achievements: 'Best Resident'
      },
      {
        id: 3,
        degree: 'MRCP (UK)',
        institution: 'Royal College of Physicians',
        year: '2012',
        board: 'MRCP UK',
        result: 'Passed',
        achievements: ''
      }
    ],
    
    // Services & Expertise
    services: [
      {
        id: 1,
        name: 'Cardiac Consultation',
        description: 'Comprehensive heart health evaluation',
        duration: '30 minutes',
        price: '1500'
      },
      {
        id: 2,
        name: 'Echocardiography',
        description: 'Ultrasound imaging of the heart',
        duration: '45 minutes',
        price: '2000'
      },
      {
        id: 3,
        name: 'Stress Test',
        description: 'Cardiac stress evaluation',
        duration: '60 minutes',
        price: '2500'
      }
    ],
    
    // Publications
    publications: [
      {
        id: 1,
        title: 'Advanced Cardiac Imaging Techniques',
        journal: 'Journal of Cardiology',
        year: '2022',
        authors: 'Dr. Ahmed Hassan, Dr. Sarah Johnson',
        doi: '10.1234/jcard.2022.001',
        type: 'Research Paper'
      },
      {
        id: 2,
        title: 'Management of Acute Myocardial Infarction',
        journal: 'Bangladesh Heart Journal',
        year: '2021',
        authors: 'Dr. Ahmed Hassan',
        doi: '10.5678/bhj.2021.002',
        type: 'Review Article'
      }
    ],
    
    // Awards & Achievements
    awards: [
      {
        id: 1,
        name: 'Best Cardiologist Award',
        organization: 'Bangladesh Cardiac Society',
        year: '2022',
        category: 'Clinical Excellence',
        description: 'Outstanding contribution to cardiac care'
      },
      {
        id: 2,
        name: 'Excellence in Research',
        organization: 'Dhaka Medical College',
        year: '2021',
        category: 'Academic',
        description: 'Significant research contributions'
      }
    ],
    
    // Hospital Affiliations
    affiliations: [
      {
        id: 1,
        name: 'Square Hospital',
        address: '18/B, Bir Uttam CR Dutta Road, Dhaka',
        designation: 'Senior Consultant',
        department: 'Cardiology',
        since: '2018',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Ibrahim Cardiac Hospital',
        address: 'Plot-1, Road-8, Dhanmondi, Dhaka',
        designation: 'Visiting Consultant',
        department: 'Cardiology',
        since: '2014',
        status: 'Active'
      }
    ],
    
    // Professional Memberships
    memberships: [
      {
        id: 1,
        name: 'Bangladesh Cardiac Society',
        type: 'Professional',
        memberSince: '2014',
        status: 'Active',
        membershipNumber: 'BCS-2014-1234'
      },
      {
        id: 2,
        name: 'American College of Cardiology',
        type: 'International',
        memberSince: '2019',
        status: 'Active',
        membershipNumber: 'ACC-2019-5678'
      }
    ],
    
    // Settings
    settings: {
      notifications: {
        email: true,
        sms: true,
        push: false,
        appointmentReminders: true,
        prescriptionAlerts: true
      },
      privacy: {
        showProfile: true,
        showContact: true,
        showSchedule: false,
        allowReviews: true
      },
      consultation: {
        autoConfirm: false,
        allowWalkIn: true,
        emergencyOnly: false,
        videoConsultation: true
      }
    }
  });

  // CRUD operations
  const handleEdit = () => {
    setBackupData(JSON.parse(JSON.stringify(profile)));
    setIsEditing(true);
    setHasChanges(false);
    setSaveStatus('');
  };

  const handleCancel = () => {
    setProfile(backupData);
    setIsEditing(false);
    setHasChanges(false);
    setSaveStatus('');
  };

  const handleSave = async () => {
    setSaveStatus('Saving...');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsEditing(false);
    setHasChanges(false);
    setSaveStatus('Profile updated successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleImageUpload = async (file, type) => {
    const formData = new FormData();
    formData.append(type === 'profile' ? 'profile_image' : 'signature_image', file);
    
    setUploadStatus('Uploading...');
    try {
      const doctor = await doctorService.getById(currentDoctorId); // Assume currentDoctorId from context/auth
      await doctorService.updateProfile(doctor.id, formData);
      setUploadStatus('Upload successful!');
      // Refresh profile data
      loadProfile();
    } catch (error) {
      setUploadStatus('Upload failed');
    }
    setTimeout(() => setUploadStatus(''), 2000);
  };

  const addNewItem = (section) => {
    const newItem = {
      id: Date.now(),
      // Default structure based on section
      ...(section === 'education' && {
        degree: '',
        institution: '',
        year: '',
        board: '',
        result: '',
        achievements: ''
      }),
      ...(section === 'experience' && {
        hospital: '',
        position: '',
        duration: '',
        responsibilities: ''
      }),
      ...(section === 'services' && {
        name: '',
        description: '',
        duration: '',
        price: ''
      }),
      ...(section === 'publications' && {
        title: '',
        journal: '',
        year: '',
        authors: '',
        doi: '',
        type: ''
      }),
      ...(section === 'awards' && {
        name: '',
        organization: '',
        year: '',
        category: '',
        description: ''
      }),
      ...(section === 'affiliations' && {
        name: '',
        address: '',
        designation: '',
        department: '',
        since: '',
        status: 'Active'
      }),
      ...(section === 'memberships' && {
        name: '',
        type: '',
        memberSince: '',
        status: 'Active',
        membershipNumber: ''
      })
    };

    setProfile(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem]
    }));
    setHasChanges(true);
  };

  const updateItem = (section, id, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
    setHasChanges(true);
  };

  const removeItem = (section, id) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
    setHasChanges(true);
  };

  const updatePersonalInfo = (field, value) => {
    setProfile(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
    setHasChanges(true);
  };

  const updateProfessionalInfo = (field, value) => {
    setProfile(prev => ({
      ...prev,
      professional: { ...prev.professional, [field]: value }
    }));
    setHasChanges(true);
  };

  const updateSettings = (category, field, value) => {
    setProfile(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [category]: {
          ...prev.settings[category],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  // Tab components
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Image */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              {profile.personal.profileImage ? (
                <img src={profile.personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Upload a professional profile photo</p>
            {isEditing && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], 'profile')}
                className="hidden"
              />
            )}
            {uploadStatus && (
              <p className="text-sm text-green-600 mt-2">{uploadStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            {isEditing ? (
              <select
                value={profile.personal.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
                <option value="Assoc. Prof.">Assoc. Prof.</option>
                <option value="Asst. Prof.">Asst. Prof.</option>
              </select>
            ) : (
              <p className="text-gray-900">{profile.personal.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.firstName}
                onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.lastName}
                onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={profile.personal.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.personal.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.personal.alternatePhone}
                onChange={(e) => updatePersonalInfo('alternatePhone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.alternatePhone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={profile.personal.dateOfBirth}
                onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.dateOfBirth}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            {isEditing ? (
              <select
                value={profile.personal.gender}
                onChange={(e) => updatePersonalInfo('gender', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-gray-900">{profile.personal.gender}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
            {isEditing ? (
              <select
                value={profile.personal.bloodGroup}
                onChange={(e) => updatePersonalInfo('bloodGroup', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p className="text-gray-900">{profile.personal.bloodGroup}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.nationality}
                onChange={(e) => updatePersonalInfo('nationality', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.nationality}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.personal.religion}
                onChange={(e) => updatePersonalInfo('religion', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.personal.religion}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
            {isEditing ? (
              <select
                value={profile.personal.maritalStatus}
                onChange={(e) => updatePersonalInfo('maritalStatus', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            ) : (
              <p className="text-gray-900">{profile.personal.maritalStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Digital Signature</h3>
        <div className="flex items-center gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-w-[200px] min-h-[100px] flex items-center justify-center">
            {profile.personal.signature ? (
              <img src={profile.personal.signature} alt="Signature" className="max-h-20" />
            ) : (
              <div className="text-center">
                <FileImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No signature uploaded</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Upload your digital signature</p>
            {isEditing && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], 'signature')}
                  className="hidden"
                  id="signature-upload"
                />
                <label
                  htmlFor="signature-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Signature
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      {/* Medical License */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical License</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.professional.medicalLicense}
                onChange={(e) => updateProfessionalInfo('medicalLicense', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.professional.medicalLicense}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Expiry</label>
            {isEditing ? (
              <input
                type="date"
                value={profile.professional.licenseExpiry}
                onChange={(e) => updateProfessionalInfo('licenseExpiry', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.professional.licenseExpiry}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.professional.specialization}
                onChange={(e) => updateProfessionalInfo('specialization', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile.professional.specialization}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Specializations</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.professional.subSpecializations.join(', ')}
                onChange={(e) => updateProfessionalInfo('subSpecializations', e.target.value.split(', '))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Separate with commas"
              />
            ) : (
              <p className="text-gray-900">{profile.professional.subSpecializations.join(', ')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('experience')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          )}
        </div>
        <div className="space-y-4">
          {profile.professional.experience.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={exp.hospital}
                      onChange={(e) => updateItem('experience', exp.id, 'hospital', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{exp.hospital}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateItem('experience', exp.id, 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{exp.position}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateItem('experience', exp.id, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{exp.duration}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                  {isEditing ? (
                    <textarea
                      value={exp.responsibilities}
                      onChange={(e) => updateItem('experience', exp.id, 'responsibilities', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-900">{exp.responsibilities}</p>
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => removeItem('experience', exp.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Fees */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Fees</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">In-Person (BDT)</label>
            {isEditing ? (
              <input
                type="number"
                value={profile.professional.consultationFee.inPerson}
                onChange={(e) => updateProfessionalInfo('consultationFee', {
                  ...profile.professional.consultationFee,
                  inPerson: e.target.value
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">BDT {profile.professional.consultationFee.inPerson}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Online (BDT)</label>
            {isEditing ? (
              <input
                type="number"
                value={profile.professional.consultationFee.online}
                onChange={(e) => updateProfessionalInfo('consultationFee', {
                  ...profile.professional.consultationFee,
                  online: e.target.value
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">BDT {profile.professional.consultationFee.online}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency (BDT)</label>
            {isEditing ? (
              <input
                type="number"
                value={profile.professional.consultationFee.emergency}
                onChange={(e) => updateProfessionalInfo('consultationFee', {
                  ...profile.professional.consultationFee,
                  emergency: e.target.value
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">BDT {profile.professional.consultationFee.emergency}</p>
            )}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {profile.professional.languages.map((lang, index) => (
            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Education & Qualifications</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('education')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          )}
        </div>
        <div className="space-y-4">
          {profile.education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{edu.degree}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{edu.institution}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{edu.year}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={edu.board}
                      onChange={(e) => updateItem('education', edu.id, 'board', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{edu.board}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={edu.result}
                      onChange={(e) => updateItem('education', edu.id, 'result', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{edu.result}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={edu.achievements}
                      onChange={(e) => updateItem('education', edu.id, 'achievements', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{edu.achievements}</p>
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => removeItem('education', edu.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Services</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('services')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.services.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => updateItem('services', service.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{service.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  {isEditing ? (
                    <textarea
                      value={service.description}
                      onChange={(e) => updateItem('services', service.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={service.duration}
                        onChange={(e) => updateItem('services', service.id, 'duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{service.duration}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (BDT)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateItem('services', service.id, 'price', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">BDT {service.price}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem('services', service.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPublications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Publications</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('publications')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Publication
            </button>
          )}
        </div>
        <div className="space-y-4">
          {profile.publications.map((pub) => (
            <div key={pub.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={pub.title}
                      onChange={(e) => updateItem('publications', pub.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{pub.title}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Journal</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={pub.journal}
                        onChange={(e) => updateItem('publications', pub.id, 'journal', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{pub.journal}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={pub.year}
                        onChange={(e) => updateItem('publications', pub.id, 'year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{pub.year}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authors</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={pub.authors}
                        onChange={(e) => updateItem('publications', pub.id, 'authors', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{pub.authors}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DOI</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={pub.doi}
                        onChange={(e) => updateItem('publications', pub.id, 'doi', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{pub.doi}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem('publications', pub.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAwards = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Awards & Achievements</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('awards')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Award
            </button>
          )}
        </div>
        <div className="space-y-4">
          {profile.awards.map((award) => (
            <div key={award.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Award Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={award.name}
                        onChange={(e) => updateItem('awards', award.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{award.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={award.organization}
                        onChange={(e) => updateItem('awards', award.id, 'organization', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{award.organization}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={award.year}
                        onChange={(e) => updateItem('awards', award.id, 'year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{award.year}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={award.category}
                        onChange={(e) => updateItem('awards', award.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{award.category}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  {isEditing ? (
                    <textarea
                      value={award.description}
                      onChange={(e) => updateItem('awards', award.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-600">{award.description}</p>
                  )}
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem('awards', award.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAffiliations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Hospital Affiliations</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('affiliations')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Affiliation
            </button>
          )}
        </div>
        <div className="space-y-4">
          {profile.affiliations.map((aff) => (
            <div key={aff.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={aff.name}
                        onChange={(e) => updateItem('affiliations', aff.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{aff.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={aff.address}
                        onChange={(e) => updateItem('affiliations', aff.id, 'address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{aff.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={aff.designation}
                        onChange={(e) => updateItem('affiliations', aff.id, 'designation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{aff.designation}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={aff.department}
                        onChange={(e) => updateItem('affiliations', aff.id, 'department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{aff.department}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Since</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={aff.since}
                        onChange={(e) => updateItem('affiliations', aff.id, 'since', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{aff.since}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    {isEditing ? (
                      <select
                        value={aff.status}
                        onChange={(e) => updateItem('affiliations', aff.id, 'status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{aff.status}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem('affiliations', aff.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMemberships = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Professional Memberships</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('memberships')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Membership
            </button>
          )}
        </div>
        <div className="space-y-4">
          {profile.memberships.map((mem) => (
            <div key={mem.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={mem.name}
                        onChange={(e) => updateItem('memberships', mem.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{mem.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    {isEditing ? (
                      <select
                        value={mem.type}
                        onChange={(e) => updateItem('memberships', mem.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Professional">Professional</option>
                        <option value="Academic">Academic</option>
                        <option value="International">International</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{mem.type}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={mem.memberSince}
                        onChange={(e) => updateItem('memberships', mem.id, 'memberSince', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{mem.memberSince}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    {isEditing ? (
                      <select
                        value={mem.status}
                        onChange={(e) => updateItem('memberships', mem.id, 'status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Expired">Expired</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{mem.status}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Membership Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={mem.membershipNumber}
                        onChange={(e) => updateItem('memberships', mem.id, 'membershipNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{mem.membershipNumber}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem('memberships', mem.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          {Object.entries(profile.settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-500">
                  {key === 'email' && 'Receive email notifications'}
                  {key === 'sms' && 'Receive SMS notifications'}
                  {key === 'push' && 'Receive push notifications'}
                  {key === 'appointmentReminders' && 'Get appointment reminders'}
                  {key === 'prescriptionAlerts' && 'Get prescription alerts'}
                </p>
              </div>
              {isEditing ? (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateSettings('notifications', key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              ) : (
                <div className={`w-11 h-6 rounded-full ${value ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : 'translate-x-1'} mt-0.5`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          {Object.entries(profile.settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-500">
                  {key === 'showProfile' && 'Make your profile visible to patients'}
                  {key === 'showContact' && 'Show contact information publicly'}
                  {key === 'showSchedule' && 'Display your schedule publicly'}
                  {key === 'allowReviews' && 'Allow patients to leave reviews'}
                </p>
              </div>
              {isEditing ? (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateSettings('privacy', key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              ) : (
                <div className={`w-11 h-6 rounded-full ${value ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : 'translate-x-1'} mt-0.5`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Settings</h3>
        <div className="space-y-4">
          {Object.entries(profile.settings.consultation).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-500">
                  {key === 'autoConfirm' && 'Automatically confirm appointments'}
                  {key === 'allowWalkIn' && 'Allow walk-in appointments'}
                  {key === 'emergencyOnly' && 'Only accept emergency cases'}
                  {key === 'videoConsultation' && 'Enable video consultations'}
                </p>
              </div>
              {isEditing ? (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateSettings('consultation', key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              ) : (
                <div className={`w-11 h-6 rounded-full ${value ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : 'translate-x-1'} mt-0.5`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional', icon: Stethoscope },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'services', label: 'Services', icon: Heart },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'affiliations', label: 'Affiliations', icon: Building },
    { id: 'memberships', label: 'Memberships', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doctor Profile</h1>
                <p className="text-gray-600">Manage your professional information</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {saveStatus && (
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  saveStatus.includes('successfully') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {saveStatus}
                </div>
              )}
              {hasChanges && (
                <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
              )}
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 p-1" aria-label="Tabs">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'professional' && renderProfessionalInfo()}
            {activeTab === 'education' && renderEducation()}
            {activeTab === 'services' && renderServices()}
            {activeTab === 'publications' && renderPublications()}
            {activeTab === 'awards' && renderAwards()}
            {activeTab === 'affiliations' && renderAffiliations()}
            {activeTab === 'memberships' && renderMemberships()}
            {activeTab === 'settings' && renderSettings()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
