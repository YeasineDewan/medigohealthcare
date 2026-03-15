/**
 * Central config from .env (Vite exposes only VITE_* vars).
 * Your .env is the source of truth: set VITE_API_URL and optionally VITE_WS_URL for cPanel.
 * Leave VITE_API_URL empty to use same-origin (/api/v1) when frontend and Laravel are on the same domain.
 */
const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (url === undefined || url === null || String(url).trim() === '') {
    return '/api/v1';
  }
  let base = String(url).trim().replace(/\/$/, '');
  // Laravel API is under /api/v1 - ensure base ends with /v1 when using a full URL
  if (base.startsWith('http') && (base.endsWith('/api') || !/\/v1\/?$/.test(base))) {
    base = base.replace(/\/api\/?$/, '') + '/api/v1';
  }
  return base;
};

const getWsUrl = () => {
  const url = import.meta.env.VITE_WS_URL;
  if (url === undefined || url === null || String(url).trim() === '') {
    const base = getBaseUrl();
    if (base.startsWith('http')) {
      const u = new URL(base);
      return `${u.protocol === 'https:' ? 'wss:' : 'ws:'}//${u.host}`;
    }
    return typeof window !== 'undefined' && window.location
      ? `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`
      : '';
  }
  return String(url).replace(/\/$/, '');
};

export const env = {
  apiBase: getBaseUrl(),
  /** WebSocket base URL (ws:// or wss://host) for live features */
  wsBase: getWsUrl(),
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  /** Only true when you explicitly set VITE_API_URL in .env (e.g. cPanel production URL) */
  hasExplicitApiUrl: Boolean(
    import.meta.env.VITE_API_URL != null && String(import.meta.env.VITE_API_URL).trim() !== ''
  ),
};

export default env;
