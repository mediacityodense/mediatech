

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
import ConsentBanner from './components/ConsentBanner';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TutorialVideoModal from './components/TutorialVideoModal';
import { resolveLogoAsset } from './logoAssets';
import { AnalyticsConsent, denyAnalyticsConsent, getStoredAnalyticsConsent, grantAnalyticsConsent } from './analytics';
import { FilterType, Speaker } from './types';
import { Calendar, Info, Heart, List, Users, LayoutDashboard, QrCode, MapPin, ExternalLink, PlayCircle, X } from 'lucide-react';
import tutorialPromoVideo from './Images/mco_app_promo.mp4';

const TUTORIAL_CARD_DISMISSED_STORAGE_KEY = 'mco_tutorial_card_dismissed';
const FESTIVAL_WEBSITE_URL = 'https://www.mediacityodense.dk/mediatech-festival-26/';

// Switch back to 'live' when you want to reopen the full web app for the next festival.
const SITE_MODE: 'live' | 'post-event' = 'post-event';

const PostEventScreen: React.FC = () => {
  const mcoLogo = resolveLogoAsset('mco1.png');

  useEffect(() => {
    document.title = 'MediaTech Festival | See You Next Year';
  }, []);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#F5F3FF] text-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#F8F4FF_38%,#EEE8FF_100%)]" />
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-mco-purple/14 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#CCFF00]/18 blur-3xl" />

      <main className="relative mx-auto flex min-h-[100dvh] max-w-5xl items-center px-5 py-10 sm:px-8">
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/70 bg-white/85 shadow-[0_36px_110px_-42px_rgba(76,29,149,0.45)] backdrop-blur-xl">
          <div className="relative overflow-hidden px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(138,92,245,0.18),transparent_70%)]" />
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-mco-purple/10 blur-3xl" />

            <div className="relative text-center">
              <div className="inline-flex items-center rounded-full border border-mco-purple/15 bg-mco-purple/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-mco-purple">
                Mediatech Festival 2026
              </div>

              <img
                src={mcoLogo}
                alt="Media City Odense"
                className="mx-auto mt-6 h-16 w-auto object-contain sm:h-20"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              <h1 className="mx-auto mt-8 max-w-2xl text-4xl font-extrabold tracking-[-0.04em] text-gray-950 sm:text-5xl">
                Thank you to all who attended MediaTech Festival 2026!
              </h1>

              <div className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                <span className="block">See you next year</span>
                <span className="mt-3 inline-flex rounded-full border border-mco-purple/15 bg-[linear-gradient(135deg,rgba(138,92,245,0.12)_0%,rgba(255,255,255,0.98)_55%,rgba(204,255,0,0.22)_100%)] px-5 py-3 text-lg font-extrabold tracking-[-0.02em] text-mco-purple shadow-[0_20px_34px_-24px_rgba(109,40,217,0.55)] sm:text-xl">
                  March 17-18, 2027
                </span>

              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={FESTIVAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-mco-purple px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_36px_-24px_rgba(109,40,217,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700 active:translate-y-0 active:scale-[0.98]"
                >
                  Media City Odense
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const LiveFestivalApp: React.FC = () => {
  const mcoLogo = resolveLogoAsset('mco1.png');
  const venueMapUrl = 'https://www.google.com/maps/search/?api=1&query=Middelfartvej+9M%2C+5000+Odense';
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
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent | null>(() => getStoredAnalyticsConsent());
  const [showConsentBanner, setShowConsentBanner] = useState(() => getStoredAnalyticsConsent() === null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTutorialVideo, setShowTutorialVideo] = useState(false);
  const [showTutorialCard, setShowTutorialCard] = useState(
    () => localStorage.getItem(TUTORIAL_CARD_DISMISSED_STORAGE_KEY) !== 'true'
  );
  
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

  const handleAcceptAnalytics = () => {
    grantAnalyticsConsent();
    setAnalyticsConsent('granted');
    setShowConsentBanner(false);
  };

  const handleDeclineAnalytics = () => {
    denyAnalyticsConsent();
    setAnalyticsConsent('denied');
    setShowConsentBanner(false);
  };

  const handleOpenPrivacySettings = () => {
    setShowInfo(false);
    setShowConsentBanner(true);
  };

  const handleOpenPrivacyPolicy = () => {
    setShowInfo(false);
    setShowPrivacyPolicy(true);
  };

  const dismissTutorialCard = () => {
    localStorage.setItem(TUTORIAL_CARD_DISMISSED_STORAGE_KEY, 'true');
    setShowTutorialCard(false);
  };

  const handleOpenTutorialVideo = () => {
    dismissTutorialCard();
    setShowInfo(false);
    setShowTutorialVideo(true);
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

  const floatingBannerOffsetClass = 'bottom-[15vh]';
  const showFloatingTutorialCard = showTutorialCard
    && currentView === 'program'
    && !showConsentBanner
    && !showInfo
    && !showTutorialVideo
    && !showBadge
    && !selectedSpeaker
    && !showPrivacyPolicy;
 
  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full max-w-md mx-auto bg-[linear-gradient(180deg,#F7F7FB_0%,#F2F2F7_100%)] shadow-2xl relative flex flex-col overflow-hidden overscroll-none">
      
      {/* Header */}
      <header className="bg-white/85 backdrop-blur-xl z-30 border-b border-gray-200/80 shrink-0 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.18)]">
        <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
                <a
                  href={FESTIVAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Mediatech Festival website"
                  className="shrink-0"
                >
                  <img 
                    src={mcoLogo}
                    alt="Media City Odense"
                    className="h-11 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </a>
                <div className="min-w-0">
                    <h1 className="text-[15px] font-bold leading-tight tracking-[-0.01em] text-gray-900">
                      Mediatech Festival 2026
                    </h1>
                    <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] leading-tight">
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
                        className={`p-2 rounded-full transition-all duration-300 active:scale-95 ${showDashboard ? 'bg-purple-50 text-mco-purple shadow-[0_10px_20px_-16px_rgba(109,40,217,0.6)] hover:scale-105' : 'text-gray-400 hover:bg-gray-100 hover:scale-105'}`}
                        aria-label="Toggle Dashboard"
                    >
                        <LayoutDashboard size={19} />
                    </button>
                )}
                <button 
                  onClick={() => setShowBadge(true)}
                  className="p-2 text-mco-purple hover:bg-purple-50 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_-16px_rgba(109,40,217,0.45)] active:scale-95"
                  aria-label="My Badge"
                >
                    <QrCode size={22} />
                </button>
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 text-mco-purple hover:bg-purple-50 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_-16px_rgba(109,40,217,0.45)] active:scale-95"
                  aria-label="App Info"
                >
                    <Info size={22} />
                </button>
            </div>
        </div>

        {/* Day Tabs - Only shown in Program View */}
        {currentView === 'program' && (
          <div className="px-3 pb-2 bg-white">
            <div className="flex rounded-2xl bg-[#F5F5FA] p-1 ring-1 ring-gray-200/70">
            {SCHEDULE_DATA.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setActiveDayIndex(index)}
                className={`
                  flex-1 rounded-xl pb-2.5 pt-2 text-center relative transition-all duration-300 active:scale-[0.98]
                  ${activeDayIndex === index ? 'bg-white text-mco-purple font-semibold shadow-[0_10px_22px_-18px_rgba(15,23,42,0.35)]' : 'text-gray-400 font-medium'}
                `}
              >
                <span className="text-sm block">{day.shortLabel}</span>
                {activeDayIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mco-purple rounded-full mx-5"></div>
                )}
              </button>
            ))}
            </div>
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
        
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 backdrop-blur-md" onClick={() => setShowInfo(false)}>
            <div className="max-w-sm w-full overflow-hidden rounded-[30px] border border-white/70 bg-white/95 shadow-[0_28px_80px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/5 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                <div className="relative overflow-hidden border-b border-gray-100/80 bg-[linear-gradient(180deg,rgba(248,245,255,0.95)_0%,rgba(255,255,255,0.92)_100%)] px-5 pb-4 pt-4">
                    <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-mco-purple/10 blur-2xl" />
                    <div className="absolute left-0 top-0 h-20 w-28 bg-gradient-to-br from-mco-purple/8 to-transparent blur-2xl" />
                    <div className="relative flex items-start justify-between gap-3">
                        <div>
                            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-mco-purple/60">
                                Mediatech Festival
                            </div>
                            <h2 className="text-xl font-bold text-mco-purple">Information</h2>
                        </div>
                        <button
                            onClick={() => setShowInfo(false)}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm ring-1 ring-gray-200/80 transition-colors hover:bg-white hover:text-gray-700"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
                
                <div className="px-5 pb-5 pt-4">
                <a
                    href={venueMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mb-4 block overflow-hidden rounded-[22px] bg-gradient-to-br from-violet-700 via-mco-purple to-indigo-500 p-px text-left shadow-[0_18px_40px_-24px_rgba(109,40,217,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-24px_rgba(109,40,217,0.58)]"
                >
                    <span className="absolute inset-0 opacity-90 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.24),_transparent_38%),linear-gradient(135deg,_#7C3AED_0%,_#6D28D9_48%,_#4338CA_100%)]" />
                    <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/12 blur-2xl" />
                    <span className="absolute bottom-0 left-0 h-16 w-24 bg-gradient-to-tr from-white/12 to-transparent blur-2xl" />
                    <span className="relative block rounded-[21px] px-3.5 py-3.5 text-white">
                        <span className="flex items-start justify-between gap-3">
                            <span className="flex items-start gap-3 min-w-0">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-white/14 text-white ring-1 ring-white/20 backdrop-blur-sm">
                                    <MapPin size={18} />
                                </span>
                                <span className="min-w-0 pt-0.5">
                                    <span className="inline-flex items-center rounded-full bg-white/14 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 ring-1 ring-white/15">
                                        Venue location
                                    </span>
                                    <span className="mt-1.5 block text-[17px] font-semibold leading-tight tracking-[-0.02em] text-white">
                                        Middelfartvej 9M
                                    </span>
                                    <span className="mt-0.5 block text-[13px] text-white/78">
                                        5000 Odense, Denmark
                                    </span>
                                </span>
                            </span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/14 text-white ring-1 ring-white/20 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                <ExternalLink size={14} />
                            </span>
                        </span>
                        <span className="mt-3 block text-[11px] font-medium text-white/78">
                            Tap for directions
                        </span>
                    </span>
                </a>

                <button
                    onClick={handleOpenTutorialVideo}
                    className="group mt-4 block w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#0F172A] p-px text-left shadow-[0_18px_40px_-24px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-24px_rgba(37,99,235,0.58)]"
                >
                    <span className="relative block rounded-[21px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_42%),linear-gradient(135deg,rgba(37,99,235,0.96)_0%,rgba(15,23,42,0.96)_100%)] px-3.5 py-3.5 text-white sm:px-4 sm:py-4">
                        <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/12 blur-2xl" />
                        <span className="absolute bottom-0 left-0 h-16 w-24 bg-gradient-to-tr from-white/12 to-transparent blur-2xl" />
                        <span className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <span className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-white/14 text-white ring-1 ring-white/20 backdrop-blur-sm sm:h-11 sm:w-11 sm:rounded-[18px]">
                                    <PlayCircle size={18} className="sm:h-5 sm:w-5" />
                                </span>
                                <span className="min-w-0">
                                    <span className="inline-flex items-center rounded-full bg-white/14 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/80 ring-1 ring-white/15 sm:text-[9px]">
                                        Tutorial video
                                    </span>
                                    <span className="mt-1.5 block text-base font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[17px]">
                                        How to use the web app
                                    </span>
                                    <span className="mt-0.5 block text-xs leading-relaxed text-white/78 sm:text-[13px]">
                                        Watch the walkthrough anytime from here.
                                    </span>
                                </span>
                            </span>
                            <span className="inline-flex self-start rounded-full bg-white/14 px-3 py-1 text-[11px] font-semibold text-white/88 ring-1 ring-white/20 transition-colors group-hover:bg-white/18 sm:self-auto">
                                Watch
                            </span>
                        </span>
                    </span>
                </button>
                
                <div className="mt-4 rounded-[20px] border border-gray-100 bg-white/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                                Privacy settings
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                                Analytics is currently <span className="font-semibold text-gray-900">{analyticsConsent === 'granted' ? 'enabled' : 'disabled'}</span>.
                            </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                onClick={handleOpenPrivacyPolicy}
                                className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                            >
                                Policy
                            </button>
                            <button
                                onClick={handleOpenPrivacySettings}
                                className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                            >
                                Manage
                            </button>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => setShowInfo(false)}
                    className="mt-6 w-full rounded-2xl bg-mco-purple py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(109,40,217,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-[0_20px_34px_-18px_rgba(109,40,217,0.78)] active:translate-y-0 active:scale-[0.98]"
                >
                    Close
                </button>
                </div>
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
             <div className="sticky top-0 z-20 bg-[#F2F2F7] py-1.5 border-b border-gray-200/50">
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
                       className="mt-8 px-6 py-2.5 bg-mco-purple text-white rounded-full font-medium text-sm shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_28px_-18px_rgba(109,40,217,0.7)] active:scale-95"
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
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-300 active:scale-95 ${currentView === 'program' ? 'text-mco-purple' : 'text-gray-400 hover:text-gray-600 hover:-translate-y-0.5'}`}
         >
            <List size={22} className={currentView === 'program' ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className="text-[10px] font-bold tracking-wide">Program</span>
         </button>
         <button 
            onClick={() => handleTabClick('favorites')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-300 active:scale-95 ${currentView === 'favorites' ? 'text-mco-purple' : 'text-gray-400 hover:text-gray-600 hover:-translate-y-0.5'}`}
         >
            <Heart size={22} fill={currentView === 'favorites' ? 'currentColor' : 'none'} className={currentView === 'favorites' ? 'stroke-none' : 'stroke-2'} />
            <span className="text-[10px] font-bold tracking-wide">My Schedule</span>
         </button>
         <button 
            onClick={() => handleTabClick('speakers')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all duration-300 active:scale-95 ${currentView === 'speakers' ? 'text-mco-purple' : 'text-gray-400 hover:text-gray-600 hover:-translate-y-0.5'}`}
         >
            <Users size={22} className={currentView === 'speakers' ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className="text-[10px] font-bold tracking-wide">Speakers</span>
         </button>
      </nav>

      {showFloatingTutorialCard && (
        <div className={`fixed inset-x-0 z-[68] px-4 ${floatingBannerOffsetClass}`}>
          <div className="mx-auto max-w-sm">
            <div className="relative overflow-hidden rounded-[26px] border border-[#DBEAFE] bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.7),transparent_38%),linear-gradient(135deg,#FFFFFF_0%,#EFF6FF_55%,#F8FAFC_100%)] p-4 shadow-[0_18px_36px_-28px_rgba(37,99,235,0.34)]">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-200/40 blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700 ring-1 ring-blue-100">
                      First visit
                    </div>
                    <h3 className="mt-2 text-base font-bold tracking-[-0.02em] text-gray-900">
                      New here? Watch the app tutorial
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      Quick video tour of the program, favorites, badge, and speaker views.
                    </p>
                  </div>

                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={handleOpenTutorialVideo}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_28px_-20px_rgba(37,99,235,0.72)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] active:scale-[0.98]"
                  >
                    <PlayCircle size={16} />
                    Watch tutorial
                  </button>
                  <button
                    onClick={dismissTutorialCard}
                    className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConsentBanner && (
        <ConsentBanner
          className={floatingBannerOffsetClass}
          hasSavedChoice={analyticsConsent !== null}
          onAccept={handleAcceptAnalytics}
          onClose={analyticsConsent !== null ? () => setShowConsentBanner(false) : undefined}
          onDecline={handleDeclineAnalytics}
          onOpenPolicy={handleOpenPrivacyPolicy}
        />
      )}

      {showPrivacyPolicy && (
        <PrivacyPolicyModal onClose={() => setShowPrivacyPolicy(false)} />
      )}

      <TutorialVideoModal
        isOpen={showTutorialVideo}
        onClose={() => setShowTutorialVideo(false)}
        videoSrc={tutorialPromoVideo}
      />
    </div>
  );
};

const App: React.FC = () => {
  if (SITE_MODE === 'post-event') {
    return <PostEventScreen />;
  }

  return <LiveFestivalApp />;
};

export default App;
