import React from 'react';
import { resolveLogoAsset } from '../logoAssets';

const sponsors = [
  { 
    name: 'AWS', 
    url: 'https://aws.amazon.com', 
    logoFile: 'aws.png' 
  },
  { 
    name: 'Appear', 
    url: 'https://appear.net', 
    logoFile: 'appear.png' 
  },
  { 
    name: 'Sony', 
    url: 'https://pro.sony', 
    logoFile: 'testsony.png' 
  },
  { 
    name: 'Grass Valley', 
    url: 'https://grassvalley.com', 
    logoFile: 'gv.png' 
  },
  { 
    name: 'Danmon Systems Group', 
    url: 'https://danmon.com', 
    logoFile: 'danmon.png' 
  },
  { 
    name: 'Fonn Group', 
    url: 'https://fonngroup.com', 
    logoFile: 'fonn.png' 
  },
  { 
    name: 'Everviz', 
    url: 'https://Everviz.com', 
    logoFile: 'everviz.png' 
  },
  { 
    name: 'Google News Initiative', 
    url: 'https://newsinitiative.withgoogle.com', 
    logoFile: 'google.png' 
  },
  { 
    name: 'Vizrt', 
    url: 'https://vizrt.com', 
    logoFile: 'vz.png' 
  },
  { 
    name: 'Media Tailor', 
    url: 'https://MediaTailor.fi', 
    logoFile: 'mediatailor.png' 
  },
  { 
    name: 'LAWO', 
    url: 'https://LAWO.com', 
    logoFile: 'LAWO.svg' 
  },
  { 
    name: 'Mediability', 
    url: 'https://Mediability.com', 
    logoFile: 'mediability.png' 
  },
  { 
    name: 'TV2 Danmark', 
    url: 'https://TV2.dk', 
    logoFile: 'TV2Denmark.svg' 
  },
  { 
    name: 'JFM', 
    url: 'https://JFM.dk', 
    logoFile: 'jfm.png' 
  },

];

const SponsorFooter: React.FC = () => {
  return (
    <div className="mt-8 mb-8 mx-4 px-6 py-8 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
        Mediatech Festival 2026 Sponsored By
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8">
        {sponsors.map((sponsor) => (
          <a 
            key={sponsor.name}
            href={sponsor.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all duration-300 flex items-center justify-center"
            aria-label={sponsor.name}
          >
              <img 
                src={resolveLogoAsset(sponsor.logoFile)} 
                alt={sponsor.name} 
                className="h-auto max-h-[100px] max-w-[100px] w-auto object-contain"
                onError={(e) => {
                  // Fallback: hide broken image, could display text instead but for now keeping it clean
                  e.currentTarget.style.display = 'None';
                }}
              />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SponsorFooter;
