import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Mail, Phone, MapPin, Star, CheckCircle, AlertCircle,
  FileText, Download, Send, Plus, Trash2, Edit2, Save, X, Upload, Camera,
  Pill, Activity, Heart, Brain, Bone, Baby, Syringe, FlaskConical,
  Printer, Share2, FileDown, FileUp, FileImage, FileCheck, History, Archive,
  Shield, Award, Globe, Languages, TrendingUp, Zap, Video, VideoOff, Mic, MicOff,
  PhoneOff, MessageSquare, Settings, Bell, Search, Filter, ChevronDown, ChevronUp,
  Stethoscope, UserCheck, BookOpen, Target, Briefcase, GraduationCap,
  Building, DollarSign, Hospital, Users, FileSignature, ChevronRight, ChevronLeft,
  Filter as FilterIcon, MoreVertical, Edit, FilePlus, FileMinus,
  UserPlus, UserMinus, CalendarPlus, CalendarMinus, Clock as ClockIcon,
  Activity as ActivityIcon, TrendingUp as TrendingUpIcon, BarChart3, PieChart,
  Users as UsersIcon, Clipboard, ClipboardCheck, ClipboardX, FileSearch,
  FileText as FileTextIcon, FileDown as FileDownIcon, FileUp as FileUpIcon
} from 'lucide-react';

export default function Appointments() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showVideoConsult, setShowVideoConsult] = useState(false);
  const [prescriptionMode, setPrescriptionMode] = useState('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const prescriptionRef = useRef(null);
  
  // Doctor Profile Data
  const [doctorProfile] = useState({
    name: 'Dr. Ahmed Hassan',
    title: 'Dr.',
    specialization: 'Cardiology',
    subSpecializations: ['Interventional Cardiology', 'Echocardiography', 'Preventive Cardiology'],
    qualifications: [
      { degree: 'MBBS', institution: 'Dhaka Medical College', year: '2008', board: 'University of Dhaka' },
      { degree: 'FCPS (Cardiology)', institution: 'Bangladesh College of Physicians and Surgeons', year: '2014' },
      { degree: 'MRCP (UK)', institution: 'Royal College of Physicians', year: '2012' }
    ],
    experience: [
      { hospital: 'Square Hospital', position: 'Senior Consultant Cardiologist', duration: '2018-Present' },
      { hospital: 'Ibrahim Cardiac Hospital', position: 'Consultant Cardiologist', duration: '2014-2018' }
    ],
    consultationFee: {
      inPerson: '1500',
      online: '1000',
      emergency: '3000'
    },
    languages: ['English', 'Bengali', 'Hindi', 'Urdu'],
    medicalLicense: 'BMDC-12345',
    licenseExpiry: '2025-12-31',
    hospital: 'Square Hospital',
    hospitalAddress: '18/B, Bir Uttam CR Dutta Road, Dhaka',
    awards: [
      { name: 'Best Cardiologist Award', organization: 'Bangladesh Cardiac Society', year: '2022' },
      { name: 'Excellence in Research', organization: 'Dhaka Medical College', year: '2021' }
    ],
    signature: 'Dr. Ahmed Hassan',
    registrationNumber: 'BMDC-12345',
    chamber: 'Square Hospital, 18/B, Bir Uttam CR Dutta Road, Dhaka-1205',
    phone: '+880-2-58615678',
    email: 'dr.ahmed@squarehospital.com',
    website: 'www.squarehospital.com'
  });

  // Brand Settings
  const [brandSettings] = useState({
    logo: true,
    signature: true,
    qrCode: true,
    customHeader: 'Medigo Healthcare',
    customFooter: 'Digital Prescription System',
    brandColors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    hospitalLogo: true,
    watermark: true
  });

  // Appointments Data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Ahmed Khan',
      patientAge: 34,
      patientGender: 'Male',
      patientPhone: '+880 1712 345678',
      patientEmail: 'ahmed.khan@email.com',
      patientAddress: 'Dhanmondi, Dhaka',
      patientWeight: '75',
      patientHeight: '175',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'video',
      status: 'upcoming',
      symptoms: 'Chest pain, shortness of breath',
      medicalHistory: 'Hypertension, Type 2 Diabetes',
      allergies: 'Penicillin',
      consultationFee: '1000',
      paymentStatus: 'paid',
      notes: 'Regular patient, needs follow-up for cardiac evaluation',
      bloodPressure: '140/90',
      heartRate: '88',
      temperature: '98.6°F',
      oxygenSaturation: '98%',
      priority: 'medium',
      urgency: 'normal'
    },
    {
      id: 2,
      patientName: 'Sara Ali',
      patientAge: 28,
      patientGender: 'Female',
      patientPhone: '+880 1912 987654',
      patientEmail: 'sara.ali@email.com',
      patientAddress: 'Gulshan, Dhaka',
      patientWeight: '62',
      patientHeight: '165',
      date: '2024-03-20',
      time: '11:30 AM',
      type: 'in-person',
      status: 'upcoming',
      symptoms: 'Routine checkup',
      medicalHistory: 'None significant',
      allergies: 'None',
      consultationFee: '1500',
      paymentStatus: 'pending',
      notes: 'Annual health checkup',
      bloodPressure: '120/80',
      heartRate: '72',
      temperature: '98.4°F',
      oxygenSaturation: '99%',
      priority: 'low',
      urgency: 'normal'
    },
    {
      id: 3,
      patientName: 'Rahman Hossain',
      patientAge: 45,
      patientGender: 'Male',
      patientPhone: '+880 1712 456789',
      patientEmail: 'rahman.hossain@email.com',
      patientAddress: 'Mirpur, Dhaka',
      patientWeight: '80',
      patientHeight: '170',
      date: '2024-03-19',
      time: '2:00 PM',
      type: 'video',
      status: 'completed',
      symptoms: 'Severe headache, nausea',
      medicalHistory: 'Migraine, GERD',
      allergies: 'NSAIDs',
      consultationFee: '1000',
      paymentStatus: 'paid',
      notes: 'Emergency consultation provided',
      bloodPressure: '130/85',
      heartRate: '80',
      temperature: '99.0°F',
      oxygenSaturation: '97%',
      priority: 'high',
      urgency: 'urgent'
    }
  ]);

  // Prescription State
  const [prescription, setPrescription] = useState({
    patientInfo: {
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: '',
      allergies: '',
      chronicDiseases: '',
      symptoms: '',
      notes: '',
      address: '',
      phone: '',
      email: ''
    },
    medicines: [],
    instructions: '',
    followUp: '',
    doctorNotes: '',
    template: 'standard',
    includeDiagnosis: true,
    includeVitals: true,
    includeHistory: true,
    prescriptionDate: new Date().toLocaleDateString(),
    prescriptionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    prescriptionId: `RX-${Date.now()}`
  });

  // Prescription Templates
  const [prescriptionTemplates] = useState([
    { id: 'standard', name: 'Standard', icon: FileText, description: 'Basic prescription format' },
    { id: 'detailed', name: 'Detailed', icon: FileCheck, description: 'Comprehensive with all details' },
    { id: 'minimal', name: 'Minimal', icon: FileDown, description: 'Clean and simple format' },
    { id: 'cardiac', name: 'Cardiac', icon: Heart, description: 'Specialized for cardiology' },
    { id: 'pediatric', name: 'Pediatric', icon: Baby, description: 'Child-friendly format' }
  ]);

  // Medicine Database
  const [medicineDatabase] = useState([
    { name: 'Paracetamol', type: 'Analgesic', dosage: '500mg', commonUse: 'Fever, Pain', category: 'General' },
    { name: 'Amoxicillin', type: 'Antibiotic', dosage: '500mg', commonUse: 'Bacterial Infections', category: 'Infection' },
    { name: 'Ibuprofen', type: 'NSAID', dosage: '400mg', commonUse: 'Pain, Inflammation', category: 'Pain' },
    { name: 'Omeprazole', type: 'PPI', dosage: '20mg', commonUse: 'Acidity, GERD', category: 'GI' },
    { name: 'Metformin', type: 'Antidiabetic', dosage: '500mg', commonUse: 'Type 2 Diabetes', category: 'Diabetes' },
    { name: 'Amlodipine', type: 'Antihypertensive', dosage: '5mg', commonUse: 'Hypertension', category: 'Cardiac' },
    { name: 'Atorvastatin', type: 'Statin', dosage: '10mg', commonUse: 'High Cholesterol', category: 'Cardiac' },
    { name: 'Salbutamol', type: 'Bronchodilator', dosage: '4mg', commonUse: 'Asthma', category: 'Respiratory' },
    { name: 'Aspirin', type: 'Antiplatelet', dosage: '75mg', commonUse: 'Blood Thinner', category: 'Cardiac' },
    { name: 'Lisinopril', type: 'ACE Inhibitor', dosage: '10mg', commonUse: 'Hypertension', category: 'Cardiac' },
    { name: 'Metoprolol', type: 'Beta Blocker', dosage: '25mg', commonUse: 'Hypertension, Arrhythmia', category: 'Cardiac' },
    { name: 'Clopidogrel', type: 'Antiplatelet', dosage: '75mg', commonUse: 'Blood Thinner', category: 'Cardiac' },
    { name: 'Furosemide', type: 'Diuretic', dosage: '40mg', commonUse: 'Fluid Retention', category: 'Cardiac' },
    { name: 'Digoxin', type: 'Cardiac Glycoside', dosage: '0.25mg', commonUse: 'Heart Failure', category: 'Cardiac' },
    { name: 'Nitroglycerin', type: 'Vasodilator', dosage: '0.4mg', commonUse: 'Angina', category: 'Cardiac' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState(medicineDatabase);
  const [showMedicineSearch, setShowMedicineSearch] = useState(false);
  const [selectedMedicineIndex, setSelectedMedicineIndex] = useState(null);

  useEffect(() => {
    const filtered = medicineDatabase.filter(med => 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.commonUse.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicines(filtered);
  }, [searchTerm, medicineDatabase]);

  const openPrescription = (appointment, mode = 'create') => {
    setSelectedAppointment(appointment);
    setPrescriptionMode(mode);
    setPrescription(prev => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        name: appointment.patientName || '',
        age: appointment.patientAge || '',
        gender: appointment.patientGender || '',
        weight: appointment.patientWeight || '',
        height: appointment.patientHeight || '',
        bloodPressure: appointment.bloodPressure || '',
        heartRate: appointment.heartRate || '',
        temperature: appointment.temperature || '',
        oxygenSaturation: appointment.oxygenSaturation || '',
        allergies: appointment.allergies || '',
        chronicDiseases: appointment.medicalHistory || '',
        symptoms: appointment.symptoms || '',
        notes: appointment.notes || '',
        address: appointment.patientAddress || '',
        phone: appointment.patientPhone || '',
        email: appointment.patientEmail || ''
      },
      prescriptionDate: new Date().toLocaleDateString(),
      prescriptionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      prescriptionId: `RX-${Date.now()}`
    }));
    setShowPrescription(true);
  };

  const openPrescriptionWithoutAppointment = () => {
    setPrescriptionMode('create');
    setSelectedAppointment(null);
    setPrescription(prev => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        oxygenSaturation: '',
        allergies: '',
        chronicDiseases: '',
        symptoms: '',
        notes: '',
        address: '',
        phone: '',
        email: ''
      },
      prescriptionDate: new Date().toLocaleDateString(),
      prescriptionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      prescriptionId: `RX-${Date.now()}`
    }));
    setShowPrescription(true);
  };

  const addMedicine = () => {
    setPrescription(prev => ({
      ...prev,
      medicines: [...prev.medicines, { 
        name: '', 
        dosage: '', 
        frequency: '', 
        duration: '', 
        route: 'Oral',
        instructions: '',
        type: 'Tablet',
        category: 'General',
        quantity: '',
        refills: ''
      }]
    }));
  };

  const updateMedicine = (index, field, value) => {
    setPrescription(prev => ({
      ...prev,
      medicines: prev.medicines.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const removeMedicine = (index) => {
    setPrescription(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const selectMedicineFromDatabase = (medicine) => {
    if (selectedMedicineIndex !== null) {
      updateMedicine(selectedMedicineIndex, 'name', medicine.name);
      updateMedicine(selectedMedicineIndex, 'dosage', medicine.dosage);
      updateMedicine(selectedMedicineIndex, 'category', medicine.category);
      setShowMedicineSearch(false);
      setSearchTerm('');
      setSelectedMedicineIndex(null);
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setGenerationStatus('Generating PDF with personalized branding...');
    
    const prescriptionData = {
      doctorProfile: doctorProfile,
      brandSettings: brandSettings,
      prescription: prescription,
      patient: selectedAppointment,
      timestamp: new Date().toISOString()
    };

    console.log('Generating PDF with data:', prescriptionData);
    
    setTimeout(() => {
      setGenerationStatus('PDF generated successfully with doctor profile and branding!');
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationStatus('');
      }, 2000);
    }, 2000);
  };

  const generateWord = async () => {
    setIsGenerating(true);
    setGenerationStatus('Generating Word document with personalized branding...');
    
    const prescriptionData = {
      doctorProfile: doctorProfile,
      brandSettings: brandSettings,
      prescription: prescription,
      patient: selectedAppointment,
      format: 'docx',
      timestamp: new Date().toISOString()
    };

    console.log('Generating Word document with data:', prescriptionData);
    
    setTimeout(() => {
      setGenerationStatus('Word document generated successfully!');
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationStatus('');
      }, 2000);
    }, 2000);
  };

  const sendPrescriptionToPatient = async () => {
    setIsGenerating(true);
    setGenerationStatus('Sending personalized prescription to patient...');
    
    const prescriptionData = {
      doctorProfile: doctorProfile,
      brandSettings: brandSettings,
      prescription: prescription,
      patient: selectedAppointment,
      sendMethod: 'email',
      sentAt: new Date().toISOString()
    };

    console.log('Sending prescription:', prescriptionData);
    
    setTimeout(() => {
      setGenerationStatus('Prescription sent successfully to patient email!');
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationStatus('');
      }, 2000);
    }, 1500);
  };

  const renderProfessionalPrescription = () => {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8" ref={prescriptionRef} style={{ fontFamily: 'Georgia, serif' }}>
        {/* Header with Professional Branding */}
        <div className="border-b-4 border-blue-800 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              {brandSettings.logo && (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Hospital className="w-14 h-14 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-blue-900" style={{ fontFamily: 'Georgia, serif' }}>
                  {brandSettings.customHeader}
                </h1>
                <p className="text-gray-700 text-lg mt-1">{brandSettings.customFooter}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Digital Prescription System</span>
                  </div>
                  <span>•</span>
                  <span>Verified Medical Platform</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <p className="text-sm font-bold text-blue-900">Prescription ID</p>
                <p className="text-lg font-bold text-blue-800">{prescription.prescriptionId}</p>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Date:</span> {prescription.prescriptionDate}</p>
                <p><span className="font-semibold">Time:</span> {prescription.prescriptionTime}</p>
              </div>
              {brandSettings.qrCode && (
                <div className="mt-3 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300">
                  <Shield className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Doctor Information with Professional Layout */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-7">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4 text-xl border-b-2 border-blue-300 pb-2">
                PRESCRIBING PHYSICIAN
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-gray-900 text-lg">{doctorProfile.name}, {doctorProfile.title}</p>
                  <p className="text-gray-800 font-medium">{doctorProfile.specialization}</p>
                  {doctorProfile.subSpecializations.length > 0 && (
                    <p className="text-gray-700">
                      <span className="font-medium">Specialized in:</span> {doctorProfile.subSpecializations.join(', ')}
                    </p>
                  )}
                  <p className="text-gray-700">
                    <span className="font-medium">Qualifications:</span> {doctorProfile.qualifications.map(q => q.degree).join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Hospital:</span> {doctorProfile.hospital}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Address:</span> {doctorProfile.hospitalAddress}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">BMDC:</span> {doctorProfile.medicalLicense}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">License expires:</span> {doctorProfile.licenseExpiry}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> {doctorProfile.phone}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {doctorProfile.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {doctorProfile.languages.map((lang, index) => (
                  <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-span-5">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-4 text-xl border-b-2 border-green-300 pb-2">
                PATIENT INFORMATION
              </h3>
              <div className="space-y-2 text-sm">
                {prescription.patientInfo.name && (
                  <p className="font-bold text-gray-900 text-lg">{prescription.patientInfo.name}</p>
                )}
                {prescription.patientInfo.age && (
                  <p className="text-gray-800">
                    <span className="font-medium">Age:</span> {prescription.patientInfo.age} years | 
                    <span className="font-medium ml-2">Gender:</span> {prescription.patientInfo.gender}
                  </p>
                )}
                {prescription.patientInfo.weight && (
                  <p className="text-gray-800">
                    <span className="font-medium">Weight:</span> {prescription.patientInfo.weight}kg | 
                    <span className="font-medium ml-2">Height:</span> {prescription.patientInfo.height}cm
                  </p>
                )}
                {prescription.patientInfo.address && (
                  <p className="text-gray-800">
                    <span className="font-medium">Address:</span> {prescription.patientInfo.address}
                  </p>
                )}
                {prescription.patientInfo.phone && (
                  <p className="text-gray-800">
                    <span className="font-medium">Phone:</span> {prescription.patientInfo.phone}
                  </p>
                )}
                {prescription.patientInfo.email && (
                  <p className="text-gray-800">
                    <span className="font-medium">Email:</span> {prescription.patientInfo.email}
                  </p>
                )}
                {prescription.patientInfo.bloodPressure && (
                  <p className="text-gray-800">
                    <span className="font-medium">BP:</span> {prescription.patientInfo.bloodPressure} | 
                    <span className="font-medium ml-2">HR:</span> {prescription.patientInfo.heartRate}bpm
                  </p>
                )}
                {prescription.patientInfo.temperature && (
                  <p className="text-gray-800">
                    <span className="font-medium">Temp:</span> {prescription.patientInfo.temperature} | 
                    <span className="font-medium ml-2">SpO2:</span> {prescription.patientInfo.oxygenSaturation}
                  </p>
                )}
                {prescription.patientInfo.symptoms && (
                  <div className="mt-3">
                    <p className="font-bold text-gray-800">Symptoms:</p>
                    <p className="text-gray-700 bg-white p-2 rounded border">{prescription.patientInfo.symptoms}</p>
                  </div>
                )}
                {prescription.includeHistory && prescription.patientInfo.chronicDiseases && (
                  <div className="mt-3">
                    <p className="font-bold text-gray-800">Medical History:</p>
                    <p className="text-gray-700 bg-white p-2 rounded border">{prescription.patientInfo.chronicDiseases}</p>
                  </div>
                )}
                {prescription.patientInfo.allergies && (
                  <div className="mt-3">
                    <p className="font-bold text-red-600">Allergies:</p>
                    <p className="text-red-600 font-medium bg-red-50 p-2 rounded border border-red-200">{prescription.patientInfo.allergies}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Assessment */}
        {(prescription.includeVitals || prescription.includeDiagnosis) && (
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mb-8 border-2 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-4 text-xl border-b-2 border-purple-300 pb-2">
              CLINICAL ASSESSMENT
            </h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              {prescription.includeVitals && prescription.patientInfo.temperature && (
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-purple-800">Temperature</p>
                  <p className="text-lg font-bold text-gray-900">{prescription.patientInfo.temperature}°F</p>
                </div>
              )}
              {prescription.includeVitals && prescription.patientInfo.bloodPressure && (
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-purple-800">Blood Pressure</p>
                  <p className="text-lg font-bold text-gray-900">{prescription.patientInfo.bloodPressure}</p>
                </div>
              )}
              {prescription.includeVitals && prescription.patientInfo.heartRate && (
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-purple-800">Heart Rate</p>
                  <p className="text-lg font-bold text-gray-900">{prescription.patientInfo.heartRate} bpm</p>
                </div>
              )}
              {prescription.includeVitals && prescription.patientInfo.oxygenSaturation && (
                <div className="bg-white p-3 rounded-lg border">
                  <p className="font-medium text-purple-800">Oxygen Saturation</p>
                  <p className="text-lg font-bold text-gray-900">{prescription.patientInfo.oxygenSaturation}</p>
                </div>
              )}
              {prescription.includeDiagnosis && prescription.doctorNotes && (
                <div className="col-span-4">
                  <p className="font-bold text-purple-800 mb-2">Diagnosis/Assessment:</p>
                  <p className="text-gray-700 bg-white p-3 rounded-lg border">{prescription.doctorNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medications */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-6 text-2xl border-b-4 border-gray-300 pb-3">
            PRESCRIBED MEDICATIONS
          </h3>
          <div className="space-y-4">
            {prescription.medicines.map((medicine, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-xl mb-3">
                      {index + 1}. {medicine.name || 'Medicine Name'}
                    </p>
                    <div className="grid grid-cols-4 gap-4 text-sm text-gray-800">
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="font-medium text-orange-800">Dosage</p>
                        <p className="font-bold">{medicine.dosage || 'N/A'}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="font-medium text-orange-800">Frequency</p>
                        <p className="font-bold">{medicine.frequency || 'N/A'}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="font-medium text-orange-800">Duration</p>
                        <p className="font-bold">{medicine.duration || 'N/A'}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <p className="font-medium text-orange-800">Route</p>
                        <p className="font-bold">{medicine.route || 'Oral'}</p>
                      </div>
                    </div>
                    {medicine.instructions && (
                      <div className="mt-3">
                        <p className="font-medium text-gray-800">Special Instructions:</p>
                        <p className="text-gray-700 bg-white p-3 rounded-lg border mt-1 italic">{medicine.instructions}</p>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium border">
                      {medicine.category || 'General'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {prescription.medicines.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Pill className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 text-lg font-medium">No medications prescribed</p>
                <p className="text-gray-400 text-sm">Add medications to complete the prescription</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        {(prescription.instructions || prescription.followUp) && (
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-6 text-2xl border-b-4 border-gray-300 pb-3">
              INSTRUCTIONS & FOLLOW-UP
            </h3>
            {prescription.instructions && (
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <p className="font-bold text-blue-900 mb-3 text-lg">General Instructions:</p>
                <p className="text-gray-700 bg-white p-4 rounded-lg border">{prescription.instructions}</p>
              </div>
            )}
            {prescription.followUp && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <p className="font-bold text-green-900 mb-3 text-lg">Follow-up Instructions:</p>
                <p className="text-gray-700 bg-white p-4 rounded-lg border">{prescription.followUp}</p>
              </div>
            )}
          </div>
        )}

        {/* Professional Footer with Branding */}
        <div className="border-t-4 border-gray-800 pt-8 mt-8">
          <div className="flex justify-between items-end">
            <div className="text-sm text-gray-600">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                <p className="font-bold text-yellow-900 mb-2">IMPORTANT DISCLAIMER:</p>
                <p>This is a digitally generated prescription. For verification, visit: medigo.com/verify/{prescription.prescriptionId}</p>
                <p className="mt-2">{brandSettings.customFooter} - Powered by {brandSettings.customHeader}</p>
                <p className="mt-2">Generated on: {new Date().toLocaleString()}</p>
                <p className="mt-2 font-bold text-red-600">This prescription is valid only with the doctor's signature and registration number.</p>
              </div>
            </div>
            {brandSettings.signature && (
              <div className="text-center">
                <div className="w-48 h-16 border-b-4 border-gray-800 mb-3"></div>
                <p className="font-bold text-gray-900 text-lg">{doctorProfile.name}</p>
                <p className="text-gray-700 font-medium">{doctorProfile.specialization}</p>
                <p className="text-sm text-gray-600 font-medium">BMDC Reg. No: {doctorProfile.medicalLicense}</p>
                <p className="text-sm text-gray-600 font-medium">Digital Signature</p>
              </div>
            )}
          </div>
        </div>

        {/* Watermark */}
        {brandSettings.watermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <div className="text-8xl font-bold text-gray-800 transform rotate-45">
              {brandSettings.customHeader}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAppointmentsTable = (appointmentsList) => {
    const filteredAppointments = appointmentsList.filter(apt => 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientPhone.includes(searchQuery) ||
      apt.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                        <div className="text-sm text-gray-500">{appointment.patientAge} years, {appointment.patientGender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.patientPhone}</div>
                    <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-sm text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.type === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {appointment.type === 'video' ? <Video className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {appointment.type === 'video' ? 'Video' : 'In-Person'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-700' 
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        appointment.status === 'upcoming' 
                          ? 'bg-blue-500' 
                          : appointment.status === 'completed'
                          ? 'bg-green-500'
                          : 'bg-gray-500'
                      }`} />
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">BDT {appointment.consultationFee}</div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      {appointment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {appointment.status === 'upcoming' && (
                        <>
                          {appointment.type === 'video' && (
                            <button
                              onClick={() => setShowVideoConsult(true)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Start Consultation"
                            >
                              <Video className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => openPrescription(appointment, 'create')}
                            className="text-purple-600 hover:text-purple-900"
                            title="Create Prescription"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <button
                          onClick={() => openPrescription(appointment, 'view')}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Prescription"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600" title="More Options">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAppointments.length)} of {filteredAppointments.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                <p className="text-gray-600">Manage appointments and prescriptions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={openPrescriptionWithoutAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm"
              >
                <FilePlus className="w-4 h-4" />
                Create Prescription
              </button>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.8/5.0</span>
                </div>
                <span>•</span>
                <span>{appointments.filter(a => a.status === 'completed').length} completed</span>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === 'completed').length}</p>
                <p className="text-sm text-green-600 mt-1">95% completion rate</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === 'completed').length}</p>
                <p className="text-sm text-green-600 mt-1">100% digital</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-green-600 mt-1">Based on 50 reviews</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'upcoming', label: 'Upcoming', icon: Calendar, count: appointments.filter(a => a.status === 'upcoming').length },
                { id: 'completed', label: 'Completed', icon: CheckCircle, count: appointments.filter(a => a.status === 'completed').length },
                { id: 'prescriptions', label: 'Prescription History', icon: FileText, count: appointments.filter(a => a.status === 'completed').length },
                { id: 'analytics', label: 'Analytics', icon: BarChart3, count: null }
              ].map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {count !== null && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'upcoming' && (
          <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FilterIcon className="w-4 h-4" />
                    Filters
                  </button>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
              </div>
              
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">All Types</option>
                      <option value="video">Video Consultation</option>
                      <option value="in-person">In-Person</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">All Status</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">All Payment</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            {renderAppointmentsTable(appointments.filter(a => a.status === 'upcoming'))}
          </div>
        )}

        {activeTab === 'completed' && (
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <FilterIcon className="w-4 h-4" />
                    Filters
                  </button>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
              </div>
            </div>
            
            {renderAppointmentsTable(appointments.filter(a => a.status === 'completed'))}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Prescription History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.filter(a => a.status === 'completed').map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-500">{appointment.date}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium">Type:</span> {appointment.type === 'video' ? 'Video Consultation' : 'In-Person'}</p>
                    <p><span className="font-medium">Symptoms:</span> {appointment.symptoms}</p>
                    <p><span className="font-medium">Treatment:</span> Standard cardiac care</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPrescription(appointment, 'view')}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      <FileText className="w-4 h-4 inline mr-1" />
                      View
                    </button>
                    <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Trends</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization coming soon</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization coming soon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      <AnimatePresence>
        {showPrescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {prescriptionMode === 'create' ? 'Create Prescription' : 'View Prescription'}
                  </h2>
                  <button
                    onClick={() => setShowPrescription(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Panel - Form */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Template Selection */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Prescription Template</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {prescriptionTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setPrescription(prev => ({ ...prev, template: template.id }))}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              prescription.template === template.id
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            }`}
                          >
                            <template.icon className="w-6 h-6 text-blue-600 mb-2" />
                            <p className="font-medium text-gray-900">{template.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Patient Information */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Patient Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.name}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, name: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter patient name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.age}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, age: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter age"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                          <select
                            value={prescription.patientInfo.gender}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, gender: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.phone}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, phone: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={prescription.patientInfo.email}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, email: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.address}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, address: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.weight}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, weight: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter weight"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.height}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, height: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter height"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                          <input
                            type="text"
                            placeholder="120/80"
                            value={prescription.patientInfo.bloodPressure}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, bloodPressure: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate</label>
                          <input
                            type="text"
                            placeholder="72 bpm"
                            value={prescription.patientInfo.heartRate}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, heartRate: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                          <input
                            type="text"
                            placeholder="98.6°F"
                            value={prescription.patientInfo.temperature}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, temperature: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Oxygen Saturation</label>
                          <input
                            type="text"
                            placeholder="98%"
                            value={prescription.patientInfo.oxygenSaturation}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, oxygenSaturation: e.target.value }
                            }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                          <textarea
                            value={prescription.patientInfo.symptoms}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, symptoms: e.target.value }
                            }))}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe patient symptoms"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis/Assessment</label>
                          <textarea
                            value={prescription.doctorNotes}
                            onChange={(e) => setPrescription(prev => ({ ...prev, doctorNotes: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter diagnosis or clinical assessment"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                          <textarea
                            value={prescription.patientInfo.chronicDiseases}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, chronicDiseases: e.target.value }
                            }))}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter relevant medical history"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                          <textarea
                            value={prescription.patientInfo.allergies}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, allergies: e.target.value }
                            }))}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter known allergies (write 'None' if no allergies)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Medicines */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900 text-lg">Medications</h3>
                        <button
                          onClick={addMedicine}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Medicine
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {prescription.medicines.map((medicine, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                              <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                                <input
                                  type="text"
                                  value={medicine.name}
                                  onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                  onFocus={() => {
                                    setSelectedMedicineIndex(index);
                                    setShowMedicineSearch(true);
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Search medicine..."
                                />
                                {showMedicineSearch && selectedMedicineIndex === index && (
                                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    <input
                                      type="text"
                                      placeholder="Search medicine..."
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                      className="w-full px-3 py-2 border-b border-gray-200 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="max-h-48 overflow-y-auto">
                                      {filteredMedicines.map((med, medIndex) => (
                                        <button
                                          key={medIndex}
                                          onClick={() => selectMedicineFromDatabase(med)}
                                          className="w-full px-3 py-2 text-left hover:bg-blue-50 border-b border-gray-100"
                                        >
                                          <div className="font-medium text-gray-900">{med.name}</div>
                                          <div className="text-xs text-gray-500">
                                            {med.type} • {med.dosage} • {med.commonUse}
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                                <input
                                  type="text"
                                  value={medicine.dosage}
                                  onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="e.g., 500mg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                                <select
                                  value={medicine.frequency}
                                  onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="">Select</option>
                                  <option value="Once daily">Once daily</option>
                                  <option value="Twice daily">Twice daily</option>
                                  <option value="Three times daily">Three times daily</option>
                                  <option value="Four times daily">Four times daily</option>
                                  <option value="As needed">As needed</option>
                                  <option value="Before meals">Before meals</option>
                                  <option value="After meals">After meals</option>
                                </select>
                              </div>
                              <div className="flex items-end gap-2">
                                <div className="flex-1">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                  <input
                                    type="text"
                                    value={medicine.duration}
                                    onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 7 days"
                                  />
                                </div>
                                <button
                                  onClick={() => removeMedicine(index)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                                <select
                                  value={medicine.route}
                                  onChange={(e) => updateMedicine(index, 'route', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="Oral">Oral</option>
                                  <option value="Topical">Topical</option>
                                  <option value="Intravenous">Intravenous</option>
                                  <option value="Intramuscular">Intramuscular</option>
                                  <option value="Inhalation">Inhalation</option>
                                  <option value="Sublingual">Sublingual</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                  value={medicine.type}
                                  onChange={(e) => updateMedicine(index, 'type', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="Tablet">Tablet</option>
                                  <option value="Capsule">Capsule</option>
                                  <option value="Syrup">Syrup</option>
                                  <option value="Injection">Injection</option>
                                  <option value="Ointment">Ointment</option>
                                  <option value="Drops">Drops</option>
                                  <option value="Inhaler">Inhaler</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input
                                  type="text"
                                  value={medicine.quantity}
                                  onChange={(e) => updateMedicine(index, 'quantity', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="e.g., 30 tablets"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Refills</label>
                                <input
                                  type="text"
                                  value={medicine.refills}
                                  onChange={(e) => updateMedicine(index, 'refills', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="e.g., 2 refills"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                              <textarea
                                value={medicine.instructions}
                                onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter special instructions for this medication"
                              />
                            </div>
                          </div>
                        ))}
                        {prescription.medicines.length === 0 && (
                          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <Pill className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500 text-lg font-medium">No medications added yet</p>
                            <p className="text-gray-400 text-sm">Click "Add Medicine" to start prescribing</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Instructions & Follow-up</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">General Instructions</label>
                          <textarea
                            value={prescription.instructions}
                            onChange={(e) => setPrescription(prev => ({ ...prev, instructions: e.target.value }))}
                            rows={4}
                            placeholder="Provide general instructions for the patient..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Instructions</label>
                          <input
                            type="text"
                            value={prescription.followUp}
                            onChange={(e) => setPrescription(prev => ({ ...prev, followUp: e.target.value }))}
                            placeholder="Follow-up instructions..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Preview & Actions */}
                  <div className="space-y-6">
                    {/* Brand Settings */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Brand Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={brandSettings.logo}
                            disabled
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700">Include Logo</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={brandSettings.signature}
                            disabled
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700">Include Signature</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={brandSettings.qrCode}
                            disabled
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700">Include QR Code</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={brandSettings.watermark}
                            disabled
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700">Include Watermark</span>
                        </label>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Prescription Preview</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                        {renderProfessionalPrescription()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                      >
                        <FileDown className="w-4 h-4" />
                        Generate PDF
                      </button>
                      <button
                        onClick={generateWord}
                        disabled={isGenerating}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                      >
                        <FileDown className="w-4 h-4" />
                        Generate Word
                      </button>
                      <button
                        onClick={sendPrescriptionToPatient}
                        disabled={isGenerating}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                      >
                        <Send className="w-4 h-4" />
                        Send to Patient
                      </button>
                      <button
                        onClick={() => {
                          if (prescriptionRef.current) {
                            const printContent = prescriptionRef.current.innerHTML;
                            const printWindow = window.open('', '_blank');
                            const htmlContent = '<html><head><title>Prescription</title><style>body { font-family: Georgia, serif; margin: 20px; } .prescription { border: 1px solid #ccc; padding: 20px; max-width: 800px; }</style></head><body><div class="prescription">' + printContent + '</div></body></html>';
                            printWindow.document.write(htmlContent);
                            printWindow.document.close();
                            printWindow.print();
                          }
                        }}
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2 font-medium"
                      >
                        <Printer className="w-4 h-4" />
                        Print
                      </button>
                    </div>

                    {generationStatus && (
                      <div className={`p-4 rounded-xl text-sm text-center font-medium ${
                        generationStatus.includes('successfully') 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {generationStatus}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Consultation Modal */}
      <AnimatePresence>
        {showVideoConsult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-4xl w-full"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Video Consultation</h2>
                  <button
                    onClick={() => setShowVideoConsult(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-6">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <User className="w-16 h-16" />
                    </div>
                    <p className="font-semibold text-xl">Patient Connected</p>
                    <p className="text-sm text-white/70">HD Quality • Encrypted</p>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowVideoConsult(false)}
                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
