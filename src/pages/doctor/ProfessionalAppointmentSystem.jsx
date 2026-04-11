import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Mail, Phone, MapPin, Star, CheckCircle, AlertCircle,
  FileText, Download, Send, Plus, Trash2, Edit2, Save, X, Upload, Camera,
  Pill, Activity, Heart, Brain, Eye, Bone, Baby, Syringe, FlaskConical,
  Printer, Share2, FileDown, FileUp, FileImage, FileCheck, History, Archive,
  Shield, Award, Globe, Languages, TrendingUp, Zap, Video, VideoOff, Mic, MicOff,
  PhoneOff, MessageSquare, Settings, Bell, Search, Filter, ChevronDown, ChevronUp,
  Stethoscope, UserCheck, BookOpen, Target, Briefcase, GraduationCap,
  Building, DollarSign, Award as Trophy, Hospital, Users, FileSignature
} from 'lucide-react';

export default function ProfessionalAppointmentSystem() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showVideoConsult, setShowVideoConsult] = useState(false);
  const [prescriptionMode, setPrescriptionMode] = useState('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
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
      primary: '#165028',
      secondary: '#5DBB63',
      accent: '#FF6B6B'
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
      oxygenSaturation: '98%'
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
      oxygenSaturation: '99%'
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
      oxygenSaturation: '97%'
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
    { id: 'standard', name: 'Standard Template', icon: FileText, description: 'Basic prescription format' },
    { id: 'detailed', name: 'Detailed Template', icon: FileCheck, description: 'Comprehensive with all details' },
    { id: 'minimal', name: 'Minimal Template', icon: FileDown, description: 'Clean and simple format' },
    { id: 'cardiac', name: 'Cardiac Template', icon: Heart, description: 'Specialized for cardiology' },
    { id: 'pediatric', name: 'Pediatric Template', icon: Baby, description: 'Child-friendly format' }
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
      <div className="bg-white rounded-lg shadow-lg p-8" ref={prescriptionRef} style={{ fontFamily: 'Times New Roman, serif' }}>
        {/* Header with Professional Branding */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              {brandSettings.logo && (
                <div className="w-20 h-20 bg-gradient-to-br from-[#5DBB63] to-[#165028] rounded-lg flex items-center justify-center">
                  <Hospital className="w-12 h-12 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-[#165028]" style={{ fontFamily: 'Times New Roman, serif' }}>
                  {brandSettings.customHeader}
                </h1>
                <p className="text-gray-600 text-sm">{brandSettings.customFooter}</p>
                <p className="text-xs text-gray-500 mt-1">Digital Prescription System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">Prescription ID: {prescription.prescriptionId}</p>
              <p className="text-sm text-gray-600">Date: {prescription.prescriptionDate}</p>
              <p className="text-sm text-gray-600">Time: {prescription.prescriptionTime}</p>
              {brandSettings.qrCode && (
                <div className="mt-2 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Doctor Information with Professional Layout */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-300 rounded p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg border-b border-gray-300 pb-2">
              PRESCRIBING PHYSICIAN
            </h3>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-gray-900">{doctorProfile.name}, {doctorProfile.title}</p>
              <p className="text-gray-700">{doctorProfile.specialization}</p>
              {doctorProfile.subSpecializations.length > 0 && (
                <p className="text-gray-700">
                  Specialized in: {doctorProfile.subSpecializations.join(', ')}
                </p>
              )}
              <p className="text-gray-700">
                {doctorProfile.qualifications.map(q => q.degree).join(', ')}
              </p>
              <p className="text-gray-700">{doctorProfile.hospital}</p>
              <p className="text-gray-700">{doctorProfile.hospitalAddress}</p>
              <p className="text-gray-700">BMDC: {doctorProfile.medicalLicense}</p>
              <p className="text-gray-700">License expires: {doctorProfile.licenseExpiry}</p>
              <p className="text-gray-700">Phone: {doctorProfile.phone}</p>
              <p className="text-gray-700">Email: {doctorProfile.email}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {doctorProfile.languages.map((lang, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-300 rounded p-4">
            <h3 className="font-bold text-gray-900 mb-3 text-lg border-b border-gray-300 pb-2">
              PATIENT INFORMATION
            </h3>
            <div className="space-y-1 text-sm">
              {prescription.patientInfo.name && (
                <p className="font-semibold text-gray-900">Name: {prescription.patientInfo.name}</p>
              )}
              {prescription.patientInfo.age && (
                <p className="text-gray-700">
                  Age: {prescription.patientInfo.age} years, Gender: {prescription.patientInfo.gender}
                </p>
              )}
              {prescription.patientInfo.weight && (
                <p className="text-gray-700">
                  Weight: {prescription.patientInfo.weight}kg, Height: {prescription.patientInfo.height}cm
                </p>
              )}
              {prescription.patientInfo.address && (
                <p className="text-gray-700">Address: {prescription.patientInfo.address}</p>
              )}
              {prescription.patientInfo.phone && (
                <p className="text-gray-700">Phone: {prescription.patientInfo.phone}</p>
              )}
              {prescription.patientInfo.email && (
                <p className="text-gray-700">Email: {prescription.patientInfo.email}</p>
              )}
              {prescription.patientInfo.bloodPressure && (
                <p className="text-gray-700">
                  BP: {prescription.patientInfo.bloodPressure}, HR: {prescription.patientInfo.heartRate}bpm
                </p>
              )}
              {prescription.patientInfo.temperature && (
                <p className="text-gray-700">
                  Temp: {prescription.patientInfo.temperature}, SpO2: {prescription.patientInfo.oxygenSaturation}
                </p>
              )}
              {prescription.patientInfo.symptoms && (
                <div className="mt-2">
                  <p className="font-medium text-gray-800">Symptoms:</p>
                  <p className="text-gray-700">{prescription.patientInfo.symptoms}</p>
                </div>
              )}
              {prescription.includeHistory && prescription.patientInfo.chronicDiseases && (
                <div className="mt-2">
                  <p className="font-medium text-gray-800">Medical History:</p>
                  <p className="text-gray-700">{prescription.patientInfo.chronicDiseases}</p>
                </div>
              )}
              {prescription.patientInfo.allergies && (
                <div className="mt-2">
                  <p className="font-medium text-red-600">Allergies:</p>
                  <p className="text-red-600 font-medium">{prescription.patientInfo.allergies}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clinical Assessment */}
        {(prescription.includeVitals || prescription.includeDiagnosis) && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-300">
            <h3 className="font-bold text-gray-900 mb-3 text-lg border-b border-gray-300 pb-2">
              CLINICAL ASSESSMENT
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {prescription.includeVitals && prescription.patientInfo.temperature && (
                <p><span className="font-medium">Temperature:</span> {prescription.patientInfo.temperature}°F</p>
              )}
              {prescription.includeVitals && prescription.patientInfo.bloodPressure && (
                <p><span className="font-medium">Blood Pressure:</span> {prescription.patientInfo.bloodPressure}</p>
              )}
              {prescription.includeVitals && prescription.patientInfo.heartRate && (
                <p><span className="font-medium">Heart Rate:</span> {prescription.patientInfo.heartRate} bpm</p>
              )}
              {prescription.includeVitals && prescription.patientInfo.oxygenSaturation && (
                <p><span className="font-medium">Oxygen Saturation:</span> {prescription.patientInfo.oxygenSaturation}</p>
              )}
              {prescription.includeDiagnosis && prescription.doctorNotes && (
                <div className="col-span-2">
                  <p className="font-medium">Diagnosis/Assessment:</p>
                  <p className="text-gray-700">{prescription.doctorNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medications */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg border-b border-gray-300 pb-2">
            PRESCRIBED MEDICATIONS
          </h3>
          <div className="space-y-3">
            {prescription.medicines.map((medicine, index) => (
              <div key={index} className="border-l-4 border-[#5DBB63] pl-4 py-2 bg-gray-50 rounded-r">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">
                      {index + 1}. {medicine.name || 'Medicine Name'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mt-1">
                      <p>Dosage: {medicine.dosage || 'N/A'}</p>
                      <p>Frequency: {medicine.frequency || 'N/A'}</p>
                      <p>Duration: {medicine.duration || 'N/A'}</p>
                      <p>Route: {medicine.route || 'Oral'}</p>
                    </div>
                    {medicine.instructions && (
                      <p className="text-gray-600 text-sm mt-1 italic">
                        Instructions: {medicine.instructions}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                    {medicine.category || 'General'}
                  </span>
                </div>
              </div>
            ))}
            {prescription.medicines.length === 0 && (
              <p className="text-gray-500 text-center py-4 italic">No medications prescribed</p>
            )}
          </div>
        </div>

        {/* Instructions */}
        {(prescription.instructions || prescription.followUp) && (
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg border-b border-gray-300 pb-2">
              INSTRUCTIONS & FOLLOW-UP
            </h3>
            {prescription.instructions && (
              <div className="mb-4">
                <p className="font-medium text-gray-800 mb-2">General Instructions:</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded border">{prescription.instructions}</p>
              </div>
            )}
            {prescription.followUp && (
              <div>
                <p className="font-medium text-gray-800 mb-2">Follow-up Instructions:</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded border">{prescription.followUp}</p>
              </div>
            )}
          </div>
        )}

        {/* Professional Footer with Branding */}
        <div className="border-t-2 border-gray-800 pt-6 mt-8">
          <div className="flex justify-between items-end">
            <div className="text-xs text-gray-600">
              <p className="font-semibold">DISCLAIMER:</p>
              <p>This is a digitally generated prescription. For verification, visit: medigo.com/verify/{prescription.prescriptionId}</p>
              <p>{brandSettings.customFooter} - Powered by {brandSettings.customHeader}</p>
              <p className="mt-1">Generated on: {new Date().toLocaleString()}</p>
              <p className="mt-2 font-semibold">IMPORTANT: This prescription is valid only with the doctor's signature and registration number.</p>
            </div>
            {brandSettings.signature && (
              <div className="text-center">
                <div className="w-40 h-16 border-b-2 border-gray-800 mb-2"></div>
                <p className="font-bold text-gray-900">{doctorProfile.name}</p>
                <p className="text-sm text-gray-700">{doctorProfile.specialization}</p>
                <p className="text-xs text-gray-600">BMDC Reg. No: {doctorProfile.medicalLicense}</p>
                <p className="text-xs text-gray-600">Signature</p>
              </div>
            )}
          </div>
        </div>

        {/* Watermark */}
        {brandSettings.watermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <div className="text-6xl font-bold text-gray-800 transform rotate-45">
              {brandSettings.customHeader}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAppointmentsList = (appointmentsList) => (
    <div className="space-y-4">
      {appointmentsList.map((appointment) => (
        <motion.div
          key={appointment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-500">
                    {appointment.patientAge} years, {appointment.patientGender}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {appointment.patientPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {appointment.patientEmail}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
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
                <div className="mt-2 text-sm text-gray-500">
                  <p className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {appointment.date}
                  </p>
                  <p className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {appointment.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Symptoms</p>
                <p className="text-sm text-gray-700">{appointment.symptoms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Medical History</p>
                <p className="text-sm text-gray-700">{appointment.medicalHistory}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`flex items-center gap-2 text-sm ${
                  appointment.type === 'video' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  {appointment.type === 'video' ? <Video className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  {appointment.type === 'video' ? 'Video Consultation' : 'In-Person'}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  BDT {appointment.consultationFee}
                </span>
                <span className={`flex items-center gap-2 text-sm ${
                  appointment.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  <CheckCircle className="w-4 h-4" />
                  {appointment.paymentStatus}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {appointment.status === 'upcoming' && (
                  <>
                    {appointment.type === 'video' && (
                      <button
                        onClick={() => setShowVideoConsult(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                      >
                        <Video className="w-4 h-4" />
                        Start Consultation
                      </button>
                    )}
                    <button
                      onClick={() => openPrescription(appointment, 'create')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      Create Prescription
                    </button>
                  </>
                )}
                {appointment.status === 'completed' && (
                  <button
                    onClick={() => openPrescription(appointment, 'view')}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    View Prescription
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Professional Appointment System</h1>
                <p className="text-gray-600">Personalized prescriptions with doctor profile integration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openPrescriptionWithoutAppointment}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Create Prescription
              </button>
              <div className="text-right">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>4.8/5.0</span>
                  </div>
                  <span>•</span>
                  <span>{appointments.filter(a => a.status === 'completed').length} completed</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 bg-green-100 text-green-700`}>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Active
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2 mb-6">
          <nav className="flex space-x-2">
            {[
              { id: 'upcoming', label: 'Upcoming Appointments', icon: Calendar, color: 'blue' },
              { id: 'completed', label: 'Completed', icon: CheckCircle, color: 'green' },
              { id: 'prescriptions', label: 'Prescription History', icon: FileText, color: 'purple' },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'orange' }
            ].map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
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
        {activeTab === 'upcoming' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Appointments ({appointments.filter(a => a.status === 'upcoming').length})
              </h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
            {renderAppointmentsList(appointments.filter(a => a.status === 'upcoming'))}
          </div>
        )}

        {activeTab === 'completed' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Completed Appointments ({appointments.filter(a => a.status === 'completed').length})
              </h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
            {renderAppointmentsList(appointments.filter(a => a.status === 'completed'))}
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Prescription History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.filter(a => a.status === 'completed').map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-500">{appointment.date}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPrescription(appointment, 'view')}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{appointments.length}</span>
              </div>
              <p className="text-gray-600">Total Appointments</p>
              <p className="text-sm text-green-600 mt-2">+12% from last month</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === 'completed').length}</span>
              </div>
              <p className="text-gray-600">Completed</p>
              <p className="text-sm text-green-600 mt-2">95% completion rate</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">{appointments.filter(a => a.status === 'completed').length}</span>
              </div>
              <p className="text-gray-600">Prescriptions Generated</p>
              <p className="text-sm text-green-600 mt-2">100% digital</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900">4.8</span>
              </div>
              <p className="text-gray-600">Patient Satisfaction</p>
              <p className="text-sm text-green-600 mt-2">Based on 50 reviews</p>
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
              className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {prescriptionMode === 'create' ? 'Create Professional Prescription' : 'View Prescription'}
                  </h2>
                  <button
                    onClick={() => setShowPrescription(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Panel - Form */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Template Selection */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Prescription Template</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {prescriptionTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setPrescription(prev => ({ ...prev, template: template.id }))}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${
                              prescription.template === template.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <template.icon className="w-5 h-5 text-blue-600 mb-1" />
                            <p className="font-medium text-sm">{template.name}</p>
                            <p className="text-xs text-gray-500">{template.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Patient Information */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.name}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, name: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter patient name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.age}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, age: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter age"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                          <select
                            value={prescription.patientInfo.gender}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, gender: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.phone}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, phone: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={prescription.patientInfo.email}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, email: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.address}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, address: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.weight}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, weight: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter weight"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                          <input
                            type="text"
                            value={prescription.patientInfo.height}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, height: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter height"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                          <input
                            type="text"
                            placeholder="120/80"
                            value={prescription.patientInfo.bloodPressure}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, bloodPressure: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate</label>
                          <input
                            type="text"
                            placeholder="72 bpm"
                            value={prescription.patientInfo.heartRate}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, heartRate: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                          <input
                            type="text"
                            placeholder="98.6°F"
                            value={prescription.patientInfo.temperature}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, temperature: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation</label>
                          <input
                            type="text"
                            placeholder="98%"
                            value={prescription.patientInfo.oxygenSaturation}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, oxygenSaturation: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                          <textarea
                            value={prescription.patientInfo.symptoms}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, symptoms: e.target.value }
                            }))}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe patient symptoms"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis/Assessment</label>
                          <textarea
                            value={prescription.doctorNotes}
                            onChange={(e) => setPrescription(prev => ({ ...prev, doctorNotes: e.target.value }))}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter diagnosis or clinical assessment"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
                          <textarea
                            value={prescription.patientInfo.chronicDiseases}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, chronicDiseases: e.target.value }
                            }))}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter relevant medical history"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                          <textarea
                            value={prescription.patientInfo.allergies}
                            onChange={(e) => setPrescription(prev => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, allergies: e.target.value }
                            }))}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter known allergies (write 'None' if no allergies)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Medicines */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900">Medications</h3>
                        <button
                          onClick={addMedicine}
                          className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add Medicine
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {prescription.medicines.map((medicine, index) => (
                          <div key={index} className="p-3 border border-gray-200 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                              <div className="relative">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Medicine Name</label>
                                <input
                                  type="text"
                                  value={medicine.name}
                                  onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                  onFocus={() => {
                                    setSelectedMedicineIndex(index);
                                    setShowMedicineSearch(true);
                                  }}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
                                  placeholder="Search medicine..."
                                />
                                {showMedicineSearch && selectedMedicineIndex === index && (
                                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    <input
                                      type="text"
                                      placeholder="Search medicine..."
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                      className="w-full px-3 py-2 border-b border-gray-200 focus:ring-2 focus:ring-purple-500"
                                    />
                                    <div className="max-h-48 overflow-y-auto">
                                      {filteredMedicines.map((med, medIndex) => (
                                        <button
                                          key={medIndex}
                                          onClick={() => selectMedicineFromDatabase(med)}
                                          className="w-full px-3 py-2 text-left hover:bg-purple-50 border-b border-gray-100"
                                        >
                                          <div className="font-medium text-gray-900 text-sm">{med.name}</div>
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
                                <label className="block text-xs font-medium text-gray-700 mb-1">Dosage</label>
                                <input
                                  type="text"
                                  value={medicine.dosage}
                                  onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
                                  placeholder="e.g., 500mg"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Frequency</label>
                                <select
                                  value={medicine.frequency}
                                  onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
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
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                                  <input
                                    type="text"
                                    value={medicine.duration}
                                    onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
                                    placeholder="e.g., 7 days"
                                  />
                                </div>
                                <button
                                  onClick={() => removeMedicine(index)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Route</label>
                                <select
                                  value={medicine.route}
                                  onChange={(e) => updateMedicine(index, 'route', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
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
                                <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                                <select
                                  value={medicine.type}
                                  onChange={(e) => updateMedicine(index, 'type', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
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
                                <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                                <input
                                  type="text"
                                  value={medicine.quantity}
                                  onChange={(e) => updateMedicine(index, 'quantity', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
                                  placeholder="e.g., 30 tablets"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Refills</label>
                                <input
                                  type="text"
                                  value={medicine.refills}
                                  onChange={(e) => updateMedicine(index, 'refills', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
                                  placeholder="e.g., 2 refills"
                                />
                              </div>
                            </div>
                            <div className="mt-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Special Instructions</label>
                              <textarea
                                value={medicine.instructions}
                                onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                                rows={2}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-sm"
                                placeholder="Enter special instructions for this medication"
                              />
                            </div>
                          </div>
                        ))}
                        {prescription.medicines.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Pill className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No medications added yet</p>
                            <p className="text-sm">Click "Add Medicine" to start prescribing</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Instructions & Follow-up</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">General Instructions</label>
                          <textarea
                            value={prescription.instructions}
                            onChange={(e) => setPrescription(prev => ({ ...prev, instructions: e.target.value }))}
                            rows={3}
                            placeholder="Provide general instructions for the patient..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Instructions</label>
                          <input
                            type="text"
                            value={prescription.followUp}
                            onChange={(e) => setPrescription(prev => ({ ...prev, followUp: e.target.value }))}
                            placeholder="Follow-up instructions..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Preview & Actions */}
                  <div className="space-y-6">
                    {/* Brand Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Brand Settings</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={brandSettings.logo}
                            disabled
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">Include Logo</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={brandSettings.signature}
                            disabled
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">Include Signature</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={brandSettings.qrCode}
                            disabled
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">Include QR Code</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={brandSettings.watermark}
                            disabled
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">Include Watermark</span>
                        </label>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Prescription Preview</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                        {renderProfessionalPrescription()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <FileDown className="w-4 h-4" />
                        Generate PDF
                      </button>
                      <button
                        onClick={generateWord}
                        disabled={isGenerating}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <FileDown className="w-4 h-4" />
                        Generate Word
                      </button>
                      <button
                        onClick={sendPrescriptionToPatient}
                        disabled={isGenerating}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send to Patient
                      </button>
                      <button
                        onClick={() => {
                          if (prescriptionRef.current) {
                            const printContent = prescriptionRef.current.innerHTML;
                            const printWindow = window.open('', '_blank');
                            const htmlContent = '<html><head><title>Prescription</title><style>body { font-family: Times New Roman, serif; margin: 20px; } .prescription { border: 1px solid #ccc; padding: 20px; max-width: 800px; }</style></head><body><div class="prescription">' + printContent + '</div></body></html>';
                            printWindow.document.write(htmlContent);
                            printWindow.document.close();
                            printWindow.print();
                          }
                        }}
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        Print
                      </button>
                    </div>

                    {generationStatus && (
                      <div className={`p-3 rounded-lg text-sm text-center ${
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
              className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-4xl w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Video Consultation</h2>
                  <button
                    onClick={() => setShowVideoConsult(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-6">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <User className="w-16 h-16" />
                    </div>
                    <p className="font-semibold text-lg">Patient Connected</p>
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
