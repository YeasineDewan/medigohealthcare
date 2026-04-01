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
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Heart,
  Brain,
  Bone,
  Baby,
  Stethoscope,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  RefreshCw,
  Languages,
  Users,
  DollarSign,
  Building,
  Activity,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  Folder,
  FolderOpen,
  Copy,
  Share2,
  Link,
  QrCode,
  Fingerprint,
  CreditCard,
  MessageSquare,
  Video,
  Mic,
  Volume2,
  Wifi,
  Battery,
  BatteryCharging,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertTriangle,
  CheckSquare,
  Square,
  Minus,
  PlusCircle,
  MinusCircle,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Users2,
  UserCircle,
  UserSquare,
  UserCog,
  UserShield,
  UserMinus2,
  UserCheck2,
  UserPlus2,
  UserX2,
  UserCircle2,
  UserSquare2,
  UserCog2,
  UserShield2,
  UserMinus3,
  UserCheck3,
  UserPlus3,
  UserX3
} from 'lucide-react';

const AddDoctorForm = ({ isOpen, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
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
    
    // Professional Information
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
    
    // Contact Information
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
    
    // Employment Details
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
    
    // Account & Security
    accountSecurity: {
      username: '',
      password: '',
      confirmPassword: '',
      twoFactorAuth: false,
      permissions: [],
      accessLevel: '',
      accountStatus: 'active'
    },
    
    // Clinical Information
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
    
    // Documents & Verification
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

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Professional', icon: Briefcase },
    { id: 3, name: 'Contact', icon: MapPin },
    { id: 4, name: 'Employment', icon: Building },
    { id: 5, name: 'Account', icon: Shield },
    { id: 6, name: 'Clinical', icon: Stethoscope },
    { id: 7, name: 'Documents', icon: FileText }
  ];

  const departments = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency Medicine',
    'Radiology', 'Pathology', 'Anesthesiology', 'Dermatology', 'Psychiatry',
    'Oncology', 'Gastroenterology', 'Nephrology', 'Pulmonology', 'Rheumatology',
    'Endocrinology', 'Infectious Disease', 'General Surgery', 'Internal Medicine',
    'Family Medicine', 'Obstetrics & Gynecology', 'Ophthalmology', 'Otolaryngology'
  ];

  const specializations = [
    'Interventional Cardiology', 'Electrophysiology', 'Heart Failure', 'Preventive Cardiology',
    'Stroke', 'Epilepsy', 'Movement Disorders', 'Neuromuscular', 'Neurocritical Care',
    'Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma', 'Hand Surgery',
    'Neonatology', 'Pediatric Cardiology', 'Pediatric Neurology', 'Developmental Pediatrics',
    'Trauma Surgery', 'Critical Care', 'Emergency Medicine', 'Urgent Care',
    'Diagnostic Radiology', 'Interventional Radiology', 'Neuroradiology', 'Body Imaging',
    'Clinical Pathology', 'Anatomic Pathology', 'Hematology', 'Microbiology',
    'Cardiac Anesthesia', 'Pediatric Anesthesia', 'Obstetric Anesthesia', 'Critical Care Anesthesia',
    'Medical Dermatology', 'Surgical Dermatology', 'Cosmetic Dermatology', 'Dermatopathology',
    'Adult Psychiatry', 'Child Psychiatry', 'Geriatric Psychiatry', 'Addiction Psychiatry',
    'Medical Oncology', 'Radiation Oncology', 'Surgical Oncology', 'Pediatric Oncology',
    'General Surgery', 'Laparoscopic Surgery', 'Breast Surgery', 'Colorectal Surgery',
    'Hospital Medicine', 'Outpatient Medicine', 'Geriatric Medicine', 'Palliative Care'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu',
    'Indonesian', 'Malay', 'Thai', 'Vietnamese', 'Tagalog', 'Turkish', 'Persian'
  ];

  const skills = [
    'Patient Care', 'Diagnosis', 'Treatment Planning', 'Surgery', 'Emergency Response',
    'Medical Procedures', 'Patient Counseling', 'Team Leadership', 'Research', 'Teaching',
    'Electronic Health Records', 'Telemedicine', 'Medical Imaging', 'Laboratory Tests',
    'Medication Management', 'Clinical Documentation', 'Quality Improvement', 'Risk Management',
    'Interdisciplinary Collaboration', 'Patient Safety', 'Infection Control', 'Pain Management',
    'Chronic Disease Management', 'Preventive Care', 'Health Promotion', 'Case Management'
  ];

  const benefits = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance', 'Life Insurance',
    'Disability Insurance', '401(k)', 'Paid Time Off', 'Sick Leave', 'Maternity Leave',
    'Paternity Leave', 'Professional Development', 'Tuition Reimbursement', 'Relocation Assistance',
    'Housing Allowance', 'Transportation Allowance', 'Meal Allowance', 'Uniform Allowance',
    'Cell Phone Allowance', 'Internet Allowance', 'Gym Membership', 'Wellness Program',
    'Flexible Schedule', 'Remote Work', 'Job Sharing', 'Part-time Options'
  ];

  const permissions = [
    'Patient Management', 'Appointment Scheduling', 'Medical Records', 'Prescription Writing',
    'Lab Orders', 'Imaging Orders', 'Referrals', 'Billing', 'Reports', 'Analytics',
    'Settings', 'User Management', 'System Administration', 'Data Export', 'Data Import'
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        personalInfo: { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '', nationality: '', languages: [], profileImage: null },
        professionalInfo: { licenseNumber: '', specialization: '', department: '', position: '', experience: '', education: [], certifications: [], skills: [], awards: [], publications: [], professionalMemberships: [] },
        contactInfo: { address: '', city: '', state: '', zipCode: '', country: '', emergencyContact: { name: '', relationship: '', phone: '', email: '' } },
        employmentDetails: { employeeId: '', joinDate: '', workSchedule: '', workType: '', salary: '', benefits: [], contractType: '', probationPeriod: '', reportingTo: '', teamSize: '' },
        accountSecurity: { username: '', password: '', confirmPassword: '', twoFactorAuth: false, permissions: [], accessLevel: '', accountStatus: 'active' },
        clinicalInfo: { clinicalInterests: [], researchAreas: [], procedures: [], equipment: [], hospitalAffiliations: [], consultationFee: '', availableSlots: [], consultationDuration: '', telemedicineEnabled: false, languages: [] },
        documents: { resume: null, licenseDocument: null, degreeCertificates: [], identityProof: null, addressProof: null, backgroundCheck: null, medicalLicense: null, deaCertificate: null, boardCertificate: null, malpracticeInsurance: null, immunizationRecords: null }
      });
      setErrors({});
      setTouched({});
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
    
    // Clear error for this field
    if (errors[`${section}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}.${field}`]: ''
      }));
    }
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

  const handleArrayUpdate = (section, field, value, index = null) => {
    setFormData(prev => {
      const currentArray = prev[section][field];
      let newArray;
      
      if (index !== null) {
        newArray = [...currentArray];
        newArray[index] = value;
      } else {
        newArray = [...currentArray, value];
      }
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const handleArrayRemove = (section, field, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleFileUpload = (section, field, file) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: file
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.personalInfo.firstName) newErrors['personalInfo.firstName'] = 'First name is required';
        if (!formData.personalInfo.lastName) newErrors['personalInfo.lastName'] = 'Last name is required';
        if (!formData.personalInfo.email) newErrors['personalInfo.email'] = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
          newErrors['personalInfo.email'] = 'Invalid email format';
        }
        if (!formData.personalInfo.phone) newErrors['personalInfo.phone'] = 'Phone is required';
        if (!formData.personalInfo.dateOfBirth) newErrors['personalInfo.dateOfBirth'] = 'Date of birth is required';
        if (!formData.personalInfo.gender) newErrors['personalInfo.gender'] = 'Gender is required';
        break;
        
      case 2:
        if (!formData.professionalInfo.licenseNumber) newErrors['professionalInfo.licenseNumber'] = 'License number is required';
        if (!formData.professionalInfo.specialization) newErrors['professionalInfo.specialization'] = 'Specialization is required';
        if (!formData.professionalInfo.department) newErrors['professionalInfo.department'] = 'Department is required';
        if (!formData.professionalInfo.position) newErrors['professionalInfo.position'] = 'Position is required';
        if (!formData.professionalInfo.experience) newErrors['professionalInfo.experience'] = 'Experience is required';
        break;
        
      case 3:
        if (!formData.contactInfo.address) newErrors['contactInfo.address'] = 'Address is required';
        if (!formData.contactInfo.city) newErrors['contactInfo.city'] = 'City is required';
        if (!formData.contactInfo.state) newErrors['contactInfo.state'] = 'State is required';
        if (!formData.contactInfo.zipCode) newErrors['contactInfo.zipCode'] = 'Zip code is required';
        if (!formData.contactInfo.country) newErrors['contactInfo.country'] = 'Country is required';
        if (!formData.contactInfo.emergencyContact.name) newErrors['contactInfo.emergencyContact.name'] = 'Emergency contact name is required';
        if (!formData.contactInfo.emergencyContact.phone) newErrors['contactInfo.emergencyContact.phone'] = 'Emergency contact phone is required';
        break;
        
      case 4:
        if (!formData.employmentDetails.employeeId) newErrors['employmentDetails.employeeId'] = 'Employee ID is required';
        if (!formData.employmentDetails.joinDate) newErrors['employmentDetails.joinDate'] = 'Join date is required';
        if (!formData.employmentDetails.workSchedule) newErrors['employmentDetails.workSchedule'] = 'Work schedule is required';
        if (!formData.employmentDetails.workType) newErrors['employmentDetails.workType'] = 'Work type is required';
        if (!formData.employmentDetails.salary) newErrors['employmentDetails.salary'] = 'Salary is required';
        if (!formData.employmentDetails.contractType) newErrors['employmentDetails.contractType'] = 'Contract type is required';
        break;
        
      case 5:
        if (!formData.accountSecurity.username) newErrors['accountSecurity.username'] = 'Username is required';
        if (!formData.accountSecurity.password) newErrors['accountSecurity.password'] = 'Password is required';
        else if (formData.accountSecurity.password.length < 8) {
          newErrors['accountSecurity.password'] = 'Password must be at least 8 characters';
        }
        if (!formData.accountSecurity.confirmPassword) newErrors['accountSecurity.confirmPassword'] = 'Confirm password is required';
        else if (formData.accountSecurity.password !== formData.accountSecurity.confirmPassword) {
          newErrors['accountSecurity.confirmPassword'] = 'Passwords do not match';
        }
        if (!formData.accountSecurity.accessLevel) newErrors['accountSecurity.accessLevel'] = 'Access level is required';
        break;
        
      case 6:
        if (!formData.clinicalInfo.consultationFee) newErrors['clinicalInfo.consultationFee'] = 'Consultation fee is required';
        if (!formData.clinicalInfo.consultationDuration) newErrors['clinicalInfo.consultationDuration'] = 'Consultation duration is required';
        break;
        
      case 7:
        if (!formData.documents.resume) newErrors['documents.resume'] = 'Resume is required';
        if (!formData.documents.licenseDocument) newErrors['documents.licenseDocument'] = 'License document is required';
        if (!formData.documents.identityProof) newErrors['documents.identityProof'] = 'Identity proof is required';
        break;
        
      default:
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        onSave(formData);
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['personalInfo.firstName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
                {errors['personalInfo.firstName'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.firstName']}</p>
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['personalInfo.lastName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
                {errors['personalInfo.lastName'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.lastName']}</p>
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['personalInfo.email'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                />
                {errors['personalInfo.email'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.email']}</p>
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['personalInfo.phone'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors['personalInfo.phone'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.phone']}</p>
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['personalInfo.dateOfBirth'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['personalInfo.dateOfBirth'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.dateOfBirth']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['personalInfo.gender'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors['personalInfo.gender'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['personalInfo.gender']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                <input
                  type="text"
                  value={formData.personalInfo.nationality}
                  onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter nationality"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <label key={lang} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.personalInfo.languages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleArrayUpdate('personalInfo', 'languages', lang);
                          } else {
                            handleArrayRemove('personalInfo', 'languages', formData.personalInfo.languages.indexOf(lang));
                          }
                        }}
                        className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                      />
                      <span className="text-sm text-gray-700">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  {formData.personalInfo.profileImage ? (
                    <img src={URL.createObjectURL(formData.personalInfo.profileImage)} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('personalInfo', 'profileImage', e.target.files[0])}
                    className="hidden"
                    id="profileImage"
                  />
                  <label
                    htmlFor="profileImage"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    Upload Photo
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.professionalInfo.licenseNumber}
                  onChange={(e) => handleInputChange('professionalInfo', 'licenseNumber', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['professionalInfo.licenseNumber'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter license number"
                />
                {errors['professionalInfo.licenseNumber'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['professionalInfo.licenseNumber']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.professionalInfo.specialization}
                  onChange={(e) => handleInputChange('professionalInfo', 'specialization', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['professionalInfo.specialization'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                {errors['professionalInfo.specialization'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['professionalInfo.specialization']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.professionalInfo.department}
                  onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['professionalInfo.department'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors['professionalInfo.department'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['professionalInfo.department']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.professionalInfo.position}
                  onChange={(e) => handleInputChange('professionalInfo', 'position', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['professionalInfo.position'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter position"
                />
                {errors['professionalInfo.position'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['professionalInfo.position']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.professionalInfo.experience}
                  onChange={(e) => handleInputChange('professionalInfo', 'experience', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['professionalInfo.experience'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter years of experience"
                />
                {errors['professionalInfo.experience'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['professionalInfo.experience']}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skills.map((skill) => (
                  <label key={skill} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.professionalInfo.skills.includes(skill)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleArrayUpdate('professionalInfo', 'skills', skill);
                        } else {
                          handleArrayRemove('professionalInfo', 'skills', formData.professionalInfo.skills.indexOf(skill));
                        }
                      }}
                      className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.address}
                  onChange={(e) => handleInputChange('contactInfo', 'address', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['contactInfo.address'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter street address"
                />
                {errors['contactInfo.address'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['contactInfo.address']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.city}
                  onChange={(e) => handleInputChange('contactInfo', 'city', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['contactInfo.city'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter city"
                />
                {errors['contactInfo.city'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['contactInfo.city']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.state}
                  onChange={(e) => handleInputChange('contactInfo', 'state', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['contactInfo.state'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter state"
                />
                {errors['contactInfo.state'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['contactInfo.state']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.zipCode}
                  onChange={(e) => handleInputChange('contactInfo', 'zipCode', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['contactInfo.zipCode'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter zip code"
                />
                {errors['contactInfo.zipCode'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['contactInfo.zipCode']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.country}
                  onChange={(e) => handleInputChange('contactInfo', 'country', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['contactInfo.country'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter country"
                />
                {errors['contactInfo.country'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['contactInfo.country']}</p>
                )}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Emergency Contact</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.emergencyContact.name}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'emergencyContact', 'name', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                      errors['contactInfo.emergencyContact.name'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter emergency contact name"
                  />
                  {errors['contactInfo.emergencyContact.name'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['contactInfo.emergencyContact.name']}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <input
                    type="text"
                    value={formData.contactInfo.emergencyContact.relationship}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'emergencyContact', 'relationship', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                    placeholder="Enter relationship"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contactInfo.emergencyContact.phone}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'emergencyContact', 'phone', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                      errors['contactInfo.emergencyContact.phone'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter emergency contact phone"
                  />
                  {errors['contactInfo.emergencyContact.phone'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['contactInfo.emergencyContact.phone']}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.contactInfo.emergencyContact.email}
                    onChange={(e) => handleNestedInputChange('contactInfo', 'emergencyContact', 'email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                    placeholder="Enter emergency contact email"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Employment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.employmentDetails.employeeId}
                  onChange={(e) => handleInputChange('employmentDetails', 'employeeId', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['employmentDetails.employeeId'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter employee ID"
                />
                {errors['employmentDetails.employeeId'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['employmentDetails.employeeId']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Join Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.employmentDetails.joinDate}
                  onChange={(e) => handleInputChange('employmentDetails', 'joinDate', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['employmentDetails.joinDate'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['employmentDetails.joinDate'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['employmentDetails.joinDate']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Schedule <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employmentDetails.workSchedule}
                  onChange={(e) => handleInputChange('employmentDetails', 'workSchedule', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['employmentDetails.workSchedule'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select work schedule</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="locum">Locum</option>
                  <option value="consultant">Consultant</option>
                </select>
                {errors['employmentDetails.workSchedule'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['employmentDetails.workSchedule']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employmentDetails.workType}
                  onChange={(e) => handleInputChange('employmentDetails', 'workType', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['employmentDetails.workType'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select work type</option>
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="traveling">Traveling</option>
                </select>
                {errors['employmentDetails.workType'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['employmentDetails.workType']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.employmentDetails.salary}
                  onChange={(e) => handleInputChange('employmentDetails', 'salary', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['employmentDetails.salary'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter annual salary"
                />
                {errors['employmentDetails.salary'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['employmentDetails.salary']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employmentDetails.contractType}
                  onChange={(e) => handleInputChange('employmentDetails', 'contractType', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['employmentDetails.contractType'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select contract type</option>
                  <option value="permanent">Permanent</option>
                  <option value="temporary">Temporary</option>
                  <option value="probation">Probation</option>
                  <option value="internship">Internship</option>
                </select>
                {errors['employmentDetails.contractType'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['employmentDetails.contractType']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Probation Period</label>
                <input
                  type="text"
                  value={formData.employmentDetails.probationPeriod}
                  onChange={(e) => handleInputChange('employmentDetails', 'probationPeriod', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="e.g., 3 months"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reporting To</label>
                <input
                  type="text"
                  value={formData.employmentDetails.reportingTo}
                  onChange={(e) => handleInputChange('employmentDetails', 'reportingTo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter reporting manager"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                <input
                  type="number"
                  value={formData.employmentDetails.teamSize}
                  onChange={(e) => handleInputChange('employmentDetails', 'teamSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter team size"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {benefits.map((benefit) => (
                  <label key={benefit} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.employmentDetails.benefits.includes(benefit)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleArrayUpdate('employmentDetails', 'benefits', benefit);
                        } else {
                          handleArrayRemove('employmentDetails', 'benefits', formData.employmentDetails.benefits.indexOf(benefit));
                        }
                      }}
                      className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                    />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Account & Security</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.accountSecurity.username}
                  onChange={(e) => handleInputChange('accountSecurity', 'username', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['accountSecurity.username'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter username"
                />
                {errors['accountSecurity.username'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['accountSecurity.username']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.accountSecurity.accessLevel}
                  onChange={(e) => handleInputChange('accountSecurity', 'accessLevel', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['accountSecurity.accessLevel'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select access level</option>
                  <option value="admin">Administrator</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="staff">Staff</option>
                  <option value="viewer">Viewer</option>
                </select>
                {errors['accountSecurity.accessLevel'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['accountSecurity.accessLevel']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.accountSecurity.password}
                    onChange={(e) => handleInputChange('accountSecurity', 'password', e.target.value)}
                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                      errors['accountSecurity.password'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
                {errors['accountSecurity.password'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['accountSecurity.password']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.accountSecurity.confirmPassword}
                  onChange={(e) => handleInputChange('accountSecurity', 'confirmPassword', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['accountSecurity.confirmPassword'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm password"
                />
                {errors['accountSecurity.confirmPassword'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['accountSecurity.confirmPassword']}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={formData.accountSecurity.twoFactorAuth}
                  onChange={(e) => handleInputChange('accountSecurity', 'twoFactorAuth', e.target.checked)}
                  className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                />
                <label htmlFor="twoFactor" className="text-sm text-gray-700">Enable Two-Factor Authentication</label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {permissions.map((permission) => (
                  <label key={permission} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.accountSecurity.permissions.includes(permission)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleArrayUpdate('accountSecurity', 'permissions', permission);
                        } else {
                          handleArrayRemove('accountSecurity', 'permissions', formData.accountSecurity.permissions.indexOf(permission));
                        }
                      }}
                      className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                    />
                    <span className="text-sm text-gray-700">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Clinical Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.clinicalInfo.consultationFee}
                  onChange={(e) => handleInputChange('clinicalInfo', 'consultationFee', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['clinicalInfo.consultationFee'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter consultation fee"
                />
                {errors['clinicalInfo.consultationFee'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['clinicalInfo.consultationFee']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Duration <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.clinicalInfo.consultationDuration}
                  onChange={(e) => handleInputChange('clinicalInfo', 'consultationDuration', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['clinicalInfo.consultationDuration'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select duration</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
                {errors['clinicalInfo.consultationDuration'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['clinicalInfo.consultationDuration']}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="telemedicine"
                  checked={formData.clinicalInfo.telemedicineEnabled}
                  onChange={(e) => handleInputChange('clinicalInfo', 'telemedicineEnabled', e.target.checked)}
                  className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                />
                <label htmlFor="telemedicine" className="text-sm text-gray-700">Enable Telemedicine</label>
              </div>
            </div>
          </div>
        );
        
      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Documents & Verification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload('documents', 'resume', e.target.files[0])}
                    className="hidden"
                    id="resume"
                  />
                  <label
                    htmlFor="resume"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Resume
                  </label>
                  {formData.documents.resume && (
                    <span className="text-sm text-gray-600">{formData.documents.resume.name}</span>
                  )}
                </div>
                {errors['documents.resume'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['documents.resume']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Document <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('documents', 'licenseDocument', e.target.files[0])}
                    className="hidden"
                    id="licenseDocument"
                  />
                  <label
                    htmlFor="licenseDocument"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Upload License
                  </label>
                  {formData.documents.licenseDocument && (
                    <span className="text-sm text-gray-600">{formData.documents.licenseDocument.name}</span>
                  )}
                </div>
                {errors['documents.licenseDocument'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['documents.licenseDocument']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Identity Proof <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('documents', 'identityProof', e.target.files[0])}
                    className="hidden"
                    id="identityProof"
                  />
                  <label
                    htmlFor="identityProof"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Upload ID Proof
                  </label>
                  {formData.documents.identityProof && (
                    <span className="text-sm text-gray-600">{formData.documents.identityProof.name}</span>
                  )}
                </div>
                {errors['documents.identityProof'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['documents.identityProof']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Proof</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload('documents', 'addressProof', e.target.files[0])}
                    className="hidden"
                    id="addressProof"
                  />
                  <label
                    htmlFor="addressProof"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Address Proof
                  </label>
                  {formData.documents.addressProof && (
                    <span className="text-sm text-gray-600">{formData.documents.addressProof.name}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
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
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Doctor</h2>
                <p className="text-gray-600 mt-1">Complete the form to add a new doctor to the system</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
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
                      className={`text-sm font-medium ${
                        currentStep === step.id
                          ? 'text-[#5DBB63]'
                          : currentStep > step.id
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
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

          {/* Form Content */}
          <div className="p-6">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </div>
              <div className="flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                {currentStep < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </div>
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddDoctorForm;
