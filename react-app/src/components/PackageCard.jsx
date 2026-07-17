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
      className={`rounded-[28px] overflow-hidden group relative flex flex-col justify-end shadow-sm hover:shadow-xl transition-all duration-300 select-none block ${className || 'w-full h-[340px] md:h-[360px]'}`}
    >
      <div className="absolute inset-0 bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-700 pointer-events-none" style={{ backgroundImage: `url('${bg}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent h-[75%] mt-auto pointer-events-none"></div>
      
      {showBadge && (
        <div className="absolute top-4 right-4 bg-gray-500/80 backdrop-blur-md text-white font-bold text-[11px] px-4 py-1.5 rounded-full tracking-wider z-10">
          {showBadge}
        </div>
      )}
      
      {discountText && (
        <div className="absolute top-4 left-4 bg-red-600/90 text-white font-bold text-[10px] px-3 py-1.5 rounded-md uppercase tracking-wider z-10 shadow-sm">
          {discountText}
        </div>
      )}

      {label && label.toLowerCase() !== 'international' && !discountText && (
        <div className="absolute top-4 left-4 bg-primary text-white font-bold text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-wider z-10">
          {label}
        </div>
      )}

      <div className="relative z-10 p-4 md:p-5 w-full flex flex-col gap-3 mt-auto">
        <div className="flex flex-row items-end justify-between gap-x-2 w-full mb-1">
          <h3 className="text-white text-[24px] md:text-[28px] font-extrabold leading-[1.1] drop-shadow-md break-words shrink">{tripTitle}</h3>
          
          <div className="flex flex-col items-end shrink-0">
            {displayOriginalPrice && (
              <span className="text-gray-300 text-[12px] line-through font-medium drop-shadow-sm leading-none mb-1">
                {displayOriginalPrice}
              </span>
            )}
            <span className="text-white font-bold text-[16px] md:text-[20px] drop-shadow-md whitespace-nowrap leading-none">
              {displayPrice}
            </span>
          </div>
        </div>
        
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
      </div>
    </Link>
  )
}

export default PackageCard
