import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Save,
  User,
  MapPin,
  Heart,
  Activity,
  Shield,
  UserCheck,
  Settings,
  FileText,
  Eye,
  EyeOff,
  Upload,
  Calendar,
  Phone,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  CreditCard,
  Baby,
  Weight,
  Ruler,
  Stethoscope,
  Pill,
  Syringe,
  TestTube,
  FlaskConical,
  Beaker,
  Microscope,
  Dna,
  Activity as ActivityIcon,
  Heart as HeartIcon,
  Brain,
  Bone,
  Tooth,
  Eye as EyeIcon,
  Ear as EarIcon,
  Nose,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Frown,
  Smile,
  Zap,
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Moon,
  Wind,
  Thermometer,
  Droplet,
  Gauge,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  HelpCircle,
  File,
  FilePlus,
  FileText as FileTextIcon,
  Download,
  Upload as UploadIcon,
  Camera,
  Image as ImageIcon,
  Video,
  Music,
  Headphones,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  BatteryFull,
  Power,
  PowerOff,
  RefreshCw,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Move,
  Copy,
  Clipboard,
  Scissors,
  Edit,
  Edit2,
  Edit3,
  Trash,
  Trash2,
  Archive,
  ArchiveRestore,
  Package,
  ShoppingBag,
  ShoppingCart,
  CreditCard as CreditCardIcon,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  Coins,
  PiggyBank,
  Wallet,
  Receipt,
  FileInvoice,
  FileInvoice2,
  Calculator,
  Percent,
  Hash,
  AtSign,
  Ampersand,
  Slash,
  Backslash,
  Pipe,
  Underscore,
  Hyphen,
  Equal,
  Plus,
  Minus,
  Multiply,
  Divide,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Target,
  Crosshair,
  Anchor,
  Link,
  Link2,
  Unlink,
  Chain,
  Unlock,
  Lock,
  Key,
  Fingerprint,
  UserPlus,
  UserMinus,
  UserX,
  UserCheck as UserCheckIcon,
  Users,
  UserCircle,
  UserSquare,
  UserCog,
  UserShield,
  Baby,
  Weight,
  Ruler,
  Stethoscope,
  Pill,
  Syringe,
  TestTube,
  FlaskConical,
  Beaker,
  Microscope,
  Dna,
  Activity as ActivityIcon2,
  Heart as HeartIcon2,
  Brain,
  Bone,
  Tooth,
  Eye as EyeIcon2,
  Ear as EarIcon2,
  Nose as NoseIcon2,
  ThumbsUp as ThumbsUpIcon2,
  ThumbsDown as ThumbsDownIcon2,
  Meh as MehIcon2,
  Frown as FrownIcon2,
  Smile as SmileIcon2,
  Zap as ZapIcon2,
  Cloud as CloudIcon2,
  CloudRain as CloudRainIcon2,
  CloudSnow as CloudSnowIcon2,
  Zap as ZapIcon2,
  ChevronDown as ChevronDownIcon2,
  ChevronUp as ChevronUpIcon2,
  ChevronRight as ChevronRightIcon2,
  ChevronLeft as ChevronLeftIcon2,
  MoreVertical as MoreVerticalIcon2,
  MoreHorizontal as MoreHorizontalIcon2,
  Settings as SettingsIcon2,
  HelpCircle as HelpCircleIcon2,
  Info as InfoIcon2,
  AlertTriangle as AlertTriangleIcon2,
  CheckSquare as CheckSquareIcon2,
  UserShield as UserShieldIcon2
} from 'lucide-react';

const AddPatientForm = ({ isOpen, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      age: '',
      bloodType: '',
      nationality: '',
      languages: [],
      profileImage: null,
      maritalStatus: '',
      occupation: '',
      religion: ''
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
        email: '',
        address: ''
      },
      primaryContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      }
    },
    medicalInfo: {
      primaryPhysician: '',
      referringPhysician: '',
      allergies: [],
      chronicConditions: [],
      medications: [],
      surgeries: [],
      familyHistory: [],
      socialHistory: {
        smoking: false,
        alcohol: false,
        drugs: false,
        exercise: '',
        diet: ''
      },
      immunizations: [],
      disabilities: [],
      disabilitiesAccommodations: []
    },
    vitalSigns: {
      height: '',
      weight: '',
      bmi: '',
      bloodPressure: '',
      heartRate: '',
      respiratoryRate: '',
      temperature: '',
      oxygenSaturation: '',
      glucose: '',
      lastUpdated: ''
    },
    insuranceInfo: {
      primaryInsurance: {
        provider: '',
        policyNumber: '',
        groupNumber: '',
        subscriberName: '',
        subscriberRelationship: '',
        effectiveDate: '',
        expirationDate: ''
      },
      secondaryInsurance: {
        provider: '',
        policyNumber: '',
        groupNumber: '',
        subscriberName: '',
        subscriberRelationship: '',
        effectiveDate: '',
        expirationDate: ''
      },
      medicare: {
        partA: false,
        partB: false,
        partC: false,
        partD: false,
        claimNumber: ''
      },
      medicaid: {
        enrolled: false,
        caseNumber: '',
        state: ''
      }
    },
    accountSecurity: {
      username: '',
      password: '',
      confirmPassword: '',
      twoFactorAuth: false,
      permissions: [],
      accessLevel: 'patient',
      accountStatus: 'active',
      patientPortal: true,
      mobileApp: true
    },
    preferences: {
      preferredLanguage: '',
      communicationMethod: '',
      appointmentReminders: true,
      medicationReminders: true,
      billingReminders: true,
      healthTips: true,
      newsletter: false,
      privacySettings: {
        shareData: false,
        researchParticipation: false,
        marketingConsent: false
      }
    },
    documents: {
      idProof: null,
      insuranceCard: null,
      medicalRecords: [],
      consentForms: [],
      photoId: null,
      birthCertificate: null,
      socialSecurityCard: null,
      powerOfAttorney: null,
      livingWill: null,
      organDonation: null
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Contact', icon: MapPin },
    { id: 3, name: 'Medical', icon: Heart },
    { id: 4, name: 'Vital Signs', icon: Activity },
    { id: 5, name: 'Insurance', icon: Shield },
    { id: 6, name: 'Account', icon: UserCheck },
    { id: 7, name: 'Preferences', icon: Settings },
    { id: 8, name: 'Documents', icon: FileText }
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu',
    'Indonesian', 'Malay', 'Thai', 'Vietnamese', 'Tagalog', 'Turkish', 'Persian'
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        personalInfo: { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', gender: '', age: '', bloodType: '', nationality: '', languages: [], profileImage: null, maritalStatus: '', occupation: '', religion: '' },
        contactInfo: { address: '', city: '', state: '', zipCode: '', country: '', emergencyContact: { name: '', relationship: '', phone: '', email: '', address: '' }, primaryContact: { name: '', relationship: '', phone: '', email: '' } },
        medicalInfo: { primaryPhysician: '', referringPhysician: '', allergies: [], chronicConditions: [], medications: [], surgeries: [], familyHistory: [], socialHistory: { smoking: false, alcohol: false, drugs: false, exercise: '', diet: '' }, immunizations: [], disabilities: [], disabilitiesAccommodations: [] },
        vitalSigns: { height: '', weight: '', bmi: '', bloodPressure: '', heartRate: '', respiratoryRate: '', temperature: '', oxygenSaturation: '', glucose: '', lastUpdated: '' },
        insuranceInfo: { primaryInsurance: { provider: '', policyNumber: '', groupNumber: '', subscriberName: '', subscriberRelationship: '', effectiveDate: '', expirationDate: '' }, secondaryInsurance: { provider: '', policyNumber: '', groupNumber: '', subscriberName: '', subscriberRelationship: '', effectiveDate: '', expirationDate: '' }, medicare: { partA: false, partB: false, partC: false, partD: false, claimNumber: '' }, medicaid: { enrolled: false, caseNumber: '', state: '' } },
        accountSecurity: { username: '', password: '', confirmPassword: '', twoFactorAuth: false, permissions: [], accessLevel: 'patient', accountStatus: 'active', patientPortal: true, mobileApp: true },
        preferences: { preferredLanguage: '', communicationMethod: '', appointmentReminders: true, medicationReminders: true, billingReminders: true, healthTips: true, newsletter: false, privacySettings: { shareData: false, researchParticipation: false, marketingConsent: false } },
        documents: { idProof: null, insuranceCard: null, medicalRecords: [], consentForms: [], photoId: null, birthCertificate: null, socialSecurityCard: null, powerOfAttorney: null, livingWill: null, organDonation: null }
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
    
    // Calculate age when date of birth changes
    if (section === 'personalInfo' && field === 'dateOfBirth') {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          age: age.toString()
        }
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
      const currentArray = [...prev[section][field]];
      if (index !== null) {
        currentArray[index] = value;
      } else {
        currentArray.push(value);
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: currentArray
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
        if (!formData.contactInfo.address.trim()) {
          newErrors['contactInfo.address'] = 'Address is required';
        }
        if (!formData.contactInfo.city.trim()) {
          newErrors['contactInfo.city'] = 'City is required';
        }
        if (!formData.contactInfo.state.trim()) {
          newErrors['contactInfo.state'] = 'State is required';
        }
        if (!formData.contactInfo.zipCode.trim()) {
          newErrors['contactInfo.zipCode'] = 'ZIP code is required';
        }
        if (!formData.contactInfo.country.trim()) {
          newErrors['contactInfo.country'] = 'Country is required';
        }
        break;
        
      case 3:
        if (!formData.medicalInfo.primaryPhysician.trim()) {
          newErrors['medicalInfo.primaryPhysician'] = 'Primary physician is required';
        }
        break;
        
      case 4:
        if (!formData.vitalSigns.height.trim()) {
          newErrors['vitalSigns.height'] = 'Height is required';
        }
        if (!formData.vitalSigns.weight.trim()) {
          newErrors['vitalSigns.weight'] = 'Weight is required';
        }
        if (!formData.vitalSigns.bloodPressure.trim()) {
          newErrors['vitalSigns.bloodPressure'] = 'Blood pressure is required';
        }
        break;
        
      case 5:
        if (!formData.insuranceInfo.primaryInsurance.provider.trim()) {
          newErrors['insuranceInfo.primaryInsurance.provider'] = 'Insurance provider is required';
        }
        if (!formData.insuranceInfo.primaryInsurance.policyNumber.trim()) {
          newErrors['insuranceInfo.primaryInsurance.policyNumber'] = 'Policy number is required';
        }
        break;
        
      case 6:
        if (!formData.accountSecurity.username.trim()) {
          newErrors['accountSecurity.username'] = 'Username is required';
        }
        if (!formData.accountSecurity.password.trim()) {
          newErrors['accountSecurity.password'] = 'Password is required';
        } else if (formData.accountSecurity.password.length < 8) {
          newErrors['accountSecurity.password'] = 'Password must be at least 8 characters';
        }
        if (!formData.accountSecurity.confirmPassword.trim()) {
          newErrors['accountSecurity.confirmPassword'] = 'Please confirm password';
        } else if (formData.accountSecurity.password !== formData.accountSecurity.confirmPassword) {
          newErrors['accountSecurity.confirmPassword'] = 'Passwords do not match';
        }
        break;
        
      case 7:
        if (!formData.preferences.preferredLanguage.trim()) {
          newErrors['preferences.preferredLanguage'] = 'Preferred language is required';
        }
        if (!formData.preferences.communicationMethod.trim()) {
          newErrors['preferences.communicationMethod'] = 'Communication method is required';
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
        console.error('Error saving patient:', error);
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
                  Age
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.age}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Calculated automatically"
                />
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
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors['personalInfo.gender'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['personalInfo.gender']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                <select
                  value={formData.personalInfo.bloodType}
                  onChange={(e) => handleInputChange('personalInfo', 'bloodType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">Select blood type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.nationality}
                  onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  placeholder="Enter nationality"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marital Status
                </label>
                <select
                  value={formData.personalInfo.maritalStatus}
                  onChange={(e) => handleInputChange('personalInfo', 'maritalStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">Select marital status</option>
                  {maritalStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.occupation}
                  onChange={(e) => handleInputChange('personalInfo', 'occupation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  placeholder="Enter occupation"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.religion}
                  onChange={(e) => handleInputChange('personalInfo', 'religion', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  placeholder="Enter religion"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="flex flex-wrap gap-2">
                  {languages.map(lang => (
                    <label key={lang} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.personalInfo.languages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleArrayUpdate('personalInfo', 'languages', lang);
                          } else {
                            const index = formData.personalInfo.languages.indexOf(lang);
                            handleArrayRemove('personalInfo', 'languages', index);
                          }
                        }}
                        className="mr-2"
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('personalInfo', 'profileImage', e.target.files[0])}
                    className="hidden"
                    id="profileImage"
                  />
                  <label
                    htmlFor="profileImage"
                    className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </label>
                  {formData.personalInfo.profileImage && (
                    <span className="text-sm text-gray-600">
                      {formData.personalInfo.profileImage.name}
                    </span>
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
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
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

          {/* Form Content */}
          <div className="p-6">
            {renderStepContent()}
          </div>

          {/* Footer */}
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
                      Save Patient
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

export default AddPatientForm;
