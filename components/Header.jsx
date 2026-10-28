import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  MapPin, 
  ChevronRight, 
  PhoneCall, 
  Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Header Component - Myntra / Zara Inspired Premium Menswear Sticky Navbar
 * 
 * Features:
 * - Ultra-lightweight & performant (<150ms TTFB budget)
 * - Backdrop blur glassmorphism header with scroll elevation
 * - Animated cart badge & wishlist counter with pulse transitions
 * - Responsive mobile drawer with store direct line & categories
 * - Myntra-style live search input & quick category navigation
 */
export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onSearch = () => {},
  activeCategory = 'All',
  onSelectCategory = () => {}
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Monitor scroll for subtle elevation and backdrop density
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = [
    { label: 'ALL NEW', value: 'All' },
    { label: 'SHIRTS', value: 'Shirts', tag: 'TRENDING' },
    { label: 'SHORT KURTA', value: 'Short Kurta', tag: 'FESTIVE' },
    { label: 'T-SHIRTS', value: 'T-shirts' },
    { label: 'BOTTOMS', value: 'Bottoms' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT TICKER (Zara Minimalist Black Ribbon) */}
      <div className="bg-neutral-950 text-white text-[11px] font-medium tracking-[0.18em] uppercase py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>LBS Marg, Bhandup West, Mumbai</span>
          </div>

          <div className="mx-auto md:mx-0 flex items-center gap-3 font-semibold text-center">
            <span className="text-amber-400">★ BHANDUP'S NO.1 MENSWEAR SINCE 1995 ★</span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-neutral-300">FREE SHIPPING OVER ₹999</span>
            <span className="hidden lg:inline text-neutral-600">|</span>
            <span className="hidden lg:inline text-neutral-300">DISPATCH IN 24H &bull; COD AVAILABLE</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-neutral-400 text-[10.5px]">
            <a 
              href="tel:+918356076145" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>+91 8356076145</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY HEADER (Glassmorphic Backdrop Blur) */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200/80 py-3' 
            : 'bg-white/90 backdrop-blur-sm border-b border-neutral-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Left: Mobile Hamburger & Brand Identity */}
            <div className="flex items-center gap-3 lg:gap-8">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 -ml-1.5 text-neutral-800 hover:text-black lg:hidden focus:outline-hidden"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.8]" />
              </button>

              {/* Logo (Zara / Editorial Serif + Modern Grotesk Badge) */}
              <a href="/" className="group flex items-center gap-2.5 text-decoration-none">
                <div className="w-9 h-9 rounded-full bg-neutral-950 text-amber-400 flex items-center justify-center font-bold text-xs tracking-wider border border-amber-400/30 shadow-xs group-hover:scale-105 transition-transform">
                  SMW
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-950 uppercase leading-none font-sans">
                    Somaiya <span className="font-light tracking-widest text-neutral-700 text-sm sm:text-base">Men's Wear</span>
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-neutral-500 mt-1">
                    Bhandup West &bull; Est. 1995
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Desktop Navigation Links (Myntra Category Tabs) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navCategories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => onSelectCategory(cat.value)}
                    className="relative py-2 text-[13px] font-bold tracking-wider uppercase transition-colors text-neutral-700 hover:text-black"
                  >
                    <span>{cat.label}</span>
                    {cat.tag && (
                      <span className="absolute -top-1 -right-4 px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[8px] font-extrabold rounded-full tracking-normal">
                        {cat.tag}
                      </span>
                    )}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-950"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Search Bar & Icons (Wishlist, Cart, Profile) */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 lg:flex-initial justify-end">
              
              {/* Myntra-style Expandable Search */}
              <form 
                onSubmit={handleSearchSubmit}
                className={`relative hidden sm:flex items-center transition-all duration-200 ${
                  searchFocused ? 'w-64 lg:w-72' : 'w-48 lg:w-56'
                }`}
              >
                <Search className="absolute left-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search shirts, kurta, fit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white text-neutral-900 placeholder:text-neutral-500 rounded-full border border-transparent focus:border-neutral-300 focus:outline-hidden transition-all"
                />
              </form>

              {/* Wishlist Heart Icon with Animated Counter */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className="relative p-2 text-neutral-700 hover:text-rose-600 transition-colors rounded-full hover:bg-neutral-100 focus:outline-hidden"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'stroke-[1.8]'}`} />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9.5px] font-bold rounded-full flex items-center justify-center shadow-xs"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Cart Bag Icon with Animated Bounce Badge */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2 text-neutral-900 hover:text-black transition-colors rounded-full hover:bg-neutral-100 focus:outline-hidden"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5, y: -2 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-neutral-950 text-amber-300 text-[9.5px] font-bold rounded-full flex items-center justify-center shadow-xs"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Account Dropdown Trigger */}
              <a
                href="/admin.html"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-black py-1.5 px-3 rounded-full hover:bg-neutral-100 transition-colors"
                title="Mam's Admin & POS Portal"
              >
                <User className="w-4 h-4 stroke-[1.8]" />
                <span className="hidden md:inline">Account</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* 3. MOBILE OFFCANVAS DRAWER (Zara Minimalist Slide-out) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-950 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center">
                    SMW
                  </div>
                  <div>
                    <div className="font-extrabold text-sm uppercase tracking-wider">Somaiya Men's Wear</div>
                    <div className="text-[10px] text-amber-400/90 tracking-widest uppercase">Bhandup West Store</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-neutral-100">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-100 rounded-lg border border-transparent focus:border-neutral-300 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Category Links */}
              <div className="flex-1 overflow-y-auto py-2">
                <div className="px-4 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Collections
                </div>
                {navCategories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      onSelectCategory(cat.value);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold border-b border-neutral-50 transition-colors ${
                      activeCategory === cat.value 
                        ? 'bg-neutral-100 text-neutral-950 font-bold' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                ))}

                <div className="p-4 mt-4 bg-amber-50/60 rounded-xl mx-4 border border-amber-200/60">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Counter Pickup Available</span>
                  </div>
                  <p className="text-[11px] text-amber-800/80 mt-1">
                    Order online &amp; try on at our Bhandup West counter. Free alteration on spot!
                  </p>
                </div>
              </div>

              {/* Bottom Info & Admin Link */}
              <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-xs">
                <div className="text-neutral-500 mb-2 font-medium">
                  LBS Marg, Bhandup West, Mumbai - 400078
                </div>
                <div className="flex gap-2">
                  <a
                    href="tel:+918356076145"
                    className="flex-1 py-2 text-center bg-white border border-neutral-200 rounded-lg font-bold text-neutral-800"
                  >
                    Call Store
                  </a>
                  <a
                    href="/admin.html"
                    className="flex-1 py-2 text-center bg-neutral-950 text-amber-300 rounded-lg font-bold"
                  >
                    Mam's Portal
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
