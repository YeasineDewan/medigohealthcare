import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const item = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i * 0.04, 0.4), duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BenefitGrid({ titleBn, items, titleClass = 'text-[#7f1d1d]' }) {
  return (
    <div className="space-y-6">
      {titleBn ? (
        <h3 className={`text-xl sm:text-2xl font-bold font-bn ${titleClass} tracking-tight`}>{titleBn}</h3>
      ) : null}
      <motion.ul
        className="grid sm:grid-cols-2 gap-3 sm:gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {items.map((text, i) => (
          <motion.li
            key={i}
            custom={i}
            variants={item}
            className="group rounded-xl border border-[#5DBB63]/15 bg-[#f0fdf4]/90 pl-1 shadow-sm hover:shadow-md hover:border-[#5DBB63]/35 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex gap-3 rounded-[11px] bg-[#f0fdf4] py-3.5 px-4 border-l-[4px] border-[#5DBB63]">
              <Check className="w-5 h-5 text-[#5DBB63] flex-shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden />
              <p className="text-sm sm:text-[15px] leading-relaxed text-gray-900 font-bn">{text}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
