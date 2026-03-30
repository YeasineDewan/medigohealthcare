import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  User,
  Hospital,
  Clock,
  Award,
  Smartphone,
  Fingerprint,
} from 'lucide-react';
import { Button } from '../components/core/Button';

export default function Login({ role = 'patient' }) {
  const roleLabels = { admin: 'Admin', doctor: 'Doctor', patient: 'Patient' };
  const roleLabel = roleLabels[role] || 'Patient';
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'phone', 'biometric'
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      const routes = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
      navigate(routes[role] || '/patient');
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBiometricLogin = () => {
    // Simulate biometric authentication
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const routes = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
      navigate(routes[role] || '/patient');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf2] via-white to-[#dcfce7] flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <Heart className="w-8 h-8 text-[#5DBB63]" />
              <span className="text-2xl font-bold text-[#165028]">Medigo</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#165028] mb-2">{roleLabel} Login</h1>
            <p className="text-gray-600">Sign in to access your {roleLabel.toLowerCase()} dashboard</p>
          </div>

          {/* Login Method Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${loginMethod === 'email' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${loginMethod === 'phone' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              <Smartphone className="w-4 h-4 inline mr-2" />
              Phone
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('biometric')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${loginMethod === 'biometric' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              <Fingerprint className="w-4 h-4 inline mr-2" />
              Biometric
            </button>
          </div>

          {loginMethod === 'biometric' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#5DBB63] to-[#165028] rounded-full flex items-center justify-center">
                <Fingerprint className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#165028] mb-2">Biometric Authentication</h3>
              <p className="text-gray-600 mb-6">Use your fingerprint or face ID to sign in securely</p>
              <Button
                onClick={handleBiometricLogin}
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Fingerprint className="w-5 h-5" />
                    Authenticate with Biometrics
                  </span>
                )}
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email or Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <div className="relative">
                  {loginMethod === 'email' ? (
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  ) : (
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  )}
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={loginMethod === 'email' ? 'john.doe@example.com' : '+880 1XXX XXXXXX'}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-[#5DBB63] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          )}

          {/* Quick Access Options */}
          {loginMethod !== 'biometric' && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-5 h-5 bg-blue-600 rounded" />
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-5 h-5 bg-gray-800 rounded" />
                  <span className="text-sm font-medium">Apple</span>
                </button>
              </div>
            </div>
          )}

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to={`/auth/${role}/signup`} className="text-[#5DBB63] font-medium hover:underline">
                Sign Up
              </Link>
            </p>
            <Link to="/auth" className="block mt-2 text-sm text-gray-500 hover:text-[#165028]">
              ← Change account type
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#5DBB63] to-[#165028] items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md text-white"
        >
          <div className="mb-8">
            <Stethoscope className="w-16 h-16 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Welcome Back to Medigo</h2>
            <p className="text-white/90">
              Your health journey continues here. Access your personalized healthcare dashboard.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Login</h3>
                <p className="text-white/80 text-sm">Multiple authentication methods for your security</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">24/7 Access</h3>
                <p className="text-white/80 text-sm">Round-the-clock access to your health records</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Trusted Platform</h3>
                <p className="text-white/80 text-sm">Join 2M+ users who trust Medigo</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="font-semibold">Need Help?</span>
            </div>
            <p className="text-white/80 text-sm mb-3">
              Our support team is available 24/7 to assist you
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-white hover:text-white/80">
              Contact Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
