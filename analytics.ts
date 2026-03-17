export type AnalyticsConsent = 'granted' | 'denied';

const GA_MEASUREMENT_ID = 'G-6WM1QDTX6Z';
const ANALYTICS_CONSENT_STORAGE_KEY = 'mco_analytics_consent';

declare global {
  interface Window {
    __mcoAnalyticsConfigured?: boolean;
    dataLayer: Array<IArguments | Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function getConsentState(consent: AnalyticsConsent) {
  return {
    analytics_storage: consent,
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
  };
}

function setAnalyticsDisabled(disabled: boolean) {
  (window as Window & Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      void args;
      window.dataLayer.push(arguments);
    };
  }

  return window.gtag;
}

function injectGoogleAnalyticsScript() {
  if (document.querySelector(`script[data-ga-id="${GA_MEASUREMENT_ID}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.dataset.gaId = GA_MEASUREMENT_ID;
  script.addEventListener('error', () => {
    console.error('Failed to load Google Analytics script.');
  }, { once: true });
  document.head.appendChild(script);
}

function configureGoogleAnalytics() {
  if (window.__mcoAnalyticsConfigured) {
    return;
  }

  const gtag = ensureGtag();
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  window.__mcoAnalyticsConfigured = true;
}

function trackPageView() {
  const gtag = ensureGtag();
  gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  const storedConsent = localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);

  if (storedConsent === 'granted' || storedConsent === 'denied') {
    return storedConsent;
  }

  return null;
}

export function initializeAnalyticsConsent() {
  const gtag = ensureGtag();
  gtag('consent', 'default', getConsentState('denied'));

  const storedConsent = getStoredAnalyticsConsent();
  if (storedConsent === 'granted') {
    grantAnalyticsConsent(false);
    return;
  }

  denyAnalyticsConsent(false);
}

export function grantAnalyticsConsent(shouldPersist = true) {
  if (shouldPersist) {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'granted');
  }

  setAnalyticsDisabled(false);
  injectGoogleAnalyticsScript();

  const gtag = ensureGtag();
  gtag('consent', 'update', getConsentState('granted'));

  if (window.__mcoAnalyticsConfigured) {
    return;
  }

  configureGoogleAnalytics();
  window.setTimeout(trackPageView, 0);
}

export function denyAnalyticsConsent(shouldPersist = true) {
  if (shouldPersist) {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'denied');
  }

  setAnalyticsDisabled(true);

  const gtag = ensureGtag();
  gtag('consent', 'update', getConsentState('denied'));
}
