import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/group-trips?search=${encodeURIComponent(searchValue.trim())}`)
      setSearchValue('')
    }
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white/80 dark:bg-surface-dim/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 max-w-7xl mx-auto">
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          <Link className="font-headline-md text-headline-md font-bold tracking-tight text-primary flex items-center gap-2 hover:scale-95 duration-150 transition-transform" to="/">
            <img alt="TripoMist Logo" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf4iPOLD4TW-emcX7qi8W7qPZhFbm5OzAQitvDsMARyOfBuAo9ztt29roRULWmZnSZXWDU9C66-5CEUsII9ClNmyCllVfZSQsk_Zh8SNMinjoMc_fWjzIKKChJB0UTFRB6QTigHPgLb0E2DZsOlp_JhvJp0lXnbSsTzGVqfLBMNk-0_rDP3tmtkhWYAQN9_F1nRcn8PpFGemDTJHOLelhxsCRyeTqUu0-JvD0GzZAkXaVLereGaQFPqUxJgRLojmOnEGYfiVmgV8Js0WY" />
            TripoMist
          </Link>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-on-surface-variant opacity-30">search</span>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="bg-surface-container-low border-none rounded-full py-1.5 pl-12 pr-4 w-40 md:w-64 font-body-md text-sm focus:ring-2 focus:ring-primary/20 outline-none" 
              placeholder="Search trips..." 
              type="text" 
            />
          </div>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link className={`px-3 py-1 font-body-md text-body-md transition-colors ${isActive('/group-trips') ? 'text-primary font-semibold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`} to="/group-trips">Group Trips</Link>
          <Link className={`px-3 py-1 font-body-md text-body-md transition-colors ${isActive('/weekend-trips') ? 'text-primary font-semibold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`} to="/weekend-trips">Weekend Trips</Link>
          <Link className={`px-3 py-1 font-body-md text-body-md transition-colors ${isActive('/upcoming-trips') ? 'text-primary font-semibold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`} to="/upcoming-trips">Upcoming Trips</Link>
        </div>
        
        {/* Actions/Icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => alert('No new notifications')} className="text-on-surface-variant hover:text-primary transition-colors p-1" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link className="text-on-surface-variant hover:text-primary transition-colors p-1" to="/group-trips?favorites=true" aria-label="Favorites">
            <span className="material-symbols-outlined">favorite</span>
          </Link>
          <button className="md:hidden text-on-surface-variant p-1" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isOpen && (
        <div className="fixed top-[65px] left-0 w-full bg-white border-b border-outline-variant/30 shadow-lg z-40 md:hidden">
          <div className="flex flex-col p-6 gap-4">
            <Link className={`text-lg pb-1 border-b border-outline-variant/20 ${isActive('/group-trips') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} onClick={() => setIsOpen(false)} to="/group-trips">Group Trips</Link>
            <Link className={`text-lg pb-1 border-b border-outline-variant/20 ${isActive('/weekend-trips') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} onClick={() => setIsOpen(false)} to="/weekend-trips">Weekend Trips</Link>
            <Link className={`text-lg pb-1 border-b border-outline-variant/20 ${isActive('/upcoming-trips') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} onClick={() => setIsOpen(false)} to="/upcoming-trips">Upcoming Trips</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
