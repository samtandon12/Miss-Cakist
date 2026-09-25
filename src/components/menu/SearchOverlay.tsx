import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = 'miss_cakist_recent_searches_v1';
const POPULAR_SEARCHES = [
  'Chocolate Cake',
  'Birthday Cake',
  'Rasmalai Cake',
  'Black Forest',
  'Red Velvet',
  'Butterscotch',
  'Strawberry Cake',
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }

    const q = val.toLowerCase().trim();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.occasion.some((o) => o.toLowerCase().includes(q))
    );
    setResults(filtered);
  };

  const saveRecentSearch = (term: string) => {
    const cleaned = term.trim();
    if (!cleaned) return;
    const updated = [cleaned, ...recentSearches.filter((s) => s.toLowerCase() !== cleaned.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectSearch = (term: string) => {
    saveRecentSearch(term);
    onClose();
    navigate(`/menu?search=${encodeURIComponent(term)}`);
  };

  const handleSelectProduct = (slug: string, name: string) => {
    saveRecentSearch(name);
    onClose();
    navigate(`/product/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-start pt-4 sm:pt-16 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-floating border border-chocolate-100 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-chocolate-100 flex items-center gap-3 bg-cream-100">
          <Search className="w-5 h-5 text-strawberry-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search cakes, flavours, birthday treats..."
            className="w-full bg-transparent text-chocolate-900 placeholder:text-chocolate-400 font-medium text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              className="text-chocolate-400 hover:text-chocolate-800 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-chocolate-700 hover:text-chocolate-900 bg-white px-3 py-1.5 rounded-full border border-chocolate-200 shrink-0"
          >
            Close
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Live Search Results */}
          {query ? (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-3 flex items-center justify-between">
                <span>Matching Cakes ({results.length})</span>
              </div>

              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug, product.name)}
                      className="w-full flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-cream-200 transition-colors text-left group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-serif font-bold text-chocolate-900 text-sm group-hover:text-strawberry-600 transition-colors line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-xs text-chocolate-500 line-clamp-1">
                          {product.description}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif font-bold text-chocolate-900 text-xs">
                          {formatPrice(product.price, product.priceLabel || 'Request')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <p className="text-chocolate-800 text-sm font-semibold">
                    No cakes or bakery items found matching &quot;{query}&quot;.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/menu');
                    }}
                    className="inline-flex items-center gap-1.5 bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold text-xs px-4 py-2 rounded-full"
                  >
                    <span>Explore All Cakes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-chocolate-500" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearch(term)}
                        className="text-xs font-medium text-chocolate-800 bg-cream-200 hover:bg-chocolate-800 hover:text-white px-3 py-1.5 rounded-full transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-strawberry-600" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectSearch(term)}
                      className="text-xs font-semibold text-chocolate-900 bg-pinksoft-100 hover:bg-pinksoft-300 border border-pinksoft-200 px-3.5 py-1.5 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
