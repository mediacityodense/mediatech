import React from 'react';
import { PlayCircle, X } from 'lucide-react';

interface TutorialVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const TutorialVideoModal: React.FC<TutorialVideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-black/60 px-4 py-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl overflow-y-auto rounded-[30px] border border-white/70 bg-white/95 shadow-[0_28px_80px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/5 animate-in fade-in zoom-in duration-200 max-h-[92vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden border-b border-gray-100/80 bg-[linear-gradient(180deg,rgba(248,245,255,0.95)_0%,rgba(255,255,255,0.92)_100%)] px-5 pb-4 pt-4">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-mco-purple/10 blur-2xl" />
          <div className="absolute left-0 top-0 h-20 w-28 bg-gradient-to-br from-mco-purple/8 to-transparent blur-2xl" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-mco-purple/60">
                App tutorial
              </div>
              <h2 className="text-xl font-bold text-mco-purple">How to use the app</h2>
              <p className="mt-1 text-sm text-gray-600">
                Quick walkthrough of the main views, badges, favorites, and schedule tools.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm ring-1 ring-gray-200/80 transition-colors hover:bg-white hover:text-gray-700"
              aria-label="Close tutorial"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="flex justify-center overflow-hidden rounded-[24px] bg-black px-3 py-3 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.48)] sm:px-4 sm:py-4">
            <video
              className="block h-[46vh] max-h-[32rem] w-auto max-w-full rounded-[18px] bg-black sm:h-[62vh] sm:max-h-[40rem] lg:h-[68vh] lg:max-h-[44rem]"
              controls
              playsInline
              preload="metadata"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the tutorial video.
            </video>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-[18px] border border-gray-100 bg-white/80 px-4 py-3 text-sm text-gray-600">
            <PlayCircle size={16} className="shrink-0 text-mco-purple" />
            Open this anytime from the Info menu.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialVideoModal;
