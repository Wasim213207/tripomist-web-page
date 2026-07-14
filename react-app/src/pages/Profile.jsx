import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase, safeStorage } from '../utils/supabaseClient'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Edit States
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editDob, setEditDob] = useState('')
  const [editGender, setEditGender] = useState('')
  const [editAddress, setEditAddress] = useState('')
  
  const [updateMessage, setUpdateMessage] = useState('')
  const [updateError, setUpdateError] = useState('')
  const [updating, setUpdating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate('/login')
      } else {
        setUser(user)
        setEditName(user.user_metadata?.full_name || '')
        setEditEmail(user.email || '')
        setEditPhone(user.user_metadata?.phone || '')
        setEditDob(user.user_metadata?.dob || '')
        setEditGender(user.user_metadata?.gender || '')
        setEditAddress(user.user_metadata?.address || '')
      }
      setLoading(false)
    })
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setUpdateMessage('')
    setUpdateError('')

    if (supabase.isMock) {
      // Mock flow
      const updatedUser = {
        ...user,
        email: editEmail,
        user_metadata: {
          ...user.user_metadata,
          full_name: editName,
          phone: editPhone,
          dob: editDob,
          gender: editGender,
          address: editAddress
        }
      }
      safeStorage.setItem('mock_current_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setUpdateMessage('Profile updated successfully!')
      setIsEditing(false)
      window.dispatchEvent(new Event('auth-state-change'))
    } else {
      // Supabase flow
      try {
        const { data, error } = await supabase.auth.updateUser({
          email: editEmail,
          data: { 
            full_name: editName,
            phone: editPhone,
            dob: editDob,
            gender: editGender,
            address: editAddress
          }
        })

        if (error) {
          setUpdateError(error.message)
        } else {
          setUpdateMessage('Profile updated successfully!')
          safeStorage.setItem('mock_current_user', JSON.stringify(data.user))
          setUser(data.user)
          setIsEditing(false)
          window.dispatchEvent(new Event('auth-state-change'))
        }
      } catch (err) {
        setUpdateError('An unexpected error occurred.')
      }
    }
    setUpdating(false)
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setUpdateMessage('')
    }, 3000)
  }

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-white min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-[#136b8a] animate-spin">hourglass_empty</span>
          <span className="font-semibold text-gray-600">Loading your profile...</span>
        </div>
      </div>
    )
  }

  if (!user) return null

  const displayName = user.user_metadata?.full_name || user.email.split('@')[0]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-8 py-12">
        {updateMessage && (
          <div className="mb-6 p-4 text-sm rounded-xl text-center font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
            {updateMessage}
          </div>
        )}
        {updateError && (
          <div className="mb-6 p-4 text-sm rounded-xl text-center font-semibold bg-red-50 text-red-600 border border-red-100">
            {updateError}
          </div>
        )}

        {/* Profile Container */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20 mb-16">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-6 hidden md:block">Your Profile</h2>
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#4a90e2] text-white flex items-center justify-center overflow-hidden shadow-md">
                <span className="material-symbols-outlined text-[60px] md:text-[80px] mt-4 opacity-90">person</span>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] md:text-[18px] text-gray-600">edit</span>
              </button>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-4 flex items-center gap-2">
              Hi {displayName.split(' ')[0]} 🙋🏻‍♂️
            </h3>
          </div>

          {/* Personal Info Section */}
          <div className="w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Personal Info</h2>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-[#136b8a] hover:bg-[#0f556e] text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Update
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <input required value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#136b8a] focus:ring-1 focus:ring-[#136b8a]" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                    <input required value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#136b8a] focus:ring-1 focus:ring-[#136b8a]" type="tel" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Birthday</label>
                    <input value={editDob} onChange={(e) => setEditDob(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#136b8a] focus:ring-1 focus:ring-[#136b8a]" type="date" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                    <input required value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#136b8a] focus:ring-1 focus:ring-[#136b8a]" type="email" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gender</label>
                    <select value={editGender} onChange={(e) => setEditGender(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#136b8a] focus:ring-1 focus:ring-[#136b8a]">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                    <input value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#136b8a] focus:ring-1 focus:ring-[#136b8a]" type="text" placeholder="City, State" />
                  </div>
                </div>
                <button type="submit" disabled={updating} className="w-full bg-[#136b8a] hover:bg-[#0f556e] text-white font-bold py-3 rounded-xl transition-colors mt-4 disabled:opacity-50">
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🖊️</span>
                  <span className="text-gray-700 font-medium">{user.user_metadata?.full_name || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📱</span>
                  <span className="text-gray-700 font-medium">{user.user_metadata?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎂</span>
                  <span className="text-gray-700 font-medium">{user.user_metadata?.dob || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📬</span>
                  <span className="text-gray-700 font-medium">{user.email || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">👨</span>
                  <span className="text-gray-700 font-medium capitalize">{user.user_metadata?.gender || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏠</span>
                  <span className="text-gray-700 font-medium">{user.user_metadata?.address || 'Not provided'}</span>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-start">
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 underline font-medium transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="w-full rounded-2xl overflow-hidden relative shadow-lg cursor-pointer group mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80" 
            alt="Paris" 
            className="w-full h-[200px] md:h-[250px] object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-center p-8 md:p-12">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-white text-sm">flight</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
              International New Year Trips
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-6">
              at Jaw-Dropping Prices!
            </h3>
            <p className="text-white/90 font-medium text-sm md:text-base">
              You'll Book Before Midnight!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Profile
