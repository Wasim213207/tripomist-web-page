import React from 'react'
import { Link } from 'react-router-dom'

function ShippingPolicy() {
  return (
    <div className="bg-surface text-on-surface antialiased font-body-md min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link className="font-bold tracking-tight text-primary flex items-center gap-2 hover:opacity-95 text-[#006591]" to="/">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            Back to Home
          </Link>
          <span className="text-on-surface-variant font-bold text-sm tracking-widest uppercase text-xs md:text-sm text-[#3e4850]">TripoMist Shipping</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white border border-[#bec8d2]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#006591]"></div>
          
          <h1 className="text-3xl font-bold mb-2">Shipping & Delivery Policy</h1>
          <p className="text-xs text-[#3e4850] mb-8">Last Updated: July 9, 2026</p>

          <div className="space-y-6 text-[#3e4850] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-2">1. Digital Delivery of Services</h2>
              <p>TripoMist operates as a travel agency organizing group tours, custom expeditions, and weekend getaways. Therefore, we do not ship physical products to physical shipping addresses.</p>
              <p className="mt-2">All deliverables such as booking invoices, payment receipts, tour itineraries, trip tickets, hotel vouchers, and pre-trip information packs are delivered **digitally** via electronic communication channels.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-2">2. Delivery Timeframes</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Booking Receipt & Invoice:</strong> Immediately upon successful transaction, an automated payment receipt and booking confirmation email are dispatched to your registered email address.</li>
                <li><strong>Trip Information & WhatsApp Group Invite:</strong> Approximately <strong>48 hours</strong> prior to the scheduled departure time, your tour organizer (Kaptain) will send you the WhatsApp group invitation and coordination details to your WhatsApp number.</li>
                <li><strong>Hotel & Transport Vouchers:</strong> If custom bookings are made, they are delivered within <strong>24 to 48 hours</strong> from the completion of the payment verification.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-2">3. Delivery Failures & Inquiries</h2>
              <p>If you do not receive your digital confirmation within the specified timeframes, please check your Spam/Junk folder. You can also get in touch with us immediately for support:</p>
              <div className="bg-[#faf8ff] rounded-lg p-4 mt-2 border border-[#bec8d2]/30 text-on-surface">
                <strong>TripoMist Support Team</strong><br />
                Email: <a href="mailto:contact@tripomist.com" className="text-[#006591] hover:underline">contact@tripomist.com</a><br />
                Phone / WhatsApp: +91 9990802608
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#bec8d2]/30 py-6 text-center">
        <p className="text-sm text-[#3e4850]">© 2026 TripoMist. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default ShippingPolicy
