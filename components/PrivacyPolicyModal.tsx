import React from 'react';
import { ExternalLink, Shield, X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-md flex-col bg-[linear-gradient(180deg,#F7F7FB_0%,#F2F2F7_100%)] shadow-2xl">
        <header className="shrink-0 border-b border-gray-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-mco-purple/10 text-mco-purple ring-1 ring-mco-purple/10">
                <Shield size={18} />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mco-purple/60">
                  Privacy
                </div>
                <h2 className="mt-1 text-lg font-bold tracking-[-0.02em] text-gray-900">
                  Privacy & Cookies
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Summary of how this site uses analytics and local storage.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm ring-1 ring-gray-200/80 transition-colors hover:bg-gray-50 hover:text-gray-700"
              aria-label="Close privacy policy"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4">
          <div className="space-y-4">
            <section className="rounded-[24px] border border-gray-100 bg-white/95 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]">
              <h3 className="text-sm font-bold text-gray-900">Data controller</h3>
              <div className="mt-2 space-y-1 text-sm leading-relaxed text-gray-600">
                <p>Media City Odense</p>
                <p>Østre Stationsvej 33</p>
                <p>5000 Odense C</p>
                <p>Telefon: 30 100 385</p>
                <p>Mail: info@mediacityodense.dk</p>
                <p>CVR: 41994606</p>
              </div>
            </section>

            <section className="rounded-[24px] border border-gray-100 bg-white/95 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]">
              <h3 className="text-sm font-bold text-gray-900">What this site stores</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                This website stores a small amount of information in your browser to support the schedule app and, if you allow it,
                anonymous traffic measurement with Google Analytics 4.
              </p>
            </section>

            <section className="rounded-[24px] border border-gray-100 bg-white/95 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]">
              <h3 className="text-sm font-bold text-gray-900">Essential local storage</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                The app uses browser local storage to remember your selected day, saved favorites, and your analytics preference.
                These items help the site function as expected on your device.
              </p>
            </section>

            <section className="rounded-[24px] border border-gray-100 bg-white/95 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]">
              <h3 className="text-sm font-bold text-gray-900">Analytics cookies</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                If you accept analytics, this site loads Google Analytics 4 to measure visits and understand how the website is used.
                This may collect information such as page views, approximate location, device and browser details, and traffic source data.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                If you decline, analytics remains disabled and Google Analytics is not loaded by this site.
              </p>
            </section>

            <section className="rounded-[24px] border border-gray-100 bg-white/95 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]">
              <h3 className="text-sm font-bold text-gray-900">Third-party provider</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Analytics data is processed by Google. You can read more in Google&apos;s own privacy information.
              </p>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
              >
                Google Privacy Policy
                <ExternalLink size={13} />
              </a>
            </section>

            <section className="rounded-[24px] border border-gray-100 bg-white/95 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]">
              <h3 className="text-sm font-bold text-gray-900">Your choices</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                You can accept or decline analytics from the consent banner. You can also reopen the privacy settings from the info
                panel inside the app at any time to change your choice.
              </p>
            </section>

            <section className="rounded-[24px] border border-gray-100 bg-white/95 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.28)]">
              <h3 className="text-sm font-bold text-gray-900">Questions</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                If you have questions about privacy, cookies, or this website&apos;s analytics setup, contact Media City Odense using
                the details above.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
