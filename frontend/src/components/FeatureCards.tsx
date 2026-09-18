import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck, Cloud, BarChart3, ArrowRight } from 'lucide-react';

export interface FeatureCardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
}

export const FeatureCards: React.FC = () => {
  const features: FeatureCardItem[] = [
    {
      id: 'easy-to-use',
      title: 'Easy to Use',
      subtitle: 'Simple and intuitive for everyone.',
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-100/70',
      iconColor: 'text-blue-600',
      accentBorder: 'hover:border-blue-200'
    },
    {
      id: 'secure',
      title: 'Secure',
      subtitle: 'Your data is always protected.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      iconBg: 'bg-emerald-100/70',
      iconColor: 'text-emerald-600',
      accentBorder: 'hover:border-emerald-200'
    },
    {
      id: 'cloud-based',
      title: 'Cloud Based',
      subtitle: 'Access anytime, anywhere.',
      icon: <Cloud className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-100/70',
      iconColor: 'text-purple-600',
      accentBorder: 'hover:border-purple-200'
    },
    {
      id: 'scalable',
      title: 'Scalable',
      subtitle: "Grows with your school's needs.",
      icon: <BarChart3 className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-100/70',
      iconColor: 'text-amber-500',
      accentBorder: 'hover:border-amber-200'
    }
  ];

  return (
    <section className="w-full relative z-20 mt-8 sm:mt-12 lg:mt-14">
      <div className="ingo-feature-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {features.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5 + index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`ingo-feature-card group relative bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer ${card.accentBorder}`}
          >
            <div className="flex items-start gap-4">
              {/* Feature Icon Badge */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${card.iconBg}`}
              >
                {card.icon}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="text-base sm:text-[17px] font-bold text-slate-800 tracking-tight transition-colors group-hover:text-blue-600">
                  {card.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-500 leading-snug">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom Right Arrow */}
            <div className="flex justify-end pt-3">
              <span className="inline-flex items-center text-slate-400 group-hover:text-blue-600 transition-colors">
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
