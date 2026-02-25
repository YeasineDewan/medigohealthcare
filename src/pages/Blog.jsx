import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
  { id: 1, title: '5 Tips for Managing Diabetes at Home', excerpt: 'Practical advice for daily diabetes management and monitoring.', date: 'Feb 1, 2025', author: 'Dr. Ahmed Hassan' },
  { id: 2, title: 'Understanding Heart Health: A Beginner\'s Guide', excerpt: 'Learn the basics of cardiovascular health and prevention.', date: 'Jan 28, 2025', author: 'Dr. Fatima Khan' },
  { id: 3, title: 'When to See a Doctor: Warning Signs You Shouldn\'t Ignore', excerpt: 'Common symptoms that warrant a medical consultation.', date: 'Jan 25, 2025', author: 'Medigo Team' },
  { id: 4, title: 'Telemedicine: The Future of Healthcare Access', excerpt: 'How video consultations are changing patient care.', date: 'Jan 20, 2025', author: 'Medigo Team' },
  { id: 5, title: 'Stress and Your Immune System', excerpt: 'The connection between stress and your body\'s defenses.', date: 'Jan 15, 2025', author: 'Dr. Rahman Ali' },
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#165028] mb-4">Blog</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Health tips, medical insights, and updates from our team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-[#5DBB63]/20 transition-all group">
                  <div className="aspect-video bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] flex items-center justify-center">
                    <span className="text-6xl opacity-30">📄</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="font-semibold text-[#111827] text-lg mb-2 group-hover:text-[#165028] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-[#5DBB63] font-medium text-sm group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
