import React, { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DownloadItineraryModal from '../components/DownloadItineraryModal'

function ItinerarySpiti() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [activeAccordion, setActiveAccordion] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tripsData = {
    "Spiti Valley": {
      title: "Spiti Valley Expedition",
      location: "Himachal Pradesh, India",
      description: "Journey through the high-altitude desert of the Himalayas. Experience ancient monasteries, surreal landscapes, and the raw beauty of the middle land.",
      price: "₹24,999",
      numericPrice: 24999,
      duration: "6 Days, 5 Nights",
      difficulty: "Moderate",
      bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuD90IAq7vZq8BDXHDHO2wbzL_ex8lV1Rx8E662i7VSWQb4zypGKBmsG7uhaIPRdLLWkp6uc-e4vCjXwIvBAEvZj-EuJBS-kdRgGDEeqze2MhpFjLDuKPRqCSrMDKv_WE8A_T6J3Y99iGnSw7QojlYBiMiuo3_8tqx5OFJEUJv3FkuMYfE_d9wucTwrbX9SmRvMD_aZJUGsMx0E2plr1qroJgQiDOmYBdeIFXS5M3EWKPvl8AiWAKMyhFuhg5yCKkjcFEAEmd_OHiyD-31k",
      days: [
        {
          num: 1,
          title: "Arrival in Manali & Acclimatization",
          desc: "Arrive in the beautiful hill station of Manali. Spend the day acclimatizing to the altitude. We'll have a brief orientation session in the evening, followed by a welcome dinner with the group. Explore local cafes in Old Manali."
        },
        {
          num: 2,
          title: "Manali to Kaza via Atal Tunnel",
          desc: "Cross the engineering marvel, Atal Tunnel. Witness the dramatic change in landscape as we enter Lahaul Valley and proceed to Kaza. Drive offers stunning views of rugged mountains and Chandra River."
        },
        {
          num: 3,
          title: "Key Monastery & Kibber Village",
          desc: "Visit the iconic Key Monastery perched on a hilltop fortress. Later, drive to Kibber, one of the highest inhabited villages. Keep an eye out for Himalayan wildlife like the Snow Leopard."
        }
      ]
    },
    "Ladakh": {
      title: "Ladakh Himalayan Expedition",
      location: "Ladakh, India",
      description: "Experience the ultimate land of high passes. Drive through Khardung La, camp alongside Pangong Lake, and explore the ancient culture of Leh.",
      price: "₹21,999",
      numericPrice: 21999,
      duration: "7 Days, 6 Nights",
      difficulty: "Hard",
      bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj_2vbbw_s3xz1DiSwdLIPB91UjIk6PDZxdsBnYm814_77Jzqvfd2kWMUeOvj3AEjF3S4r4H15YwByYU97r8Fu7ILdgtSJ7U5xniKZmkdCoaFd_qnmf7-3V7Arh2PPk6Q87ghzBZjDLQe2VR7QRLwWpmocIiBZeT0Jfr7z12eP6njmtr_SiXnTl4Xo5Kodp5oHyjSeZ-7Z8cS6quHT4VhEBpHASzD0tOUoSMVb_xNsQhzdUiwWoLW4I37lVfc5kAK_dtkYWb5NmnPq",
      days: [
        {
          num: 1,
          title: "Arrival in Leh & Rest",
          desc: "Fly into Leh airport. Transfer to hotel and complete absolute bed rest for acclimatization. In the evening, visit Shanti Stupa for a gorgeous sunset over Leh town."
        },
        {
          num: 2,
          title: "Leh Local Sightseeing & Confluence",
          desc: "Explore Leh Palace, Hall of Fame, and Magnetic Hill. Visit Sangam - the spectacular confluence of Indus and Zanskar rivers. Enjoy local Ladakhi cuisine."
        },
        {
          num: 3,
          title: "Leh to Nubra Valley via Khardung La",
          desc: "Drive across Khardung La, one of the highest motorable passes in the world. Descend into Nubra Valley, enjoy double-humped camel rides on cold desert sand dunes of Hunder."
        }
      ]
    },
    "Kashmir": {
      title: "Kashmir Valley Paradise",
      location: "Kashmir, India",
      description: "Explore the stunning meadows of Gulmarg, the golden valleys of Pahalgam, and float on a traditional Shikara along the serene Dal Lake.",
      price: "₹17,999",
      numericPrice: 17999,
      duration: "5 Days, 4 Nights",
      difficulty: "Easy",
      bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoZ_1M6Zk0HMDhTpKzxMQgQnTBWH9nJlDxVZ3z680TUyTZDm2k0r8nZLugA9SsMmSxZwBQNlP0RqL0o_pN3y8oodeLuZrAMK_BT5g3TtjjmMuq2qryknNF_eDajNtaJ0lhkNCoTDd0wvhRvqO6r6FQKYgQY2G1jrrxLxKfk3vfLTyv4stEcsTeJNnx4i_IeZlGcu5QAISZR2l1bfUnCU3NRglStiKpz8VEJh6Ac0yEugDurHd9RpWrIHVqOg_8q7TXhns1RLgQNPd3",
      days: [
        {
          num: 1,
          title: "Srinagar Arrival & Houseboat Stay",
          desc: "Arrive in Srinagar. Check into a beautiful traditional cedar wood Houseboat on Dal Lake. Enjoy a relaxing Shikara ride through floating markets during golden hour."
        },
        {
          num: 2,
          title: "Srinagar to Gulmarg Day Trip",
          desc: "Drive to Gulmarg, the meadow of flowers. Take the Gulmarg Gondola, one of the highest cable cars in Asia, up to the snow line. Play in snow and enjoy skiing options."
        },
        {
          num: 3,
          title: "Srinagar to Pahalgam Valley",
          desc: "Drive to Pahalgam along saffron fields. Explore Aru Valley and Betaab Valley. Walk along the crystal clear waters of Lidder River before a warm bonfire dinner."
        }
      ]
    }
  }

  // Determine active itinerary
  let currentKey = "Spiti Valley"
  if (id) {
    if (id.toLowerCase().includes("ladakh")) currentKey = "Ladakh"
    else if (id.toLowerCase().includes("kashmir")) currentKey = "Kashmir"
  }

  const trip = tripsData[currentKey] || tripsData["Spiti Valley"]

  const handleBookNow = () => {
    navigate(`/checkout?trip=${encodeURIComponent(trip.title)}&price=${trip.numericPrice}`)
  }

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="w-full">
        {/* Hero Section */}
        <div className="relative w-full h-[512px] md:h-[614px] lg:h-[650px] bg-surface-container-high overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center w-full h-full transform scale-100 transition-all duration-1000" style={{ backgroundImage: `url('${trip.bg}')` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-4 md:px-8 pb-lg flex flex-col justify-end">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full w-fit mb-4 border border-white/50 shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
              <span className="font-label-sm text-primary uppercase tracking-wider font-bold text-xs">{trip.location}</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2 font-bold drop-shadow-sm">{trip.title}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{trip.description}</p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
          
          {/* Left Column: Itinerary Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-xl">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              <div className="glass-card p-5 rounded-[1.25rem] flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2" style={{ fontVariationSettings: "'wght' 300" }}>calendar_clock</span>
                <span className="font-label-sm text-outline uppercase text-[10px] mb-1 font-bold">Duration</span>
                <span className="font-body-md font-bold text-on-surface">{trip.duration}</span>
              </div>
              <div className="glass-card p-5 rounded-[1.25rem] flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2" style={{ fontVariationSettings: "'wght' 300" }}>groups</span>
                <span className="font-label-sm text-outline uppercase text-[10px] mb-1 font-bold">Group Size</span>
                <span className="font-body-md font-bold text-on-surface">12-15 Explorers</span>
              </div>
              <div className="glass-card p-5 rounded-[1.25rem] flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2" style={{ fontVariationSettings: "'wght' 300" }}>terrain</span>
                <span className="font-label-sm text-outline uppercase text-[10px] mb-1 font-bold">Difficulty</span>
                <span className="font-body-md font-bold text-on-surface">{trip.difficulty}</span>
              </div>
              <div className="glass-card p-5 rounded-[1.25rem] flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2" style={{ fontVariationSettings: "'wght' 300" }}>star</span>
                <span className="font-label-sm text-outline uppercase text-[10px] mb-1 font-bold">Rating</span>
                <span className="font-body-md font-bold text-on-surface flex items-center gap-1">4.9 <span className="text-xs text-on-surface-variant font-normal">(120+)</span></span>
              </div>
            </div>

            {/* Itinerary */}
            <section>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 flex items-center gap-3 font-bold">
                <span className="material-symbols-outlined text-primary-container text-[28px]">route</span>
                The Itinerary
              </h2>
              
              <div className="flex flex-col gap-6">
                {trip.days.map((day, idx) => (
                  <div key={day.num} className="glass-card rounded-[1.25rem] overflow-hidden group">
                    <button 
                      onClick={() => toggleAccordion(idx)}
                      className="w-full px-6 py-5 flex items-center justify-between bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary/20 accordion-btn cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-surface-container-low text-primary font-label-sm px-3 py-1.5 rounded-md uppercase tracking-wide border border-outline-variant/20 font-bold">Day {day.num}</div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-lg md:text-xl">{day.title}</h3>
                      </div>
                      <span 
                        className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors transform duration-300 icon-expand"
                        style={{ transform: activeAccordion === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </button>
                    {activeAccordion === idx && (
                      <div className="px-6 pb-6 pt-2 accordion-content text-on-surface-variant font-body-md leading-relaxed border-t border-outline-variant/10">
                        <p>{day.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-[100px] bg-white rounded-[1.5rem] border border-outline-variant/30 p-lg shadow-sm glass-reveal">
              <div className="mb-6 pb-6 border-b border-outline-variant/20 mb-8">
                <span className="font-label-sm text-outline uppercase tracking-wider block mb-2 font-bold text-[10px]">Starting from</span>
                <div className="flex items-end gap-2">
                  <span className="font-display-lg text-display-lg text-primary leading-none font-bold">{trip.price}</span>
                  <span className="font-body-md text-on-surface-variant pb-1 text-sm">/ person</span>
                </div>
                <p className="font-label-sm text-tertiary mt-2 flex items-center gap-1 text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Prices inclusive of all taxes
                </p>
              </div>
              
              <button 
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-primary to-primary-container hover:opacity-95 text-on-primary font-headline-md text-headline-md py-4 rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer font-bold"
              >
                Book Now
              </button>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 mt-4 text-primary font-semibold hover:text-secondary transition-colors py-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Download Itinerary</span>
              </button>
              <p className="text-center font-label-sm text-outline mt-4 text-[11px]">
                Secure checkout • Free cancellation up to 30 days
              </p>
            </div>
          </div>
        </div>
      </main>

      <DownloadItineraryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tripTitle={trip.title}
      />

      <Footer />
    </div>
  )
}

export default ItinerarySpiti
