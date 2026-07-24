import React, { useState, useEffect } from 'react'
import ReadMoreText from '../components/ReadMoreText'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DestinationSearch from '../components/DestinationSearch'
import Footer from '../components/Footer'
import PackageCard from '../components/PackageCard'

function Domestic() {
  const location = useLocation()
  const [activeStyle, setActiveStyle] = useState('All')
  const [favoritesFilter, setFavoritesFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [tripsList, setTripsList] = useState([
    {
      id: "uttarakhand-explorer",
      name: "Valley of Flowers Trek",
      location: "Uttarakhand",
      style: "Mountains",
      durationText: "5N/6D",
      price: 15999,
      isFav: false,
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
    },
    {
      id: "himachal-adventure",
      name: "Manali to Rohtang Pass",
      location: "Himachal",
      style: "Mountains",
      durationText: "4N/5D",
      price: 12499,
      isFav: false,
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80"
    },
    {
      id: "kashmir-paradise",
      name: "Kashmir Valley Paradise",
      location: "Kashmir",
      style: "Mountains",
      durationText: "5N/6D",
      price: 18999,
      isFav: false,
      img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80"
    },
    {
      id: "rajasthan-royal",
      name: "Jaipur & Udaipur Heritage",
      location: "Rajasthan",
      style: "Weekend",
      durationText: "3N/4D",
      price: 14999,
      isFav: false,
      img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80"
    },
    {
      id: "meghalaya-monsoon",
      name: "Cherrapunji & Shillong",
      location: "Meghalaya",
      style: "Mountains",
      durationText: "4N/5D",
      price: 17500,
      isFav: false,
      img: "https://images.unsplash.com/photo-1629211252194-2795f72da0bc?w=600&q=80"
    },
    {
      id: "ladakh-expedition",
      name: "Ladakh Himalayan Expedition",
      location: "Ladakh",
      style: "Mountains",
      durationText: "6N/7D",
      price: 21999,
      isFav: false,
      img: "https://images.unsplash.com/photo-1596500412806-0361280031dc?w=600&q=80"
    },
    {
      id: "spiti-valley-expedition",
      name: "Spiti Valley Roadtrip",
      location: "Spiti Valley",
      style: "Mountains",
      durationText: "7N/8D",
      price: 24999,
      isFav: false,
      img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
    },
    {
      id: "andaman-escape",
      name: "Andaman Islands Escape",
      location: "Andaman",
      style: "Beaches",
      durationText: "5N/6D",
      price: 28500,
      isFav: false,
      img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
    }
  ])

  // Parse query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const styleParam = urlParams.get('style')
    if (styleParam) setActiveStyle(styleParam)

    const favParam = urlParams.get('favorites')
    if (favParam === 'true') setFavoritesFilter(true)

    const searchParam = urlParams.get('search') || urlParams.get('query')
    if (searchParam) setSearchQuery(searchParam)
  }, [location])

  const toggleFavorite = (id) => {
    setTripsList(prev => prev.map(t => t.id === id ? { ...t, isFav: !t.isFav } : t))
  }

  const filteredTrips = tripsList.filter(trip => {
    if (activeStyle !== 'All' && trip.style !== activeStyle) return false
    if (favoritesFilter && !trip.isFav) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      return trip.name.toLowerCase().includes(q) || trip.style.toLowerCase().includes(q) || (trip.location && trip.location.toLowerCase().includes(q))
    }
    return true
  })

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest">
      <Navbar />

      {/* Hero Video/Image Banner */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?w=1200&q=80"
          alt="Domestic trips"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center justify-end px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center tracking-tight">
            Domestic Tour Packages
          </h1>
        </div>

        
      </section>

      {/* About Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-12 pb-6">
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-4">
          About Domestic Tour Packages
        </h2>
        <ReadMoreText text="What if we say to you that there's a place wherein the clouds came down to greet the mountains, where rivers whisper the old secrets, and where time slows down just to make you able to take it all in? India is that magical place, waiting for you to explore its untouched beauty." />
        
        
      </section>

      {/* Grid Section */}
      <main className="max-w-6xl mx-auto px-4 pb-36 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <PackageCard destination={trip.destination} state={trip.state}  
              key={trip.id} 
              tripTitle={trip.name} 
              price={`₹${trip.price.toLocaleString('en-IN')}`} 
              duration={trip.durationText} 
              bg={trip.img} 
              link={`/itinerary/${trip.name.toLowerCase().replace(/\s+/g, '-')}`} 
              label={trip.style === 'Mountains' ? 'Popular' : ''} 
              badge="Coming Soon"
              blueText={true} 
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Domestic
