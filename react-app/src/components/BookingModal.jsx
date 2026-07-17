import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, tripTitle, price, travellers, navigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: null,
    source: ''
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [step, setStep] = useState(1) // 1 for Form, 2 for OTP
  const [otp, setOtp] = useState('')

  if (!isOpen) {
    if (step === 2) setStep(1); // Reset when closed
    return null;
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev > new Date(today.getFullYear(), today.getMonth(), 1) || (prev.getMonth() === today.getMonth() && prev.getFullYear() === today.getFullYear())) {
      setCurrentMonth(prev);
    }
  };

  const handleDateSelect = (d) => {
    if (d >= today && d.getDay() === 5) { // Only Fridays
      setFormData({...formData, date: d});
      setIsCalendarOpen(false); // Close calendar on select
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date) return alert("Please select a date (Fridays only)");
    setStep(2); // Go to OTP step
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length < 4) return alert("Please enter valid OTP");
    // Pass data to payment page
    navigate(`/payment?trip=${encodeURIComponent(tripTitle)}&price=${price}&date=${formData.date.toISOString()}&name=${encodeURIComponent(formData.fullName)}`);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Trip</h2>
        {step === 1 ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#136b8a] outline-none text-gray-700" placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#136b8a] outline-none text-gray-700" placeholder="john@example.com" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone No (WhatsApp)</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-semibold">+91</span>
              <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-r-xl px-4 py-2.5 focus:ring-2 focus:ring-[#136b8a] outline-none text-gray-700" placeholder="9999999999" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Date</label>
            <div 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 cursor-pointer bg-white flex justify-between items-center text-gray-700 hover:border-[#136b8a] transition-colors"
            >
              <span>{formData.date ? formData.date.toLocaleDateString() : "Select Date"}</span>
              <span className="material-symbols-outlined text-gray-400">calendar_month</span>
            </div>

            {isCalendarOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 border border-gray-200 rounded-xl p-3 bg-white shadow-xl">
                <div className="flex justify-between items-center mb-2">
                  <button type="button" onClick={prevMonth} className="p-1 hover:bg-gray-200 rounded-full"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                  <span className="font-bold text-sm text-gray-700">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                  <button type="button" onClick={nextMonth} className="p-1 hover:bg-gray-200 rounded-full"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {days.map((d, idx) => {
                    if (!d) return <div key={idx} className="p-1"></div>;
                    const isPast = d < today;
                    const isFriday = d.getDay() === 5;
                    const isSelected = formData.date && d.getTime() === formData.date.getTime();
                    return (
                      <button 
                        key={idx}
                        type="button"
                        disabled={isPast || !isFriday}
                        onClick={() => handleDateSelect(d)}
                        className={`p-1.5 rounded-full flex items-center justify-center transition-colors ${isPast ? 'text-gray-300 cursor-not-allowed' : !isFriday ? 'text-gray-400 cursor-not-allowed' : isSelected ? 'bg-[#136b8a] text-white font-bold' : 'bg-blue-100 text-[#136b8a] hover:bg-blue-200 font-semibold cursor-pointer'}`}
                      >
                        {d.getDate()}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Where did you hear about us?</label>
            <select required value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#136b8a] outline-none bg-white text-gray-700">
              <option value="" className="text-gray-400">Select source</option>
              <option value="Facebook" className="text-gray-700">Facebook</option>
              <option value="Instagram" className="text-gray-700">Instagram</option>
              <option value="WhatsApp" className="text-gray-700">WhatsApp</option>
              <option value="Google" className="text-gray-700">Google</option>
              <option value="Friend and Family" className="text-gray-700">Friend and Family</option>
              <option value="I'm already travel with you" className="text-gray-700">I'm already travel with you</option>
              <option value="Other" className="text-gray-700">Other</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-[#136b8a] hover:bg-[#0f556e] text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-4">
            Proceed to Verify
          </button>
        </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6 py-4">
            <div className="text-center">
              <span className="material-symbols-outlined text-[48px] text-[#136b8a] mb-2">mark_email_read</span>
              <p className="text-gray-600 text-sm">We've sent an OTP to<br/><strong>+91 {formData.phone}</strong></p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Enter OTP</label>
              <input 
                required 
                type="text" 
                maxLength={4}
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                className="w-full text-center text-2xl tracking-[0.5em] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#136b8a] outline-none text-gray-700 font-bold" 
                placeholder="••••" 
              />
            </div>
            <button type="submit" className="w-full bg-[#136b8a] hover:bg-[#0f556e] text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]">
              Verify & Pay
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
// ------------------------------


export default BookingModal;
