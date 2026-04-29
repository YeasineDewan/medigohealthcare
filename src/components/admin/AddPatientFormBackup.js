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
  Heart,
  Activity,
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
  Ear,
  Nose,
  Lungs,
  Kidney,
  Stomach,
  Liver,
  Intestine,
  BloodType,
  ThermometerSun,
  Wind as WindIcon,
  Droplets as DropletsIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  CloudRain as CloudRainIcon,
  CloudSnow as CloudSnowIcon,
  Zap as ZapIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  MoreVertical as MoreVerticalIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  Info as InfoIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckSquare as CheckSquareIcon,
  Square as SquareIcon,
  Minus as MinusIcon,
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  Users2 as Users2Icon,
  UserCircle as UserCircleIcon,
  UserSquare as UserSquareIcon,
  UserCog as UserCogIcon,
  UserShield as UserShieldIcon,
  Baby as BabyIcon,
  Weight as WeightIcon,
  Ruler as RulerIcon,
  Stethoscope as StethoscopeIcon,
  Pill as PillIcon,
  Syringe as SyringeIcon,
  TestTube as TestTubeIcon,
  FlaskConical as FlaskConicalIcon,
  Beaker as BeakerIcon,
  Microscope as MicroscopeIcon,
  Dna as DnaIcon,
  Activity as ActivityIcon2,
  Heart as HeartIcon2,
  Brain as BrainIcon,
  Bone as BoneIcon,
  Tooth as ToothIcon,
  Eye as EyeIcon2,
  Ear as EarIcon,
  Nose as NoseIcon,
  Lungs as LungsIcon,
  Kidney as KidneyIcon,
  Stomach as StomachIcon,
  Liver as LiverIcon,
  Intestine as IntestineIcon,
  BloodType as BloodTypeIcon,
  ThermometerSun as ThermometerSunIcon,
  Wind as WindIcon2,
  Droplets as DropletsIcon2,
  Sun as SunIcon2,
  Moon as MoonIcon2,
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
  Square as SquareIcon2,
  Minus as MinusIcon2,
  PlusCircle as PlusCircleIcon2,
  MinusCircle as MinusCircleIcon2,
  UserPlus as UserPlusIcon2,
  UserMinus as UserMinusIcon2,
  UserCheck as UserCheckIcon2,
  UserX as UserXIcon2,
  Users2 as Users2Icon2,
  UserCircle as UserCircleIcon2,
  UserSquare as UserSquareIcon2,
  UserCog as UserCogIcon2,
  UserShield as UserShieldIcon2
} from 'lucide-react';

const AddPatientForm = ({ isOpen, onClose, onSave }) => {
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
      age: '',
      bloodType: '',
      nationality: '',
      languages: [],
      profileImage: null,
      maritalStatus: '',
      occupation: '',
      religion: ''
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
    
    // Medical Information
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
    
    // Vital Signs
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
    
    // Insurance Information
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
    
    // Account & Security
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
    
    // Preferences
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
    
    // Documents & Verification
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
  }, [isOpen]);

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

  const allergies = [
    'Penicillin', 'Sulfa drugs', 'Aspirin', 'Ibuprofen', 'Naproxen', 'Codeine',
    'Morphine', 'Latex', 'Eggs', 'Milk', 'Peanuts', 'Tree nuts', 'Shellfish',
    'Fish', 'Wheat', 'Soy', 'Sesame', 'Dust mites', 'Pollen', 'Mold', 'Pet dander',
    'Insect stings', 'Cosmetics', 'Fragrances', 'Nickel', 'Cobalt', 'Chromium'
  ];

  const chronicConditions = [
    'Hypertension', 'Diabetes Type 1', 'Diabetes Type 2', 'Heart Disease', 'Coronary Artery Disease',
    'Heart Failure', 'Arrhythmia', 'Stroke', 'Asthma', 'COPD', 'Sleep Apnea',
    'Arthritis', 'Osteoporosis', 'Cancer', 'Depression', 'Anxiety', 'Bipolar Disorder',
    'Schizophrenia', 'Epilepsy', 'Multiple Sclerosis', 'Parkinson\'s Disease',
    'Alzheimer\'s Disease', 'Kidney Disease', 'Liver Disease', 'Hepatitis', 'HIV/AIDS',
    'Thyroid Disease', 'Autoimmune Diseases', 'IBS', 'Crohn\'s Disease', 'Ulcerative Colitis'
  ];

  const medications = [
    'Aspirin', 'Ibuprofen', 'Acetaminophen', 'Lisinopril', 'Metoprolol', 'Amlodipine',
    'Atorvastatin', 'Metformin', 'Insulin', 'Warfarin', 'Plavix', 'Lasix',
    'Prednisone', 'Albuterol', 'Ventolin', 'Spiriva', 'Advair', 'Singulair',
    'Prozac', 'Zoloft', 'Lexapro', 'Wellbutrin', 'Xanax', 'Valium',
    'Vicodin', 'Percocet', 'OxyContin', 'Methadone', 'Suboxone', 'Narcan'
  ];

  const surgeries = [
    'Appendectomy', 'Gallbladder removal', 'Hernia repair', 'Cataract surgery',
    'Joint replacement', 'Heart bypass', 'Valve replacement', 'Angioplasty',
    'Stent placement', 'Pacemaker implantation', 'Defibrillator implantation',
    'Kidney transplant', 'Liver transplant', 'Heart transplant', 'Lung transplant',
    'C-section', 'Hysterectomy', 'Prostatectomy', 'Mastectomy', 'Lumpectomy',
    'Spine surgery', 'Brain surgery', 'Cosmetic surgery', 'Dental surgery'
  ];

  const familyHistory = [
    'Heart Disease', 'High Blood Pressure', 'Stroke', 'Diabetes', 'Cancer',
    'Alzheimer\'s Disease', 'Arthritis', 'Osteoporosis', 'Asthma', 'COPD',
    'Kidney Disease', 'Liver Disease', 'Thyroid Disease', 'Autoimmune Diseases',
    'Mental Illness', 'Genetic Disorders', 'Birth Defects', 'Obesity',
    'Substance Abuse', 'Suicide', 'Infertility', 'Pregnancy Complications'
  ];

  const immunizations = [
    'Hepatitis B', 'DTaP', 'Polio', 'MMR', 'Varicella', 'Hib', 'PCV13',
    'Rotavirus', 'Influenza', 'HPV', 'Meningococcal', 'Shingles', 'Pneumococcal',
    'Tdap', 'Td', 'MMRV', 'Hepatitis A', 'Typhoid', 'Rabies', 'Yellow Fever',
    'Japanese Encephalitis', 'Tick-borne Encephalitis', 'Cholera', 'BCG'
  ];

  const disabilities = [
    'Visual Impairment', 'Hearing Impairment', 'Mobility Impairment', 'Speech Impairment',
    'Cognitive Disability', 'Learning Disability', 'Mental Health Condition', 'Chronic Illness',
    'Autism Spectrum', 'ADHD', 'Dyslexia', 'Dyscalculia', 'Dysgraphia', 'Traumatic Brain Injury',
    'Spinal Cord Injury', 'Multiple Sclerosis', 'Cerebral Palsy', 'Muscular Dystrophy',
    'Amputation', 'Burn Injury', 'Stroke', 'Parkinson\'s Disease', 'Alzheimer\'s Disease'
  ];

  const communicationMethods = ['Email', 'Phone', 'SMS', 'Mail', 'Patient Portal', 'Mobile App'];
  const preferredLanguages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic'];

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
        dateOfBirth: value,
        age: age.toString()
      }
    }));
  }
  
  // Calculate BMI when height or weight changes
  if (section === 'vitalSigns' && (field === 'height' || field === 'weight')) {
    const height = field === 'height' ? value : formData.vitalSigns.height;
    const weight = field === 'weight' ? value : formData.vitalSigns.weight;
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
      setFormData(prev => ({
        ...prev,
        vitalSigns: {
          ...prev.vitalSigns,
          [field]: value,
          bmi: bmi
        }
      }));
    }
  }
  
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
      if (!formData.personalInfo.bloodType) newErrors['personalInfo.bloodType'] = 'Blood type is required';
      break;
      
    case 2:
      if (!formData.contactInfo.address) newErrors['contactInfo.address'] = 'Address is required';
      if (!formData.contactInfo.city) newErrors['contactInfo.city'] = 'City is required';
      if (!formData.contactInfo.state) newErrors['contactInfo.state'] = 'State is required';
      if (!formData.contactInfo.zipCode) newErrors['contactInfo.zipCode'] = 'Zip code is required';
      if (!formData.contactInfo.country) newErrors['contactInfo.country'] = 'Country is required';
      if (!formData.contactInfo.emergencyContact.name) newErrors['contactInfo.emergencyContact.name'] = 'Emergency contact name is required';
      if (!formData.contactInfo.emergencyContact.phone) newErrors['contactInfo.emergencyContact.phone'] = 'Emergency contact phone is required';
      break;
      
    case 3:
      if (!formData.medicalInfo.primaryPhysician) newErrors['medicalInfo.primaryPhysician'] = 'Primary physician is required';
      break;
      
    case 4:
      if (!formData.vitalSigns.height) newErrors['vitalSigns.height'] = 'Height is required';
      if (!formData.vitalSigns.weight) newErrors['vitalSigns.weight'] = 'Weight is required';
      if (!formData.vitalSigns.bloodPressure) newErrors['vitalSigns.bloodPressure'] = 'Blood pressure is required';
      break;
      
    case 5:
      if (!formData.insuranceInfo.primaryInsurance.provider) newErrors['insuranceInfo.primaryInsurance.provider'] = 'Primary insurance provider is required';
      if (!formData.insuranceInfo.primaryInsurance.policyNumber) newErrors['insuranceInfo.primaryInsurance.policyNumber'] = 'Policy number is required';
      break;
      
    case 6:
      if (!formData.accountSecurity.username) newErrors['accountSecurity.username'] = 'Username is required';
      if (!formData.accountSecurity.password) newErrors['accountSecurity.password'] = 'Password is required';
      else if (formData.accountSecurity.password.length < 8) {
        newErrors['accountSecurity.password'] = 'Password must be at least 8 characters';
      }
      if (!formData.accountSecurity.confirmPassword) newErrors['accountSecurity.confirmPassword'] = 'Confirm password is required';
      else if (formData.accountSecurity.password !== formData.accountSecurity.confirmPassword) {
        newErrors['accountSecurity.confirmPassword'] = 'Passwords do not match';
      }
      break;
      
    case 7:
      if (!formData.preferences.preferredLanguage) newErrors['preferences.preferredLanguage'] = 'Preferred language is required';
      if (!formData.preferences.communicationMethod) newErrors['preferences.communicationMethod'] = 'Communication method is required';
      break;
      
    case 8:
      if (!formData.documents.idProof) newErrors['documents.idProof'] = 'ID proof is required';
      if (!formData.documents.insuranceCard) newErrors['documents.insuranceCard'] = 'Insurance card is required';
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="text"
                value={formData.personalInfo.age}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
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
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['personalInfo.gender'] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
              {errors['personalInfo.gender'] && (
                <p className="mt-1 text-sm text-red-600">{errors['personalInfo.gender']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.personalInfo.bloodType}
                onChange={(e) => handleInputChange('personalInfo', 'bloodType', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['personalInfo.bloodType'] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select blood type</option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors['personalInfo.bloodType'] && (
                <p className="mt-1 text-sm text-red-600">{errors['personalInfo.bloodType']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
              <select
                value={formData.personalInfo.maritalStatus}
                onChange={(e) => handleInputChange('personalInfo', 'maritalStatus', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              >
                <option value="">Select marital status</option>
                {maritalStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
              <input
                type="text"
                value={formData.personalInfo.occupation}
                onChange={(e) => handleInputChange('personalInfo', 'occupation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter occupation"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
              <input
                type="text"
                value={formData.personalInfo.religion}
                onChange={(e) => handleInputChange('personalInfo', 'religion', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter religion"
              />
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
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Address</label>
                <input
                  type="text"
                  value={formData.contactInfo.emergencyContact.address}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'emergencyContact', 'address', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter emergency contact address"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Primary Contact (if different from patient)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.contactInfo.primaryContact.name}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'primaryContact', 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter primary contact name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <input
                  type="text"
                  value={formData.contactInfo.primaryContact.relationship}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'primaryContact', 'relationship', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter relationship"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.contactInfo.primaryContact.phone}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'primaryContact', 'phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter primary contact phone"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.contactInfo.primaryContact.email}
                  onChange={(e) => handleNestedInputChange('contactInfo', 'primaryContact', 'email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter primary contact email"
                />
              </div>
            </div>
          </div>
        </div>
      );
      
    case 3:
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Physician <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.medicalInfo.primaryPhysician}
                onChange={(e) => handleInputChange('medicalInfo', 'primaryPhysician', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['medicalInfo.primaryPhysician'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter primary physician name"
              />
              {errors['medicalInfo.primaryPhysician'] && (
                <p className="mt-1 text-sm text-red-600">{errors['medicalInfo.primaryPhysician']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Referring Physician</label>
              <input
                type="text"
                value={formData.medicalInfo.referringPhysician}
                onChange={(e) => handleInputChange('medicalInfo', 'referringPhysician', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter referring physician name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {allergies.map((allergy) => (
                <label key={allergy} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.medicalInfo.allergies.includes(allergy)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleArrayUpdate('medicalInfo', 'allergies', allergy);
                      } else {
                        handleArrayRemove('medicalInfo', 'allergies', formData.medicalInfo.allergies.indexOf(allergy));
                      }
                    }}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">{allergy}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Conditions</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {chronicConditions.map((condition) => (
                <label key={condition} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.medicalInfo.chronicConditions.includes(condition)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleArrayUpdate('medicalInfo', 'chronicConditions', condition);
                      } else {
                        handleArrayRemove('medicalInfo', 'chronicConditions', formData.medicalInfo.chronicConditions.indexOf(condition));
                      }
                    }}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">{condition}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {medications.map((medication) => (
                <label key={medication} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.medicalInfo.medications.includes(medication)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleArrayUpdate('medicalInfo', 'medications', medication);
                      } else {
                        handleArrayRemove('medicalInfo', 'medications', formData.medicalInfo.medications.indexOf(medication));
                      }
                    }}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">{medication}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Surgeries</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {surgeries.map((surgery) => (
                <label key={surgery} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.medicalInfo.surgeries.includes(surgery)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleArrayUpdate('medicalInfo', 'surgeries', surgery);
                      } else {
                        handleArrayRemove('medicalInfo', 'surgeries', formData.medicalInfo.surgeries.indexOf(surgery));
                      }
                    }}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">{surgery}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Family History</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {familyHistory.map((condition) => (
                <label key={condition} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.medicalInfo.familyHistory.includes(condition)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleArrayUpdate('medicalInfo', 'familyHistory', condition);
                      } else {
                        handleArrayRemove('medicalInfo', 'familyHistory', formData.medicalInfo.familyHistory.indexOf(condition));
                      }
                    }}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">{condition}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Social History</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="smoking"
                    checked={formData.medicalInfo.socialHistory.smoking}
                    onChange={(e) => handleNestedInputChange('medicalInfo', 'socialHistory', 'smoking', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="smoking" className="text-sm text-gray-700">Smoking</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="alcohol"
                    checked={formData.medicalInfo.socialHistory.alcohol}
                    onChange={(e) => handleNestedInputChange('medicalInfo', 'socialHistory', 'alcohol', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="alcohol" className="text-sm text-gray-700">Alcohol</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="drugs"
                    checked={formData.medicalInfo.socialHistory.drugs}
                    onChange={(e) => handleNestedInputChange('medicalInfo', 'socialHistory', 'drugs', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="drugs" className="text-sm text-gray-700">Recreational Drugs</label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exercise</label>
                  <select
                    value={formData.medicalInfo.socialHistory.exercise}
                    onChange={(e) => handleNestedInputChange('medicalInfo', 'socialHistory', 'exercise', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="">Select exercise level</option>
                    <option value="none">None</option>
                    <option value="light">Light (1-2 times/week)</option>
                    <option value="moderate">Moderate (3-4 times/week)</option>
                    <option value="heavy">Heavy (5+ times/week)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diet</label>
                  <select
                    value={formData.medicalInfo.socialHistory.diet}
                    onChange={(e) => handleNestedInputChange('medicalInfo', 'socialHistory', 'diet', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="">Select diet type</option>
                    <option value="balanced">Balanced</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="low-carb">Low Carb</option>
                    <option value="low-fat">Low Fat</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Immunizations</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {immunizations.map((immunization) => (
                <label key={immunization} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.medicalInfo.immunizations.includes(immunization)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleArrayUpdate('medicalInfo', 'immunizations', immunization);
                      } else {
                        handleArrayRemove('medicalInfo', 'immunizations', formData.medicalInfo.immunizations.indexOf(immunization));
                      }
                    }}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">{immunization}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disabilities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {disabilities.map((disability) => (
                <label key={disability} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.medicalInfo.disabilities.includes(disability)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleArrayUpdate('medicalInfo', 'disabilities', disability);
                      } else {
                        handleArrayRemove('medicalInfo', 'disabilities', formData.medicalInfo.disabilities.indexOf(disability));
                      }
                    }}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">{disability}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
      
    case 4:
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Vital Signs</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.vitalSigns.height}
                onChange={(e) => handleInputChange('vitalSigns', 'height', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['vitalSigns.height'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter height in cm"
              />
              {errors['vitalSigns.height'] && (
                <p className="mt-1 text-sm text-red-600">{errors['vitalSigns.height']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.vitalSigns.weight}
                onChange={(e) => handleInputChange('vitalSigns', 'weight', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['vitalSigns.weight'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter weight in kg"
              />
              {errors['vitalSigns.weight'] && (
                <p className="mt-1 text-sm text-red-600">{errors['vitalSigns.weight']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
              <input
                type="text"
                value={formData.vitalSigns.bmi}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Calculated automatically"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Pressure <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.vitalSigns.bloodPressure}
                onChange={(e) => handleInputChange('vitalSigns', 'bloodPressure', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['vitalSigns.bloodPressure'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 120/80"
              />
              {errors['vitalSigns.bloodPressure'] && (
                <p className="mt-1 text-sm text-red-600">{errors['vitalSigns.bloodPressure']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
              <input
                type="number"
                value={formData.vitalSigns.heartRate}
                onChange={(e) => handleInputChange('vitalSigns', 'heartRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter heart rate"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Respiratory Rate (breaths/min)</label>
              <input
                type="number"
                value={formData.vitalSigns.respiratoryRate}
                onChange={(e) => handleInputChange('vitalSigns', 'respiratoryRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter respiratory rate"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°F)</label>
              <input
                type="number"
                value={formData.vitalSigns.temperature}
                onChange={(e) => handleInputChange('vitalSigns', 'temperature', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter temperature"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Oxygen Saturation (%)</label>
              <input
                type="number"
                value={formData.vitalSigns.oxygenSaturation}
                onChange={(e) => handleInputChange('vitalSigns', 'oxygenSaturation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter oxygen saturation"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Glucose (mg/dL)</label>
              <input
                type="number"
                value={formData.vitalSigns.glucose}
                onChange={(e) => handleInputChange('vitalSigns', 'glucose', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Enter glucose level"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
              <input
                type="datetime-local"
                value={formData.vitalSigns.lastUpdated}
                onChange={(e) => handleInputChange('vitalSigns', 'lastUpdated', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
          </div>
        </div>
      );
      
    case 5:
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Insurance Information</h3>
          
          <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Primary Insurance</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.insuranceInfo.primaryInsurance.provider}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'primaryInsurance', 'provider', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['insuranceInfo.primaryInsurance.provider'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter insurance provider"
                />
                {errors['insuranceInfo.primaryInsurance.provider'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['insuranceInfo.primaryInsurance.provider']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.insuranceInfo.primaryInsurance.policyNumber}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'primaryInsurance', 'policyNumber', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                    errors['insuranceInfo.primaryInsurance.policyNumber'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter policy number"
                />
                {errors['insuranceInfo.primaryInsurance.policyNumber'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['insuranceInfo.primaryInsurance.policyNumber']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.primaryInsurance.groupNumber}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'primaryInsurance', 'groupNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter group number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Name</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.primaryInsurance.subscriberName}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'primaryInsurance', 'subscriberName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter subscriber name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Relationship</label>
                <select
                  value={formData.insuranceInfo.primaryInsurance.subscriberRelationship}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'primaryInsurance', 'subscriberRelationship', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="">Select relationship</option>
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Effective Date</label>
                <input
                  type="date"
                  value={formData.insuranceInfo.primaryInsurance.effectiveDate}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'primaryInsurance', 'effectiveDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                <input
                  type="date"
                  value={formData.insuranceInfo.primaryInsurance.expirationDate}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'primaryInsurance', 'expirationDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Secondary Insurance</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.secondaryInsurance.provider}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'secondaryInsurance', 'provider', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter insurance provider"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.secondaryInsurance.policyNumber}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'secondaryInsurance', 'policyNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter policy number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.secondaryInsurance.groupNumber}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'secondaryInsurance', 'groupNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter group number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Name</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.secondaryInsurance.subscriberName}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'secondaryInsurance', 'subscriberName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter subscriber name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Relationship</label>
                <select
                  value={formData.insuranceInfo.secondaryInsurance.subscriberRelationship}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'secondaryInsurance', 'subscriberRelationship', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="">Select relationship</option>
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Effective Date</label>
                <input
                  type="date"
                  value={formData.insuranceInfo.secondaryInsurance.effectiveDate}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'secondaryInsurance', 'effectiveDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                <input
                  type="date"
                  value={formData.insuranceInfo.secondaryInsurance.expirationDate}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'secondaryInsurance', 'expirationDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Medicare</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="partA"
                    checked={formData.insuranceInfo.medicare.partA}
                    onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicare', 'partA', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="partA" className="text-sm text-gray-700">Part A (Hospital Insurance)</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="partB"
                    checked={formData.insuranceInfo.medicare.partB}
                    onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicare', 'partB', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="partB" className="text-sm text-gray-700">Part B (Medical Insurance)</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="partC"
                    checked={formData.insuranceInfo.medicare.partC}
                    onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicare', 'partC', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="partC" className="text-sm text-gray-700">Part C (Medicare Advantage)</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="partD"
                    checked={formData.insuranceInfo.medicare.partD}
                    onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicare', 'partD', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="partD" className="text-sm text-gray-700">Part D (Prescription Drug Coverage)</label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Claim Number</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.medicare.claimNumber}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicare', 'claimNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter Medicare claim number"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Medicaid</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="enrolled"
                    checked={formData.insuranceInfo.medicaid.enrolled}
                    onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicaid', 'enrolled', e.target.checked)}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="enrolled" className="text-sm text-gray-700">Enrolled in Medicaid</label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case Number</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.medicaid.caseNumber}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicaid', 'caseNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter Medicaid case number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.insuranceInfo.medicaid.state}
                  onChange={(e) => handleNestedInputChange('insuranceInfo', 'medicaid', 'state', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Enter state"
                />
              </div>
            </div>
          </div>
        </div>
      );
      
    case 6:
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
              <select
                value={formData.accountSecurity.accessLevel}
                onChange={(e) => handleInputChange('accountSecurity', 'accessLevel', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              >
                <option value="patient">Patient</option>
                <option value="family">Family Member</option>
                <option value="guardian">Guardian</option>
              </select>
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
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="patientPortal"
                checked={formData.accountSecurity.patientPortal}
                onChange={(e) => handleInputChange('accountSecurity', 'patientPortal', e.target.checked)}
                className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
              />
              <label htmlFor="patientPortal" className="text-sm text-gray-700">Enable Patient Portal Access</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mobileApp"
                checked={formData.accountSecurity.mobileApp}
                onChange={(e) => handleInputChange('accountSecurity', 'mobileApp', e.target.checked)}
                className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
              />
              <label htmlFor="mobileApp" className="text-sm text-gray-700">Enable Mobile App Access</label>
            </div>
          </div>
        </div>
      );
      
    case 7:
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Language <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.preferences.preferredLanguage}
                onChange={(e) => handleInputChange('preferences', 'preferredLanguage', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['preferences.preferredLanguage'] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select preferred language</option>
                {preferredLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              {errors['preferences.preferredLanguage'] && (
                <p className="mt-1 text-sm text-red-600">{errors['preferences.preferredLanguage']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Communication Method <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.preferences.communicationMethod}
                onChange={(e) => handleInputChange('preferences', 'communicationMethod', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] ${
                  errors['preferences.communicationMethod'] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select communication method</option>
                {communicationMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              {errors['preferences.communicationMethod'] && (
                <p className="mt-1 text-sm text-red-600">{errors['preferences.communicationMethod']}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="appointmentReminders"
                checked={formData.preferences.appointmentReminders}
                onChange={(e) => handleInputChange('preferences', 'appointmentReminders', e.target.checked)}
                className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
              />
              <label htmlFor="appointmentReminders" className="text-sm text-gray-700">Appointment Reminders</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="medicationReminders"
                checked={formData.preferences.medicationReminders}
                onChange={(e) => handleInputChange('preferences', 'medicationReminders', e.target.checked)}
                className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
              />
              <label htmlFor="medicationReminders" className="text-sm text-gray-700">Medication Reminders</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="billingReminders"
                checked={formData.preferences.billingReminders}
                onChange={(e) => handleInputChange('preferences', 'billingReminders', e.target.checked)}
                className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
              />
              <label htmlFor="billingReminders" className="text-sm text-gray-700">Billing Reminders</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="healthTips"
                checked={formData.preferences.healthTips}
                onChange={(e) => handleInputChange('preferences', 'healthTips', e.target.checked)}
                className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
              />
              <label htmlFor="healthTips" className="text-sm text-gray-700">Health Tips</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.preferences.newsletter}
                onChange={(e) => handleInputChange('preferences', 'newsletter', e.target.checked)}
                className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700">Newsletter</label>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Privacy Settings</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="shareData"
                  checked={formData.preferences.privacySettings.shareData}
                  onChange={(e) => handleNestedInputChange('preferences', 'privacySettings', 'shareData', e.target.checked)}
                  className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                />
                <label htmlFor="shareData" className="text-sm text-gray-700">Share data with healthcare providers</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="researchParticipation"
                  checked={formData.preferences.privacySettings.researchParticipation}
                  onChange={(e) => handleNestedInputChange('preferences', 'privacySettings', 'researchParticipation', e.target.checked)}
                  className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                />
                <label htmlFor="researchParticipation" className="text-sm text-gray-700">Participate in medical research</label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="marketingConsent"
                  checked={formData.preferences.privacySettings.marketingConsent}
                  onChange={(e) => handleNestedInputChange('preferences', 'privacySettings', 'marketingConsent', e.target.checked)}
                  className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                />
                <label htmlFor="marketingConsent" className="text-sm text-gray-700">Marketing communications</label>
              </div>
            </div>
          </div>
        </div>
      );
      
    case 8:
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Documents & Verification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Proof <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'idProof', e.target.files[0])}
                  className="hidden"
                  id="idProof"
                />
                <label
                  htmlFor="idProof"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload ID Proof
                </label>
                {formData.documents.idProof && (
                  <span className="text-sm text-gray-600">{formData.documents.idProof.name}</span>
                )}
              </div>
              {errors['documents.idProof'] && (
                <p className="mt-1 text-sm text-red-600">{errors['documents.idProof']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Card <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'insuranceCard', e.target.files[0])}
                  className="hidden"
                  id="insuranceCard"
                />
                <label
                  htmlFor="insuranceCard"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Insurance Card
                </label>
                {formData.documents.insuranceCard && (
                  <span className="text-sm text-gray-600">{formData.documents.insuranceCard.name}</span>
                )}
              </div>
              {errors['documents.insuranceCard'] && (
                <p className="mt-1 text-sm text-red-600">{errors['documents.insuranceCard']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo ID</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'photoId', e.target.files[0])}
                  className="hidden"
                  id="photoId"
                />
                <label
                  htmlFor="photoId"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photo ID
                </label>
                {formData.documents.photoId && (
                  <span className="text-sm text-gray-600">{formData.documents.photoId.name}</span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Birth Certificate</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'birthCertificate', e.target.files[0])}
                  className="hidden"
                  id="birthCertificate"
                />
                <label
                  htmlFor="birthCertificate"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Birth Certificate
                </label>
                {formData.documents.birthCertificate && (
                  <span className="text-sm text-gray-600">{formData.documents.birthCertificate.name}</span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Security Card</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'socialSecurityCard', e.target.files[0])}
                  className="hidden"
                  id="socialSecurityCard"
                />
                <label
                  htmlFor="socialSecurityCard"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Social Security Card
                </label>
                {formData.documents.socialSecurityCard && (
                  <span className="text-sm text-gray-600">{formData.documents.socialSecurityCard.name}</span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Power of Attorney</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'powerOfAttorney', e.target.files[0])}
                  className="hidden"
                  id="powerOfAttorney"
                />
                <label
                  htmlFor="powerOfAttorney"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Power of Attorney
                </label>
                {formData.documents.powerOfAttorney && (
                  <span className="text-sm text-gray-600">{formData.documents.powerOfAttorney.name}</span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Living Will</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'livingWill', e.target.files[0])}
                  className="hidden"
                  id="livingWill"
                />
                <label
                  htmlFor="livingWill"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Living Will
                </label>
                {formData.documents.livingWill && (
                  <span className="text-sm text-gray-600">{formData.documents.livingWill.name}</span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organ Donation</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('documents', 'organDonation', e.target.files[0])}
                  className="hidden"
                  id="organDonation"
                />
                <label
                  htmlFor="organDonation"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Organ Donation
                </label>
                {formData.documents.organDonation && (
                  <span className="text-sm text-gray-600">{formData.documents.organDonation.name}</span>
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
              <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
              <p className="text-gray-600 mt-1">Complete the form to add a new patient to the system</p>
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
                      Save Patient
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

export default AddPatientForm;
