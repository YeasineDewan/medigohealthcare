import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, Users, Radio, MessageSquare, 
  FileText, Monitor, Download, Clock, CheckCircle, X, Send, Paperclip,
  Plus, Stethoscope, Heart, Thermometer, Activity, Calendar, User, Settings, Bell
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
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Advanced Live Consultation</h1>
                <p className="text-gray-600">Professional telemedicine platform with comprehensive features</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                {isLive ? 'Live' : 'Offline'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Waiting Queue */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Waiting Queue ({waitingPatients.length})
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {waitingPatients.map((patient) => (
                  <div key={patient.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{patient.name}</h4>
                        <p className="text-sm text-gray-500">{patient.age} years, {patient.gender}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(patient.urgency)}`}>
                        {patient.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{patient.symptoms}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Wait: {patient.waitTime}</span>
                      <button
                        onClick={() => acceptPatient(patient)}
                        disabled={isLive}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Consultation Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              {/* Video Area */}
              <div className="relative bg-gray-900 aspect-video">
                {isLive && currentPatient ? (
                  <div className="absolute inset-0">
                    {/* Patient Video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                          <User className="w-16 h-16" />
                        </div>
                        <p className="font-semibold text-lg">{currentPatient.name}</p>
                        <p className="text-sm text-white/70">Patient • Connected</p>
                      </div>
                    </div>

                    {/* Doctor Video (PiP) */}
                    <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white shadow-lg">
                      <div className="w-full h-full flex items-center justify-center">
                        {videoOff ? (
                          <VideoOff className="w-8 h-8 text-gray-400" />
                        ) : (
                          <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                            <Stethoscope className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Consultation Info */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(consultationDuration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                      <button
                        onClick={() => setMuted(!muted)}
                        className={`p-3 rounded-full transition-colors ${
                          muted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setVideoOff(!videoOff)}
                        className={`p-3 rounded-full transition-colors ${
                          videoOff ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {videoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setScreenSharing(!screenSharing)}
                        className={`p-3 rounded-full transition-colors ${
                          screenSharing ? 'bg-blue-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Monitor className="w-5 h-5" />
                      </button>
                      <button
                        onClick={endConsultation}
                        className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        <PhoneOff className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <Radio className="w-24 h-24 mx-auto mb-6 text-blue-400" />
                      <h2 className="text-2xl font-bold mb-2">Ready for Consultations</h2>
                      <p className="text-white/70 mb-8">Accept patients from the waiting queue to begin</p>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>HD Video Quality</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Screen Sharing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>E-Prescription</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {isLive && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        showChat ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat
                    </button>
                    <button
                      onClick={() => setShowPatientInfo(!showPatientInfo)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        showPatientInfo ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Patient Info
                    </button>
                    <button
                      onClick={() => setShowPrescription(!showPrescription)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        showPrescription ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Prescription
                    </button>
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
