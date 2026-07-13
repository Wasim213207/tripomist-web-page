import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import WeekendTrips from './pages/WeekendTrips'
import UpcomingTrips from './pages/UpcomingTrips'
import GroupTrips from './pages/GroupTrips'
import ItinerarySpiti from './pages/ItinerarySpiti'
import Checkout from './pages/Checkout'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsConditions from './pages/TermsConditions'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Uttarakhand from './pages/Uttarakhand'
import Himachal from './pages/Himachal'
import AboutUs from './pages/AboutUs'
import BottomDock from './components/BottomDock'
import Chatbot from './components/Chatbot'

// Create a component that forces layout re-render on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekend-trips" element={<WeekendTrips />} />
        <Route path="/upcoming-trips" element={<UpcomingTrips />} />
        <Route path="/group-trips" element={<GroupTrips />} />
        <Route path="/uttarakhand" element={<Uttarakhand />} />
        <Route path="/himachal" element={<Himachal />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/itinerary/:id" element={<ItinerarySpiti />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Global Chatbot */}
      <Chatbot isOpenExternal={chatOpen} onExternalClose={() => setChatOpen(false)} />

      {/* GooeyDock + AI pill */}
      <BottomDock 
        isChatOpen={chatOpen}
        onOpenChat={() => setChatOpen(true)} 
        onCloseChat={() => setChatOpen(false)} 
      />
    </>
  )
}

export default App
