import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Stethoscope, User, ArrowLeft, LogIn, UserPlus } from 'lucide-react';

const roles = [
  {
    id: 'admin',
    title: 'Admin',
    desc: 'Manage platform, users, services & analytics',
    icon: Shield,
    color: 'from-[#165028] to-[#0f3d1c]',
    bg: 'bg-[#165028]/5',
  },
  {
    id: 'doctor',
    title: 'Doctor',
    desc: 'Manage appointments & patient consultations',
    icon: Stethoscope,
    color: 'from-[#5DBB63] to-[#4a9a4f]',
    bg: 'bg-[#5DBB63]/5',
  },
  {
    id: 'patient',
    title: 'Patient',
    desc: 'Book doctors, order medicines & track health',
    icon: User,
    color: 'from-[#5DBB63] to-[#165028]',
    bg: 'bg-[#5DBB63]/5',
  },
];

export default function AuthGate() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf2] via-white to-[#dcfce7] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#165028] hover:text-[#5DBB63] font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#165028] mb-2">
            Welcome to Medigo
          </h1>
          <p className="text-gray-600">
            {selectedRole
              ? `Choose how you'd like to continue as ${roles.find((r) => r.id === selectedRole)?.title}`
              : 'Select your account type to continue'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {roles.map((role, i) => (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedRole(role.id)}
                  className="group text-left p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-[#5DBB63] hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-[#111827] mb-2">{role.title}</h3>
                  <p className="text-gray-500 text-sm">{role.desc}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-[#5DBB63] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Continue <ArrowLeft className="w-4 h-4 rotate-180" />
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="p-8 rounded-2xl border border-gray-200 bg-white shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                      roles.find((r) => r.id === selectedRole)?.color
                    } flex items-center justify-center`}
                  >
                    {(() => {
                      const Icon = roles.find((r) => r.id === selectedRole)?.icon || User;
                      return <Icon className="w-7 h-7 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-[#111827]">
                      {roles.find((r) => r.id === selectedRole)?.title} Portal
                    </h2>
                    <p className="text-sm text-gray-500">
                      {roles.find((r) => r.id === selectedRole)?.desc}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Link
                    to={`/auth/${selectedRole}/login`}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#165028] text-white font-semibold hover:bg-[#0f3d1c] transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </Link>
                  <Link
                    to={`/auth/${selectedRole}/signup`}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-[#5DBB63] text-[#165028] font-semibold hover:bg-[#f0fdf2] transition-colors"
                  >
                    <UserPlus className="w-5 h-5" />
                    Sign Up
                  </Link>
                </div>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="w-full mt-6 py-2 text-gray-500 hover:text-[#165028] text-sm font-medium"
                >
                  ← Choose different account type
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
