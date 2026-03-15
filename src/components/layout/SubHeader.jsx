import { useState, useEffect } from 'react';
import { X, Megaphone, Info, AlertCircle, Gift, Star } from 'lucide-react';

export default function SubHeader() {
  const [announcement, setAnnouncement] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // This will be controlled from admin dashboard marketing section
    // For now, using a default announcement
    const defaultAnnouncement = {
      id: 1,
      type: 'promotion', // promotion, info, alert, event
      text: '🎉 Special Offer: Get 20% off on all health checkups this month!',
      link: '/offers',
      linkText: 'Learn More',
      backgroundColor: '#5DBB63',
      textColor: '#ffffff',
      icon: 'gift'
    };

    setAnnouncement(defaultAnnouncement);
  }, []);

  if (!announcement || !isVisible) return null;

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'megaphone': return Megaphone;
      case 'info': return Info;
      case 'alert': return AlertCircle;
      case 'gift': return Gift;
      case 'star': return Star;
      default: return Megaphone;
    }
  };

  const Icon = getIcon(announcement.icon);

  return (
    <div 
      className="w-full py-2 px-4 text-center relative"
      style={{ 
        backgroundColor: announcement.backgroundColor || '#5DBB63',
        color: announcement.textColor || '#ffffff'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
        <span className="flex-1">{announcement.text}</span>
        {announcement.link && announcement.linkText && (
          <a 
            href={announcement.link}
            className="underline hover:no-underline font-semibold ml-2"
          >
            {announcement.linkText}
          </a>
        )}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
