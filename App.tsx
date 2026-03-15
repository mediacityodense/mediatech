

import React, { useState, useEffect, useRef } from 'react';
import { SCHEDULE_DATA } from './constants';
import SessionCard from './components/SessionCard';
import TrackFilter from './components/TrackFilter';
import SpeakerProfile from './components/SpeakerProfile';
import SpeakerList from './components/SpeakerList';
import SponsorFooter from './components/SponsorFooter';
import NewsletterSignup from './components/NewsletterSignup';
import UpNextDashboard from './components/UpNextDashboard';
import DigitalBadge from './components/DigitalBadge';
import { resolveLogoAsset } from './logoAssets';
import { FilterType, Speaker } from './types';
import { Calendar, Info, Heart, List, Users, LayoutDashboard, QrCode } from 'lucide-react';

const App: React.FC = () => {
  const mcoLogo = resolveLogoAsset('mco1.png');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(() => {
    const savedDayDate = localStorage.getItem('mco_active_day_date');
    const savedDayIndex = SCHEDULE_DATA.findIndex(day => day.date === savedDayDate);

    return savedDayIndex >= 0 ? savedDayIndex : 1; // Default to Wednesday (Index 1)
  });
  const [filter, setFilter] = useState<FilterType>('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('mco_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showInfo, setShowInfo] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [currentView, setCurrentView] = useState<'program' | 'favorites' | 'speakers'>('program');
  const [showDashboard, setShowDashboard] = useState(true);
  
  const mainContentRef = useRef<HTMLDivElement>(null);



  // Scroll to top when active day changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeDayIndex]);

  useEffect(() => {
    const activeDay = SCHEDULE_DATA[activeDayIndex];
    if (activeDay) {
      localStorage.setItem('mco_active_day_date', activeDay.date);
    }
  }, [activeDayIndex]);

  const toggleFavorite = (id: string) => {
    let newFavs;
    if (favorites.includes(id)) {
      newFavs = favorites.filter(fav => fav !== id);
    } else {
      newFavs = [...favorites, id];
    }
    setFavorites(newFavs);
    localStorage.setItem('mco_favorites', JSON.stringify(newFavs));
  };

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
  };

  const handleJumpToSession = (sessionId: string) => {
    // 1. Find which day the session belongs to
    const sessionDayIndex = SCHEDULE_DATA.findIndex(day => 
      day.sessions.some(s => s.id === sessionId)
    );

    if (sessionDayIndex !== -1) {
      // 2. Close modal
      setSelectedSpeaker(null); 
      
      // 3. Switch to program view & correct day
      setCurrentView('program'); 
      setActiveDayIndex(sessionDayIndex); 
      
      // 4. Scroll to session after render cycle
      setTimeout(() => {
        const element = document.getElementById(`session-${sessionId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Clear any existing highlights
          document.querySelectorAll('.ring-2.ring-mco-purple').forEach(el => {
             el.classList.remove('ring-2', 'ring-mco-purple', 'transition-all', 'duration-500');
          });

          // Add highlight effect
          element.classList.add('transition-all', 'duration-500', 'ring-2', 'ring-mco-purple');
          setTimeout(() => {
             element.classList.remove('ring-2', 'ring-mco-purple');
          }, 2000);
        }
      }, 100);
    }
  };

  const handleTabClick = (view: 'program' | 'favorites' | 'speakers') => {
    if (currentView === view) {
      // Scroll to top if already on this view
      mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView(view);
    }
  };

  // Filter logic for Program View
  const currentDay = SCHEDULE_DATA[activeDayIndex];
  const filteredSessions = currentDay.sessions.filter(session => {
    if (filter === 'All') return true;
    
    // Networking filter shows Social tracks and Breaks
    if (filter === 'Networking') {
      return session.track === 'Social' || session.isBreak;
    }

    if (session.isBreak) return true; // Always show breaks for context
    return session.track === filter;
  });

  // Data logic for Favorites View
  const favoriteSessionsByDay = SCHEDULE_DATA.map(day => ({
    ...day,
    sessions: day.sessions.filter(session => favorites.includes(session.id))
  })).filter(day => day.sessions.length > 0);

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full max-w-md mx-auto bg-[#F2F2F7] shadow-2xl relative flex flex-col overflow-hidden overscroll-none">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md z-30 border-b border-gray-200 shrink-0">
        <div className="px-4 py-2.5 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
                <img 
                  src={mcoLogo}
                  alt="Media City Odense"
                  className="h-11 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                    <h1 className="text-[15px] font-bold leading-tight tracking-[-0.01em] text-gray-900">
                      Mediatech Festival 2026
                    </h1>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] leading-tight">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                        Venue
                      </span>
                      <span className="font-semibold text-gray-900">G.A.S.A.</span>
                      <span className="text-gray-300"> </span>
                      <span className="font-medium text-gray-500">Media City Odense</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-1">
                {currentView === 'program' && (
                    <button 
                        onClick={() => setShowDashboard(!showDashboard)}
                        className={`p-1.5 rounded-full transition-colors ${showDashboard ? 'bg-purple-50 text-mco-purple' : 'text-gray-400 hover:bg-gray-100'}`}
                        aria-label="Toggle Dashboard"
                    >
                        <LayoutDashboard size={19} />
                    </button>
                )}
                <button 
                  onClick={() => setShowBadge(true)}
                  className="p-1.5 text-mco-purple hover:bg-purple-50 rounded-full transition-colors"
                  aria-label="My Badge"
                >
                    <QrCode size={22} />
                </button>
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-1.5 text-mco-purple hover:bg-purple-50 rounded-full transition-colors"
                  aria-label="App Info"
                >
                    <Info size={22} />
                </button>
            </div>
        </div>

        {/* Day Tabs - Only shown in Program View */}
        {currentView === 'program' && (
          <div className="flex px-2 pt-1 pb-0 bg-white">
            {SCHEDULE_DATA.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setActiveDayIndex(index)}
                className={`
                  flex-1 pb-3 pt-2 text-center relative transition-colors
                  ${activeDayIndex === index ? 'text-mco-purple font-semibold' : 'text-gray-400 font-medium'}
                `}
              >
                <span className="text-sm block">{day.shortLabel}</span>
                {activeDayIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mco-purple rounded-t-full mx-4"></div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Title for Favorites View */}
        {currentView === 'favorites' && (
           <div className="px-4 pb-3 bg-white animate-in fade-in slide-in-from-top-2">
              <h2 className="text-xl font-bold text-gray-900">My Schedule</h2>
           </div>
        )}

        {/* Title for Speakers View */}
        {currentView === 'speakers' && (
           <div className="px-4 pb-3 bg-white animate-in fade-in slide-in-from-top-2">
              <h2 className="text-xl font-bold text-gray-900">Speakers</h2>
           </div>
        )}
      </header>

      {/* Info Modal/Overlay */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowInfo(false)}>
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-xs w-full animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-2 text-mco-purple">About</h2>
                <p className="text-gray-600 text-sm mb-2">
                    Official schedule app for Mediatech Festival 2026.
                    <br/><br/>
                    <strong>Media City Odense</strong><br/>
                    March 25-26, 2026<br/>
                    Odense, Denmark
                </p>
                <div className="text-xs text-gray-400 border-t mt-4 pt-4">
                    Tap any session to see more details.
                </div>
                <button 
                    onClick={() => setShowInfo(false)}
                    className="mt-6 w-full py-2 bg-mco-purple text-white rounded-lg font-medium"
                >
                    Close
                </button>
            </div>
        </div>
      )}

      {/* Digital Badge Modal */}
      {showBadge && (
        <DigitalBadge onClose={() => setShowBadge(false)} />
      )}

      {/* Speaker Profile Overlay */}
      {selectedSpeaker && (
        <SpeakerProfile 
          speaker={selectedSpeaker}
          scheduleData={SCHEDULE_DATA}
          onClose={() => setSelectedSpeaker(null)}
          onSessionClick={handleJumpToSession}
        />
      )}

      {/* Main Content Area - Scrollable */}
      <main 
        ref={mainContentRef}
        className="flex-1 min-h-0 overflow-y-auto no-scrollbar relative bg-[#F2F2F7] overscroll-y-contain"
      >
        
        {/* PROGRAM VIEW */}
        {currentView === 'program' && (
          <div className="animate-in fade-in duration-300">
             
             {/* Up Next Dashboard */}
             {showDashboard && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                    <UpNextDashboard 
                        scheduleData={SCHEDULE_DATA}
                        onSessionClick={handleJumpToSession}
                    />
                </div>
             )}

             {/* Sticky Filter inside scroll container */}
             <div className="sticky top-0 z-20 bg-[#F2F2F7]/95 backdrop-blur py-3 border-b border-gray-200/50 shadow-sm">
               <TrackFilter currentFilter={filter} onFilterChange={setFilter} />
             </div>

             <div className="pt-4 px-0 pb-20">
               {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                   <SessionCard
                     key={session.id}
                     session={session}
                     isFavorite={favorites.includes(session.id)}
                     onToggleFavorite={toggleFavorite}
                     onSpeakerClick={handleSpeakerClick}
                     sessionDate={currentDay.date}
                     dayLabel={currentDay.shortLabel}
                   />
                 ))
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Calendar size={48} className="mb-4 opacity-20" />
                    <p>No sessions found for this track.</p>
                 </div>
               )}

               {/* Sponsors Footer */}
               <SponsorFooter />
               
               {/* Newsletter Signup */}
               <NewsletterSignup />
             </div>
          </div>
        )}

        {/* FAVORITES VIEW */}
        {currentView === 'favorites' && (
          <div className="pt-4 px-0 pb-20 animate-in fade-in slide-in-from-right-4 duration-300">
             {favoriteSessionsByDay.length > 0 ? (
               favoriteSessionsByDay.map((day) => (
                 <div key={day.date} className="mb-6">
                    <div className="px-4 mb-3 flex items-center gap-2 sticky top-0 bg-[#F2F2F7]/95 backdrop-blur py-2 z-10">
                        <Calendar size={14} className="text-mco-purple" />
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{day.dayLabel}</h3>
                    </div>
                    {day.sessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                        onSpeakerClick={handleSpeakerClick}
                        sessionDate={day.date}
                        dayLabel={day.shortLabel}
                      />
                    ))}
                 </div>
               ))
             ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                       <Heart size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-500 text-sm max-w-[250px] mx-auto leading-relaxed">
                       Tap the star icon on any session to add it to your personal schedule.
                    </p>
                    <button 
                       onClick={() => handleTabClick('program')}
                       className="mt-8 px-6 py-2.5 bg-mco-purple text-white rounded-full font-medium text-sm shadow-lg shadow-purple-200 active:scale-95 transition-transform"
                    >
                       Browse Program
                    </button>
                </div>
             )}
          </div>
        )}

        {/* SPEAKERS VIEW */}
        {currentView === 'speakers' && (
          <SpeakerList 
            scheduleData={SCHEDULE_DATA}
            onSpeakerClick={handleSpeakerClick}
          />
        )}

      </main>

      {/* Bottom Navigation */}
      <nav className="shrink-0 bg-white border-t border-gray-200 flex justify-around items-center z-40 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
         <button 
            onClick={() => handleTabClick('program')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all active:scale-95 ${currentView === 'program' ? 'text-mco-purple' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <List size={22} className={currentView === 'program' ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className="text-[10px] font-bold tracking-wide">Program</span>
         </button>
         <button 
            onClick={() => handleTabClick('favorites')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all active:scale-95 ${currentView === 'favorites' ? 'text-mco-purple' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <Heart size={22} fill={currentView === 'favorites' ? 'currentColor' : 'none'} className={currentView === 'favorites' ? 'stroke-none' : 'stroke-2'} />
            <span className="text-[10px] font-bold tracking-wide">My Schedule</span>
         </button>
         <button 
            onClick={() => handleTabClick('speakers')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all active:scale-95 ${currentView === 'speakers' ? 'text-mco-purple' : 'text-gray-400 hover:text-gray-600'}`}
         >
            <Users size={22} className={currentView === 'speakers' ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className="text-[10px] font-bold tracking-wide">Speakers</span>
         </button>
      </nav>
    </div>
  );
};

export default App;
