import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Heart, Calendar, Phone, Shield, Award, User } from 'lucide-react';
import Card from '../core/Card';
import { useState } from 'react';

export default function DoctorCard({ doctor }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { 
    id, 
    name, 
    specialty, 
    rating, 
    reviewCount, 
    location, 
    available, 
    image, 
    consultationFee,
    experience,
    qualifications
  } = doctor;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Link to={`/doctors/${id}`} className="block">
      <Card hover className="h-full group relative overflow-hidden">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          aria-label="Add to favorites"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Doctor Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] flex items-center justify-center overflow-hidden relative">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#5DBB63]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl font-bold text-[#165028]">
                {name.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Availability Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                available 
                  ? 'bg-[#f0fdf2]/90 text-[#165028] border border-[#5DBB63]/30' 
                  : 'bg-gray-100/90 text-gray-600 border border-gray-300'
              }`}
            >
              <Clock className="w-3 h-3" />
              {available ? 'Available' : 'Busy'}
            </span>
          </div>

          {/* Verified Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-blue-700 border border-blue-200">
              <Shield className="w-3 h-3" />
              Verified
            </div>
          </div>
          
          {/* Experience Badge */}
          {experience && (
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center gap-1 px-2 py-1 bg-purple-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-purple-700 border border-purple-200">
                <Award className="w-3 h-3" />
                {experience}
              </div>
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-[#111827] text-lg group-hover:text-[#5DBB63] transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-[#5DBB63] font-medium">{specialty}</p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-700 font-medium">{rating}</span>
            <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
          </div>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate line-clamp-1">{location}</span>
            </div>
          )}

          {/* Qualifications */}
          {qualifications && qualifications.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-1">
                <User className="w-3 h-3" />
                <span>Qualifications</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {qualifications.slice(0, 2).map((qual, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {qual}
                  </span>
                ))}
                {qualifications.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                    +{qualifications.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Consultation Fee */}
          {consultationFee && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">Consultation Fee</span>
              <span className="font-semibold text-[#165028]">৳{consultationFee}</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            <button className="flex-1 px-3 py-2 bg-[#5DBB63] text-white text-sm font-medium rounded-lg hover:bg-[#4a9a4f] transition-colors flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3" />
              Book
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              <Phone className="w-3 h-3" />
              Call
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
