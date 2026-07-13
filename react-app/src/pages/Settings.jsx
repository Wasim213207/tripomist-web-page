import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase, safeStorage } from '../utils/supabaseClient'

export default function Settings() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  
  // Form State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [currency, setCurrency] = useState('INR')
  const [notifications, setNotifications] = useState(true)

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const mockUserStr = safeStorage.getItem('mock_current_user')
      if (mockUserStr) {
        try {
          const parsedUser = JSON.parse(mockUserStr)
          setUser(parsedUser)
          setFullName(parsedUser.user_metadata?.full_name || '')
          setEmail(parsedUser.email || '')
          setPhone(parsedUser.user_metadata?.phone || '+91 ')
        } catch(e) {}
      } else {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          setFullName(session.user.user_metadata?.full_name || '')
          setEmail(session.user.email || '')
          setPhone(session.user.user_metadata?.phone || '+91 ')
        } else {
          // If not logged in, redirect to login
          navigate('/login')
        }
      }
    }
    checkUser()
  }, [navigate])

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMsg('')
    
    // Simulate API delay for saving preferences
    setTimeout(() => {
      // In a real app, we would update Supabase user metadata here
      const mockUserStr = safeStorage.getItem('mock_current_user')
      if (mockUserStr) {
        try {
          const parsedUser = JSON.parse(mockUserStr)
          parsedUser.user_metadata = {
            ...parsedUser.user_metadata,
            full_name: fullName,
            phone: phone,
          }
          safeStorage.setItem('mock_current_user', JSON.stringify(parsedUser))
          window.dispatchEvent(new Event('auth-state-change'))
        } catch(e) {}
      }
      
      setSuccessMsg('Settings saved successfully!')
      setLoading(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(''), 3000)
    }, 1000)
  }

  if (!user) return <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 mt-16 pb-36">
        <h1 className="text-3xl font-bold text-on-surface mb-8">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
              <div className="p-6 border-b border-outline-variant/20 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 mb-4 shadow-inner flex items-center justify-center text-white text-3xl font-bold">
                  {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <h3 className="font-bold text-lg text-on-surface text-center">{fullName || 'User'}</h3>
                <p className="text-on-surface-variant text-sm text-center truncate w-full">{email}</p>
              </div>
              <div className="p-2 flex flex-col gap-1">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-primary bg-primary/5 rounded-xl font-medium transition-colors">
                  <span className="material-symbols-outlined">person</span> Personal Info
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-on-surface hover:bg-surface-container-low rounded-xl font-medium transition-colors cursor-pointer border-none bg-transparent">
                  <span className="material-symbols-outlined">payments</span> Billing & Payments
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-on-surface hover:bg-surface-container-low rounded-xl font-medium transition-colors cursor-pointer border-none bg-transparent">
                  <span className="material-symbols-outlined">security</span> Security
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Settings Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/20 p-6 md:p-8">
              <h2 className="text-xl font-bold text-on-surface mb-6">Personal Information</h2>
              
              {successMsg && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  {successMsg}
                </div>
              )}
              
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-on-surface-variant">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-on-surface-variant">Email Address (Cannot be changed)</label>
                    <input 
                      type="email" 
                      value={email}
                      disabled
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 text-on-surface-variant/70 cursor-not-allowed"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-on-surface-variant">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <hr className="border-outline-variant/20 my-2" />
                
                <h2 className="text-xl font-bold text-on-surface mb-2 mt-2">Preferences</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-on-surface-variant">Preferred Currency</label>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto h-[46px]">
                    <input 
                      type="checkbox" 
                      id="notifications"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                    <label htmlFor="notifications" className="text-sm font-semibold text-on-surface cursor-pointer select-none">
                      Receive Trip Updates & Offers
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-primary hover:bg-[#004e72] text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 border-none cursor-pointer"
                  >
                    {loading ? (
                      <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> Saving...</>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
