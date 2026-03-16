
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { resolveLogoAsset } from '../logoAssets';

const NewsletterSignup: React.FC = () => {
  const mcoLogo = resolveLogoAsset('mco1.png');

  return (
    <div className="mx-4 mb-8 p-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,245,255,0.96)_100%)] rounded-[26px] border border-white/80 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.18)] flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-22px_rgba(15,23,42,0.22)]">
      
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-mco-purple/12 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_40%)] pointer-events-none"></div>
      
      <img 
        src={mcoLogo}
        alt="Media City Odense" 
        className="w-20 h-20 object-contain drop-shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
        onError={(e) => {
           e.currentTarget.style.display = 'none';
        }}
      />
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">Stay in the loop</h3>
      <p className="text-sm text-gray-600 mb-6 max-w-xs leading-relaxed">
        Receive Media City Odense&apos;s newsletter and stay updated on events and news from the cluster.
      </p>
      
      <a 
        href="https://share-eu1.hsforms.com/1_Q8NdBNsSkSKQlPbzvHgRwfbva9"
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-mco-purple text-white px-6 py-3 rounded-2xl font-semibold shadow-[0_16px_30px_-18px_rgba(109,40,217,0.7)] hover:scale-105 hover:bg-purple-700 transition-all duration-300 active:scale-95"
      >
        <span>Sign up here</span>
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
};

export default NewsletterSignup;
