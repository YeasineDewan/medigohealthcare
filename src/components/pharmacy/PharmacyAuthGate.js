import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, User, Lock, Mail, Phone, MapPin, Heart, AlertCircle, CheckCircle, Clock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PharmacyAuthGate = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // login, signup, quick-register
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('pharmacy_token');
    const user = localStorage.getItem('pharmacy_user');
    if (token && user) {
      setIsAuthenticated(true);
    } else {
      setShowAuth(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (authMode === 'signup') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
        newErrors.phone = 'Phone number is invalid';
      }
      
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store authentication data
      const userData = {
        id: Date.now(),
        email: formData.email,
        fullName: formData.fullName || formData.email.split('@')[0],
        phone: formData.phone,
        address: formData.address,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('pharmacy_token', 'mock_token_' + Date.now());
      localStorage.setItem('pharmacy_user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setShowAuth(false);
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRegister = () => {
    setAuthMode('quick-register');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <AnimatePresence>
      {showAuth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Pharmacy Access</h2>
                    <p className="text-emerald-100 text-sm">Sign in to access prescription services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Forms */}
            <div className="p-6">
              {/* Auth Mode Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-colors ${
                    authMode === 'login'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-colors ${
                    authMode === 'signup'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={handleQuickRegister}
                  className={`flex-1 py-2 px-4 rounded-xl font-medium transition-colors ${
                    authMode === 'quick-register'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quick Access
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={authMode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {authMode === 'login' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700">
                          Forgot password?
                        </button>
                      </div>

                      {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                          <p className="text-red-700 text-sm">{errors.submit}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {authMode === 'signup' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your full name"
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address (Optional)
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your address"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Create a password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={formData.agreeTerms}
                          onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                          I agree to the Terms of Service and Privacy Policy
                        </label>
                      </div>
                      {errors.agreeTerms && (
                        <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
                      )}

                      {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                          <p className="text-red-700 text-sm">{errors.submit}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {authMode === 'quick-register' && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Quick Access</h3>
                        <p className="text-blue-800 text-sm mb-4">
                          Get instant access to prescription services with minimal information.
                        </p>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-blue-900 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                                placeholder="Enter your email"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-blue-900 mb-1">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-900 mb-1">Prescription Access</h4>
                            <p className="text-yellow-800 text-sm">
                              Quick access allows you to upload prescriptions and order medicines. 
                              Full account setup can be completed later.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={loading || !formData.email || !formData.phone}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Setting up access...
                          </>
                        ) : (
                          <>
                            Get Quick Access
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                          onClick={() => setAuthMode('login')}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Sign in
                        </button>
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Benefits Section */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">Why Sign Up?</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Upload and manage prescriptions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Order medicines with prescription verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Track order status in real-time</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Get exclusive discounts and offers</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PharmacyAuthGate;
