import React, { useState, useMemo } from 'react';
import { DaySchedule, Speaker } from '../types';
import { Search, User, Briefcase } from 'lucide-react';

interface SpeakerListProps {
  scheduleData: DaySchedule[];
  onSpeakerClick: (speaker: Speaker) => void;
}

const SpeakerList: React.FC<SpeakerListProps> = ({ scheduleData, onSpeakerClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique speakers from schedule data
  const speakers = useMemo(() => {
    const uniqueSpeakers = new Map<string, Speaker>();
    
    scheduleData.forEach(day => {
      day.sessions.forEach(session => {
        if (session.speakers) {
          session.speakers.forEach(speaker => {
            // Use name as key to deduplicate
            if (!uniqueSpeakers.has(speaker.name)) {
              uniqueSpeakers.set(speaker.name, speaker);
            }
          });
        }
      });
    });

    return Array.from(uniqueSpeakers.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, [scheduleData]);

  // Filter speakers based on search
  const filteredSpeakers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return speakers.filter(speaker => 
      speaker.name.toLowerCase().includes(query) || 
      speaker.company?.toLowerCase().includes(query) ||
      speaker.role?.toLowerCase().includes(query)
    );
  }, [speakers, searchQuery]);

  return (
    <div className="pt-4 pb-20 px-4 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Search Bar */}
      <div className="sticky top-0 z-20 bg-[#F2F2F7]/95 backdrop-blur pb-4 pt-1">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search speakers or companies..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mco-purple/50 focus:border-mco-purple transition-all sm:text-sm shadow-sm"
            />
        </div>
      </div>

      {/* Grid */}
      {filteredSpeakers.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
            {filteredSpeakers.map((speaker, idx) => (
                <button
                    key={`${speaker.name}-${idx}`}
                    onClick={() => onSpeakerClick(speaker)}
                    className="flex flex-col items-center text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-mco-purple/30 transition-all group"
                >
                    <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-100 mb-3 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {speaker.image ? (
                            <img 
                                src={speaker.image} 
                                alt={speaker.name} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <User size={32} />
                            </div>
                        )}
                    </div>
                    
                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 group-hover:text-mco-purple transition-colors">
                        {speaker.name}
                    </h3>
                    
                    {speaker.company && (
                        <div className="flex items-center justify-center gap-1 text-xs font-semibold text-gray-500 mb-0.5">
                            <Briefcase size={10} className="stroke-[2.5]" />
                            <span className="truncate max-w-[120px]">{speaker.company}</span>
                        </div>
                    )}
                    
                    {speaker.role && (
                        <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight mt-1">
                            {speaker.role}
                        </p>
                    )}
                </button>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <User size={48} className="mb-4 opacity-20" />
            <p className="text-sm">No speakers found matching &quot;{searchQuery}&quot;</p>
        </div>
      )}
    </div>
  );
};

export default SpeakerList;