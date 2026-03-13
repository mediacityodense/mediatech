
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { resolveLogoAsset } from '../logoAssets';

const NewsletterSignup: React.FC = () => {
  const mcoLogo = resolveLogoAsset('mco1.png');

  return (
    <div className="mx-4 mb-8 p-6 bg-gradient-to-br from-mco-purple/10 to-transparent rounded-2xl border border-mco-purple/20 flex flex-col items-center text-center relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-mco-purple/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <img 
        src={mcoLogo}
        alt="Media City Odense" 
        className="w-20 h-20 object-contain"
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
        className="flex items-center gap-2 bg-mco-purple text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-200 hover:scale-105 hover:bg-purple-700 transition-all active:scale-95"
      >
        <span>Sign up here</span>
        <ArrowRight size={18} />
      </a>
    </div>
  );
};

export default NewsletterSignup;
