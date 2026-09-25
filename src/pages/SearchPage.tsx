import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/menu/ProductGrid';
import { products } from '../data/products';
import { Search, ArrowRight } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || searchParams.get('search') || '';
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const results = products.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <>
      <SEO
        title={`Search Cakes: ${query || 'Miss Cakist'} | Muzaffarpur`}
        description="Search homemade cakes and bakery treats from Miss Cakist in Muzaffarpur."
        canonicalPath="/search"
      />

      <main className="pt-24 pb-20 bg-cream-200 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ name: 'Search' }]} />

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-chocolate-100 shadow-soft mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900 mb-4">
              Search Bakery Menu
            </h1>

            <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
              <Search className="w-5 h-5 text-strawberry-600 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chocolate, rasmalai, birthday cakes..."
                className="w-full bg-cream-100 text-chocolate-900 text-sm font-medium pl-12 pr-28 py-3.5 rounded-2xl border border-chocolate-200 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-chocolate-800 hover:bg-chocolate-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Search
              </button>
            </form>
          </div>

          {query ? (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-chocolate-900">
                Results for &quot;{query}&quot; ({results.length})
              </h2>
              <ProductGrid
                products={results}
                emptyMessage={`No cakes found matching "${query}".`}
              />
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-chocolate-700 text-sm mb-4">Type a cake name or flavour above to search our catalog.</p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-strawberry-600 text-white font-bold text-xs px-6 py-3 rounded-full"
              >
                <span>Browse Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </main>
    </>
  );
};
