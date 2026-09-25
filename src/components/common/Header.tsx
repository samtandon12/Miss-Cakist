import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, MapPin, Menu, X, Cake } from 'lucide-react';
import { business } from '../../data/business';
import { useCart } from '../../context/CartContext';
import { SearchOverlay } from '../menu/SearchOverlay';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartTotalCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Cakes', path: '/menu/cakes' },
    { name: 'Birthday Cakes', path: '/menu/birthday-cakes' },
    { name: 'Pastries', path: '/menu/pastries' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-100/95 backdrop-blur-md py-3 shadow-soft border-b border-chocolate-100'
            : 'bg-cream-100 py-4 border-b border-chocolate-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-chocolate-800 flex items-center justify-center text-cream-100 shadow-sm group-hover:bg-strawberry-600 transition-colors">
                <Cake className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-chocolate-900 leading-none">
                  MISS CAKIST
                </span>
                <span className="text-[10px] font-medium tracking-widest text-strawberry-600 uppercase mt-0.5">
                  Homemade Cakes
                </span>
              </div>
            </Link>

            {/* CENTER: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive(link.path)
                      ? 'bg-chocolate-800 text-cream-100 shadow-xs'
                      : 'text-chocolate-800 hover:text-strawberry-600 hover:bg-chocolate-100/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Location Badge (Desktop) */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-chocolate-100/70 text-chocolate-800 text-xs font-medium border border-chocolate-200/50">
                <MapPin className="w-3.5 h-3.5 text-strawberry-600 shrink-0" />
                <span className="truncate max-w-[130px]" title={business.addressShort}>
                  Bibiganj, Muzaffarpur
                </span>
              </div>

              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-chocolate-800 hover:bg-chocolate-100 transition-colors relative"
                aria-label="Search menu"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 bg-strawberry-600 hover:bg-strawberry-700 text-white px-3.5 py-2 rounded-full font-medium text-xs shadow-sm transition-all transform active:scale-95"
                aria-label="Open Cake Box"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Cake Box</span>
                {cartTotalCount > 0 && (
                  <span className="bg-white text-strawberry-700 px-1.5 py-0.5 rounded-full text-[11px] font-bold min-w-[20px] text-center">
                    {cartTotalCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="lg:hidden p-2 rounded-lg text-chocolate-800 hover:bg-chocolate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-cream-100 border-b border-chocolate-100 px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pinksoft-100 text-chocolate-800 text-xs font-medium mb-3 border border-pinksoft-200">
              <MapPin className="w-4 h-4 text-strawberry-600 shrink-0" />
              <span>Bibiganj Road, Muzaffarpur (Closes 10 PM)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-center ${
                    isActive(link.path)
                      ? 'bg-chocolate-800 text-cream-100 shadow-sm'
                      : 'bg-white/80 text-chocolate-800 hover:bg-chocolate-100 border border-chocolate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
