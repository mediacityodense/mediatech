import React from 'react';
import { FilterType } from '../types';

interface TrackFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TrackFilter: React.FC<TrackFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters: FilterType[] = ['All', 'Main Stage', 'Track 2', 'Networking'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
            ${currentFilter === filter 
              ? 'bg-mco-purple text-white shadow-md shadow-purple-200' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TrackFilter;
