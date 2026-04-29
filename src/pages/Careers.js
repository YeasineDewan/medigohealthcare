import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';

const openings = [
  { title: 'Senior Frontend Developer', dept: 'Engineering', location: 'Dhaka', type: 'Full-time' },
  { title: 'Backend Engineer (Laravel)', dept: 'Engineering', location: 'Dhaka', type: 'Full-time' },
  { title: 'Medical Content Writer', dept: 'Content', location: 'Remote', type: 'Contract' },
  { title: 'Customer Support Lead', dept: 'Operations', location: 'Dhaka', type: 'Full-time' },
  { title: 'Product Designer', dept: 'Design', location: 'Dhaka', type: 'Full-time' },
];

const benefits = [
  'Competitive salary',
  'Health insurance',
  'Flexible work hours',
  'Learning budget',
  'Team events',
];

export default function Careers() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5DBB63]/20 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-[#165028]" />
            </div>
            <h1 className="text-4xl font-bold text-[#165028]">Careers</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Join our mission to make healthcare accessible to everyone. We're building a team of passionate people.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-[#165028] text-white p-8 mb-12"
        >
          <h2 className="text-xl font-semibold mb-4">Why Medigo?</h2>
          <p className="text-white/90 mb-6">
            We're a health-tech startup on a mission to transform how people access healthcare. 
            Join us to work on meaningful problems alongside a talented team.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5DBB63]" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <h2 className="text-2xl font-bold text-[#165028] mb-6">Open Positions</h2>
        <div className="space-y-4">
          {openings.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#5DBB63]/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-[#111827] text-lg">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span>{job.dept}</span>
                  </div>
                </div>
                <Button variant="outline" className="sm:flex-shrink-0">
                  Apply
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p>Don't see a fit? Email us at <a href="mailto:careers@medigo.com" className="text-[#5DBB63] hover:underline">careers@medigo.com</a></p>
        </div>
      </div>
    </div>
  );
}
