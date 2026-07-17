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
      className={`rounded-[28px] overflow-hidden group relative flex flex-col justify-between p-4 md:p-5 shadow-sm hover:shadow-xl transition-all duration-300 select-none block ${className || 'w-full h-[340px] md:h-[360px]'}`}
    >
      <div className="absolute inset-0 bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-700 pointer-events-none" style={{ backgroundImage: `url('${bg}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/90 pointer-events-none z-0"></div>
      
      {/* Top Section */}
      <div className="relative z-10 w-full flex flex-col items-start gap-2">
        <div className="flex justify-between w-full items-start gap-2">
          <h3 className="text-white text-[24px] md:text-[28px] font-extrabold leading-[1.1] drop-shadow-md shrink">{tripTitle}</h3>
          {showBadge && (
            <div className="bg-gray-500/80 backdrop-blur-md text-white font-bold text-[10px] px-3 py-1.5 rounded-full tracking-wider shrink-0 mt-1">
              {showBadge}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-1">
          {discountText && (
            <div className="bg-red-600/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
              {discountText}
            </div>
          )}
          {label && label.toLowerCase() !== 'international' && !discountText && (
            <div className="bg-primary text-white font-bold text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-wider">
              {label}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 w-full flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-2 w-full">
          <span className="bg-white text-primary text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 shadow-sm">
            {duration}
          </span>
          <div className={`relative overflow-hidden group/btn bg-white rounded-full py-1.5 shadow-lg flex-1 transition-all flex justify-center items-center ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}>
            {isClickable && <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover/btn:w-full z-0"></div>}
            <span className={`relative z-10 font-bold text-[11px] whitespace-nowrap transition-colors duration-300 ${isClickable ? 'text-primary group-hover/btn:text-white' : 'text-primary'}`}>
              {isClickable ? (
                <>
                  <span className="group-hover/btn:hidden">View Detail</span>
                  <span className="hidden group-hover/btn:inline">Click</span>
                </>
              ) : (
                "Coming Soon"
              )}
            </span>
          </div>
        </div>

        {/* Full-width Price Box */}
        <div className="w-full bg-[#136b8a]/90 backdrop-blur-md rounded-2xl py-2 flex flex-col items-center justify-center border border-white/20 shadow-md">
            {displayOriginalPrice && (
              <span className="text-white/70 text-[11px] line-through font-semibold leading-none mb-0.5">
                {displayOriginalPrice}
              </span>
            )}
            <span className="text-white font-extrabold text-[18px] md:text-[20px] drop-shadow-md whitespace-nowrap leading-none">
              {displayPrice}
            </span>
        </div>
      </div>
    </Link>
  )
}

export default PackageCard
