import React from 'react'
import { Link } from 'react-router-dom'

const PackageCard = ({ tripTitle, price, duration, bg, link, label, badge = 'Best Seller', className, blueText = false }) => {
  const displayPrice = blueText && typeof price === 'string' && !price.includes('/-') ? `${price}/-` : price;

  return (
    <Link 
      to={link} 
      draggable={false}
      className={`rounded-[28px] overflow-hidden group relative flex flex-col justify-end shadow-sm hover:shadow-xl transition-all duration-300 select-none block ${className || 'w-full h-[340px] md:h-[360px]'}`}
    >
      <div className="absolute inset-0 bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-700 pointer-events-none" style={{ backgroundImage: `url('${bg}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent h-[75%] mt-auto pointer-events-none"></div>
      
      {badge && (
        <div className="absolute top-4 right-4 bg-gray-500/80 backdrop-blur-md text-white font-bold text-[11px] px-4 py-1.5 rounded-full tracking-wider z-10">
          {badge}
        </div>
      )}
      
      {label && (
        <div className="absolute top-4 left-4 bg-primary text-white font-bold text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-wider z-10">
          {label}
        </div>
      )}

      <div className="relative z-10 p-4 md:p-5 w-full flex flex-col gap-3 mt-auto">
        <div className="flex justify-between items-end gap-2 w-full">
          <h3 className="text-white text-[22px] md:text-[26px] font-bold leading-tight drop-shadow-md">{tripTitle}</h3>
          <span className={`${blueText ? 'text-primary' : 'text-white'} font-bold text-[18px] md:text-[20px] drop-shadow-md leading-tight whitespace-nowrap`}>
            {displayPrice}
          </span>
        </div>
        
        <div className="flex items-center gap-2 w-full">
          <span className={`bg-white ${blueText ? 'text-primary' : 'text-black'} text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 shadow-sm`}>
            {duration}
          </span>
          <div className="relative overflow-hidden group/btn bg-white border border-primary rounded-full py-1.5 shadow-lg flex-1 transition-all cursor-pointer flex justify-center items-center">
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover/btn:w-full z-0"></div>
            <span className="relative z-10 text-primary group-hover/btn:text-white font-bold text-[11px] whitespace-nowrap transition-colors duration-300">
              View Detail
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PackageCard
