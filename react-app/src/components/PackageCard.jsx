import React from 'react'
import { Link } from 'react-router-dom'

const PackageCard = ({ 
  tripTitle, 
  price, 
  originalPrice,
  discountText,
  duration, 
  bg, 
  link, 
  label, 
  bestSeller,
  badge,
  className 
}) => {
  const displayPrice = price ? (typeof price === 'string' && !price.includes('/-') ? `${price}/-` : price) : null;
  const displayOriginalPrice = originalPrice ? (typeof originalPrice === 'string' && !originalPrice.includes('/-') ? `${originalPrice}/-` : originalPrice) : null;
  
  const isClickable = link && link !== '#';
  const showBadge = bestSeller ? 'Best Seller' : badge;

  return (
    <Link 
      to={link || '#'} 
      onClick={(e) => { if (!isClickable) e.preventDefault() }}
      draggable={false}
      className={`rounded-3xl overflow-hidden group relative flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 select-none block bg-white border border-gray-100 ${className || 'w-full h-[360px]'}`}
    >
      {/* Top Image Section */}
      <div className="relative w-full h-[55%] overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${bg}')` }}></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
          {/* Label (e.g., MOUNTAINS or other category) */}
          <div className="bg-black/50 backdrop-blur-md text-white font-bold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[12px]">location_on</span>
            {label && label.toLowerCase() !== 'international' ? label : 'DESTINATION'}
          </div>

          {/* Badges/Discount in Lime Green */}
          <div className="flex flex-col items-end gap-2">
            {showBadge && (
              <div className="bg-[#ccff00] text-black font-extrabold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {showBadge}
              </div>
            )}
            {discountText && !showBadge && (
              <div className="bg-[#ccff00] text-black font-extrabold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                {discountText}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="flex flex-col p-5 h-[45%] justify-between">
        <div>
          <h3 className="text-gray-900 text-[20px] md:text-[22px] font-extrabold leading-[1.2] mb-2 line-clamp-2">{tripTitle}</h3>
          
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="text-[12px] font-medium tracking-wide">{duration}</span>
          </div>
        </div>

        <div className="flex items-end justify-between w-full mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">From</span>
            <div className="flex items-center gap-2">
              <span className="text-[#136b8a] font-extrabold text-[22px] leading-none">
                {displayPrice}
              </span>
              {displayOriginalPrice && (
                <span className="text-gray-400 text-[13px] line-through font-medium leading-none">
                  {displayOriginalPrice}
                </span>
              )}
            </div>
          </div>
          
          {/* Small View Detail Arrow or Discount % */}
          <div className="flex items-center text-gray-900 font-bold text-[12px] group-hover:text-[#136b8a] transition-colors bg-gray-50 group-hover:bg-[#eaf4f7] px-3 py-1.5 rounded-full border border-gray-100 group-hover:border-[#136b8a]/20">
            {discountText && showBadge && <span className="mr-1">{discountText}</span>}
            {!discountText && <span className="mr-1">View</span>}
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PackageCard
