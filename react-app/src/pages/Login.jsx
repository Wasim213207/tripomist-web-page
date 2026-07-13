import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, safeStorage } from '../utils/supabaseClient'

function Login() {
  const [step, setStep] = useState(1) // 1: Phone, 2: OTP, 3: Profile
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  
  const navigate = useNavigate()

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    if (phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number.")
      return
    }
    setLoading(true)
    setErrorMsg('')
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false)
      setSuccessMsg("OTP sent successfully to " + phone)
      setStep(2)
    }, 800)
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    if (otp.length < 4) {
      setErrorMsg("Please enter the OTP.")
      return
    }
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    // Simulate verifying OTP
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 800)
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    // Mock Sign Up Flow
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: "+91 " + phone
        }
      }
    })

    if (error) {
      // If user exists, just log them in for this demo flow
      if (error.message.includes("already exists")) {
         const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
           email,
           password
         })
         if (signInError) {
           setErrorMsg(signInError.message)
         } else {
           setSuccessMsg("Welcome back! Redirecting...")
           safeStorage.setItem('mock_current_user', JSON.stringify(signInData.user || signInData))
           window.dispatchEvent(new Event('auth-state-change'))
           setTimeout(() => { navigate('/') }, 1200)
         }
      } else if (error.message.toLowerCase().includes("rate limit")) {
        setSuccessMsg("Rate limit reached. Mock logging you in...")
        const mockUser = {
          id: 'mock-user-' + Math.random().toString(36).substring(2, 11),
          email: email,
          user_metadata: { full_name: fullName, phone: "+91 " + phone }
        }
        safeStorage.setItem('mock_current_user', JSON.stringify(mockUser))
        window.dispatchEvent(new Event('auth-state-change'))
        setTimeout(() => { navigate('/') }, 1200)
      } else {
        setErrorMsg(error.message)
      }
    } else {
      setSuccessMsg("Profile completed! Logging you in...")
      safeStorage.setItem('mock_current_user', JSON.stringify(data.user || data))
      window.dispatchEvent(new Event('auth-state-change'))
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
    setLoading(false)
  }

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <div className="flex justify-center min-h-screen bg-[#f3f4f6] text-gray-900 font-sans p-4 relative">
      
      {/* Simple Back Button at Top Left */}
      <button 
        onClick={handleClose}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors bg-transparent border-none cursor-pointer"
      >
        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        <span className="font-semibold text-sm">Back</span>
      </button>

      <main className="w-full max-w-[400px] mt-16 md:mt-24 flex flex-col gap-6">
        
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {step === 1 && "Login"}
            {step === 2 && "Verification"}
            {step === 3 && "Complete Profile"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {step === 1 && "Enter your phone number to continue"}
            {step === 2 && "Enter the OTP sent to your phone"}
            {step === 3 && "Please fill in your details to finish"}
          </p>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-50 text-green-600 rounded-xl text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            {successMsg}
          </div>
        )}

        {/* Auth Forms depending on Step */}
        
        {/* STEP 1: Phone */}
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4 animate-fade-in">
            <div className="flex gap-2">
              <div className="flex items-center justify-center bg-white border border-gray-200 rounded-2xl px-4 text-sm font-semibold text-gray-500 shadow-sm">
                +91
              </div>
              <input
                required
                autoFocus
                type="tel"
                minLength={10}
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="flex-grow pl-4 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all"
                placeholder="Phone Number"
              />
            </div>
            <button
              disabled={loading || phone.length < 10}
              type="submit"
              className="w-full py-3.5 mt-2 rounded-2xl bg-gray-900 hover:bg-black text-white font-semibold text-base shadow-md transition-all cursor-pointer border-none flex justify-center items-center h-[52px] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 animate-fade-in">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">dialpad</span>
              <input
                required
                autoFocus
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all text-center tracking-widest text-lg font-bold"
                placeholder="0 0 0 0"
              />
            </div>
            <button
              disabled={loading || otp.length < 4}
              type="submit"
              className="w-full py-3.5 mt-2 rounded-2xl bg-gray-900 hover:bg-black text-white font-semibold text-base shadow-md transition-all cursor-pointer border-none flex justify-center items-center h-[52px] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify OTP"
              )}
            </button>
            <button type="button" onClick={() => setStep(1)} className="text-sm text-blue-600 font-semibold bg-transparent border-none cursor-pointer mt-2">
              Wrong phone number? Go back
            </button>
          </form>
        )}

        {/* STEP 3: Complete Profile */}
        {step === 3 && (
          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 animate-fade-in">
            {/* Full Name */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">person</span>
              <input
                required
                autoFocus
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all"
                placeholder="Full Name"
              />
            </div>
            {/* Email */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">alternate_email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all"
                placeholder="Email Address"
              />
            </div>
            {/* Password */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all"
                placeholder="Password (min 6 characters)"
                minLength={6}
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-md transition-all cursor-pointer border-none flex justify-center items-center h-[52px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Complete Profile & Login"
              )}
            </button>
          </form>
        )}

      </main>
    </div>
  )
}

export default Login
