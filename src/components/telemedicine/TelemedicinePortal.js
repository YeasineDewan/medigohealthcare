import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Users,
  Calendar,
  Clock,
  Stethoscope,
  Heart,
  Brain,
  Activity,
  Settings,
  Monitor,
  MonitorOff,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Grid,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Image,
  Share2,
  Bell,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Camera,
  CameraOff,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Recording,
  Square,
  Circle,
  Pause,
  Play,
  SkipForward,
  SkipBack,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  User,
  MapPin,
  Star,
  Award,
  Zap,
  Target,
  Shield,
  Lock,
  Unlock,
  MessageCircle,
  Send,
  Paperclip,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const TelemedicinePortal = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  const [participants, setParticipants] = useState([]);
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const chatRef = useRef(null);
  const localVideoRef = useRef(null);

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(() => {
      if (isInCall) {
        setCallDuration(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isInCall]);

  const fetchAppointments = async () => {
    try {
      // Mock data
      setUpcomingAppointments([
        {
          id: 1,
          doctorName: 'Dr. Sarah Johnson',
          doctorSpecialization: 'Cardiology',
          patientName: 'John Doe',
          date: '2024-04-01',
          time: '10:00 AM',
          duration: 30,
          type: 'video_consultation',
          status: 'scheduled',
          meetingLink: 'https://meet.medigo.com/room/12345',
          notes: 'Follow-up on hypertension treatment'
        },
        {
          id: 2,
          doctorName: 'Dr. Michael Chen',
          doctorSpecialization: 'Neurology',
          patientName: 'Emily Davis',
          date: '2024-04-02',
          time: '02:30 PM',
          duration: 45,
          type: 'video_consultation',
          status: 'scheduled',
          meetingLink: 'https://meet.medigo.com/room/67890',
          notes: 'Migraine treatment consultation'
        }
      ]);

      setPastAppointments([
        {
          id: 3,
          doctorName: 'Dr. Robert Williams',
          doctorSpecialization: 'Orthopedics',
          patientName: 'Robert Johnson',
          date: '2024-03-28',
          time: '09:00 AM',
          duration: 60,
          type: 'video_consultation',
          status: 'completed',
          meetingLink: 'https://meet.medigo.com/room/11111',
          duration: 45,
          recording: 'https://storage.medigo.com/recordings/12345.mp4',
          notes: 'Post-surgery follow-up'
        }
      ]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const startCall = (appointment) => {
    setSelectedAppointment(appointment);
    setIsInCall(true);
    setParticipants([
      {
        id: 1,
        name: appointment.patientName,
        role: 'patient',
        isVideoEnabled: true,
        isAudioEnabled: true,
        isSpeaking: false
      },
      {
        id: 2,
        name: appointment.doctorName,
        role: 'doctor',
        isVideoEnabled: true,
        isAudioEnabled: true,
        isSpeaking: false
      }
    ]);
  };

  const endCall = () => {
    setIsInCall(false);
    setSelectedAppointment(null);
    setCallDuration(0);
    setParticipants([]);
    setChatMessages([]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        text: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
      chatRef.current?.scrollToBottom();
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const AppointmentCard = ({ appointment, isPast = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Video className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{appointment.doctorName}</h4>
            <p className="text-sm text-gray-600">{appointment.doctorSpecialization}</p>
            <p className="text-xs text-gray-500">Patient: {appointment.patientName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{appointment.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{appointment.time}</span>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <span className="font-medium">Notes:</span> {appointment.notes}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Duration: {appointment.duration} min</span>
          <span className="text-xs text-gray-500">Type: Video Consultation</span>
        </div>
        <div className="flex items-center space-x-2">
          {!isPast && (
            <>
              <button
                onClick={() => startCall(appointment)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Start Call
              </button>
              <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                <Calendar className="w-4 h-4" />
              </button>
            </>
          )}
          {isPast && appointment.recording && (
            <>
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                View Recording
              </button>
              <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                <Download className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  const VideoCallInterface = () => (
    <div className={`fixed inset-0 bg-gray-900 z-50 ${isFullscreen ? '' : 'rounded-lg border border-gray-700'}`}>
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-white font-medium">
            {selectedAppointment?.doctorName} - {selectedAppointment?.patientName}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Duration: {formatDuration(callDuration)}</span>
            <div className={`flex items-center space-x-1 ${getConnectionQualityColor()}`}>
              <Signal className="w-4 h-4" />
              <span className="text-xs capitalize">{connectionQuality}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="p-2 text-gray-400 hover:text-white rounded"
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 text-gray-400 hover:text-white rounded"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-white rounded"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-white rounded"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={endCall}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Video Area */}
        <div className="flex-1 relative bg-gray-900">
          {/* Remote Video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-16 h-16 text-gray-600" />
              </div>
              {activeSpeaker && (
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                  {activeSpeaker.name}
                </div>
              )}
            </div>
          </div>

          {/* Local Video */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700">
            <div className="relative w-full h-full flex items-center justify-center">
              {isVideoEnabled ? (
                <div className="absolute inset-0 bg-gray-700 rounded flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gray-700 rounded flex items-center justify-center">
                  <CameraOff className="w-8 h-8 text-gray-500" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                You
              </div>
            </div>
          </div>

          {/* Screen Share */}
          {isScreenSharing && (
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-lg flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span className="text-sm">Screen Sharing</span>
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-lg flex items-center space-x-2">
              <Recording className="w-4 h-4" />
              <span className="text-sm">Recording</span>
            </div>
          )}
        </div>

        {/* Side Panel */}
        {(showChat || showParticipants || showSettings) && (
          <div className="w-80 bg-gray-800 border-l border-gray-700">
            {showChat && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-white font-medium">Chat</h4>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2" ref={chatRef}>
                  {chatMessages.map(message => (
                    <div key={message.id} className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white text-sm font-medium">{message.sender}</span>
                          <span className="text-gray-400 text-xs">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={sendMessage}
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showParticipants && (
              <div className="h-full">
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-white font-medium">Participants ({participants.length})</h4>
                </div>
                <div className="p-4 space-y-3">
                  {participants.map(participant => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{participant.name}</p>
                          <p className="text-gray-400 text-xs capitalize">{participant.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {participant.isVideoEnabled ? (
                          <Video className="w-4 h-4 text-green-500" />
                        ) : (
                          <VideoOff className="w-4 h-4 text-red-500" />
                        )}
                        {participant.isAudioEnabled ? (
                          <Mic className="w-4 h-4 text-green-500" />
                        ) : (
                          <MicOff className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showSettings && (
              <div className="h-full">
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-white font-medium">Settings</h4>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm">Video Quality</label>
                    <select className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600">
                      <option>HD (720p)</option>
                      <option>SD (480p)</option>
                      <option>LD (360p)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm">Audio Input</label>
                    <select className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600">
                      <option>Default Microphone</option>
                      <option>Headset Microphone</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm">Audio Output</label>
                    <select className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600">
                      <option>Default Speakers</option>
                      <option>Headphones</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 px-4 py-3">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full transition-colors ${
              isAudioEnabled
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full transition-colors ${
              isVideoEnabled
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleScreenShare}
            className={`p-3 rounded-full transition-colors ${
              isScreenSharing
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-colors ${
              isRecording
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <Recording className="w-5 h-5" />
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600">
            <Grid className="w-5 h-5" />
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600">
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={endCall}
            className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  if (isInCall) {
    return <VideoCallInterface />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Telemedicine Portal</h2>
          <p className="text-gray-600">Virtual consultations and remote healthcare</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>Schedule Consultation</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{pastAppointments.length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Duration</p>
              <p className="text-2xl font-bold text-gray-900">2h 45m</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Quality</p>
              <p className="text-2xl font-bold text-gray-900">Excellent</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Signal className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {upcomingAppointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>

      {/* Past Appointments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Consultations</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pastAppointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} isPast={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelemedicinePortal;
