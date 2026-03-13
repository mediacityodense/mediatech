
import React, { useState } from 'react';
import { Session, Speaker } from '../types';
import { Clock, MapPin, User, ChevronDown, ChevronUp, Star, ChevronRight, CalendarPlus, PartyPopper, Zap } from 'lucide-react';

interface SessionCardProps {
  session: Session;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSpeakerClick: (speaker: Speaker) => void;
  sessionDate: string;
  dayLabel: string;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, isFavorite, onToggleFavorite, onSpeakerClick, sessionDate, dayLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to determine border color based on track
  const getTrackColor = (track: string) => {
    switch (track) {
      case 'Main Stage': return 'border-l-mco-purple';
      case 'Track 2': return 'border-l-mco-lime';
      case 'Workshop': return 'border-l-blue-500';
      case 'Social': return 'border-l-gray-300';
      default: return 'border-l-gray-300';
    }
  };

  const getTrackLabelColor = (track: string) => {
     switch (track) {
      case 'Main Stage': return 'text-mco-purple bg-purple-50 ring-1 ring-purple-100';
      case 'Track 2': return 'text-lime-700 bg-lime-50 ring-1 ring-lime-100';
      case 'Workshop': return 'text-blue-700 bg-blue-50 ring-1 ring-blue-100';
      default: return 'text-gray-500 bg-gray-100 ring-1 ring-gray-200';
    }
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const cleanDate = sessionDate.replace(/-/g, '');
    const cleanStartTime = session.startTime.replace(/:/g, '') + '00';
    
    let cleanEndTime;
    if (session.endTime) {
        cleanEndTime = session.endTime.replace(/:/g, '') + '00';
    } else {
        const hour = parseInt(session.startTime.split(':')[0]);
        const nextHour = (hour + 1).toString().padStart(2, '0');
        cleanEndTime = `${nextHour}${session.startTime.split(':')[1]}00`;
    }

    const start = `${cleanDate}T${cleanStartTime}`;
    const end = `${cleanDate}T${cleanEndTime}`;

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Mediatech Festival//App v1.0//EN',
        'BEGIN:VEVENT',
        `UID:${session.id}@mediatechfestival.com`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${session.title}`,
        `DESCRIPTION:${session.description || ''}\\n\\nTrack: ${session.track}`,
        `LOCATION:${session.location || 'Media City Odense'}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${session.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isSocialEvent = session.track === 'Social' && !session.isBreak;
  
  // Identify major events (duration >= 5 hours)
  const startHour = parseInt(session.startTime.split(':')[0]);
  const endHour = session.endTime ? parseInt(session.endTime.split(':')[0]) : startHour + 1;
  // Handle case where endTime is 24:00 or similar wraps, simplified here as inputs are likely clean
  // 24:00 is technically next day 00:00 but parseInt('24:00') gives 24 which works for duration calc on same day logic
  const adjustedEndHour = endHour < startHour ? endHour + 24 : endHour;
  const duration = adjustedEndHour - startHour;
  const isMajorEvent = duration >= 5;

  if (session.isBreak) {
    return (
      <div 
        id={`session-${session.id}`}
        className="flex items-center justify-between py-3 px-4 bg-gray-50/50 rounded-lg mx-4 mb-3 border border-gray-100/80"
      >
        <div className="flex items-center gap-3">
          <Clock size={14} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 font-mono">
            {session.startTime} - {session.endTime}
          </span>
        </div>
        <span className="text-sm text-gray-600 font-medium">{session.title}</span>
      </div>
    );
  }

  // SPECIAL LAYOUT FOR MAJOR EVENTS (e.g. Networking at Ryans, AWS Bootcamp)
  if (isMajorEvent) {
     return (
        <div className="mb-4 px-4" id={`session-${session.id}`}>
          <div 
            className={`
              bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-200
              ${isExpanded ? 'ring-2 ring-mco-purple/20' : ''}
            `}
          >
             {/* Gradient Banner Header */}
             <div className={`
               px-4 py-3 flex justify-between items-center text-white
               ${session.track === 'Social' ? 'bg-gradient-to-r from-[#1a1a2e] to-[#4a4e69]' : 'bg-gradient-to-r from-blue-600 to-indigo-700'}
             `}>
                <div className="flex items-center gap-2">
                   {session.track === 'Social' ? <PartyPopper size={18} className="text-yellow-300" /> : <Zap size={18} className="text-yellow-300" />}
                   <span className="text-xs font-bold uppercase tracking-wider opacity-90">
                     {session.track === 'Social' ? 'Networking Event' : 'Full Day Session'}
                   </span>
                </div>
                <div className="flex items-center gap-1">
                     <button 
                        onClick={handleAddToCalendar}
                        className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Add to Calendar"
                      >
                        <CalendarPlus size={18} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(session.id);
                        }}
                        className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      >
                        <Star 
                          size={18} 
                          fill={isFavorite ? "#FACC15" : "none"} 
                          className={isFavorite ? "text-yellow-400" : ""} 
                        />
                      </button>
                </div>
             </div>

             {/* Content Body */}
             <div 
               className="p-5 cursor-pointer"
               onClick={() => setIsExpanded(!isExpanded)}
             >
                {/* Time Badge */}
                <div className="flex items-center gap-2 mb-3">
                   <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 font-mono bg-gray-100 px-2.5 py-1 rounded-md">
                      <Clock size={12} />
                      {dayLabel} • {session.startTime} - {session.endTime}
                   </span>
                   <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {duration} Hours
                   </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                   {session.title}
                </h3>
                
                {/* Location section - slightly enhanced for major cards */}
                {(session.location || session.description) && (
                   <div className="space-y-3">
                      {session.location && (
                          <div className="flex items-start gap-2 text-gray-700">
                             <MapPin size={16} className="text-mco-purple shrink-0 mt-0.5" />
                             <span className="text-sm font-semibold">{session.location}</span>
                          </div>
                      )}
                      
                      {session.description && (
                         <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {session.description}
                         </p>
                      )}
                   </div>
                )}
                
                {/* Speakers logic if needed for major events (AWS team etc) */}
                 {session.speakers && session.speakers.length > 0 && (
                     <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Hosted By</h4>
                          <div className="flex flex-wrap gap-2">
                             {session.speakers.map((s, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSpeakerClick(s);
                                  }}
                                  className="inline-flex items-center gap-2 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                   <span className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                     {s.image ? (
                                       <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                                     ) : (
                                       <User size={12} />
                                     )}
                                   </span>
                                   <span>{s.name}</span>
                                </button>
                             ))}
                          </div>
                     </div>
                 )}
             </div>
          </div>
        </div>
     );
  }

  // STANDARD LAYOUT
  return (
    <div className="mb-4 px-4" id={`session-${session.id}`}>
      <div 
        className={`
          bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200
          ${isExpanded ? 'ring-2 ring-mco-purple/10' : ''}
        `}
      >
        <div className={`border-l-4 ${getTrackColor(session.track)} p-4 relative`}>
          
          {/* Header: Time & Actions */}
          <div className="flex justify-between items-start mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                <Clock size={12} />
                {isSocialEvent && <span className="text-mco-purple mr-1">{dayLabel} •</span>}
                {session.startTime} - {session.endTime}
            </span>
            <div className="flex items-center gap-1 -mt-2 -mr-2">
                <button 
                  onClick={handleAddToCalendar}
                  className="p-2 text-gray-300 hover:text-mco-purple transition-colors focus:outline-none"
                  aria-label="Add to Calendar"
                >
                  <CalendarPlus size={20} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(session.id);
                  }}
                  className="p-2 text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star 
                    size={20} 
                    fill={isFavorite ? "#FACC15" : "none"} 
                    className={isFavorite ? "text-yellow-400" : ""} 
                  />
                </button>
            </div>
          </div>

          {/* Clickable Area */}
          <div 
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 pr-4">
              {session.title}
            </h3>
            
            {/* Track Label */}
            <div className="mb-4">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${getTrackLabelColor(session.track)}`}>
                    {session.track}
                </span>
            </div>

            {/* NEW: Prominent Location & Company Section */}
            {(session.location || (session.speakers && session.speakers.length > 0)) && (
               <div className="bg-gray-50 rounded-lg p-3 space-y-3 mb-2">
                  
                  {/* Location */}
                  {session.location && (
                      <div className="flex items-start gap-2.5">
                          <MapPin size={16} className="text-mco-purple shrink-0 mt-0.5" />
                          <div className="flex flex-col leading-none">
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Location</span>
                             <span className="text-sm font-semibold text-gray-900">{session.location}</span>
                          </div>
                      </div>
                  )}

                  {/* Speakers */}
                  {session.speakers && session.speakers.length > 0 && (
                      <div className="flex flex-col gap-2">
                           {/* Separator if location exists */}
                           {session.location && <div className="h-px bg-gray-200 my-1"></div>}
                           
                           {session.speakers.map((speaker, idx) => (
                               <button 
                                 key={idx} 
                                 onClick={(e) => {
                                   e.stopPropagation(); // Prevent card expansion
                                   onSpeakerClick(speaker);
                                 }}
                                 className="flex items-center gap-3 w-full text-left hover:bg-gray-100 p-1.5 -mx-1.5 rounded-lg transition-colors group"
                               >
                                   <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden shrink-0 shadow-sm">
                                      {speaker.image ? (
                                        <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                                      ) : (
                                        <User size={14} />
                                      )}
                                   </div>
                                   <div className="flex flex-col leading-tight flex-1">
                                       <span className="text-sm font-semibold text-gray-800 group-hover:text-mco-purple transition-colors">{speaker.name}</span>
                                       {speaker.company && (
                                           <span className="text-xs text-mco-purple font-bold">
                                               {speaker.company}
                                           </span>
                                       )}
                                       {speaker.role && (
                                           <span className="text-[10px] text-gray-500">
                                               {speaker.role}
                                           </span>
                                       )}
                                   </div>
                                   <ChevronRight size={14} className="text-gray-300 group-hover:text-mco-purple opacity-0 group-hover:opacity-100 transition-all" />
                               </button>
                           ))}
                      </div>
                  )}
               </div>
            )}
            
            {/* Description (Collapsible) */}
            <div className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? 'max-h-200 opacity-100 mt-3' : 'max-h-0 opacity-0'}
            `}>
                <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-2 whitespace-pre-wrap">
                    {session.description || "No additional description available."}
                </p>
            </div>

            {/* Expand Hint */}
            {!isExpanded && (session.description) && (
               <div className="flex justify-center mt-1">
                   <ChevronDown size={16} className="text-gray-300" />
               </div>
            )}
             {isExpanded && (
               <div className="flex justify-center mt-2">
                   <ChevronUp size={16} className="text-gray-300" />
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
