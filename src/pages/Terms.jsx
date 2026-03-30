import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing or using Medigo Healthcare services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.',
  },
  {
    title: 'Services',
    content: 'Medigo provides a platform connecting patients with healthcare providers for consultations, pharmacy orders, lab tests, and emergency services. We facilitate these connections but are not a healthcare provider ourselves. Medical advice comes from licensed professionals.',
  },
  {
    title: 'User Accounts',
    content: 'You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.',
  },
  {
    title: 'Appointments & Orders',
    content: 'Appointment and order confirmations are subject to provider availability. Cancellation policies may apply. We strive for accuracy but do not guarantee availability or delivery times.',
  },
  {
    title: 'Prohibited Conduct',
    content: 'You may not use the platform for illegal purposes, to harm others, or to circumvent security measures. Abuse of the platform may result in account suspension or termination.',
  },
  {
    title: 'Limitation of Liability',
    content: 'To the maximum extent permitted by law, Medigo is not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the amount you paid for services in the past 12 months.',
  },
  {
    title: 'Changes',
    content: 'We may modify these terms at any time. Continued use after changes constitutes acceptance. We will notify you of material changes via email or platform notice.',
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5DBB63]/20 flex items-center justify-center">
              <FileText className="w-7 h-7 text-[#165028]" />
            </div>
            <h1 className="text-4xl font-bold text-[#165028]">Terms of Service</h1>
          </div>
          <p className="text-gray-500 text-sm">Last updated: February 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-12">
          These Terms of Service govern your use of Medigo Healthcare's platform. Please read them carefully before using our services.
        </p>
        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-xl font-semibold text-[#165028] mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </motion.section>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Contact us at{' '}
            <a href="mailto:legal@medigo.com" className="text-[#5DBB63] hover:underline">legal@medigo.com</a> with questions about these terms.
          </p>
        </div>
      </div>
    </div>
  );
}
