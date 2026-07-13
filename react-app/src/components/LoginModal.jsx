import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, safeStorage } from '../utils/supabaseClient';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        setErrorMsg("Invalid login credentials.");
      } else {
        setErrorMsg(error.message);
      }
    } else {
      safeStorage.setItem('mock_current_user', JSON.stringify(data.user || data));
      window.dispatchEvent(new Event('auth-state-change'));
      onClose(); // Close modal on success
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white text-gray-500 hover:text-gray-900 rounded-full shadow-md flex items-center justify-center cursor-pointer z-10 border border-gray-200"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Custom UI provided by user */}
            <div className="container" style={{
              borderRadius: '1px',
              padding: '50px 40px 20px 40px',
              boxSizing: 'border-box',
              fontFamily: 'sans-serif',
              color: '#737373',
              border: '1px solid rgb(219, 219, 219)',
              textAlign: 'center',
              background: 'white',
              maxWidth: '350px',
              width: '100%'
            }}>
              <div className="content">
                <i style={{ marginBottom: '41px', display: 'block' }}>
                  {/* Mock Instagram-like logo or TripoMist logo */}
                  <h2 style={{ color: '#00376b', fontSize: '28px', margin: 0, fontWeight: 'bold', fontFamily: 'serif' }}>TripoMist</h2>
                </i>

                <form className="content__form" style={{ display: 'flex', flexDirection: 'column', rowGap: '14px' }} onSubmit={handleLogin}>
                  <div className="content__inputs" style={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
                    <label style={{
                      border: '1px solid rgb(219, 219, 219)',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      minWidth: '268px',
                      height: '38px',
                      background: 'rgb(250, 250, 250)',
                      borderRadius: '3px'
                    }}>
                      <input 
                        required 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'inherit',
                          border: '0',
                          outline: 'none',
                          padding: email ? '14px 0 2px 8px' : '9px 8px 7px 8px',
                          textOverflow: 'ellipsis',
                          fontSize: email ? '12px' : '16px',
                          verticalAlign: 'middle',
                          transition: 'all 0.1s ease-out'
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        textOverflow: 'ellipsis',
                        transformOrigin: 'left',
                        fontSize: '12px',
                        left: '8px',
                        pointerEvents: 'none',
                        transition: 'transform ease-out .1s',
                        transform: email ? 'scale(0.833) translateY(-10px)' : 'none',
                        color: 'rgb(142, 142, 142)'
                      }}>Phone number, username, or email</span>
                    </label>

                    <label style={{
                      border: '1px solid rgb(219, 219, 219)',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      minWidth: '268px',
                      height: '38px',
                      background: 'rgb(250, 250, 250)',
                      borderRadius: '3px'
                    }}>
                      <input 
                        required 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'inherit',
                          border: '0',
                          outline: 'none',
                          padding: password ? '14px 0 2px 8px' : '9px 8px 7px 8px',
                          textOverflow: 'ellipsis',
                          fontSize: password ? '12px' : '16px',
                          verticalAlign: 'middle',
                          transition: 'all 0.1s ease-out'
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        textOverflow: 'ellipsis',
                        transformOrigin: 'left',
                        fontSize: '12px',
                        left: '8px',
                        pointerEvents: 'none',
                        transition: 'transform ease-out .1s',
                        transform: password ? 'scale(0.833) translateY(-10px)' : 'none',
                        color: 'rgb(142, 142, 142)'
                      }}>Password</span>
                    </label>
                  </div>

                  {errorMsg && <div className="text-red-500 text-xs text-left">{errorMsg}</div>}

                  <button 
                    disabled={loading}
                    type="submit"
                    style={{
                      background: loading ? 'rgb(119, 192, 246)' : 'rgb(0, 149, 246)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      padding: '7px 16px',
                      cursor: loading ? 'default' : 'pointer',
                      marginTop: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => { if(!loading) e.target.style.background = 'rgb(24, 119, 242)' }}
                    onMouseLeave={(e) => { if(!loading) e.target.style.background = 'rgb(0, 149, 246)' }}
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </button>
                </form>

                <div className="content__or-text" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textTransform: 'uppercase',
                  fontSize: '13px',
                  columnGap: '18px',
                  marginTop: '18px'
                }}>
                  <span style={{ display: 'block', width: '100%', height: '1px', backgroundColor: 'rgb(219, 219, 219)' }}></span>
                  <span style={{ color: 'rgb(142, 142, 142)', fontWeight: 'bold' }}>or</span>
                  <span style={{ display: 'block', width: '100%', height: '1px', backgroundColor: 'rgb(219, 219, 219)' }}></span>
                </div>

                <div className="content__forgot-buttons" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '28px',
                  rowGap: '21px'
                }}>
                  <button style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    columnGap: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#385185',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <span>
                      <svg viewBox="0 0 512 512" style={{ width: '16px', height: 'auto', fill: '#385185' }}>
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                      </svg>
                    </span>
                    Log in with Facebook
                  </button>
                  <button style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: '#00376b'
                  }}>Forgot password?</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
