import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Save,
  Globe,
  Bell,
  Shield,
  Database,
  Palette,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  FileText,
  Users,
  Building,
  Server,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RefreshCw,
  Check,
  X,
  Upload,
  Download,
  Trash2,
  AlertTriangle,
  Info,
  Loader,
  Wifi,
  WifiOff,
  MessageSquare,
  DollarSign,
  ShoppingCart,
  Wallet,
  CreditCard as CardIcon,
  Smartphone,
  Cloud,
  HardDrive,
  Cpu,
  Activity,
  RefreshCcw,
  Copy,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Search,
  Filter
} from 'lucide-react';

// Configuration sections
const sections = [
  { id: 'general', label: 'General', icon: Building },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'payment', label: 'Payment', icon: DollarSign },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'maintenance', label: 'Maintenance', icon: Server },
  { id: 'cache', label: 'Cache', icon: RefreshCw }
];

export default function SystemConfig() {
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState({});
  const [savedMessage, setSavedMessage] = useState(null);

  const [config, setConfig] = useState({
    // General Settings
    general: {
      appName: 'Medigo Healthcare',
      appTagline: 'Your Health, Our Priority',
      appLogo: null,
      favicon: null,
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD',
      currencySymbol: '$',
      language: 'en',
      maintenanceMode: false
    },
    
    // Email Settings
    email: {
      mailDriver: 'smtp',
      mailHost: 'smtp.mailtrap.io',
      mailPort: '2525',
      mailUsername: '',
      mailPassword: '',
      mailEncryption: 'tls',
      mailFromAddress: 'noreply@medigo.com',
      mailFromName: 'Medigo Healthcare',
      emailNotifications: true,
      emailVerification: true
    },
    
    // SMS Settings
    sms: {
      smsProvider: 'twilio',
      twilioSid: '',
      twilioToken: '',
      twilioPhone: '',
      smsNotifications: true,
      smsVerification: true,
      smsAlerts: true
    },
    
    // Payment Settings
    payment: {
      stripeEnabled: true,
      stripeKey: '',
      stripeSecret: '',
      stripeWebhookSecret: '',
      paypalEnabled: false,
      paypalClientId: '',
      paypalClientSecret: '',
      paypalMode: 'sandbox',
      currency: 'USD',
      taxRate: '0',
      processingFee: '0'
    },
    
    // API Settings
    api: {
      apiEnabled: true,
      apiRateLimit: '60',
      apiTimeout: '30',
      apiKeys: [
        { id: 1, name: 'Production Key', key: 'mk_live_xxxxxxxxxxxxxxxxxxxx', createdAt: '2024-01-01', lastUsed: '2024-01-20', status: 'active' },
        { id: 2, name: 'Development Key', key: 'mk_test_xxxxxxxxxxxxxxxxxxxx', createdAt: '2024-01-05', lastUsed: '2024-01-19', status: 'active' }
      ]
    },
    
    // Security Settings
    security: {
      twoFactorAuth: true,
      sessionTimeout: '30',
      passwordExpiry: '90',
      minPasswordLength: '8',
      passwordRequireUppercase: true,
      passwordRequireNumbers: true,
      passwordRequireSymbols: true,
      ipRestriction: false,
      allowedIPs: '',
      auditLogging: true,
      sslEnabled: true
    },
    
    // Maintenance Settings
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: 'We are currently performing scheduled maintenance. We will be back shortly.',
      allowedIPs: '',
      scheduledMaintenance: false,
      maintenanceStart: '',
      maintenanceEnd: ''
    },
    
    // Cache Settings
    cache: {
      cacheDriver: 'redis',
      redisHost: '127.0.0.1',
      redisPort: '6379',
      redisPassword: '',
      redisDatabase: '0',
      cacheLifetime: '60',
      clearCache: false
    }
  });

  const handleSave = async (section) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSavedMessage(section);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handleInputChange = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleGenerateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: 'New API Key',
      key: `mk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    };
    setConfig(prev => ({
      ...prev,
      api: {
        ...prev.api,
        apiKeys: [...prev.api.apiKeys, newKey]
      }
    }));
  };

  const handleDeleteApiKey = (keyId) => {
    setConfig(prev => ({
      ...prev,
      api: {
        ...prev.api,
        apiKeys: prev.api.apiKeys.filter(k => k.id !== keyId)
      }
    }));
  };

  const handleClearCache = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSavedMessage('cache');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-500 mt-1">Configure system-wide settings and integrations</p>
        </div>
        <div className="flex items-center gap-2">
          {savedMessage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg"
            >
              <Check className="w-4 h-4" />
              Saved successfully!
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-2 sticky top-6">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* General Settings */}
              {activeSection === 'general' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">General Settings</h2>
                    <p className="text-sm text-gray-500">Configure basic application information</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* App Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
                        <input
                          type="text"
                          value={config.general.appName}
                          onChange={(e) => handleInputChange('general', 'appName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                        <input
                          type="text"
                          value={config.general.appTagline}
                          onChange={(e) => handleInputChange('general', 'appTagline', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Application Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-2xl font-bold">
                          {config.general.appName.charAt(0)}
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Upload Logo
                        </button>
                      </div>
                    </div>

                    {/* Regional Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={config.general.timezone}
                          onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Europe/Paris">Paris (CET)</option>
                          <option value="Asia/Tokyo">Tokyo (JST)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          value={config.general.language}
                          onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                          <option value="ja">Japanese</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                        <select
                          value={config.general.dateFormat}
                          onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                        <select
                          value={config.general.timeFormat}
                          onChange={(e) => handleInputChange('general', 'timeFormat', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="12h">12-hour</option>
                          <option value="24h">24-hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select
                          value={config.general.currency}
                          onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="JPY">JPY (¥)</option>
                          <option value="INR">INR (₹)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => handleSave('general')}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeSection === 'email' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Email Configuration</h2>
                    <p className="text-sm text-gray-500">Configure SMTP settings for outgoing emails</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mail Driver</label>
                        <select
                          value={config.email.mailDriver}
                          onChange={(e) => handleInputChange('email', 'mailDriver', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="smtp">SMTP</option>
                          <option value="sendmail">Sendmail</option>
                          <option value="ses">Amazon SES</option>
                          <option value="mailgun">Mailgun</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                        <input
                          type="text"
                          value={config.email.mailHost}
                          onChange={(e) => handleInputChange('email', 'mailHost', e.target.value)}
                          placeholder="smtp.mailtrap.io"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                        <input
                          type="text"
                          value={config.email.mailPort}
                          onChange={(e) => handleInputChange('email', 'mailPort', e.target.value)}
                          placeholder="2525"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                        <select
                          value={config.email.mailEncryption}
                          onChange={(e) => handleInputChange('email', 'mailEncryption', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="tls">TLS</option>
                          <option value="ssl">SSL</option>
                          <option value="">None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                        <input
                          type="text"
                          value={config.email.mailUsername}
                          onChange={(e) => handleInputChange('email', 'mailUsername', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                        <input
                          type="password"
                          value={config.email.mailPassword}
                          onChange={(e) => handleInputChange('email', 'mailPassword', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Address</label>
                        <input
                          type="email"
                          value={config.email.mailFromAddress}
                          onChange={(e) => handleInputChange('email', 'mailFromAddress', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                        <input
                          type="text"
                          value={config.email.mailFromName}
                          onChange={(e) => handleInputChange('email', 'mailFromName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Email Options */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900">Email Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.email.emailNotifications}
                            onChange={(e) => handleInputChange('email', 'emailNotifications', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Send email notifications to users</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.email.emailVerification}
                            onChange={(e) => handleInputChange('email', 'emailVerification', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Email Verification</p>
                            <p className="text-sm text-gray-500">Require email verification for signups</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Test Email Button */}
                    <div className="pt-4">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send Test Email
                      </button>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => handleSave('email')}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* SMS Settings */}
              {activeSection === 'sms' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">SMS Configuration</h2>
                    <p className="text-sm text-gray-500">Configure SMS gateway settings</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMS Provider</label>
                        <select
                          value={config.sms.smsProvider}
                          onChange={(e) => handleInputChange('sms', 'smsProvider', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        >
                          <option value="twilio">Twilio</option>
                          <option value="nexmo">Nexmo</option>
                          <option value="aws_sns">AWS SNS</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twilio SID</label>
                        <input
                          type="text"
                          value={config.sms.twilioSid}
                          onChange={(e) => handleInputChange('sms', 'twilioSid', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twilio Token</label>
                        <input
                          type="password"
                          value={config.sms.twilioToken}
                          onChange={(e) => handleInputChange('sms', 'twilioToken', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twilio Phone Number</label>
                        <input
                          type="text"
                          value={config.sms.twilioPhone}
                          onChange={(e) => handleInputChange('sms', 'twilioPhone', e.target.value)}
                          placeholder="+1234567890"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900">SMS Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.sms.smsNotifications}
                            onChange={(e) => handleInputChange('sms', 'smsNotifications', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <span className="font-medium text-gray-900">SMS Notifications</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.sms.smsVerification}
                            onChange={(e) => handleInputChange('sms', 'smsVerification', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <span className="font-medium text-gray-900">SMS Verification</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.sms.smsAlerts}
                            onChange={(e) => handleInputChange('sms', 'smsAlerts', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <span className="font-medium text-gray-900">SMS Alerts</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => handleSave('sms')}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeSection === 'payment' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Payment Configuration</h2>
                    <p className="text-sm text-gray-500">Configure payment gateway settings</p>
                  </div>
                  <div className="p-6 space-y-8">
                    {/* Stripe */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Stripe</h3>
                            <p className="text-sm text-gray-500">Accept credit card payments</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.payment.stripeEnabled}
                            onChange={(e) => handleInputChange('payment', 'stripeEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      {config.payment.stripeEnabled && (
                        <div className="pl-13 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Publishable Key</label>
                              <input
                                type="text"
                                value={config.payment.stripeKey}
                                onChange={(e) => handleInputChange('payment', 'stripeKey', e.target.value)}
                                placeholder="pk_test_..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                              <input
                                type="password"
                                value={config.payment.stripeSecret}
                                onChange={(e) => handleInputChange('payment', 'stripeSecret', e.target.value)}
                                placeholder="sk_test_..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PayPal */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">PayPal</h3>
                            <p className="text-sm text-gray-500">Accept PayPal payments</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.payment.paypalEnabled}
                            onChange={(e) => handleInputChange('payment', 'paypalEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      {config.payment.paypalEnabled && (
                        <div className="pl-13 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
                              <input
                                type="text"
                                value={config.payment.paypalClientId}
                                onChange={(e) => handleInputChange('payment', 'paypalClientId', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Client Secret</label>
                              <input
                                type="password"
                                value={config.payment.paypalClientSecret}
                                onChange={(e) => handleInputChange('payment', 'paypalClientSecret', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                            <select
                              value={config.payment.paypalMode}
                              onChange={(e) => handleInputChange('payment', 'paypalMode', e.target.value)}
                              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="sandbox">Sandbox</option>
                              <option value="live">Live</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tax & Fees */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-4">Tax & Fees</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                          <select
                            value={config.payment.currency}
                            onChange={(e) => handleInputChange('payment', 'currency', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                          <input
                            type="number"
                            value={config.payment.taxRate}
                            onChange={(e) => handleInputChange('payment', 'taxRate', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Processing Fee (%)</label>
                          <input
                            type="number"
                            value={config.payment.processingFee}
                            onChange={(e) => handleInputChange('payment', 'processingFee', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => handleSave('payment')}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* API Keys */}
              {activeSection === 'api' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">API Keys</h2>
                        <p className="text-sm text-gray-500">Manage API keys for external integrations</p>
                      </div>
                      <button
                        onClick={handleGenerateApiKey}
                        className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors flex items-center gap-2"
                      >
                        <Key className="w-4 h-4" />
                        Generate New Key
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {config.api.apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Key className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                              <p className="text-sm text-gray-500">Created: {apiKey.createdAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              apiKey.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {apiKey.status}
                            </span>
                            <button
                              onClick={() => handleDeleteApiKey(apiKey.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                          <code className="text-sm text-gray-600 font-mono">
                            {showApiKey[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                          </code>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setShowApiKey(prev => ({ ...prev, [apiKey.id]: !prev[apiKey.id] }))}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                            >
                              {showApiKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => copyToClipboard(apiKey.key)}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Last used: {apiKey.lastUsed}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">API Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (req/min)</label>
                        <input
                          type="number"
                          value={config.api.apiRateLimit}
                          onChange={(e) => handleInputChange('api', 'apiRateLimit', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (seconds)</label>
                        <input
                          type="number"
                          value={config.api.apiTimeout}
                          onChange={(e) => handleInputChange('api', 'apiTimeout', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Security Configuration</h2>
                    <p className="text-sm text-gray-500">Configure security and authentication settings</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={config.security.sessionTimeout}
                          onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                        <input
                          type="number"
                          value={config.security.passwordExpiry}
                          onChange={(e) => handleInputChange('security', 'passwordExpiry', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                        <input
                          type="number"
                          value={config.security.minPasswordLength}
                          onChange={(e) => handleInputChange('security', 'minPasswordLength', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900">Security Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.security.twoFactorAuth}
                            onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Require 2FA for all users</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.security.auditLogging}
                            onChange={(e) => handleInputChange('security', 'auditLogging', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Audit Logging</p>
                            <p className="text-sm text-gray-500">Log all user activities</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.security.sslEnabled}
                            onChange={(e) => handleInputChange('security', 'sslEnabled', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <div>
                            <p className="font-medium text-gray-900">Force SSL</p>
                            <p className="text-sm text-gray-500">Redirect HTTP to HTTPS</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.security.ipRestriction}
                            onChange={(e) => handleInputChange('security', 'ipRestriction', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <div>
                            <p className="font-medium text-gray-900">IP Restriction</p>
                            <p className="text-sm text-gray-500">Limit access to specific IPs</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900">Password Requirements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.security.passwordRequireUppercase}
                            onChange={(e) => handleInputChange('security', 'passwordRequireUppercase', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <span className="font-medium text-gray-900">Uppercase Letter</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.security.passwordRequireNumbers}
                            onChange={(e) => handleInputChange('security', 'passwordRequireNumbers', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <span className="font-medium text-gray-900">Numbers</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.security.passwordRequireSymbols}
                            onChange={(e) => handleInputChange('security', 'passwordRequireSymbols', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <span className="font-medium text-gray-900">Special Characters</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => handleSave('security')}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Maintenance Settings */}
              {activeSection === 'maintenance' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Maintenance Mode</h2>
                    <p className="text-sm text-gray-500">Configure system maintenance settings</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Server className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                          <p className="text-sm text-gray-500">When enabled, only admins can access the site</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.maintenance.maintenanceMode}
                          onChange={(e) => handleInputChange('maintenance', 'maintenanceMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>

                    {config.maintenance.maintenanceMode && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Message</label>
                        <textarea
                          value={config.maintenance.maintenanceMessage}
                          onChange={(e) => handleInputChange('maintenance', 'maintenanceMessage', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        />
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Scheduled Maintenance</h3>
                          <p className="text-sm text-gray-500">Plan maintenance windows in advance</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.maintenance.scheduledMaintenance}
                            onChange={(e) => handleInputChange('maintenance', 'scheduledMaintenance', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      {config.maintenance.scheduledMaintenance && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                            <input
                              type="datetime-local"
                              value={config.maintenance.maintenanceStart}
                              onChange={(e) => handleInputChange('maintenance', 'maintenanceStart', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                            <input
                              type="datetime-local"
                              value={config.maintenance.maintenanceEnd}
                              onChange={(e) => handleInputChange('maintenance', 'maintenanceEnd', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => handleSave('maintenance')}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Cache Settings */}
              {activeSection === 'cache' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Cache Management</h2>
                    <p className="text-sm text-gray-500">Configure caching for better performance</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cache Driver</label>
                      <select
                        value={config.cache.cacheDriver}
                        onChange={(e) => handleInputChange('cache', 'cacheDriver', e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      >
                        <option value="redis">Redis</option>
                        <option value="memcached">Memcached</option>
                        <option value="file">File</option>
                        <option value="array">Array</option>
                      </select>
                    </div>

                    {config.cache.cacheDriver === 'redis' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Redis Host</label>
                          <input
                            type="text"
                            value={config.cache.redisHost}
                            onChange={(e) => handleInputChange('cache', 'redisHost', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Redis Port</label>
                          <input
                            type="text"
                            value={config.cache.redisPort}
                            onChange={(e) => handleInputChange('cache', 'redisPort', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Redis Password</label>
                          <input
                            type="password"
                            value={config.cache.redisPassword}
                            onChange={(e) => handleInputChange('cache', 'redisPassword', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Database</label>
                          <input
                            type="text"
                            value={config.cache.redisDatabase}
                            onChange={(e) => handleInputChange('cache', 'redisDatabase', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cache Lifetime (minutes)</label>
                      <input
                        type="number"
                        value={config.cache.cacheLifetime}
                        onChange={(e) => handleInputChange('cache', 'cacheLifetime', e.target.value)}
                        className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-4">Cache Actions</h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleClearCache}
                          disabled={isSaving}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                          Clear Cache
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                          <HardDrive className="w-4 h-4" />
                          View Cache Files
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          View Stats
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => handleSave('cache')}
                      disabled={isSaving}
                      className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
