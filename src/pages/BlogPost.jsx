import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const posts = {
  1: { title: '5 Tips for Managing Diabetes at Home', author: 'Dr. Ahmed Hassan', date: 'Feb 1, 2025', content: 'Managing diabetes requires a combination of medication, diet, and lifestyle changes. Here are five practical tips to help you stay on track...' },
  2: { title: 'Understanding Heart Health: A Beginner\'s Guide', author: 'Dr. Fatima Khan', date: 'Jan 28, 2025', content: 'Your heart is your body\'s engine. Understanding the basics of cardiovascular health can help you make better choices...' },
  3: { title: 'When to See a Doctor: Warning Signs You Shouldn\'t Ignore', author: 'Medigo Team', date: 'Jan 25, 2025', content: 'Some symptoms warrant immediate attention. Learn when it\'s time to book a consultation...' },
  4: { title: 'Telemedicine: The Future of Healthcare Access', author: 'Medigo Team', date: 'Jan 20, 2025', content: 'Video consultations are transforming how patients connect with doctors. Here\'s what you need to know...' },
  5: { title: 'Stress and Your Immune System', author: 'Dr. Rahman Ali', date: 'Jan 15, 2025', content: 'Chronic stress can weaken your immune system. Discover the connection and what you can do about it...' },
};

export default function BlogPost() {
  const { id } = useParams();
  const post = posts[id] || posts[1];

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#5DBB63] hover:text-[#165028] font-medium mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[#165028] mb-6">{post.title}</h1>
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] mb-8 flex items-center justify-center">
            <span className="text-6xl opacity-30">📄</span>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">{post.content}</p>
          <p className="text-gray-600 leading-relaxed mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="text-gray-600 leading-relaxed mt-6">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. We encourage you to consult a healthcare professional for personalized advice.
          </p>
        </motion.article>
      </div>
    </div>
  );
}
