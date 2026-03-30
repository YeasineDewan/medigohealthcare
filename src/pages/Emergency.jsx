import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ambulance, PhoneCall, Droplet, AlertCircle, MapPin, Phone, Clock, Heart,
  Activity, User, Navigation, CheckCircle, Shield, Zap, Radio, Hospital,
  Siren, Users, TrendingUp, Info, X, ChevronRight, MapPinned, Timer,
  Thermometer, Pill, Stethoscope, Crosshair, Send, AlertTriangle
} from 'lucide-react';
import { Button } from '../components/core/Button';

const emergencyServices = [
  { 
    icon: Ambulance, 
    title: 'Ambulance Service', 
    desc: 'ICU & Basic Life Support', 
    color: 'from-red-500 to-red-600',
    response: '5-10 min',
    available: 'Available Now',
    features: ['GPS Tracking', 'Trained Paramedics', 'Advanced Equipment']
  },
  { 
    icon: PhoneCall, 
    title: 'Emergency Doctor', 
    desc: 'Immediate medical consultation', 
    color: 'from-orange-500 to-orange-600',
    response: 'Instant',
    available: '24/7 Online',
    features: ['Video Call', 'Prescription', 'Instant Advice']
  },
  { 
    icon: Droplet, 
    title: 'Blood Bank', 
    desc: 'Find blood donors instantly', 
    color: 'from-rose-500 to-rose-600',
    response: '2-3 hours',
    available: 'Network Active',
    features: ['All Blood Types', 'Verified Donors', 'Emergency Reserve']
  },
  { 
    icon: Hospital, 
    title: 'Nearest Hospital', 
    desc: 'Find emergency rooms nearby', 
    color: 'from-blue-500 to-blue-600',
    response: 'Real-time',
    available: 'Map View',
    features: ['24/7 ER', 'ICU Available', 'Bed Availability']
  },
  { 
    icon: Heart, 
    title: 'Cardiac Emergency', 
    desc: 'Specialized cardiac support', 
    color: 'from-pink-500 to-pink-600',
    response: '3-5 min',
    available: 'Priority Service',
    features: ['ECG Monitoring', 'Cardiologist', 'Defibrillator']
  },
  { 
    icon: Activity, 
    title: 'Trauma Care', 
    desc: 'Accident & injury response', 
    color: 'from-purple-500 to-purple-600',
    response: '5-8 min',
    available: 'Ready to Deploy',
    features: ['First Aid', 'Surgery Ready', 'Trauma Specialist']
  },
];

const quickContacts = [
  { name: 'National Emergency', number: '999', icon: Phone, color: 'bg-red-500' },
  { name: 'Fire Service', number: '102', icon: AlertTriangle, color: 'bg-orange-500' },
  { name: 'Police', number: '100', icon: Shield, color: 'bg-blue-500' },
  { name: 'Ambulance', number: '199', icon: Ambulance, color: 'bg-red-600' },
];

const nearbyHospitals = [
  { name: 'Square Hospital', distance: '2.3 km', time: '8 min', beds: 'Available', rating: 4.8 },
  { name: 'Dhaka Medical', distance: '3.5 km', time: '12 min', beds: 'Available', rating: 4.6 },
  { name: 'Apollo Hospital', distance: '4.1 km', time: '15 min', beds: 'Limited', rating: 4.9 },
  { name: 'United Hospital', distance: '5.2 km', time: '18 min', beds: 'Available', rating: 4.7 },
];

const emergencyTips = [
  { title: 'Stay Calm', desc: 'Keep yourself and others calm', icon: Heart },
  { title: 'Call for Help', desc: 'Contact emergency services immediately', icon: Phone },
  { title: 'Share Location', desc: 'Provide accurate location details', icon: MapPin },
  { title: 'Follow Instructions', desc: 'Listen to medical professionals', icon: Stethoscope },
];

export default function Emergency() {
  const [activeService, setActiveService] = useState(null);
  const [showAmbulanceForm, setShowAmbulanceForm] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    emergency: 'medical',
    patient: '',
    contact: '',
    details: ''
  });

  const [ambulanceStatus, setAmbulanceStatus] = useState(null);

  const handleServiceClick = (service) => {
    if (service.title === 'Ambulance Service') {
      setShowAmbulanceForm(true);
    }
    setActiveService(service);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    // Simulate ambulance dispatch
    setAmbulanceStatus('dispatched');
    setShowAmbulanceForm(false);
    
    // Show tracking after 2 seconds
    setTimeout(() => {
      setAmbulanceStatus('tracking');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50">
      {/* Hero Section with Alert Banner */}
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Alert Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Siren className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Emergency Response Active 24/7</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Emergency Medical Services
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Immediate medical assistance when every second counts. Our emergency response team is ready 24/7.
              </p>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a href="tel:999">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    <Phone className="w-5 h-5 mr-2" />
                    Call 999 Now
                  </Button>
                </a>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                  onClick={() => setShowAmbulanceForm(true)}
                >
                  <Ambulance className="w-5 h-5 mr-2" />
                  Request Ambulance
                </Button>
              </div>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Timer className="w-8 h-8 mb-3 text-white/80" />
                <p className="text-3xl font-bold mb-1">5 Min</p>
                <p className="text-white/80 text-sm">Avg Response Time</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Users className="w-8 h-8 mb-3 text-white/80" />
                <p className="text-3xl font-bold mb-1">24/7</p>
                <p className="text-white/80 text-sm">Always Available</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Ambulance className="w-8 h-8 mb-3 text-white/80" />
                <p className="text-3xl font-bold mb-1">50+</p>
                <p className="text-white/80 text-sm">Ambulances Ready</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <TrendingUp className="w-8 h-8 mb-3 text-white/80" />
                <p className="text-3xl font-bold mb-1">98%</p>
                <p className="text-white/80 text-sm">Success Rate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ambulance Tracking Status */}
        <AnimatePresence>
          {ambulanceStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <Ambulance className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Ambulance Dispatched!</h3>
                    <p className="text-white/90 text-sm">Arriving in approximately 7 minutes</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                  onClick={() => setAmbulanceStatus(null)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emergency Services Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#111827] mb-6">Emergency Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-[#111827] text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{service.response}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{service.available}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full group-hover:bg-red-600 group-hover:shadow-lg transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                  >
                    Request Now
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Emergency Contacts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Quick Emergency Contacts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickContacts.map((contact, i) => (
                <motion.a
                  key={contact.number}
                  href={`tel:${contact.number}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 ${contact.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#111827]">{contact.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{contact.number}</p>
                  </div>
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Emergency Tips */}
          <div>
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Emergency Tips</h2>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
              <div className="space-y-4">
                {emergencyTips.map((tip, i) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827] text-sm">{tip.title}</p>
                      <p className="text-gray-600 text-xs">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#111827]">Nearby Emergency Hospitals</h2>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open(`https://www.google.com/maps/search/hospitals+near+me`, '_blank')}
            >
              <MapPinned className="w-4 h-4" />
              View on Map
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {nearbyHospitals.map((hospital, i) => (
              <motion.div
                key={hospital.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827]">{hospital.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {hospital.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {hospital.time}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        hospital.beds === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {hospital.beds}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <span className="text-sm font-semibold">{hospital.rating}</span>
                    <span className="text-xs">★</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(hospital.name + ' Dhaka')}`, '_blank')}
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    Navigate
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          >
            <Shield className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Protected & Secure</h3>
            <p className="text-white/90 text-sm">All emergency requests are encrypted and your privacy is our priority</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white"
          >
            <Crosshair className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Real-time Tracking</h3>
            <p className="text-white/90 text-sm">Track your ambulance location in real-time with live GPS updates</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white"
          >
            <Zap className="w-10 h-10 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Rapid Response</h3>
            <p className="text-white/90 text-sm">Average response time of 5-10 minutes to ensure immediate care</p>
          </motion.div>
        </div>
      </div>

      {/* Ambulance Request Modal */}
      <AnimatePresence>
        {showAmbulanceForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Ambulance className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Request Emergency Ambulance</h3>
                    <p className="text-white/90 text-sm">Fill in the details for immediate dispatch</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAmbulanceForm(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitRequest} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Emergency Type *
                  </label>
                  <select
                    value={formData.emergency}
                    onChange={(e) => setFormData({...formData, emergency: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                    required
                  >
                    <option value="medical">Medical Emergency</option>
                    <option value="accident">Accident/Trauma</option>
                    <option value="cardiac">Cardiac Emergency</option>
                    <option value="pregnancy">Pregnancy Emergency</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    value={formData.patient}
                    onChange={(e) => setFormData({...formData, patient: e.target.value})}
                    placeholder="Enter patient name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Enter full address or use GPS"
                      className="w-full pl-12 pr-32 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            // In a real app, you'd reverse geocode the coordinates
                            setFormData({...formData, location: `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`});
                          },
                          (error) => {
                            alert('Unable to get your location: ' + error.message);
                          }
                        );
                      } else {
                        alert('Geolocation is not supported by your browser.');
                      }
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <Crosshair className="w-4 h-4" />
                    Use Current Location
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    rows="3"
                    placeholder="Describe the emergency situation (symptoms, injuries, etc.)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <Info className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    Emergency services will be dispatched immediately. Please ensure someone is available at the pickup location.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAmbulanceForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Dispatch Ambulance
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
