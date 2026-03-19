import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConsentBannerProps {
  className?: string;
  hasSavedChoice: boolean;
  onAccept: () => void;
  onClose?: () => void;
  onDecline: () => void;
  onOpenPolicy: () => void;
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({
  className,
  hasSavedChoice,
  onAccept,
  onClose,
  onDecline,
  onOpenPolicy,
}) => {
  return (
    <div className={`fixed inset-x-0 z-[70] px-4 ${className ?? 'bottom-0 pb-3'}`}>
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,247,251,0.98)_100%)] shadow-[0_22px_52px_-30px_rgba(15,23,42,0.38)] ring-1 ring-black/5 backdrop-blur-xl">
        <div className="relative overflow-hidden px-4 pb-4 pt-3.5">
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-mco-purple/10 via-sky-200/20 to-mco-purple/10" />
          <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-mco-purple/12 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-16 w-24 bg-gradient-to-tr from-mco-purple/10 to-transparent blur-2xl" />
          <div className="relative">
            <div className="mb-2.5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-mco-purple/10 text-mco-purple ring-1 ring-mco-purple/10">
                <ShieldCheck size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mco-purple/60">
                  Privacy
                </div>
                <h2 className="mt-1 text-base font-bold tracking-[-0.02em] text-gray-900">
                  {hasSavedChoice ? 'Update analytics preference' : 'Allow anonymous traffic analytics?'}
                </h2>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-600">
              We use Google Analytics to measure visits and improve the event website. Declining keeps analytics disabled.
            </p>
            <button
              onClick={onOpenPolicy}
              className="mt-2 inline-flex items-center justify-center text-xs font-semibold text-mco-purple transition-colors hover:text-purple-700"
            >
              Read privacy & cookies
            </button>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={onDecline}
                className="min-w-[120px] rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
              >
                Decline
              </button>
              <button
                onClick={onAccept}
                className="min-w-[160px] rounded-2xl bg-mco-purple px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(109,40,217,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-[0_20px_34px_-18px_rgba(109,40,217,0.78)] active:scale-[0.98]"
              >
                Accept analytics
              </button>
              {hasSavedChoice && onClose && (
                <button
                  onClick={onClose}
                  className="min-w-[96px] rounded-2xl border border-transparent bg-transparent px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-700"
                >
                  Not now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
