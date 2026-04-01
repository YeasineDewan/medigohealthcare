// Environment configuration
const getEnvConfig = () => {
  // Get environment variables
  const env = import.meta.env;
  
  return {
    // API Configuration
    API_BASE_URL: env.VITE_API_URL || 'http://localhost:8000/api',
    API_TIMEOUT: env.VITE_API_TIMEOUT || 10000,
    
    // Application Configuration
    APP_NAME: env.VITE_APP_NAME || 'Medigo Healthcare',
    APP_VERSION: env.VITE_APP_VERSION || '1.0.0',
    APP_ENVIRONMENT: env.VITE_APP_ENVIRONMENT || 'development',
    
    // File Upload Configuration
    MAX_FILE_SIZE: env.VITE_MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: env.VITE_ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    
    // Pagination Configuration
    DEFAULT_PAGE_SIZE: env.VITE_DEFAULT_PAGE_SIZE || 10,
    MAX_PAGE_SIZE: env.VITE_MAX_PAGE_SIZE || 100,
    
    // Cache Configuration
    CACHE_DURATION: env.VITE_CACHE_DURATION || 5 * 60 * 1000, // 5 minutes
    
    // Theme Configuration
    DEFAULT_THEME: env.VITE_DEFAULT_THEME || 'light',
    SUPPORTED_THEMES: env.VITE_SUPPORTED_THEMES?.split(',') || ['light', 'dark'],
    
    // Feature Flags
    ENABLE_ANALYTICS: env.VITE_ENABLE_ANALYTICS === 'true',
    ENABLE_NOTIFICATIONS: env.VITE_ENABLE_NOTIFICATIONS !== 'false',
    ENABLE_CHAT: env.VITE_ENABLE_CHAT === 'true',
    ENABLE_VIDEO_CALL: env.VITE_ENABLE_VIDEO_CALL === 'true',
    
    // External Services
    GOOGLE_ANALYTICS_ID: env.VITE_GOOGLE_ANALYTICS_ID || '',
    SENTRY_DSN: env.VITE_SENTRY_DSN || '',
    
    // Healthcare Specific Configuration
    DEFAULT_APPOINTMENT_DURATION: env.VITE_DEFAULT_APPOINTMENT_DURATION || 30, // minutes
    MAX_APPOINTMENTS_PER_DAY: env.VITE_MAX_APPOINTMENTS_PER_DAY || 20,
    PRESCRIPTION_VALIDITY_DAYS: env.VITE_PRESCRIPTION_VALIDITY_DAYS || 30,
    
    // Emergency Configuration
    EMERGENCY_CONTACT_NUMBER: env.VITE_EMERGENCY_CONTACT_NUMBER || '911',
    EMERGENCY_EMAIL: env.VITE_EMERGENCY_EMAIL || 'emergency@medigo.com',
    
    // Security Configuration
    SESSION_TIMEOUT: env.VITE_SESSION_TIMEOUT || 30 * 60 * 1000, // 30 minutes
    MAX_LOGIN_ATTEMPTS: env.VITE_MAX_LOGIN_ATTEMPTS || 5,
    PASSWORD_MIN_LENGTH: env.VITE_PASSWORD_MIN_LENGTH || 8,
    
    // Development Configuration
    DEV_MODE: env.MODE === 'development',
    DEV_TOOLS: env.VITE_DEV_TOOLS !== 'false',
    MOCK_API: env.VITE_MOCK_API === 'true',
    
    // Logging Configuration
    LOG_LEVEL: env.VITE_LOG_LEVEL || 'info',
    ENABLE_CONSOLE_LOG: env.VITE_ENABLE_CONSOLE_LOG !== 'false',
    
    // Performance Configuration
    ENABLE_LAZY_LOADING: env.VITE_ENABLE_LAZY_LOADING !== 'false',
    ENABLE_CODE_SPLITTING: env.VITE_ENABLE_CODE_SPLITTING !== 'false',
    
    // Storage Configuration
    LOCAL_STORAGE_PREFIX: env.VITE_LOCAL_STORAGE_PREFIX || 'medigo_',
    SESSION_STORAGE_PREFIX: env.VITE_SESSION_STORAGE_PREFIX || 'medigo_session_',
  };
};

// Get configuration object
const config = getEnvConfig();

// Export configuration
export default config;

// Export individual configuration sections
export const apiConfig = {
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const appConfig = {
  name: config.APP_NAME,
  version: config.APP_VERSION,
  environment: config.APP_ENVIRONMENT,
  devMode: config.DEV_MODE,
};

export const uploadConfig = {
  maxFileSize: config.MAX_FILE_SIZE,
  allowedTypes: config.ALLOWED_FILE_TYPES,
};

export const themeConfig = {
  default: config.DEFAULT_THEME,
  supported: config.SUPPORTED_THEMES,
};

export const featureConfig = {
  analytics: config.ENABLE_ANALYTICS,
  notifications: config.ENABLE_NOTIFICATIONS,
  chat: config.ENABLE_CHAT,
  videoCall: config.ENABLE_VIDEO_CALL,
};

export const healthConfig = {
  appointmentDuration: config.DEFAULT_APPOINTMENT_DURATION,
  maxAppointmentsPerDay: config.MAX_APPOINTMENTS_PER_DAY,
  prescriptionValidityDays: config.PRESCRIPTION_VALIDITY_DAYS,
  emergencyContact: config.EMERGENCY_CONTACT_NUMBER,
  emergencyEmail: config.EMERGENCY_EMAIL,
};

export const securityConfig = {
  sessionTimeout: config.SESSION_TIMEOUT,
  maxLoginAttempts: config.MAX_LOGIN_ATTEMPTS,
  passwordMinLength: config.PASSWORD_MIN_LENGTH,
};

// Utility functions
export const isDevelopment = () => config.DEV_MODE;
export const isProduction = () => config.APP_ENVIRONMENT === 'production';
export const isTest = () => config.APP_ENVIRONMENT === 'test';

export const getApiUrl = (endpoint) => {
  return `${config.API_BASE_URL}${endpoint}`;
};

export const isFeatureEnabled = (feature) => {
  return config[`ENABLE_${feature.toUpperCase()}`] || false;
};

export const logConfig = () => {
  if (config.DEV_MODE && config.ENABLE_CONSOLE_LOG) {
    console.log('Environment Configuration:', config);
  }
};

// Initialize configuration
if (config.DEV_MODE) {
  logConfig();
}
