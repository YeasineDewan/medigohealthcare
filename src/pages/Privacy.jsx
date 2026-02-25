import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const sections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly (name, email, phone, health records when you use our services), usage data when you visit our platform, and cookies for functionality and analytics.',
  },
  {
    title: 'How We Use Your Information',
    content: 'We use your information to provide healthcare services, process appointments and orders, send relevant notifications, improve our platform, comply with legal obligations, and protect against fraud.',
  },
  {
    title: 'Data Sharing',
    content: 'We may share data with healthcare providers (doctors, pharmacies, labs) as necessary for your care. We do not sell your personal information. We may share anonymized or aggregated data for analytics.',
  },
  {
    title: 'Data Security',
    content: 'We implement industry-standard security measures including encryption, access controls, and secure servers. Health data is treated with the highest level of confidentiality.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal data. You may withdraw consent for marketing communications. Contact us at privacy@medigo.com to exercise these rights.',
  },
  {
    title: 'Updates',
    content: 'We may update this policy from time to time. We will notify you of significant changes via email or a notice on our platform. Continued use constitutes acceptance.',
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5DBB63]/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#165028]" />
            </div>
            <h1 className="text-4xl font-bold text-[#165028]">Privacy Policy</h1>
          </div>
          <p className="text-gray-500 text-sm">Last updated: February 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-12">
          Medigo Healthcare ("we", "our", or "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our platform.
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
            For questions about this Privacy Policy, contact us at{' '}
            <a href="mailto:privacy@medigo.com" className="text-[#5DBB63] hover:underline">privacy@medigo.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
