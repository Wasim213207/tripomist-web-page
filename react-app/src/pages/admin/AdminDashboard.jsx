import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  ArrowUpRight,
  Calendar,
  Layers,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    todayRevenue: 0,
    totalBookings: 0,
    todayBookings: 0,
    upcomingTrips: 0,
    pendingPayments: 0,
    confirmedBookings: 0,
    cancelledBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        
        // 1. Fetch bookings
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select('*');

        let totalRevenue = 0;
        let todayRevenue = 0;
        let todayBookings = 0;
        let upcomingTrips = 0;
        let pendingPayments = 0;
        let confirmedBookings = 0;
        let cancelledBookings = 0;

        if (bookingsData) {
          bookingsData.forEach(b => {
            const amount = Number(b.final_amount || b.total_amount || 0);
            const bookingDateStr = b.created_at ? b.created_at.split('T')[0] : '';
            const travelDateStr = b.travel_date || '';

            // Revenue calculation
            if (b.payment_status?.toLowerCase() === 'paid') {
              totalRevenue += amount;
              if (bookingDateStr === todayStr) {
                todayRevenue += amount;
              }
            }

            // Today's bookings
            if (bookingDateStr === todayStr) {
              todayBookings++;
            }

            // Upcoming Trips
            if (travelDateStr >= todayStr && b.booking_status?.toLowerCase() !== 'cancelled') {
              upcomingTrips++;
            }

            // Pending Payments
            if (b.payment_status?.toLowerCase() === 'pending') {
              pendingPayments++;
            }

            // Status counts
            if (b.booking_status?.toLowerCase() === 'confirmed') {
              confirmedBookings++;
            } else if (b.booking_status?.toLowerCase() === 'cancelled') {
              cancelledBookings++;
            }
          });

          // Sort and set recent
          const sorted = [...bookingsData]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);
          setRecentBookings(sorted);
        }

        setStats({
          totalRevenue,
          todayRevenue,
          totalBookings: bookingsData ? bookingsData.length : 0,
          todayBookings,
          upcomingTrips,
          pendingPayments,
          confirmedBookings,
          cancelledBookings
        });
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#136b8a]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#136b8a] to-teal-700 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 scale-150">
          <ShoppingBag size={250} />
        </div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-extrabold tracking-tight">Daily Operations Hub 👋</h1>
          <p className="text-teal-100 mt-2 text-sm leading-relaxed">
            Monitor real-time bookings, manage upcoming tour departures, and track payment transactions.
          </p>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
          <div className="space-y-2">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Sales (All Time)</span>
            <h3 className="text-3xl font-black text-gray-900">₹{stats.totalRevenue.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit">Paid Bookings</p>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <TrendingUp size={28} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
          <div className="space-y-2">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Today's Sales Revenue</span>
            <h3 className="text-3xl font-black text-[#136b8a]">₹{stats.todayRevenue.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">Today's Transactions</p>
          </div>
          <div className="p-4 bg-blue-50 text-[#136b8a] rounded-2xl">
            <Clock size={28} />
          </div>
        </div>
      </div>

      {/* Daily Operations stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Today's Bookings", val: stats.todayBookings, color: "text-[#136b8a] bg-slate-50 border-slate-100" },
          { label: "Upcoming Trips", val: stats.upcomingTrips, color: "text-indigo-600 bg-indigo-50/50 border-indigo-100" },
          { label: "Pending Payments", val: stats.pendingPayments, color: "text-amber-600 bg-amber-50/50 border-amber-100" },
          { label: "Confirmed Bookings", val: stats.confirmedBookings, color: "text-emerald-600 bg-emerald-50/50 border-emerald-100" },
          { label: "Cancelled Bookings", val: stats.cancelledBookings, color: "text-rose-600 bg-rose-50/50 border-rose-100" },
          { label: "Total Invoiced", val: stats.totalBookings, color: "text-slate-700 bg-slate-100/50 border-slate-200" }
        ].map((s, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border text-center flex flex-col justify-center items-center shadow-sm ${s.color}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70 mb-1 leading-tight">{s.label}</span>
            <span className="text-2xl font-black">{s.val}</span>
          </div>
        ))}
      </div>

      {/* Recent activity detail list */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 text-lg">Live Activity Log</h3>
          <Link to="/admin/bookings" className="text-xs text-[#136b8a] font-bold hover:underline flex items-center gap-0.5">
            Manage Bookings <ArrowUpRight size={14} />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No bookings registered.
          </div>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((b, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm truncate">{b.customer_name}</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{b.package_title} • Travel: {b.travel_date}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-800 text-xs">₹{Number(b.final_amount || b.total_amount || 0).toLocaleString()}</span>
                  <div className={`text-[10px] font-bold capitalize mt-1 ${
                    b.booking_status?.toLowerCase() === 'confirmed' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>{b.booking_status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
