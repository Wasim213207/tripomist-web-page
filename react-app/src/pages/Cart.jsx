import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-on-surface mb-8">Your Cart</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-6 flex flex-col gap-6">
          
          {/* Example Cart Item */}
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400">landscape</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface">Spiti Valley Expedition</h3>
                <p className="text-sm text-on-surface-variant">1 x Group Trip</p>
              </div>
            </div>
            <div className="font-bold text-lg text-on-surface">
              ₹25,000
            </div>
          </div>
          
          {/* Bill Summary */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span>₹25,000</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Taxes (5%)</span>
              <span>₹1,250</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-primary border-t border-outline-variant/30 pt-4 mt-2">
              <span>Total Bill</span>
              <span>₹26,250</span>
            </div>
          </div>
          
          {/* Pay Button */}
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full mt-6 bg-primary hover:bg-primary/95 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer border-none"
          >
            <span className="material-symbols-outlined">payments</span>
            Proceed to Pay
          </button>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Cart;
