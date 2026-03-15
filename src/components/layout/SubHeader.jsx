import { useState, useEffect } from 'react';
import { X, Megaphone, Info, AlertCircle, Gift, Star, Sparkles, TrendingUp, Zap } from 'lucide-react';

export default function SubHeader() {
  const [announcement, setAnnouncement] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from admin dashboard marketing section
    const fetchMarketingAnnouncement = async () => {
      try {
        // This would be an API call to admin dashboard
        // For now, using enhanced default announcements
        const announcements = [
          {
            id: 1,
            type: 'promotion',
            text: '🎉 Limited Time Offer: Get 25% off on all health checkup packages!',
            link: '/offers',
            linkText: 'Claim Offer',
            backgroundColor: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            textColor: '#ffffff',
            icon: 'gift',
            priority: 'high',
            animated: true
          },
          {
            id: 2,
            type: 'info',
            text: '🏥 New Telemedicine Service: Consult doctors online from home',
            link: '/telemedicine',
            linkText: 'Learn More',
            backgroundColor: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
            textColor: '#ffffff',
            icon: 'trending',
            priority: 'medium',
            animated: false
          },
          {
            id: 3,
            type: 'alert',
            text: '⚡ Emergency Services Available 24/7 - Call 999 for immediate assistance',
            link: '/emergency',
            linkText: 'Contact Now',
            backgroundColor: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            textColor: '#ffffff',
            icon: 'alert',
            priority: 'high',
            animated: true
          }
        ];

        // Simulate API delay
        setTimeout(() => {
          // Select announcement based on priority or rotate
          const activeAnnouncement = announcements.find(a => a.priority === 'high') || announcements[0];
          setAnnouncement(activeAnnouncement);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch announcement:', error);
        setIsLoading(false);
      }
    };

    fetchMarketingAnnouncement();
  }, []);

  if (!isLoading && (!announcement || !isVisible)) return null;

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'megaphone': return Megaphone;
      case 'info': return Info;
      case 'alert': return AlertCircle;
      case 'gift': return Gift;
      case 'star': return Star;
      case 'sparkles': return Sparkles;
      case 'trending': return TrendingUp;
      case 'zap': return Zap;
      default: return Megaphone;
    }
  };

  const Icon = getIcon(announcement?.icon);

  if (isLoading) {
    return (
      <div className="w-full py-3 px-4 text-center bg-gray-100 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full py-2 px-4 text-center relative overflow-hidden shadow-sm"
      style={{ 
        background: announcement.backgroundColor || 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        color: announcement.textColor || '#ffffff'
      }}
    >
      {/* Animated background elements */}
      {announcement.animated && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/10 rounded-full animate-ping animation-delay-200"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/5 rounded-full animate-pulse"></div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-semibold relative z-10">
        {Icon && (
          <div className={`flex-shrink-0 ${announcement.animated ? 'animate-bounce' : ''}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <span className="flex-1 text-center">{announcement.text}</span>
        {announcement.link && announcement.linkText && (
          <a 
            href={announcement.link}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30 text-white font-medium text-xs"
          >
            {announcement.linkText}
            <Sparkles className="w-3 h-3" />
          </a>
        )}
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30 group"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
}
