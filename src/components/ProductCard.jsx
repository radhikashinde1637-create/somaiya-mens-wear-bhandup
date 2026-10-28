import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  ShoppingBag, 
  Star, 
  Flame, 
  Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * ProductCard Component - Zara / Myntra Inspired Premium Menswear Card
 * 
 * Features:
 * - High-speed rendering & performance (<150ms TTFB compliant)
 * - Cinematic image hover zoom with optional secondary image swap
 * - Low-stock urgency badge (< 5 units in warning red/amber)
 * - Quick-size selector overlay directly on card hover
 * - Interactive wishlist heart toggle with micro-spring animation
 * - Quick View trigger & Myntra-style rating pill
 */
export default function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist = () => {},
  onQuickView = () => {},
  onAddToCart = () => {},
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.size || 'L');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const {
    id,
    name = "Premium Cotton Resort Shirt",
    price = 799,
    originalPrice = 1249,
    discountPercent = 36,
    category = "Shirts",
    colour = "Mustard Yellow",
    qty = 12,
    minQty = 5,
    image = "/assets/products/shirt_yellow_watercolor.jpg",
    image2 = null,
    availableSizes = ['M', 'L', 'XL', 'XXL'],
    rating = 4.8,
    ratingCount = '1.4k'
  } = product;

  const isLowStock = qty > 0 && qty <= minQty;
  const isOutOfStock = qty <= 0;

  const handleQuickAdd = (size, e) => {
    e.stopPropagation();
    setSelectedSize(size);
    onAddToCart({ ...product, size });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1600);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-xl hover:border-neutral-200 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. IMAGE CONTAINER (3:4 Portrait Ratio for Zara Aesthetic) */}
      <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        
        {/* Main Product Image with Smooth Transform */}
        <img
          src={isHovered && image2 ? image2 : image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges (Sale Discount & Low Stock Urgency) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-black/90 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-sm backdrop-blur-xs shadow-xs">
              {discountPercent}% OFF
            </span>
          )}

          {isLowStock && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-600/90 text-white text-[9.5px] font-bold uppercase tracking-tight rounded-sm backdrop-blur-xs shadow-xs animate-pulse">
              <Flame className="w-2.5 h-2.5 fill-white" />
              Only {qty} Left
            </span>
          )}

          {isOutOfStock && (
            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-[10px] font-bold uppercase rounded-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Heart Button (Micro-interaction) */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md shadow-xs transition-colors z-10 ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-white/80 text-neutral-700 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart 
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'stroke-[1.8]'
            }`} 
          />
        </motion.button>

        {/* Myntra-style Rating Tag (Bottom Left of Photo) */}
        <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-md flex items-center gap-1 text-[10.5px] font-bold text-neutral-800 shadow-xs">
          <span>{rating}</span>
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-neutral-400 font-normal">|</span>
          <span className="text-neutral-500 text-[9.5px]">{ratingCount}</span>
        </div>

        {/* Quick View Button (Center Overlay on Hover) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto px-4 py-2 bg-white/95 hover:bg-black hover:text-white text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Hover Size Overlay (Slide Up at Bottom of Image) */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-20">
          <div className="text-[10px] font-bold uppercase text-white/90 mb-1.5 flex items-center justify-between">
            <span>Select Size to Add:</span>
            <span className="text-amber-300 font-semibold text-[9px]">Tap to Buy</span>
          </div>
          <div className="flex items-center gap-1.5">
            {availableSizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={(e) => handleQuickAdd(sz, e)}
                disabled={isOutOfStock}
                className="flex-1 py-1 bg-white hover:bg-neutral-950 hover:text-amber-300 text-neutral-900 text-[11px] font-bold rounded-sm shadow-xs transition-colors"
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 2. CARD DETAILS (Zara Minimalist Clean Typography) */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category / Sub-brand */}
          <div className="flex items-center justify-between text-[10.5px] font-bold tracking-widest uppercase text-neutral-400 mb-1">
            <span>SOMAIYA &bull; {category}</span>
            <span className="text-neutral-500 font-medium lowercase first-letter:uppercase">{colour}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-[13.5px] text-neutral-900 line-clamp-1 group-hover:text-amber-800 transition-colors cursor-pointer"
            title={name}
          >
            {name}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-sm sm:text-base text-neutral-950">
              ₹{Number(price).toLocaleString('en-IN')}
            </span>
            {originalPrice > price && (
              <span className="text-xs text-neutral-400 line-through">
                ₹{Number(originalPrice).toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[11px] font-bold text-emerald-600 ml-0.5">
                ({discountPercent}% OFF)
              </span>
            )}
          </div>

          {/* Quick Bag Button */}
          <button
            type="button"
            onClick={(e) => handleQuickAdd(selectedSize, e)}
            disabled={isOutOfStock}
            className={`p-2 rounded-full border transition-all ${
              addedSuccess
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-neutral-200 text-neutral-800 hover:bg-neutral-950 hover:text-white hover:border-neutral-950'
            }`}
            title="Add to Shopping Bag"
            aria-label="Add to Bag"
          >
            {addedSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
