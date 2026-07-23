import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

export default function PromoStrip() {
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    fetchPromo();
  }, []);

  const fetchPromo = async () => {
    const { data, error } = await supabase
      .from('promo_strips')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .single();

    if (!error && data) {
      setPromo(data);
    }
  };

  if (!promo) return null;

  const content = (
    <div 
      className={`relative overflow-hidden bg-blue-600 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center w-full ${promo.is_clickable ? 'cursor-pointer hover:bg-blue-700 transition-colors' : ''}`}
    >
      <span className="relative z-10">{promo.text}</span>
      
      {/* Shine animation effect */}
      {promo.shine_enabled && (
        <div 
          className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 animate-shine"
          style={{ animationDuration: `${promo.animation_speed || 3}s` }}
        />
      )}
    </div>
  );

  if (promo.is_clickable && promo.link_url) {
    if (promo.link_url.startsWith('http')) {
      return (
        <a href={promo.link_url} target={promo.open_in_new_tab ? '_blank' : '_self'} rel="noopener noreferrer" className="block w-full">
          {content}
        </a>
      );
    } else {
      return (
        <Link to={promo.link_url} target={promo.open_in_new_tab ? '_blank' : '_self'} className="block w-full">
          {content}
        </Link>
      );
    }
  }

  return content;
}
