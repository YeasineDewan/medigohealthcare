import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  Upload,
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Brain,
  Bone,
  Baby,
  Award,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  Key,
  Lock,
  Eye,
  EyeOff,
  FileText,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit3,
  Trash2,
  Users,
  Settings,
  Stethoscope,
  Activity
} from 'lucide-react';

const AddDoctorForm = ({ isOpen, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Professional Info', icon: Briefcase },
    { id: 3, name: 'Contact Info', icon: MapPin },
    { id: 4, name: 'Employment Details', icon: Settings },
    { id: 5, name: 'Account & Security', icon: Shield },
    { id: 6, name: 'Clinical Info', icon: Stethoscope },
    { id: 7, name: 'Documents', icon: FileText }
  ];

  const departments = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology',
    'Radiology', 'Pathology', 'Anesthesiology', 'Emergency Medicine',
    'Internal Medicine', 'Surgery', 'Psychiatry', 'Dermatology',
    'Ophthalmology', 'ENT', 'Gynecology', 'Urology'
  ];

  const specializations = [
    'General Physician', 'Cardiologist', 'Neurologist', 'Orthopedic Surgeon',
    'Pediatrician', 'Oncologist', 'Radiologist', 'Pathologist',
    'Anesthesiologist', 'Emergency Medicine Specialist', 'Internist',
    'Surgeon', 'Psychiatrist', 'Dermatologist', 'Ophthalmologist',
    'ENT Specialist', 'Gynecologist', 'Urologist'
  ];

  const positions = [
    'Junior Doctor', 'Senior Doctor', 'Consultant', 'Specialist',
    'Head of Department', 'Medical Director', 'Chief Medical Officer'
  ];

  const workTypes = ['Full-time', 'Part-time', 'Contract', 'Locum'];
  const contractTypes = ['Permanent', 'Temporary', 'Probation', 'Internship'];

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      languages: [],
      profileImage: null
    },
    professionalInfo: {
      licenseNumber: '',
      specialization: '',
      department: '',
      position: '',
      experience: '',
      education: [],
      certifications: [],
      skills: [],
      awards: [],
      publications: [],
      professionalMemberships: []
    },
    contactInfo: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      }
    },
    employmentDetails: {
      employeeId: '',
      joinDate: '',
      workSchedule: '',
      workType: '',
      salary: '',
      benefits: [],
      contractType: '',
      probationPeriod: '',
      reportingTo: '',
      teamSize: ''
    },
    accountSecurity: {
      username: '',
      password: '',
      confirmPassword: '',
      twoFactorAuth: false,
      permissions: [],
      accessLevel: '',
      accountStatus: 'active'
    },
    clinicalInfo: {
      clinicalInterests: [],
      researchAreas: [],
      procedures: [],
      equipment: [],
      hospitalAffiliations: [],
      consultationFee: '',
      availableSlots: [],
      consultationDuration: '',
      telemedicineEnabled: false,
      languages: []
    },
    documents: {
      resume: null,
      licenseDocument: null,
      degreeCertificates: [],
      identityProof: null,
      addressProof: null,
      backgroundCheck: null,
      medicalLicense: null,
      deaCertificate: null,
      boardCertificate: null,
      malpracticeInsurance: null,
      immunizationRecords: null
    }
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, nestedSection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section][nestedSection],
          [field]: value
        }
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.personalInfo.firstName.trim()) {
          newErrors['personalInfo.firstName'] = 'First name is required';
        }
        if (!formData.personalInfo.lastName.trim()) {
          newErrors['personalInfo.lastName'] = 'Last name is required';
        }
        if (!formData.personalInfo.email.trim()) {
          newErrors['personalInfo.email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
          newErrors['personalInfo.email'] = 'Email is invalid';
        }
        if (!formData.personalInfo.phone.trim()) {
          newErrors['personalInfo.phone'] = 'Phone number is required';
        }
        if (!formData.personalInfo.dateOfBirth) {
          newErrors['personalInfo.dateOfBirth'] = 'Date of birth is required';
        }
        if (!formData.personalInfo.gender) {
          newErrors['personalInfo.gender'] = 'Gender is required';
        }
        break;
        
      case 2:
        if (!formData.professionalInfo.licenseNumber.trim()) {
          newErrors['professionalInfo.licenseNumber'] = 'License number is required';
        }
        if (!formData.professionalInfo.specialization.trim()) {
          newErrors['professionalInfo.specialization'] = 'Specialization is required';
        }
        if (!formData.professionalInfo.department.trim()) {
          newErrors['professionalInfo.department'] = 'Department is required';
        }
        if (!formData.professionalInfo.position.trim()) {
          newErrors['professionalInfo.position'] = 'Position is required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setLoading(true);
      try {
        await onSave(formData);
        onClose();
      } catch (error) {
        console.error('Error saving doctor:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${
                    errors['personalInfo.firstName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
                {errors['personalInfo.firstName'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.firstName']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${
                    errors['personalInfo.lastName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
                {errors['personalInfo.lastName'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.lastName']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${
                    errors['personalInfo.email'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                />
                {errors['personalInfo.email'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.email']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${
                    errors['personalInfo.phone'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors['personalInfo.phone'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.phone']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${
                    errors['personalInfo.dateOfBirth'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['personalInfo.dateOfBirth'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.dateOfBirth']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${
                    errors['personalInfo.gender'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors['personalInfo.gender'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.gender']}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Step {currentStep}</h3>
            <p className="text-gray-600">This step is under development.</p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Add New Doctor</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === step.id
                        ? 'bg-[#5DBB63] text-white'
                        : currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ml-2 ${
                      currentStep === step.id
                        ? 'text-[#5DBB63]'
                        : currentStep > step.id
                        ? 'text-green-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-4 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            {renderStepContent()}
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
            </div>
            
            <div>
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Doctor
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddDoctorForm;
