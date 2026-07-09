import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function GroupTrips() {
  const location = useLocation()
  const [searchVal, setSearchVal] = useState('')
  const [activeStyle, setActiveStyle] = useState('All')
  const [durationFilter, setDurationFilter] = useState('All')
  const [maxPrice, setMaxPrice] = useState(30000)
  const [favoritesFilter, setFavoritesFilter] = useState(false)

  // Local state array for list items containing favorites tracking
  const [tripsList, setTripsList] = useState([
    {
      id: "ladakh-expedition",
      name: "Ladakh Expedition",
      style: "Mountains",
      duration: 7,
      durationText: "6N/7D",
      price: 21999,
      isFav: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE6p_UF0GujYyL7QDuZtoqzEShR-1wG1cgQi_O9hq38FgS581MFo2tgdKmqcWlbrQv9BdUpqpfR3vThFmanWNkaQRl4F0B3TKW2esN658tI0CjH-96Uh4B0SFJGOihOlNRXGuNeTj7DuNQKJh7n4WL1N1nlIj9od50ycbUf85JmEIJnOVNdc--S1p5-ZvcYwdCh35eyB9Y9_0MF0m9e0LoIC9-kWldVdViKnfzZc-H1YQF1JrBHOfUx0TWmgKVKuqtnJQv7mNresai"
    },
    {
      id: "andaman-escape",
      name: "Andaman Escape",
      style: "Beaches",
      duration: 5,
      durationText: "4N/5D",
      price: 18500,
      isFav: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0y5u9i_7N2laNOZIxv71RdSK5FT0jAp-uHjMwYERiu8PA0f5ZIXZzTW4mDV5pXzsldIlhzXyCWnP5ZeVmWrNzZA04wZjrXsqBFScmOmKAtCHvpCFb6K2d2clvgPz9CbpDVnYeY-R0F5Gqy6VwxCes6qYo50J7xDRpzrnraZxMnW3TIp8XWLoxy3IC28IqbylRrXiPfjUP5lIgNX_7uh3ALSCif0KIatU2BLPP981PAZcWg9SUt4geKFkNwyapsLwVn2kD17gLKID1"
    },
    {
      id: "munnar-retreat",
      name: "Munnar Retreat",
      style: "Weekend",
      duration: 3,
      durationText: "2N/3D",
      price: 8999,
      isFav: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCCXUB1XgJi4Y3t-H0p0t5UTLh_BxmzWOe6kQ6O9c_bPnXHeOmV57Psr-R7D3VlYAEeSb8-WFp0w8bVahRCvNnzR2fMlppIEo7n0DZjWXwlGY4PaWsr7zS4rmU4g64wR4hqvvoWbTudriJszYf-C0CCmsgcHn_H5FaXFQ99Nj5-WPugNDzqKW8Tyc3KXyhxW4yhLBrEIf1V8Xo3VDkqA1VgXMiL06W0aDWctLY1-4qYXNgXr9KN6giLlLXGStqXDvP6KxWiRvJVC4J"
    },
    {
      id: "spiti-valley-expedition",
      name: "Spiti Valley Expedition",
      style: "Mountains",
      duration: 6,
      durationText: "5N/6D",
      price: 24999,
      isFav: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiD2GO7fIb1ciUdWe0odOedfkhJIm1ur64B1iKghZ8eMdF66RoOvQDTrZz1L1nfURfVdMroAzsjyFtv85EjcF8NXBkccIFhdalQolBp9Yar92MT8MtrG9wQGjuK5B7wctNIUhR54TEU7PYNv323Svs0dPfNfV6sfFdjHZinMcri0e9lDmEaHhHTP1F5YA25LoETYvVR1Dnn-8UNP4ShswwHgnmwn3Pw1YqRx1ECDm16ijYYriT-jcGpT9--pyJ_OQkKTc7lwXlnByS"
    },
    {
      id: "rishikesh-retreat",
      name: "Rishikesh Retreat",
      style: "Weekend",
      duration: 2,
      durationText: "1N/2D",
      price: 5499,
      isFav: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdeK5rNXK2i1b9n6OjyVoqm3Bxp8LEe74ptA6ncV2vP0x3Mi3B8HxlbdKEmQm91XCHfRR1kMKAQPDSbdqUrKDW4JM3xypx1fRMk3V2CB8LGMsnDVcKS_UZfnZcEYkmv5SROPXh2Y_cNDIOvWufVrH-JjvgMbmJ5A7_AgOyZUaA-BJA08GG7r2s0bw9GaqDO4QlU2W62kMiK6U1woPfrvgioGY_Glgx-Ig1A4Io0qyEemYXHUM9K9ujeQRoKgUEMoYyknVTGzgYBeRs"
    },
    {
      id: "jaipur-heritage",
      name: "Jaipur Heritage",
      style: "Weekend",
      duration: 3,
      durationText: "2N/3D",
      price: 6200,
      isFav: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwnZMqN75wiCGdYCe57bjOJqnQL8ixU9e0QsmbQNBMgQzcZ2tX7BX4tDAqoU8FUgUqp1QPoAzbFcQOY9cjylZmNqpl5HPNriyb50-N7uufQaF7nEz0ciYQP-JVZh7E3rmaaaAtn1HmSbpnGnuSdDky0eOIAvJ7SS5YCQ1I-SURRXNSHrCdOdyeLAeYoMGSKuIszmp7kQygPsJ19kxjBKCrAAjCB-nASur3eTy47RWuE18brwHmoxgNO2fM_WsfO8iaSUnvytThry-"
    }
  ])

  // Parse query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchParam = urlParams.get('search') || urlParams.get('dest')
    if (searchParam) setSearchVal(searchParam)

    const styleParam = urlParams.get('style')
    if (styleParam) setActiveStyle(styleParam)

    const favParam = urlParams.get('favorites')
    if (favParam === 'true') setFavoritesFilter(true)
  }, [location])

  const toggleFavorite = (id) => {
    setTripsList(prev => prev.map(t => t.id === id ? { ...t, isFav: !t.isFav } : t))
  }

  const handleReset = () => {
    setSearchVal('')
    setActiveStyle('All')
    setDurationFilter('All')
    setMaxPrice(30000)
    setFavoritesFilter(false)
  }

  const filteredTrips = tripsList.filter(trip => {
    const nameLower = trip.name.toLowerCase()
    const queryLower = searchVal.toLowerCase().trim()
    
    if (queryLower && !nameLower.includes(queryLower)) return false
    if (trip.price > maxPrice) return false
    if (activeStyle !== 'All' && trip.style !== activeStyle) return false
    if (favoritesFilter && !trip.isFav) return false

    if (durationFilter !== 'All') {
      if (durationFilter === '1-3' && (trip.duration < 1 || trip.duration > 3)) return false
      if (durationFilter === '4-6' && (trip.duration < 4 || trip.duration > 6)) return false
      if (durationFilter === '7' && trip.duration < 7) return false
    }

    return true
  })

  return (
    <div className="text-on-background bg-background font-body-md text-body-md antialiased min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-lg flex flex-col md:flex-row gap-lg">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <div className="glass-card rounded-xl p-6 sticky top-24 shadow-sm border border-outline-variant/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-lg">Filters</h2>
              <button onClick={handleReset} className="text-xs text-primary hover:underline font-semibold cursor-pointer">Reset All</button>
            </div>
            
            {/* Destination Search */}
            <div className="mb-6">
              <label className="block font-body-md text-body-md font-semibold text-on-surface-variant mb-2">Destination</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                <input 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-primary focus:border-primary text-body-md font-body-md outline-none" 
                  placeholder="Search destination..." 
                  type="text" 
                />
              </div>
            </div>
            
            {/* Travel Style Buttons */}
            <div className="mb-6">
              <label className="block font-body-md text-body-md font-semibold text-on-surface-variant mb-2">Travel Style</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Mountains', 'Beaches', 'Weekend'].map(style => (
                  <button 
                    key={style}
                    onClick={() => setActiveStyle(style)} 
                    className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-colors border cursor-pointer font-bold ${activeStyle === style ? 'bg-primary text-on-primary border-transparent' : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant border-outline-variant/30'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Duration Radios */}
            <div className="mb-6">
              <label className="block font-body-md text-body-md font-semibold text-on-surface-variant mb-2">Duration</label>
              <div className="space-y-2">
                {[
                  { label: 'Any Duration', value: 'All' },
                  { label: '1-3 Days', value: '1-3' },
                  { label: '4-6 Days', value: '4-6' },
                  { label: '7+ Days', value: '7' }
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      checked={durationFilter === opt.value}
                      onChange={() => setDurationFilter(opt.value)}
                      className="text-primary focus:ring-primary" 
                      name="duration" 
                      type="radio" 
                    />
                    <span className="font-body-md text-body-md text-on-surface">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Slider */}
            <div>
              <label className="block font-body-md text-body-md font-semibold text-on-surface-variant mb-2 flex justify-between">
                <span>Price Limit</span>
                <span className="text-primary font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
              </label>
              <input 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-primary cursor-pointer" 
                max="30000" 
                min="3000" 
                type="range" 
              />
              <div className="flex justify-between mt-2 font-label-sm text-label-sm text-outline">
                <span>₹3,000</span>
                <span>₹30,000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Search Results Grid */}
        <section className="flex-grow">
          {/* Header area for results */}
          <div className="mb-8">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2 font-bold leading-tight">Upcoming Departures</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Showing {filteredTrips.length} results</p>
            {favoritesFilter && (
              <button onClick={() => setFavoritesFilter(false)} className="mt-2 text-xs text-red-500 bg-red-50 hover:bg-red-100 transition-colors px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">close</span> Favorites Only Filter Enabled
              </button>
            )}
          </div>
          
          {/* Trips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <div key={trip.id} className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 hover:shadow-lg transition-all duration-300 group flex flex-col h-full trip-card hover:-translate-y-2 transform">
                <div className="relative h-48 w-full overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={trip.name} src={trip.img} />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-md font-label-sm text-label-sm shadow-sm backdrop-blur-md bg-opacity-90 font-bold ${trip.style === 'Beaches' ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary text-on-primary'}`}>
                    {trip.style}
                  </div>
                  <button 
                    onClick={() => toggleFavorite(trip.id)}
                    className={`absolute top-3 right-3 p-1.5 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full hover:text-red-500 transition-colors cursor-pointer ${trip.isFav ? 'text-red-500' : 'text-on-surface'}`}
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: trip.isFav ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                  </button>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold group-hover:text-primary transition-colors text-base md:text-lg">{trip.name}</h3>
                  <div className="flex items-center gap-1 text-on-surface-variant mb-4 mt-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-body-md text-body-md text-sm">{trip.durationText}</span>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-outline-variant/10">
                    <div>
                      <span className="block font-label-sm text-label-sm text-outline uppercase tracking-wider text-[10px]">Starting from</span>
                      <span className="font-headline-md text-headline-md text-primary font-bold">₹{trip.price.toLocaleString('en-IN')}</span>
                    </div>
                    <Link to={`/checkout?trip=${encodeURIComponent(trip.name)}&price=${trip.price}`} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-body-md text-body-md font-semibold hover:bg-surface-tint transition-colors">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default GroupTrips
