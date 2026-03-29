import { useState, useEffect } from 'react';
import { 
  X, 
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Clock,
  Calendar,
  Users,
  Stethoscope,
  Heart,
  ChevronRight,
  Award
} from 'lucide-react';

export default function SubHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const contactInfo = {
    phone: '+880 1234-567890',
    email: 'info@medigohealthcare.com',
    address: '123 Healthcare Avenue, Dhaka, Bangladesh'
  };

  const socialLinks = {
    facebook: 'https://facebook.com/medigohealthcare',
    twitter: 'https://twitter.com/medigohealth',
    linkedin: 'https://linkedin.com/company/medigohealthcare',
    instagram: 'https://instagram.com/medigohealthcare',
    youtube: 'https://youtube.com/@medigohealthcare'
  };

  const announcements = [
    {
      id: 1,
      title: 'Excellence in Healthcare',
      subtitle: 'Internationally Accredited Medical Services',
      description: 'JCI Accredited facility with world-class medical expertise'
    },
    {
      id: 2,
      title: '24/7 Emergency Care',
      subtitle: 'Immediate Medical Response When You Need It Most',
      description: 'Round-the-clock emergency services with expert medical teams'
    },
    {
      id: 3,
      title: 'Comprehensive Health Packages',
      subtitle: 'Personalized Healthcare Solutions for Every Need',
      description: 'Customized health plans designed for your specific requirements'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  const currentAnnouncement = announcements[currentSlide];

  return (
    <div className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-4">
            {/* Contact Information */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">{contactInfo.email}</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{contactInfo.address}</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">Follow Us</span>
              <div className="flex items-center gap-2">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Announcement Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Left Content */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-600 text-white">
                <Award className="w-6 h-6" />
              </div>
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {currentAnnouncement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {currentAnnouncement.subtitle}
                </p>
                <p className="text-xs text-gray-500">
                  {currentAnnouncement.description}
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors">
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium text-sm transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Emergency</span>
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center pb-4">
            <div className="flex items-center gap-2">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Available</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>500+ Expert Doctors</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>50+ Specialties</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-xs font-medium transition-colors">
                <Heart className="w-3 h-3" />
                Blood Donation
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-emerald-700 hover:bg-gray-100 rounded text-xs font-semibold transition-colors">
                <Award className="w-3 h-3" />
                Health Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
