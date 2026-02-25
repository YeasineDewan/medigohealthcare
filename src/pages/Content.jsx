import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  BookOpen,
  Heart,
  Brain,
  Pill,
  Stethoscope,
  Microscope,
  Dna,
  Eye,
  Tooth,
  Baby,
  Activity,
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  Tag,
  TrendingUp,
  Star,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowRight,
  ChevronRight,
  Download,
  Printer,
  HeartPulse,
  Shield,
  Zap,
  Globe,
  Award,
  Users,
  CheckCircle,
  AlertCircle,
  Info,
  Video,
  Image,
  FileImage,
} from 'lucide-react';

const categories = [
  { name: 'General Health', icon: Heart, color: 'from-red-500 to-red-600', count: 245 },
  { name: 'Mental Health', icon: Brain, color: 'from-purple-500 to-purple-600', count: 189 },
  { name: 'Medications', icon: Pill, color: 'from-blue-500 to-blue-600', count: 156 },
  { name: 'Medical Procedures', icon: Stethoscope, color: 'from-green-500 to-green-600', count: 134 },
  { name: 'Laboratory Tests', icon: Microscope, color: 'from-yellow-500 to-yellow-600', count: 98 },
  { name: 'Genetic Health', icon: Dna, color: 'from-indigo-500 to-indigo-600', count: 76 },
  { name: 'Eye Care', icon: Eye, color: 'from-cyan-500 to-cyan-600', count: 67 },
  { name: 'Dental Health', icon: Tooth, color: 'from-pink-500 to-pink-600', count: 89 },
  { name: 'Pediatrics', icon: Baby, color: 'from-orange-500 to-orange-600', count: 112 },
  { name: 'Fitness & Nutrition', icon: Activity, color: 'from-teal-500 to-teal-600', count: 145 },
];

const featuredArticles = [
  {
    id: 1,
    title: 'Understanding Heart Disease: Prevention and Treatment',
    excerpt: 'Comprehensive guide to cardiovascular health, risk factors, and modern treatment approaches.',
    category: 'General Health',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min',
    image: '/api/placeholder/400/250',
    tags: ['Heart Health', 'Prevention', 'Treatment'],
    featured: true,
    views: 15234,
    likes: 892,
  },
  {
    id: 2,
    title: 'Mental Health in the Digital Age: Coping Strategies',
    excerpt: 'How technology impacts mental wellbeing and practical strategies for maintaining balance.',
    category: 'Mental Health',
    author: 'Dr. Michael Chen',
    date: '2024-01-12',
    readTime: '6 min',
    image: '/api/placeholder/400/250',
    tags: ['Mental Health', 'Technology', 'Wellness'],
    featured: true,
    views: 12456,
    likes: 734,
  },
  {
    id: 3,
    title: 'The Future of Medicine: AI and Healthcare Innovation',
    excerpt: 'Exploring how artificial intelligence is revolutionizing diagnosis and treatment.',
    category: 'Medical Technology',
    author: 'Dr. Emily Williams',
    date: '2024-01-10',
    readTime: '10 min',
    image: '/api/placeholder/400/250',
    tags: ['AI', 'Innovation', 'Future'],
    featured: true,
    views: 18923,
    likes: 1205,
  },
];

const recentArticles = [
  {
    id: 4,
    title: 'Diabetes Management: A Complete Guide',
    excerpt: 'Everything you need to know about managing diabetes effectively.',
    category: 'General Health',
    author: 'Dr. Ahmed Rahman',
    date: '2024-01-14',
    readTime: '7 min',
    image: '/api/placeholder/300/200',
    tags: ['Diabetes', 'Management', 'Lifestyle'],
  },
  {
    id: 5,
    title: 'Vaccination Schedule for Adults',
    excerpt: 'Essential vaccines every adult should consider for optimal health.',
    category: 'Preventive Care',
    author: 'Dr. Lisa Park',
    date: '2024-01-13',
    readTime: '5 min',
    image: '/api/placeholder/300/200',
    tags: ['Vaccines', 'Prevention', 'Adult Health'],
  },
  {
    id: 6,
    title: 'Understanding Lab Tests: What Your Results Mean',
    excerpt: 'Decoding common laboratory tests and understanding your health metrics.',
    category: 'Laboratory Tests',
    author: 'Dr. James Wilson',
    date: '2024-01-11',
    readTime: '9 min',
    image: '/api/placeholder/300/200',
    tags: ['Lab Tests', 'Results', 'Health Metrics'],
  },
];

const healthTools = [
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    icon: Activity,
    link: '/tools/bmi',
  },
  {
    name: 'Symptom Checker',
    description: 'Check your symptoms online',
    icon: HeartPulse,
    link: '/tools/symptoms',
  },
  {
    name: 'Medication Reminder',
    description: 'Never miss your medications',
    icon: Pill,
    link: '/tools/medication-reminder',
  },
  {
    name: 'Health Risk Assessment',
    description: 'Assess your health risks',
    icon: Shield,
    link: '/tools/health-risk',
  },
];

const videoContent = [
  {
    id: 1,
    title: 'Exercise for Heart Health',
    duration: '15:30',
    thumbnail: '/api/placeholder/320/180',
    views: 45678,
    category: 'Fitness',
  },
  {
    id: 2,
    title: 'Healthy Cooking Tips',
    duration: '12:45',
    thumbnail: '/api/placeholder/320/180',
    views: 32156,
    category: 'Nutrition',
  },
  {
    id: 3,
    title: 'Stress Management Techniques',
    duration: '18:20',
    thumbnail: '/api/placeholder/320/180',
    views: 28934,
    category: 'Mental Health',
  },
];

export default function Content() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f0fdf2] via-white to-[#dcfce7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5DBB63]/10 text-[#165028] text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Health Education Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#165028] leading-tight mb-6">
              Your Trusted
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5DBB63] to-[#165028]">
                {' '}Health Resource
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Access comprehensive health information, expert insights, and educational content 
              to make informed decisions about your wellbeing.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search health topics, articles, or symptoms..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Browse by Category</h2>
            <p className="text-gray-600">Find content tailored to your health interests</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="p-6 rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-lg transition-all duration-300 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#111827] text-sm mb-1">{category.name}</h3>
                  <p className="text-gray-500 text-xs">{category.count} articles</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#165028] mb-2">Featured Articles</h2>
              <p className="text-gray-600">Expert-curated content on trending health topics</p>
            </div>
            <Link to="/articles/featured" className="inline-flex items-center gap-2 text-[#5DBB63] hover:text-[#165028]">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-[#5DBB63]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#5DBB63]/10 text-[#165028] text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-[#111827] text-lg mb-2 group-hover:text-[#5DBB63] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{article.author}</p>
                        <p className="text-xs text-gray-500">{article.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3" /> {article.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <Users className="w-3 h-3" /> {article.views}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/article/${article.id}`} className="inline-flex items-center gap-2 text-[#5DBB63] hover:text-[#165028] text-sm font-medium">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Health Tools & Calculators</h2>
            <p className="text-gray-600">Interactive tools to help you track and improve your health</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={tool.link} className="block">
                  <div className="p-6 rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#165028] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#111827] text-lg mb-2">{tool.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{tool.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#5DBB63] font-medium text-sm group-hover:gap-3 transition-all">
                      Try Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#165028] mb-2">Video Library</h2>
              <p className="text-gray-600">Educational videos from healthcare professionals</p>
            </div>
            <Link to="/videos" className="inline-flex items-center gap-2 text-[#5DBB63] hover:text-[#165028]">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoContent.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                    <Video className="w-12 h-12 text-white" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#111827] mb-2 group-hover:text-[#5DBB63] transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{video.category}</span>
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#165028] mb-2">Recent Articles</h2>
              <p className="text-gray-600">Latest health insights and medical updates</p>
            </div>
            <Link to="/articles/recent" className="inline-flex items-center gap-2 text-[#5DBB63] hover:text-[#165028]">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {recentArticles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/article/${article.id}`} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-[#5DBB63]" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-[#5DBB63]/10 text-[#165028] text-xs font-medium rounded-full">
                          {article.category}
                        </span>
                        <span className="text-gray-500 text-xs">{article.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-[#111827] text-lg mb-2 group-hover:text-[#5DBB63] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">{article.author}</p>
                            <p className="text-xs text-gray-500">{article.date}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#5DBB63] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-[#5DBB63] to-[#165028]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-white/90 mb-8">
              Get weekly health tips, medical updates, and exclusive content delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
              />
              <button className="px-6 py-3 bg-white text-[#165028] rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
