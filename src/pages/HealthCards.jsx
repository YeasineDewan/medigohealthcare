import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Heart, Sparkles, Phone, ChevronRight } from 'lucide-react';
import BenefitGrid from '../components/healthCards/BenefitGrid';
import {
  healthCardShowcase,
  premiumBenefits,
  familyBenefits,
  corporateBenefits,
  charityBenefits,
  shareBenefits,
  checkupPackage,
  placeholderSections,
} from '../data/healthCardsPageContent';

const sectionIds = [
  { id: 'showcase', label: 'Overview' },
  { id: 'premium', label: 'Premium' },
  { id: 'specialist', label: 'Specialist' },
  { id: 'family', label: 'Family' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'charity', label: 'Charity' },
  { id: 'share', label: 'Share' },
  { id: 'checkup', label: 'Checkup' },
  { id: 'child', label: 'Child' },
  { id: 'community', label: 'Community' },
];

export default function HealthCards() {
  useEffect(() => {
    document.title = 'Health Cards | Medigo Healthcare';
    const id = window.location.hash?.replace('#', '');
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#165028] via-[#0f5132] to-[#134e2a] text-white">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#86efac]" />
              <span className="font-bn">মেডিগো হেলথ কার্ড প্রোগ্রাম</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
              <span className="font-bn block text-white/95">হেলথ কার্ড</span>
              <span className="block text-[#86efac] mt-1">Health Cards — professional care, member pricing</span>
            </h1>
            <p className="text-lg text-white/85 font-bn leading-relaxed max-w-2xl">
              আপনার ও পরিবারের জন্য নির্বাচিত স্বাস্থ্যসেবা প্যাকেজ। নিচে কার্ডের ধরন অনুযায়ী বিস্তারিত সুবিধা দেখুন—কার্ডের ইমেজ পরে যুক্ত করতে পারবেন।
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+8801234567890"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#165028] shadow-lg hover:bg-[#f0fdf4] transition-colors"
              >
                <Phone className="w-4 h-4" />
                কল করুন
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                রেজিস্ট্রেশন জানতে
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky subnav */}
      <nav className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max sm:flex-wrap sm:min-w-0">
            {sectionIds.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:border-[#5DBB63] hover:text-[#165028] hover:bg-[#f0fdf4] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Showcase — 5 cards with image placeholders */}
      <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-bn mb-2">মেডিগো হাসপাতালের হেলথ কার্ডসমূহ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-bn text-sm sm:text-base">
            প্রতিটি কার্ডের জন্য নিচে প্লেসহোল্ডার ইমেজ রয়েছে— আপনার ডিজাইন যোগ করলে আকার একই থাকবে।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4">
          {healthCardShowcase.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={`group flex flex-col rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100 hover:shadow-xl hover:-translate-y-1 ${card.ring} transition-all duration-300`}
            >
              <div
                className={`relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <CreditCard className="relative h-14 w-14 text-white/90 opacity-90" />
                <span className="absolute bottom-2 left-2 right-2 rounded-md bg-black/35 px-2 py-1 text-center text-[10px] font-medium text-white backdrop-blur-sm font-bn">
                  ইমেজ যোগ করুন
                </span>
              </div>
              <h3 className="text-center font-bold text-[#6b21a8] font-bn text-base leading-snug min-h-[3rem] flex items-center justify-center">
                {card.titleBn}
              </h3>
              <p className="mt-2 text-center text-xs text-gray-600 font-bn leading-relaxed flex-1">{card.descriptionBn}</p>
              <a
                href={`#${card.id}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#165028] py-2.5 text-sm font-semibold text-white hover:bg-[#0f3d1c] transition-colors font-bn"
              >
                বিস্তারিত জানতে ক্লিক করুন
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Main content panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16 sm:space-y-20">
        <section
          id="premium"
          className="scroll-mt-24 rounded-3xl border border-[#5DBB63]/20 bg-white p-6 sm:p-10 shadow-sm ring-1 ring-gray-100"
        >
          <BenefitGrid titleBn="প্রিমিয়াম হেলথ কার্ডের সুবিধা সমূহ" items={premiumBenefits} />
        </section>

        <section id="specialist" className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-[#7f1d1d] font-bn mb-3">{placeholderSections.specialist.titleBn}</h3>
          <p className="text-gray-700 font-bn leading-relaxed max-w-3xl">{placeholderSections.specialist.bodyBn}</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-dashed border-[#5DBB63]/40 bg-[#f0fdf4]/50 p-8 aspect-video flex items-center justify-center text-sm text-gray-500 font-bn">
              স্পেশালিস্ট কার্ড ইমেজ প্লেসহোল্ডার
            </div>
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 flex items-center justify-center text-sm text-gray-500 font-bn">
              বিস্তারিত টেবিল / PDF লিংক এখানে যুক্ত করা যাবে
            </div>
          </div>
        </section>

        <section id="family" className="scroll-mt-24 rounded-3xl border border-[#5DBB63]/20 bg-white p-6 sm:p-10 shadow-sm">
          <BenefitGrid titleBn="ফ্যামিলি হেলথ কার্ডের সুবিধা সমূহ" items={familyBenefits} />
        </section>

        <section id="corporate" className="scroll-mt-24 rounded-3xl border border-[#5DBB63]/20 bg-white p-6 sm:p-10 shadow-sm">
          <BenefitGrid titleBn="কর্পোরেট হেলথ কার্ডের সুবিধা সমূহ" items={corporateBenefits} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/corporate-health-card"
              className="inline-flex items-center gap-2 rounded-xl bg-[#165028] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f3d1c] transition-colors font-bn"
            >
              কর্পোরেট কার্ডের পূর্ণ পেজ
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section id="charity" className="scroll-mt-24 rounded-3xl border border-[#5DBB63]/20 bg-white p-6 sm:p-10 shadow-sm">
          <BenefitGrid titleBn="দাতব্য হেলথ কার্ডের সুবিধা সমূহ" items={charityBenefits} />
        </section>

        <section id="share" className="scroll-mt-24 rounded-3xl border border-t-4 border-t-[#5DBB63] bg-white p-6 sm:p-10 shadow-lg ring-1 ring-gray-100">
          <div className="flex items-start gap-3 mb-6">
            <Heart className="w-8 h-8 text-[#5DBB63] flex-shrink-0" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#7f1d1d] font-bn">সম্মানিত শেয়ার সদস্যের মেডিকেল সুবিধাবলী</h3>
              <p className="text-sm text-gray-600 mt-1 font-bn">শেয়ার হেলথ কার্ড অনুযায়ী নির্ধারিত সুবিধাসমূহ</p>
            </div>
          </div>
          <BenefitGrid items={shareBenefits} />
        </section>

        {/* Fix: BenefitGrid requires title - pass title for share or adjust */}
        <section id="checkup" className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 font-bn">{checkupPackage.titleBn}</h3>
            <p className="text-gray-600 mt-2 font-bn text-sm sm:text-base">{checkupPackage.subtitleBn}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {checkupPackage.tests.map((t, i) => (
              <motion.div
                key={t.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-[#f8fafc] p-3 shadow-sm hover:shadow-md hover:border-[#5DBB63]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-[#165028]/10 to-[#5DBB63]/10 flex items-center justify-center mb-3 relative overflow-hidden">
                  <span className="text-xs font-bold text-[#165028]/60">{t.code}</span>
                  <span className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#165028] text-xs font-bold text-white font-bn">
                    {t.n}
                  </span>
                </div>
                <p className="text-center text-sm font-semibold text-gray-900 leading-snug">{t.name}</p>
                <p className="text-center text-[10px] text-gray-500 mt-1 font-bn">ইমেজ যোগ করুন</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="child" className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-[#7f1d1d] font-bn mb-3">{placeholderSections.child.titleBn}</h3>
          <p className="text-gray-700 font-bn leading-relaxed max-w-3xl">{placeholderSections.child.bodyBn}</p>
        </section>

        <section id="community" className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-[#7f1d1d] font-bn mb-3">{placeholderSections.community.titleBn}</h3>
          <p className="text-gray-700 font-bn leading-relaxed max-w-3xl">{placeholderSections.community.bodyBn}</p>
        </section>
      </div>
    </div>
  );
}
