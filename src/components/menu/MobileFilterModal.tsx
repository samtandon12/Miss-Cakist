import React from 'react';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { X } from 'lucide-react';

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-cream-100 w-full max-w-xs h-full p-4 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-chocolate-100 mb-4">
            <h3 className="font-serif font-bold text-chocolate-900 text-lg">Filter & Sort</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-chocolate-600 hover:bg-chocolate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <FilterSidebar
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            totalResults={totalResults}
          />
        </div>

        <button
          onClick={onClose}
          className="w-full bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold py-3 rounded-xl shadow-md text-sm mt-6"
        >
          View Results ({totalResults})
        </button>
      </div>
    </div>
  );
};
