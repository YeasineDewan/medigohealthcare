import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

const sections = [
  {
    title: 'What Are Cookies?',
    content: 'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you logged in, and understand how you use the platform.',
  },
  {
    title: 'Cookies We Use',
    content: 'We use essential cookies (required for the site to function), functional cookies (preferences like language), analytics cookies (to improve our service), and marketing cookies (with your consent) for relevant ads.',
  },
  {
    title: 'Your Choices',
    content: 'You can control cookies through your browser settings. Blocking essential cookies may affect site functionality. You can withdraw consent for optional cookies at any time in your account settings.',
  },
  {
    title: 'Third-Party Cookies',
    content: 'Some services we use (e.g., analytics, payment processors) may set their own cookies. We recommend reviewing their privacy policies for more information.',
  },
];

export default function Cookies() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5DBB63]/20 flex items-center justify-center">
              <Cookie className="w-7 h-7 text-[#165028]" />
            </div>
            <h1 className="text-4xl font-bold text-[#165028]">Cookie Policy</h1>
          </div>
          <p className="text-gray-500 text-sm">Last updated: February 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-12">
          This Cookie Policy explains how Medigo Healthcare uses cookies and similar technologies when you use our platform.
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
            For more information, see our{' '}
            <a href="/privacy" className="text-[#5DBB63] hover:underline">Privacy Policy</a> or contact{' '}
            <a href="mailto:privacy@medigo.com" className="text-[#5DBB63] hover:underline">privacy@medigo.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
