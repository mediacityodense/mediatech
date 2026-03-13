
import React, { useState } from 'react';
import { Speaker, Session, DaySchedule } from '../types';
import { ArrowLeft, User, MapPin, Clock, Briefcase, Calendar, ChevronRight, Linkedin, Twitter, Globe } from 'lucide-react';

interface SpeakerProfileProps {
  speaker: Speaker;
  scheduleData: DaySchedule[];
  onClose: () => void;
  onSessionClick: (sessionId: string) => void;
}

const SpeakerProfile: React.FC<SpeakerProfileProps> = ({ speaker, scheduleData, onClose, onSessionClick }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);



  // Find all sessions for this speaker across all days
  const speakerSessions: { session: Session; day: DaySchedule }[] = [];
  
  scheduleData.forEach(day => {
    day.sessions.forEach(session => {
      if (session.speakers?.some(s => s.name === speaker.name)) {
        speakerSessions.push({ session, day: day });
      }
    });
  });

  const getCompanyLogoUrl = (companyName: string) => {
    const map: Record<string, string> = {
      'BBC': 'bbc.com',
      'Amazon Web Services': 'aws.amazon.com',
      'AWS': 'aws.amazon.com',
      'TV 2 Denmark': 'tv2.dk',
      'TV 2 Danmark': 'tv2.dk',
      'Google': 'google.com',
      'CBC Canada': 'cbc.ca',
      'Ritzau': 'ritzau.dk',
      'Amedia': 'amedia.no',
      'SVT': 'svt.se',
      'NRK': 'nrk.no',
      'ABC Australia': 'abc.net.au',
      'SDU': 'sdu.dk',
      'EU': 'europa.eu',
      'Fonn Group': 'fonngroup.com',
      'Green Producers Club': 'greenproducers.club',
      'Agenda Advokater': 'agendaadvokater.dk',
      'Copenhagen Business School': 'cbs.dk'
    };
    
    // Check map first
    if (map[companyName]) return `https://logo.clearbit.com/${map[companyName]}`;
    
    // Naive fallback (clean name + .com)
    const cleanName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://logo.clearbit.com/${cleanName}.com`;
  };

  const logoUrl = speaker.company ? getCompanyLogoUrl(speaker.company) : null;

  return (
    <div className="fixed inset-0 bg-[#F2F2F7] z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center gap-4 z-10">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 text-mco-purple hover:bg-purple-50 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-semibold text-gray-900">Speaker Profile</span>
      </div>

      <div className="p-6 max-w-md mx-auto pb-20">
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative group mb-4">
             {/* Main Avatar Container */}
             <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center text-gray-300 overflow-hidden relative z-10 animate-in zoom-in-50 duration-500">
                 {!imgError && speaker.image ? (
                    <>
                        {/* Placeholder/Loading Skeleton */}
                        {!imgLoaded && (
                            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                                <User size={32} className="text-gray-300/50" />
                            </div>
                        )}
                        <img 
                            src={speaker.image} 
                            alt={speaker.name}
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-cover transition-all duration-700 hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgError(true)}
                        />
                    </>
                 ) : (
                    <User size={64} className="text-gray-300" />
                 )}
             </div>
             {/* Decorative Blur/Glow behind */}
             <div className="absolute inset-0 rounded-full bg-mco-purple/30 blur-2xl scale-90 -z-10 translate-y-4 group-hover:bg-mco-purple/40 transition-colors duration-500"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">{speaker.name}</h2>
          
          {(speaker.role || speaker.company || speaker.linkedin || speaker.twitter || speaker.website) && (
             <div className="flex flex-col items-center gap-2 mt-2">
                {speaker.company && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-mco-purple rounded-full shadow-sm border border-purple-100">
                        {!logoError && logoUrl ? (
                            <img 
                                src={logoUrl} 
                                alt={`${speaker.company} logo`}
                                className="w-4 h-4 object-contain"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <Briefcase size={12} className="stroke-[2.5]" />
                        )}
                        <span className="text-xs font-bold uppercase tracking-wide">
                        {speaker.company}
                        </span>
                    </div>
                )}
                 {speaker.role && (
                    <span className="text-sm text-gray-500 font-medium px-4">{speaker.role}</span>
                )}
                
                <div className="flex items-center gap-2 mt-1">
                  {speaker.linkedin && (
                    <a 
                      href={speaker.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 text-gray-400 hover:text-[#0A66C2] hover:bg-blue-50 rounded-full transition-all"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {speaker.twitter && (
                    <a 
                      href={speaker.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
                      aria-label="Twitter/X Profile"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {speaker.website && (
                    <a 
                      href={speaker.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 text-gray-400 hover:text-mco-purple hover:bg-purple-50 rounded-full transition-all"
                      aria-label="Website"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
             </div>
          )}
        </div>

        {/* Bio Section */}
        {speaker.bio ? (
           <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">About</h3>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                 {speaker.bio.split('\n').map((paragraph, index) => (
                    paragraph.trim() && <p key={index}>{paragraph}</p>
                 ))}
              </div>
           </div>
        ) : (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 flex flex-col items-center text-center py-8">
                <User size={32} className="text-gray-200 mb-2" />
                <p className="text-gray-400 text-sm">No biography available.</p>
            </div>
        )}

        {/* Sessions List */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 px-1">Sessions</h3>
          <div className="space-y-3">
            {speakerSessions.map(({ session, day }) => (
              <button 
                key={session.id} 
                onClick={() => onSessionClick(session.id)}
                className="w-full text-left bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2 relative overflow-hidden transition-all hover:shadow-md hover:border-mco-purple/30 group cursor-pointer"
              >
                 <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    session.track === 'Main Stage' ? 'bg-mco-purple' : 
                    session.track === 'Track 2' ? 'bg-mco-lime' : 'bg-gray-300'
                 }`}></div>
                 
                 {/* Header: Date & Time */}
                 <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 pl-2 mb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-mco-purple bg-purple-50 px-2 py-1 rounded">
                            <Calendar size={12} />
                            <span>{day.shortLabel}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            <Clock size={12} />
                            <span>{session.startTime}{session.endTime ? ` - ${session.endTime}` : ''}</span>
                        </div>
                    </div>
                    {/* Interaction Arrow */}
                    <div className="text-gray-300 group-hover:text-mco-purple transition-colors pr-1">
                        <ChevronRight size={16} />
                    </div>
                 </div>
                 
                 {/* Title */}
                 <h4 className="font-bold text-gray-900 leading-snug pl-2 text-base mb-2 pr-4">{session.title}</h4>
                 
                 {/* Location & Track */}
                 <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pl-2">
                    <span className={`px-2 py-0.5 rounded border font-medium ${
                        session.track === 'Main Stage' ? 'bg-purple-50 text-mco-purple border-purple-100' :
                        session.track === 'Track 2' ? 'bg-lime-50 text-lime-700 border-lime-100' :
                        'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {session.track}
                    </span>
                    {session.location && (
                      <span className="flex items-center gap-1 text-gray-700 font-semibold">
                        <MapPin size={12} className="text-gray-400" />
                        {session.location}
                      </span>
                    )}
                 </div>

                 {/* Description */}
                 {session.description && (
                   <div className="mt-3 pt-3 border-t border-gray-100 pl-2">
                     <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                       {session.description}
                     </p>
                   </div>
                 )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerProfile;
