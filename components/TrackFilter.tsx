import React from 'react';
import { FilterType } from '../types';

interface TrackFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TrackFilter: React.FC<TrackFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters: FilterType[] = ['All', 'Main Stage', 'Track 2', 'Networking'];

  return (
    <div className="grid grid-cols-4 gap-1.5 px-1 py-0.5">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`
            min-w-0 rounded-full px-1 py-1.5 text-[10px] font-semibold leading-tight transition-all duration-300 active:scale-95 sm:px-1.5 sm:py-2 sm:text-[11px]
            ${currentFilter === filter 
              ? 'bg-mco-purple text-white shadow-[0_14px_24px_-18px_rgba(109,40,217,0.75)]' 
              : 'bg-white/90 text-gray-600 border border-gray-200/80 shadow-[0_10px_18px_-18px_rgba(15,23,42,0.18)] hover:bg-white hover:border-gray-300'
            }
          `}
        >
          <span className="flex min-h-[2rem] items-center justify-center text-center">
            {filter}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TrackFilter;
