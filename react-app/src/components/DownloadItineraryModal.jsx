import React, { useState } from 'react'

function DownloadItineraryModal({ isOpen, onClose, tripTitle }) {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [callback, setCallback] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Itinerary download requested: Name=${name}, Phone=${phone}, Trip=${tripTitle}, Callback=${callback}`)
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setName('')
    setPhone('')
    setCallback(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-md" onClick={handleClose}></div>
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-[1.5rem] shadow-xl overflow-hidden z-10">
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-0">
          <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight font-bold text-2xl">Download Itinerary</h2>
          <button className="text-error hover:scale-110 transition-transform cursor-pointer" onClick={handleClose}>
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
          </button>
        </div>
        
        {!submitted ? (
          /* Form Content */
          <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant ml-1 text-xs">Full Name *</label>
              <input 
                required 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-body-md focus:ring-2 focus:ring-primary outline-none" 
                placeholder="Your Name" 
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-on-surface-variant ml-1 text-xs">ISD Code</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-body-md text-center" 
                  readOnly 
                  type="text" 
                  value="+91" 
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="font-label-sm text-on-surface-variant ml-1 text-xs">Phone Number (WhatsApp) *</label>
                <input 
                  required 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-body-md focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="98765 43210" 
                />
              </div>
            </div>
            <div className="flex items-center gap-3 py-2">
              <input 
                id="callback-checkbox" 
                type="checkbox" 
                checked={callback}
                onChange={(e) => setCallback(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" 
              />
              <label className="font-body-md text-on-surface cursor-pointer text-sm" htmlFor="callback-checkbox">Expecting a callback?</label>
            </div>
            <button className="w-full bg-primary hover:opacity-95 text-on-primary font-headline-md py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all mt-2 cursor-pointer font-bold" type="submit">Submit</button>
          </form>
        ) : (
          /* Success Content */
          <div className="p-8 text-center flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-6xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-xl">Download Started!</h3>
            <p className="text-on-surface-variant text-sm mb-4">We have sent the PDF itinerary for <strong>{tripTitle}</strong> to your WhatsApp number. Our Kaptain will contact you shortly.</p>
            <button className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary/95 transition-colors cursor-pointer" onClick={handleClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DownloadItineraryModal
