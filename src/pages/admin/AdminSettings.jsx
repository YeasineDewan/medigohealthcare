import { useState, useEffect } from 'react';
import { Save, Globe, Bell, Shield, Search, Code, Smartphone, Mail, Palette, Lock, Database, Zap, AlertCircle, CheckCircle, Copy, Eye, EyeOff } from 'lucide-react';

export default function AdminSettings() {
  // General Settings
  const [siteName, setSiteName] = useState('Medigo Healthcare');
  const [siteUrl, setSiteUrl] = useState('https://medigo.com');
  const [supportEmail, setSupportEmail] = useState('support@medigo.com');
  const [supportPhone, setSupportPhone] = useState('+880 1234-567890');
  
  // SEO Settings
  const [metaTitle, setMetaTitle] = useState('Medigo Healthcare - Your Trusted Digital Health Platform');
  const [metaDescription, setMetaDescription] = useState('Book doctors, order medicines, and access emergency services with Medigo Healthcare. Trusted by 2M+ patients across Bangladesh.');
  const [metaKeywords, setMetaKeywords] = useState('healthcare, doctors, pharmacy, telemedicine, bangladesh, medical consultation, medicine delivery');
  const [ogImage, setOgImage] = useState('/assets/og-image.jpg');
  const [favicon, setFavicon] = useState('/assets/logo.ico');
  
  // Analytics Settings
  const [gtmId, setGtmId] = useState('GTM-XXXXXXX');
  const [gaId, setGaId] = useState('G-XXXXXXXXXX');
  const [facebookPixel, setFacebookPixel] = useState('1234567890123456');
  const [tiktokPixel, setTiktokPixel] = useState('ABCDEFGHIJK123456789');
  const [hotjarId, setHotjarId] = useState('1234567');
  
  // Social Media Settings
  const [facebookUrl, setFacebookUrl] = useState('https://facebook.com/medigo');
  const [twitterUrl, setTwitterUrl] = useState('https://twitter.com/medigo');
  const [instagramUrl, setInstagramUrl] = useState('https://instagram.com/medigo');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/company/medigo');
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentAlerts, setAppointmentAlerts] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  
  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [ipWhitelist, setIpWhitelist] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // Performance Settings
  const [enableCache, setEnableCache] = useState(true);
  const [cacheDuration, setCacheDuration] = useState(3600);
  const [enableCdn, setEnableCdn] = useState(true);
  const [imageOptimization, setImageOptimization] = useState(true);
  
  const [showPasswords, setShowPasswords] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('');
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSaveStatus('copied');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: Code },
    { id: 'social', label: 'Social Media', icon: Smartphone },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'performance', label: 'Performance', icon: Zap },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#111827]">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your platform settings and preferences</p>
      </div>

      {/* Status Messages */}
      {saveStatus === 'success' && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">Settings saved successfully!</span>
        </div>
      )}
      
      {saveStatus === 'copied' && (
        <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <Copy className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-medium">Copied to clipboard!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#5DBB63] text-[#165028]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#5DBB63]" />
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                    <input
                      type="url"
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                    <input
                      type="tel"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Settings */}
        {activeTab === 'seo' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#5DBB63]" />
                  SEO Configuration
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      maxLength={60}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      maxLength={160}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#5DBB63]" />
                  Social Media Images
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Image (1200x630px)</label>
                    <input
                      type="text"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Favicon (32x32px)</label>
                    <input
                      type="text"
                      value={favicon}
                      onChange={(e) => setFavicon(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Settings */}
        {activeTab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#5DBB63]" />
                  Google Analytics
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Tag Manager ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={gtmId}
                        onChange={(e) => setGtmId(e.target.value)}
                        placeholder="GTM-XXXXXXX"
                        className="w-full px-4 py-2.5 pr-20 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                      />
                      </div>
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics 4 ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={gaId}
                        onChange={(e) => setGaId(e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-4 py-2.5 pr-20 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#5DBB63]" />
                  Social Media Pixels
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={facebookPixel}
                        onChange={(e) => setFacebookPixel(e.target.value)}
                        placeholder="1234567890123456"
                        className="w-full px-4 py-2.5 pr-20 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Pixel ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={tiktokPixel}
                        onChange={(e) => setTiktokPixel(e.target.value)}
                        placeholder="ABCDEFGHIJK123456789"
                        className="w-full px-4 py-2.5 pr-20 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hotjar ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={hotjarId}
                        onChange={(e) => setHotjarId(e.target.value)}
                        placeholder="1234567"
                        className="w-full px-4 py-2.5 pr-20 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === 'social' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#5DBB63]" />
                Social Media Links
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
                  <input
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#5DBB63]" />
                Notification Preferences
              </h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Email notifications</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">SMS notifications</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">New appointment alerts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={appointmentAlerts}
                    onChange={(e) => setAppointmentAlerts(e.target.checked)}
                    className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">New order alerts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={orderAlerts}
                    onChange={(e) => setOrderAlerts(e.target.checked)}
                    className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Emergency alerts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emergencyAlerts}
                    onChange={(e) => setEmergencyAlerts(e.target.checked)}
                    className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#5DBB63]" />
                Security Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-gray-600" />
                      <div>
                        <span className="text-gray-700 block">Two-factor authentication</span>
                        <span className="text-xs text-gray-500">Enhanced account security</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    min="5"
                    max="120"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (comma separated)</label>
                  <textarea
                    value={ipWhitelist}
                    onChange={(e) => setIpWhitelist(e.target.value)}
                    rows={3}
                    placeholder="192.168.1.1, 10.0.0.1"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to allow all IPs</p>
                </div>
                <div>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <div>
                        <span className="text-red-700 block font-medium">Maintenance Mode</span>
                        <span className="text-xs text-red-500">Site will be unavailable for users</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-600/20"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Settings */}
        {activeTab === 'performance' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#5DBB63]" />
                Performance Optimization
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Database className="w-4 h-4 text-gray-600" />
                      <div>
                        <span className="text-gray-700 block">Enable caching</span>
                        <span className="text-xs text-gray-500">Improve page load speed</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableCache}
                      onChange={(e) => setEnableCache(e.target.checked)}
                      className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (seconds)</label>
                  <input
                    type="number"
                    value={cacheDuration}
                    onChange={(e) => setCacheDuration(e.target.value)}
                    min="300"
                    max="86400"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-600" />
                      <div>
                        <span className="text-gray-700 block">Enable CDN</span>
                        <span className="text-xs text-gray-500">Content delivery network</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableCdn}
                      onChange={(e) => setEnableCdn(e.target.checked)}
                      className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                    />
                  </label>
                </div>
                <div>
                  <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Palette className="w-4 h-4 text-gray-600" />
                      <div>
                        <span className="text-gray-700 block">Image optimization</span>
                        <span className="text-xs text-gray-500">Auto-compress images</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={imageOptimization}
                      onChange={(e) => setImageOptimization(e.target.checked)}
                      className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#165028] text-white font-medium hover:bg-[#0f3d1c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-transparent animate-spin rounded-full" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save All Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
