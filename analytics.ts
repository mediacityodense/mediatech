export type AnalyticsConsent = 'granted' | 'denied';

const GA_MEASUREMENT_ID = 'G-6WM1QDTX6Z';
const ANALYTICS_CONSENT_STORAGE_KEY = 'mco_analytics_consent';
let analyticsScriptPromise: Promise<void> | null = null;

declare global {
  interface Window {
    __mcoAnalyticsConfigured?: boolean;
    dataLayer: unknown[];
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
      window.dataLayer.push(args);
    };
  }

  return window.gtag;
}

function injectGoogleAnalyticsScript() {
  const existingScript = document.querySelector<HTMLScriptElement>(`script[data-ga-id="${GA_MEASUREMENT_ID}"]`);

  if (existingScript?.dataset.loaded === 'true') {
    return Promise.resolve();
  }

  if (analyticsScriptPromise) {
    return analyticsScriptPromise;
  }

  analyticsScriptPromise = new Promise((resolve, reject) => {
    const script = existingScript ?? document.createElement('script');

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      resolve();
    };

    const handleError = () => {
      analyticsScriptPromise = null;
      reject(new Error('Failed to load Google Analytics script.'));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existingScript) {
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.dataset.gaId = GA_MEASUREMENT_ID;
      document.head.appendChild(script);
    }
  });

  return analyticsScriptPromise;
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

  const gtag = ensureGtag();
  gtag('consent', 'update', getConsentState('granted'));
  void injectGoogleAnalyticsScript().then(() => {
    if (window.__mcoAnalyticsConfigured) {
      return;
    }

    configureGoogleAnalytics();
    trackPageView();
  });
}

export function denyAnalyticsConsent(shouldPersist = true) {
  if (shouldPersist) {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, 'denied');
  }

  setAnalyticsDisabled(true);

  const gtag = ensureGtag();
  gtag('consent', 'update', getConsentState('denied'));
}
