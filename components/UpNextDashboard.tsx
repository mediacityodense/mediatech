
import React, { useEffect, useMemo, useState } from 'react';
import { DaySchedule, Session, Speaker } from '../types';
import { Clock, MapPin, ChevronRight, SkipForward, User } from 'lucide-react';

interface UpNextDashboardProps {
  scheduleData: DaySchedule[];
  onSessionClick: (sessionId: string) => void;
}

const SpeakerAvatarStrip: React.FC<{ speakers?: Speaker[] }> = ({ speakers }) => {
  if (!speakers?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {speakers.map((speaker, index) => (
        <div
          key={`${speaker.name}-${index}`}
          title={speaker.name}
          className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm"
        >
          {speaker.image ? (
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={12} className="text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
};

const UpNextDashboard: React.FC<UpNextDashboardProps> = ({ scheduleData, onSessionClick }) => {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, []);

  // Logic to find current and next sessions
  const { currentSessions, nextSessions } = useMemo(() => {
    const now = currentTime.getTime();
    const current: { session: Session; dayShortLabel: string }[] = [];
    const next: { session: Session; dayShortLabel: string }[] = [];

    // Helper to parse session strings "HH:MM" to timestamps
    const getSessionTimes = (dayDate: string, startTime: string, endTime?: string) => {
        const start = new Date(`${dayDate}T${startTime}:00`).getTime();
        let end;
        if (endTime) {
            // Handle day wrap logic broadly if needed, but simple for now
            let endStr = `${dayDate}T${endTime}:00`;
            if (parseInt(endTime.split(':')[0]) < parseInt(startTime.split(':')[0])) {
               // Ends next day (simple logic)
               const d = new Date(dayDate);
               d.setDate(d.getDate() + 1);
               endStr = `${d.toISOString().split('T')[0]}T${endTime}:00`;
            }
            end = new Date(endStr).getTime();
        } else {
            end = start + 60 * 60 * 1000; // Default 1 hour if no end
        }
        return { start, end };
    };

    scheduleData.forEach(day => {
        day.sessions.forEach(session => {
            const { start, end } = getSessionTimes(day.date, session.startTime, session.endTime);
            
            // Check if happening NOW
            if (now >= start && now < end) {
                current.push({ session, dayShortLabel: day.shortLabel });
            }
            // Check if upcoming (within next 2 hours)
            else if (now < start && start - now < 3 * 60 * 60 * 1000) { // 3 hour lookahead
                next.push({ session, dayShortLabel: day.shortLabel });
            }
        });
    });

    // Sort next sessions by start time
    next.sort((a, b) => {

        // Re-using sort logic properly:
        // We iterate days in order in the loop above, so broadly sorted by day.
        // Just sort by time string for simplicity or rely on list order if already sorted.
        return a.session.startTime.localeCompare(b.session.startTime);
    });

    return { currentSessions: current, nextSessions: next };
  }, [currentTime, scheduleData]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short' });
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-[#F2F2F7] border-b border-gray-200">

      <div className="px-4 py-2 bg-white/50 backdrop-blur-sm border-b border-gray-200/50">
         <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 whitespace-nowrap bg-gray-100 px-2 py-1 rounded border border-gray-200">
            <Clock size={12} />
            <span className="font-bold text-gray-700">{formatTime(currentTime)}</span>
         </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Happening Now Section */}
        <div>
            <div className="flex items-center gap-2 mb-2 animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-500">Happening Now</h3>
            </div>
            
            {currentSessions.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 snap-x">
                    {currentSessions.map(({ session }, idx) => (
                        <div 
                            key={idx}
                            onClick={() => onSessionClick(session.id)}
                            className="snap-start shrink-0 w-[260px] bg-white rounded-xl p-3 shadow-sm border-l-4 border-l-red-500 border-y border-r border-gray-100 cursor-pointer active:scale-95 transition-transform"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                                    {session.startTime} - {session.endTime}
                                </span>
                                <span className="text-[10px] font-semibold text-gray-400">{session.track}</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 h-[2.5em]">{session.title}</h4>
                             {session.location && (
                                 <div className="flex items-center gap-1 text-xs text-gray-500">
                                     <MapPin size={10} />
                                     <span className="truncate">{session.location}</span>
                                 </div>
                             )}
                             <SpeakerAvatarStrip speakers={session.speakers} />
                         </div>
                     ))}
                 </div>
            ) : (
                <div className="bg-white/50 rounded-lg p-3 text-center border border-dashed border-gray-200">
                    <p className="text-xs text-gray-400">Nothing scheduled at this exact time.</p>
                </div>
            )}
        </div>

        {/* Up Next Section */}
        <div>
            <div className="flex items-center gap-2 mb-2">
                <SkipForward size={14} className="text-mco-purple" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-mco-purple">Coming Up Next</h3>
            </div>

            {nextSessions.length > 0 ? (
                <div className="space-y-2">
                    {nextSessions.slice(0, 3).map(({ session }, idx) => (
                        <div 
                            key={idx}
                            onClick={() => onSessionClick(session.id)}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                             <div className="flex-1 min-w-0 pr-3">
                                 <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-xs font-bold text-gray-900 font-mono">
                                        {session.startTime}
                                    </span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium truncate max-w-[100px] ${
                                        session.track === 'Main Stage' ? 'bg-purple-50 text-mco-purple' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {session.track}
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-semibold text-gray-800 truncate">{session.title}</h4>
                                  <SpeakerAvatarStrip speakers={session.speakers} />
                              </div>
                              <ChevronRight size={16} className="text-gray-300" />
                         </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white/50 rounded-lg p-3 text-center border border-dashed border-gray-200">
                    <p className="text-xs text-gray-400">No upcoming sessions found for today.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default UpNextDashboard;
