import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor, MonitorOff, MessageSquare,
  Users, Settings, Bell, Search, Filter, Calendar, Clock, Star, Heart, Activity,
  FileText, Download, Send, Paperclip, X, Plus, Check, AlertCircle,
  ChevronRight, ChevronLeft, Camera, Share2, Volume2, Maximize2, Minimize2,
  User, Shield, Wifi, WifiOff, UserCheck, Award, TrendingUp,
  ThumbsUp, ThumbsDown, Clock3, Globe, Languages, Mail, MapPin, DollarSign,
  Eye, EyeOff, RefreshCw, Zap, Brain, Baby, Smile,
  Pause, Play, SkipForward, SkipBack, MoreVertical, Grid, List, Layout,
  Fullscreen, Circle
} from 'lucide-react';

const VideoCallInterface = ({ consultation, onEndCall, onPrescription, onChat }) => {
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(true);
  const [showVitals, setShowVitals] = useState(false);
  const [layout, setLayout] = useState('grid'); // grid, spotlight, sidebar
  const [quality, setQuality] = useState('hd'); // sd, hd, fhd
  const [connectionStatus, setConnectionStatus] = useState('excellent'); // excellent, good, poor, disconnected
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState([]);
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 98.6,
    oxygenSaturation: 98,
    weight: 70,
    height: 175
  });
  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: '',
    symptoms: '',
    medicines: [],
    instructions: '',
    followUp: '',
    notes: ''
  });

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatRef = useRef(null);
  const screenShareRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Simulate connection status changes
    const statusInterval = setInterval(() => {
      const statuses = ['excellent', 'good', 'poor'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setConnectionStatus(randomStatus);
    }, 10000);
    
    return () => clearInterval(statusInterval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-yellow-500';
      case 'poor': return 'bg-orange-500';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getConnectionIcon = (status) => {
    switch (status) {
      case 'excellent': return Wifi;
      case 'good': return Wifi;
      case 'poor': return WifiOff;
      case 'disconnected': return WifiOff;
      default: return Wifi;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'doctor',
        text: newMessage,
        timestamp: new Date(),
        type: 'text'
      }]);
      setNewMessage('');
    }
  };

  const handleAddMedicine = () => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { 
        name: '', 
        dosage: '', 
        frequency: '', 
        duration: '', 
        instructions: '' 
      }]
    }));
  };

  const handleUpdateMedicine = (index, field, value) => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: prev.medicines.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleRemoveMedicine = (index) => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

  const handleStartCall = () => {
    setIsLive(true);
    setCallDuration(0);
    setMessages([{
      id: 1,
      sender: 'system',
      text: `Call started with ${consultation?.patientName || 'Patient'}`,
      timestamp: new Date(),
      type: 'system'
    }]);
  };

  const handleEndCall = () => {
    setIsLive(false);
    setIsRecording(false);
    setIsScreenSharing(false);
    if (onEndCall) {
      onEndCall({
        duration: callDuration,
        messages: messages,
        prescription: prescriptionData
      });
    }
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'system',
        text: 'Recording started',
        timestamp: new Date(),
        type: 'system'
      }]);
    } else {
      setIsRecording(false);
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'system',
        text: 'Recording stopped and saved',
        timestamp: new Date(),
        type: 'system'
      }]);
    }
  };

  const handleShareScreen = async () => {
    if (!isScreenSharing) {
      try {
        // Simulate screen sharing
        setIsScreenSharing(true);
        setMessages([...messages, {
          id: messages.length + 1,
          sender: 'system',
          text: 'Screen sharing started',
          timestamp: new Date(),
          type: 'system'
        }]);
      } catch (error) {
        console.error('Error sharing screen:', error);
      }
    } else {
      setIsScreenSharing(false);
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'system',
        text: 'Screen sharing stopped',
        timestamp: new Date(),
        type: 'system'
      }]);
    }
  };

  const handleSavePrescription = () => {
    if (onPrescription) {
      onPrescription(prescriptionData);
    }
    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'system',
      text: 'Prescription saved and sent to patient',
      timestamp: new Date(),
      type: 'system'
    }]);
  };

  const renderVideoGrid = () => {
    const videos = [
      { id: 'local', name: 'You', muted: isMuted, videoOff: isVideoOff, isLocal: true },
      { id: 'remote', name: consultation?.patientName || 'Patient', muted: false, videoOff: false, isLocal: false }
    ];

    return (
      <div className={`grid ${layout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} gap-4 h-full`}>
        {videos.map((video) => (
          <div key={video.id} className="relative bg-gray-900 rounded-xl overflow-hidden">
            {/* Video Feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              {video.videoOff ? (
                <div className="text-center text-white">
                  <VideoOff className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">{video.name}</p>
                  <p className="text-sm text-gray-400">Camera Off</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <User className="w-20 h-20 text-white/50" />
                </div>
              )}
            </div>

            {/* Video Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                {video.name}
              </span>
              {video.muted && (
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <MicOff className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {video.isLocal && (
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{consultation?.patientName || 'Patient'}</h3>
                <p className="text-sm text-gray-400">Video Consultation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getConnectionColor(connectionStatus)} animate-pulse`} />
                <span className="text-sm text-gray-300">{connectionStatus}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(callDuration)}</span>
              </div>
              {isRecording && (
                <div className="flex items-center gap-2 text-red-500">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">REC</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLayout(layout === 'grid' ? 'spotlight' : 'grid')}
              className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              title="Change Layout"
            >
              {layout === 'grid' ? <Layout className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Fullscreen className="w-5 h-5" />}
            </button>
            <button
              onClick={handleEndCall}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <PhoneOff className="w-4 h-4" />
              End Call
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 relative">
          {!isLive ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-md">
                <Video className="w-24 h-24 mx-auto mb-6 text-blue-400" />
                <h2 className="text-3xl font-bold mb-4">Ready to Start Consultation</h2>
                <p className="text-gray-400 mb-8">
                  Click "Start Call" to begin your video consultation with {consultation?.patientName || 'the patient'}
                </p>
                <button
                  onClick={handleStartCall}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-3 mx-auto"
                >
                  <Video className="w-5 h-5" />
                  Start Call
                </button>
                
                <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>HD Video</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Screen Share</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>E-Prescription</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            renderVideoGrid()
          )}

          {/* Call Controls */}
          {isLive && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-full px-6 py-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOff ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title={isVideoOff ? 'Turn On Camera' : 'Turn Off Camera'}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
              
              <button
                onClick={handleShareScreen}
                className={`p-3 rounded-full transition-colors ${
                  isScreenSharing ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              >
                <Monitor className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleToggleRecording}
                className={`p-3 rounded-full transition-colors ${
                  isRecording ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              >
                <Circle className="w-5 h-5" />
              </button>
              
              <div className="w-px h-8 bg-gray-600" />
              
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-3 rounded-full transition-colors ${
                  showChat ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title="Chat"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowPatientInfo(!showPatientInfo)}
                className={`p-3 rounded-full transition-colors ${
                  showPatientInfo ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title="Patient Info"
              >
                <User className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowPrescription(!showPrescription)}
                className={`p-3 rounded-full transition-colors ${
                  showPrescription ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title="Prescription"
              >
                <FileText className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowVitals(!showVitals)}
                className={`p-3 rounded-full transition-colors ${
                  showVitals ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                title="Vitals"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Side Panels */}
        <AnimatePresence>
          {/* Chat Panel */}
          {showChat && isLive && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-gray-800 border-l border-gray-700 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Chat</h3>
              </div>
              
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'doctor' 
                        ? 'bg-blue-600 text-white' 
                        : message.sender === 'system'
                        ? 'bg-gray-700 text-gray-300 text-sm'
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'doctor' ? 'text-blue-200' : 'text-gray-400'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Patient Info Panel */}
          {showPatientInfo && isLive && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-gray-800 border-l border-gray-700 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Patient Information</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Personal Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{consultation?.patientName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Age:</span>
                      <span className="text-white">{consultation?.patientAge || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gender:</span>
                      <span className="text-white">{consultation?.patientGender || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{consultation?.patientPhone || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Medical Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Symptoms:</span>
                      <p className="text-white mt-1">{consultation?.symptoms || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Medical History:</span>
                      <p className="text-white mt-1">{consultation?.medicalHistory || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Allergies:</span>
                      <p className="text-white mt-1">{consultation?.allergies || 'None specified'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Emergency Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contact:</span>
                      <span className="text-white">{consultation?.emergencyContact || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Relationship:</span>
                      <span className="text-white">{consultation?.relationship || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Prescription Panel */}
          {showPrescription && isLive && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-gray-800 border-l border-gray-700 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">E-Prescription</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Diagnosis</label>
                  <textarea
                    value={prescriptionData.diagnosis}
                    onChange={(e) => setPrescriptionData({...prescriptionData, diagnosis: e.target.value})}
                    placeholder="Enter diagnosis..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Symptoms</label>
                  <textarea
                    value={prescriptionData.symptoms}
                    onChange={(e) => setPrescriptionData({...prescriptionData, symptoms: e.target.value})}
                    placeholder="Enter symptoms..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Medicines</label>
                    <button
                      onClick={handleAddMedicine}
                      className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {prescriptionData.medicines.map((medicine, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-3 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Medicine name"
                            value={medicine.name}
                            onChange={(e) => handleUpdateMedicine(index, 'name', e.target.value)}
                            className="flex-1 px-2 py-1 bg-gray-600 text-white rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                          <button
                            onClick={() => handleRemoveMedicine(index)}
                            className="p-1 text-red-400 hover:bg-red-600 rounded transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Dosage"
                            value={medicine.dosage}
                            onChange={(e) => handleUpdateMedicine(index, 'dosage', e.target.value)}
                            className="px-2 py-1 bg-gray-600 text-white rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Frequency"
                            value={medicine.frequency}
                            onChange={(e) => handleUpdateMedicine(index, 'frequency', e.target.value)}
                            className="px-2 py-1 bg-gray-600 text-white rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Duration"
                            value={medicine.duration}
                            onChange={(e) => handleUpdateMedicine(index, 'duration', e.target.value)}
                            className="px-2 py-1 bg-gray-600 text-white rounded text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Instructions</label>
                  <textarea
                    value={prescriptionData.instructions}
                    onChange={(e) => setPrescriptionData({...prescriptionData, instructions: e.target.value})}
                    placeholder="Special instructions for the patient..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Follow-up</label>
                  <input
                    type="text"
                    value={prescriptionData.followUp}
                    onChange={(e) => setPrescriptionData({...prescriptionData, followUp: e.target.value})}
                    placeholder="Follow-up instructions..."
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSavePrescription}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Save & Send
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Send className="w-4 h-4" />
                    Email
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Vitals Panel */}
          {showVitals && isLive && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-gray-800 border-l border-gray-700 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Vital Signs</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">Heart Rate</h4>
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{vitals.heartRate} bpm</div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">Blood Pressure</h4>
                    <Heart className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{vitals.bloodPressure}</div>
                  <div className="text-sm text-gray-400">Normal Range</div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">Temperature</h4>
                    <Activity className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{vitals.temperature}°F</div>
                  <div className="text-sm text-gray-400">Normal</div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">Oxygen Saturation</h4>
                    <Activity className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{vitals.oxygenSaturation}%</div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update Vitals
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoCallInterface;
