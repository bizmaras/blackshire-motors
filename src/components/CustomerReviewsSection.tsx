import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../data/dealershipData';
import { Star } from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export const CustomerReviewsSection: React.FC = () => {
  const { t } = useLanguage();
  const [filterPlatform, setFilterPlatform] = useState<'All' | 'Google' | 'CarGurus' | 'DealerRater'>('All');

  const filteredReviews = CUSTOMER_REVIEWS.filter((rev) => {
    return filterPlatform === 'All' || rev.source === filterPlatform;
  });

  return (
    <section id="reviews" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-20 bg-[#08080c] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header & Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-sans tracking-wider uppercase mb-2 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {t.reviews.badge}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase">
              {t.reviews.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-300 max-w-xl font-light leading-relaxed">
              {t.reviews.subtitle}
            </p>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/90 border border-white/10">
            <div className="text-center font-sans">
              <div className="text-3xl font-bold text-amber-300">4.8</div>
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs font-sans text-neutral-400 border-l border-white/10 pl-4 font-light">
              <strong className="text-white block font-sans font-semibold">{t.reviews.verifiedRatings}</strong>
              <span>{t.reviews.googleCargurus}</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto">
          {['All', 'Google', 'CarGurus', 'DealerRater'].map((platform) => (
            <button
              key={platform}
              onClick={() => {
                playHudClick();
                setFilterPlatform(platform as any);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-sans uppercase tracking-wider transition-all cursor-pointer font-medium ${
                filterPlatform === platform
                  ? 'bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold shadow-md shadow-amber-400/20 ring-1 ring-[#D4AF37]'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {platform === 'All' ? t.reviews.allReviews : platform}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Stars and Platform */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10 font-medium">
                    {review.source}
                  </span>
                </div>

                {/* Review text */}
                <p className="text-xs text-neutral-300 leading-relaxed italic font-light">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-sans">
                <div>
                  <div className="font-semibold text-white">{review.author}</div>
                  <div className="text-[10px] text-neutral-400">{review.location}</div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-amber-300 font-semibold">{review.vehiclePurchased}</div>
                  <div className="text-[9px] text-neutral-500">{review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
