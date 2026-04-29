import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Building,
  Clock,
  Star,
  Edit,
  Save,
  X,
  Camera,
  FileText,
  Shield,
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Share2,
  Settings,
  Lock,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from 'lucide-react';

const ProfessionalDoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: 'Dr. Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@medigo.com',
      phone: '+1 (555) 123-4567',
      address: '123 Medical Center Drive, Boston, MA 02115',
      dateOfBirth: '1980-03-15',
      gender: 'Female',
      bloodGroup: 'O+',
      emergencyContact: '+1 (555) 987-6543'
    },
    professional: {
      title: 'Senior Cardiologist',
      specialization: 'Cardiology',
      experience: '15+ years',
      licenseNumber: 'MD-123456789',
      npiNumber: '1234567890',
      hospitalAffiliation: 'Boston Medical Center',
      department: 'Cardiology Department',
      languages: ['English', 'Spanish', 'French'],
      consultationFee: '$250',
      availability: 'Mon-Fri, 9AM-5PM'
    },
    education: [
      {
        degree: 'Doctor of Medicine',
        institution: 'Harvard Medical School',
        year: '2005',
        location: 'Boston, MA'
      },
      {
        degree: 'Residency in Cardiology',
        institution: 'Massachusetts General Hospital',
        year: '2010',
        location: 'Boston, MA'
      }
    ],
    experience: [
      {
        position: 'Senior Cardiologist',
        hospital: 'Boston Medical Center',
        duration: '2015 - Present',
        description: 'Leading cardiology department, performing complex cardiac procedures'
      },
      {
        position: 'Cardiology Fellow',
        hospital: 'Mayo Clinic',
        duration: '2010 - 2015',
        description: 'Specialized training in interventional cardiology'
      }
    ],
    achievements: [
      {
        title: 'Best Cardiologist Award',
        organization: 'American Heart Association',
        year: '2022',
        description: 'Recognized for outstanding contributions to cardiac care'
      },
      {
        title: 'Research Excellence Award',
        organization: 'Harvard Medical',
        year: '2020',
        description: 'Published groundbreaking research in cardiac imaging'
      }
    ],
    social: {
      website: 'www.drsarahjohnson.com',
      linkedin: 'linkedin.com/in/drsarahjohnson',
      twitter: '@dr_sarah_johnson',
      facebook: 'facebook.com/drsarahjohnson'
    }
  });

  const [stats] = useState({
    totalPatients: 2547,
    surgeriesPerformed: 892,
    publications: 23,
    averageRating: 4.9,
    totalEarnings: 1250000,
    consultationHours: 8760
  });

  const [tempProfileData, setTempProfileData] = useState(profileData);

  const handleEdit = () => {
    setTempProfileData(JSON.parse(JSON.stringify(profileData)));
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempProfileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfileData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    setTempProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile Overview</h2>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profileData.personal.firstName.split(' ')[1]?.[0] || profileData.personal.firstName[0]}
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. {profileData.personal.firstName} {profileData.personal.lastName}
              </h3>
              <p className="text-gray-600">{profileData.professional.title}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">{stats.averageRating} ({stats.totalPatients} patients)</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{profileData.personal.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{profileData.personal.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{profileData.personal.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{profileData.professional.hospitalAffiliation}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{profileData.professional.experience} experience</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">License: {profileData.professional.licenseNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{profileData.professional.availability}</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Consultation: {profileData.professional.consultationFee}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.totalPatients.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Patients</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.surgeriesPerformed}</div>
          <div className="text-sm text-gray-600">Surgeries</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.publications}</div>
          <div className="text-sm text-gray-600">Publications</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.averageRating}</div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">${(stats.totalEarnings / 1000).toFixed(0)}K</div>
          <div className="text-sm text-gray-600">Total Earnings</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{stats.consultationHours.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Consult Hours</div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Interventional Cardiology</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Cardiac Imaging</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Heart Failure</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {profileData.professional.languages.map((lang, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderEditForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Edit Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={tempProfileData.personal.firstName}
                onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={tempProfileData.personal.lastName}
                onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={tempProfileData.personal.email}
                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={tempProfileData.personal.phone}
                onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={tempProfileData.personal.address}
                onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
              <input
                type="text"
                value={tempProfileData.professional.title}
                onChange={(e) => handleInputChange('professional', 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input
                type="text"
                value={tempProfileData.professional.specialization}
                onChange={(e) => handleInputChange('professional', 'specialization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                value={tempProfileData.professional.experience}
                onChange={(e) => handleInputChange('professional', 'experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <input
                type="text"
                value={tempProfileData.professional.licenseNumber}
                onChange={(e) => handleInputChange('professional', 'licenseNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Affiliation</label>
              <input
                type="text"
                value={tempProfileData.professional.hospitalAffiliation}
                onChange={(e) => handleInputChange('professional', 'hospitalAffiliation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
              <input
                type="text"
                value={tempProfileData.professional.consultationFee}
                onChange={(e) => handleInputChange('professional', 'consultationFee', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Professional Profile</h1>
          <p className="text-gray-600 mt-2">Manage your professional information and track your career achievements</p>
        </motion.div>

        {/* Main Content */}
        {isEditing ? renderEditForm() : renderOverview()}
      </div>
    </div>
  );
};

export default ProfessionalDoctorProfile;
