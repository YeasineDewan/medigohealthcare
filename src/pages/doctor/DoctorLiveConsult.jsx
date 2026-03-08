import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, Users, Radio, MessageSquare, 
  FileText, Monitor, Download, Clock, CheckCircle, X, Send, Paperclip,
  Plus, Stethoscope, Heart, Thermometer, Activity, Calendar, User, Settings, Bell,
  Wifi, WifiOff, AlertCircle, Award, Zap, Shield, Star, TrendingUp, Volume2,
  Camera, CameraOff, Share2, Square, Play, Pause, SkipForward, SkipBack,
  Headphones, Maximize2, Grid, List, Filter, Search, ChevronDown, ChevronUp,
  ArrowUp, ArrowDown, RefreshCw, Loader, Check, XCircle
} from 'lucide-react';

const waitingPatients = [
  { 
    id: 1, 
    name: 'Ahmed Khan', 
    age: 34,
    gender: 'Male',
    waitTime: '2 min',
    urgency: 'medium',
    symptoms: 'Chest pain, shortness of breath',
    previousVisits: 3,
    insurance: 'HealthGuard Plus'
  },
  { 
    id: 2, 
    name: 'Sara Ali', 
    age: 28,
    gender: 'Female',
    waitTime: '5 min',
    urgency: 'low',
    symptoms: 'Routine checkup',
    previousVisits: 8,
    insurance: 'MediCare Basic'
  },
  { 
    id: 3, 
    name: 'Rahman Hossain', 
    age: 45,
    gender: 'Male',
    waitTime: '8 min',
    urgency: 'high',
    symptoms: 'Severe headache, nausea',
    previousVisits: 1,
    insurance: 'None'
  },
];

export default function DoctorLiveConsult() {
  const [isLive, setIsLive] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(true);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [consultationDuration, setConsultationDuration] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [prescription, setPrescription] = useState({
    medicines: [],
    instructions: '',
    followUp: ''
  });
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isLive && currentPatient) {
      interval = setInterval(() => {
        setConsultationDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive, currentPatient]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const acceptPatient = (patient) => {
    setCurrentPatient(patient);
    setIsLive(true);
    setConsultationDuration(0);
    setMessages([{
      id: 1,
      sender: 'system',
      text: `Consultation started with ${patient.name}`,
      timestamp: new Date()
    }]);
  };

  const endConsultation = () => {
    setIsLive(false);
    setCurrentPatient(null);
    setConsultationDuration(0);
    setMessages([]);
    setShowChat(false);
    setShowPrescription(false);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'doctor',
        text: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  const addMedicine = () => {
    setPrescription(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '', duration: '' }]
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

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 mb-8 backdrop-blur-xl bg-white/95">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <Video className="w-10 h-10 text-transparent bg-gradient-to-br from-blue-600 to-purple-600" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Advanced Live Consultation Suite</h1>
                <p className="text-gray-600 mt-2">Enterprise-grade telemedicine platform with AI-powered features</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                    <Wifi className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Connection: {connectionQuality}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">HD Quality</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative group p-3 rounded-xl hover:bg-gray-100 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <Bell className="w-6 h-6 text-gray-700 relative z-10" />
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
              </button>
              <button className="relative group p-3 rounded-xl hover:bg-gray-100 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <Settings className="w-6 h-6 text-gray-700 relative z-10" />
              </button>
              <div className={`px-6 py-3 rounded-full text-sm font-bold flex items-center gap-3 transition-all duration-300 ${
                isLive 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
              }`}>
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                <span className="font-bold">{isLive ? 'LIVE NOW' : 'OFFLINE'}</span>
                {isLive && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-150" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Waiting Queue */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden backdrop-blur-xl bg-white/95">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    Patient Queue
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-white/20 rounded-full">
                      <span className="text-white font-bold text-sm">{waitingPatients.length}</span>
                    </div>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {waitingPatients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            patient.urgency === 'high' ? 'bg-red-500' :
                            patient.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{patient.name}</h4>
                          <p className="text-sm text-gray-500">{patient.age} years, {patient.gender}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${
                        getUrgencyColor(patient.urgency)
                      }`}>
                        {patient.urgency.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">{patient.symptoms}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Wait: {patient.waitTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Visits: {patient.previousVisits}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => acceptPatient(patient)}
                        disabled={isLive}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg shadow-blue-500/25"
                      >
                        {isLive ? 'In Session' : 'Accept'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Consultation Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden backdrop-blur-xl bg-white/95">
              {/* Video Area */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black aspect-video">
                {isLive && currentPatient ? (
                  <div className="absolute inset-0">
                    {/* Patient Video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 mx-auto mb-6"
                        >
                          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                            <User className="w-20 h-20 text-white" />
                          </div>
                        </motion.div>
                        <motion.h2 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="font-bold text-2xl mb-2"
                        >
                          {currentPatient.name}
                        </motion.h2>
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center justify-center gap-4 text-sm text-white/70"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Patient • Connected</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4" />
                            <span>HD Quality</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Doctor Video (PiP) */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute top-6 right-6 w-40 h-28 bg-gray-800 rounded-2xl border-2 border-white shadow-2xl overflow-hidden"
                    >
                      <div className="w-full h-full flex items-center justify-center relative">
                        {videoOff ? (
                          <div className="text-center">
                            <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-400">Camera Off</p>
                          </div>
                        ) : (
                          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center">
                            <Stethoscope className="w-12 h-12 text-white" />
                          </div>
                        )}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-white font-medium">REC</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Consultation Info */}
                    <motion.div 
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-6 left-6 bg-black/60 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20"
                    >
                      <div className="flex items-center gap-3 text-white">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          <span className="font-bold text-lg">{formatTime(consultationDuration)}</span>
                        </div>
                        <div className="w-px h-6 bg-white/30" />
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-green-400" />
                          <span className="text-sm">HD</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Controls */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMuted(!muted)}
                        className={`p-4 rounded-full transition-all duration-300 ${
                          muted 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {muted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setVideoOff(!videoOff)}
                        className={`p-4 rounded-full transition-all duration-300 ${
                          videoOff 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {videoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setScreenSharing(!screenSharing)}
                        className={`p-4 rounded-full transition-all duration-300 ${
                          screenSharing 
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Monitor className="w-6 h-6" />
                      </motion.button>
                      <div className="w-px h-8 bg-white/30" />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-4 rounded-full transition-all duration-300 ${
                          isRecording 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Camera className="w-6 h-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={endConsultation}
                        className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/50"
                      >
                        <PhoneOff className="w-6 h-6" />
                      </motion.button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-12">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Radio className="w-32 h-32 mx-auto mb-8 text-blue-400" />
                        <h2 className="text-3xl font-bold mb-4">Ready for Consultations</h2>
                        <p className="text-white/70 mb-12 text-lg">Accept patients from the waiting queue to begin professional telemedicine sessions</p>
                        <div className="grid grid-cols-3 gap-8 mb-12">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
                              <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <span className="text-white/80 font-medium">HD Video Quality</span>
                          </div>
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                              <Monitor className="w-8 h-8 text-blue-400" />
                            </div>
                            <span className="text-white/80 font-medium">Screen Sharing</span>
                          </div>
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                              <FileText className="w-8 h-8 text-purple-400" />
                            </div>
                            <span className="text-white/80 font-medium">E-Prescription</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Shield className="w-4 h-4" />
                            <span>HIPAA Compliant</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Wifi className="w-4 h-4" />
                            <span>Encrypted Connection</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {isLive && (
                <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowChat(!showChat)}
                      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        showChat 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Live Chat</span>
                      {showChat && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPatientInfo(!showPatientInfo)}
                      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        showPatientInfo 
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-500 hover:bg-green-50'
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <span>Patient Info</span>
                      {showPatientInfo && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPrescription(!showPrescription)}
                      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        showPrescription 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' 
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-500 hover:bg-purple-50'
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                      <span>E-Prescription</span>
                      {showPrescription && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Panel */}
            <AnimatePresence>
              {showChat && isLive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Consultation Chat</h3>
                  </div>
                  <div ref={chatRef} className="h-64 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === 'doctor' 
                            ? 'bg-blue-600 text-white' 
                            : msg.sender === 'system'
                            ? 'bg-gray-100 text-gray-600 text-sm'
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={sendMessage}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Patient Info Panel */}
            <AnimatePresence>
              {showPatientInfo && isLive && currentPatient && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Patient Information</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Name</label>
                        <p className="font-medium">{currentPatient.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Age/Gender</label>
                        <p className="font-medium">{currentPatient.age} years, {currentPatient.gender}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Symptoms</label>
                        <p className="font-medium">{currentPatient.symptoms}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Insurance</label>
                        <p className="font-medium">{currentPatient.insurance}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Previous Visits</label>
                        <p className="font-medium">{currentPatient.previousVisits} visits</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Urgency</label>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(currentPatient.urgency)}`}>
                          {currentPatient.urgency}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-sm text-gray-500">Consultation Notes</label>
                      <textarea
                        value={consultationNotes}
                        onChange={(e) => setConsultationNotes(e.target.value)}
                        placeholder="Add consultation notes..."
                        rows={3}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prescription Panel */}
            <AnimatePresence>
              {showPrescription && isLive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">E-Prescription</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Medicines</label>
                        {prescription.medicines.map((medicine, index) => (
                          <div key={index} className="flex gap-2 mt-2">
                            <input
                              type="text"
                              placeholder="Medicine name"
                              value={medicine.name}
                              onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              placeholder="Dosage"
                              value={medicine.dosage}
                              onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              placeholder="Duration"
                              value={medicine.duration}
                              onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => removeMedicine(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addMedicine}
                          className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          Add Medicine
                        </button>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Instructions</label>
                        <textarea
                          value={prescription.instructions}
                          onChange={(e) => setPrescription(prev => ({ ...prev, instructions: e.target.value }))}
                          placeholder="Special instructions for the patient..."
                          rows={3}
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Follow-up</label>
                        <input
                          type="text"
                          value={prescription.followUp}
                          onChange={(e) => setPrescription(prev => ({ ...prev, followUp: e.target.value }))}
                          placeholder="Follow-up instructions..."
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          Send to Patient
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Tools */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Tools */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Quick Tools</h3>
                </div>
                <div className="p-4 space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">Medical Records</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Vital Signs</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Schedule Follow-up</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Paperclip className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium">Share Files</span>
                  </button>
                </div>
              </div>

              {/* Vital Signs */}
              {isLive && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Vital Signs</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Heart Rate</span>
                      </div>
                      <span className="text-sm font-medium">72 bpm</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="text-sm font-medium">98.6°F</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Blood Pressure</span>
                      </div>
                      <span className="text-sm font-medium">120/80</span>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Update Vitals
                    </button>
                  </div>
                </div>
              )}

              {/* Consultation History */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Today's Consultations</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Completed</p>
                        <p className="text-xs text-gray-500">8 consultations</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">In Progress</p>
                        <p className="text-xs text-gray-500">1 consultation</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Pending</p>
                        <p className="text-xs text-gray-500">3 patients</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
