import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { generatePDFVoucher } from '../../utils/pdfGenerator';
import { 
  X, Check, XCircle, Copy, Download, Search, 
  Calendar, CreditCard, ChevronLeft, ChevronRight, User, Package, Clock
} from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all'); // all | this | last | custom
  const [customMonth, setCustomMonth] = useState(''); // format YYYY-MM
  const [packageFilter, setPackageFilter] = useState('all');
  
  // Drawer state
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  useEffect(() => {
    fetchBookings();
  }, [monthFilter, customMonth]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });

      if (monthFilter !== 'all') {
        const now = new Date();
        let startDate, endDate;
        if (monthFilter === 'this') {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        } else if (monthFilter === 'last') {
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          endDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (monthFilter === 'custom' && customMonth) {
          const [year, month] = customMonth.split('-').map(Number);
          startDate = new Date(year, month - 1, 1);
          endDate = new Date(year, month, 1);
        }
        if (startDate && endDate) {
          query = query.gte('created_at', startDate.toISOString()).lt('created_at', endDate.toISOString());
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, field, newValue) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ [field]: newValue })
        .eq('id', id);
      if (error) throw error;

      setBookings(bookings.map(b => 
        b.id === id ? { ...b, [field]: newValue } : b
      ));
      
      if (selectedBooking?.id === id) {
        setSelectedBooking(prev => ({ ...prev, [field]: newValue }));
      }
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
      alert(`Failed to update ${field}.`);
    }
  };

  const handleQuickAction = async (booking, actionType) => {
    switch (actionType) {
      case 'confirm':
        await handleStatusUpdate(booking.id, 'booking_status', 'confirmed');
        break;
      case 'cancel':
        if (window.confirm('Are you sure you want to cancel this booking?')) {
          await handleStatusUpdate(booking.id, 'booking_status', 'cancelled');
        }
        break;
      case 'markPaid':
        await handleStatusUpdate(booking.id, 'payment_status', 'paid');
        break;
      case 'copyPhone':
        navigator.clipboard.writeText(booking.phone);
        alert('Phone number copied!');
        break;
      case 'copyEmail':
        navigator.clipboard.writeText(booking.email || '');
        alert('Email copied!');
        break;
      default:
        break;
    }
  };

  const exportToCSV = () => {
    if (filteredBookings.length === 0) return;
    const headers = ['Booking ID', 'Booking Date', 'Customer', 'Phone', 'Email', 'Package', 'Travel Date', 'Travellers', 'Amount', 'Payment Status', 'Booking Status', 'Razorpay ID'];
    const rows = filteredBookings.map(b => [
      b.booking_id,
      new Date(b.created_at).toLocaleDateString(),
      b.customer_name,
      b.phone,
      b.email || '',
      b.package_title,
      b.travel_date ? new Date(b.travel_date).toLocaleDateString() : '',
      b.travellers || 1,
      b.final_amount || b.total_amount || 0,
      b.payment_status,
      b.booking_status,
      b.razorpay_payment_id || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadVoucher = (booking) => {
    generatePDFVoucher(booking, 'download');
  };

  // Derive unique packages for filter
  const uniquePackages = Array.from(new Set(bookings.map(b => b.package_title))).filter(Boolean);

  // Filtering
  const filteredBookings = bookings.filter(b => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (b.booking_id?.toLowerCase() || '').includes(term) ||
      (b.customer_name?.toLowerCase() || '').includes(term) ||
      (b.phone || '').includes(term) ||
      (b.package_title?.toLowerCase() || '').includes(term) ||
      (b.destination?.toLowerCase() || '').includes(term);
      
    const matchesStatus = statusFilter === 'all' || b.booking_status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || b.payment_status === paymentFilter;
    const matchesPackage = packageFilter === 'all' || b.package_title === packageFilter;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesPackage;
  });

  // Pagination Logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'refunded': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 mt-1">Manage operations, confirm trips, and track payments.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-[#136b8a] text-white px-4 py-2 rounded-xl hover:bg-[#0f556e] transition-colors shadow-sm font-medium"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button 
            onClick={fetchBookings}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors shadow-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-bold">Error</h3>
            <p className="text-sm">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-700">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Filters Grid */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, name, phone, or package..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#136b8a] transition-all text-sm"
          />
        </div>
        
        <select 
          value={packageFilter}
          onChange={(e) => { setPackageFilter(e.target.value); setCurrentPage(1); }}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#136b8a] transition-all cursor-pointer text-sm"
        >
          <option value="all">All Packages</option>
          {uniquePackages.map((pkg, idx) => (
            <option key={idx} value={pkg}>{pkg}</option>
          ))}
        </select>

        <select 
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#136b8a] transition-all cursor-pointer text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        
        <select
          value={paymentFilter}
          onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#136b8a] transition-all cursor-pointer text-sm"
        >
          <option value="all">All Payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#136b8a]">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#136b8a] mb-4"></div>
             <p className="font-medium text-gray-500">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-lg font-bold text-gray-900 mb-1">No bookings found</h3>
            <p className="text-gray-500">We couldn't find any bookings matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Booking ID & Date</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Trip Details</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Booking Status</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider">Payment Status</th>
                  <th className="py-3 px-6 font-semibold text-gray-600 text-xs uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/70 transition-colors">
                    
                    <td className="py-3 px-6">
                      <div className="font-bold text-[#136b8a]">{booking.booking_id}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {new Date(booking.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </td>
 
                    <td className="py-3 px-6">
                      <div className="font-semibold text-gray-900">{booking.customer_name}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{booking.phone}</div>
                    </td>
 
                    <td className="py-3 px-6">
                      <div className="font-semibold text-gray-900 text-sm truncate max-w-[200px]" title={booking.package_title}>{booking.package_title}</div>
                      <div className="text-xs text-gray-600 mt-0.5 flex items-center gap-2">
                        <span>{new Date(booking.travel_date).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{booking.travellers} Pax</span>
                      </div>
                    </td>
 
                    <td className="py-3 px-6">
                      <select
                        value={booking.booking_status}
                        onChange={(e) => handleStatusUpdate(booking.id, 'booking_status', e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border appearance-none cursor-pointer outline-none ${getStatusColor(booking.booking_status)}`}
                      >
                        <option value="new">New</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
 
                    <td className="py-3 px-6">
                      <select
                        value={booking.payment_status}
                        onChange={(e) => handleStatusUpdate(booking.id, 'payment_status', e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border appearance-none cursor-pointer outline-none ${getPaymentStatusColor(booking.payment_status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="refunded">Refunded</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>
 
                    <td className="py-3 px-6 text-right">
                       <button 
                         onClick={() => setSelectedBooking(booking)}
                         className="text-[#136b8a] hover:bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-transparent hover:border-slate-200"
                       >
                         View Details
                       </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-900">{indexOfFirstBooking + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(indexOfLastBooking, filteredBookings.length)}</span> of <span className="font-semibold text-gray-900">{filteredBookings.length}</span> bookings
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-[#136b8a] text-white border border-[#136b8a]' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Drawer (Slide over) */}
      {selectedBooking && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-40 transition-opacity" 
            onClick={() => setSelectedBooking(null)} 
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                  <p className="text-[#136b8a] font-mono text-sm font-bold mt-1">{selectedBooking.booking_id}</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                
                {/* Timeline status */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-500 font-medium">Status</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${getStatusColor(selectedBooking.booking_status)}`}>
                      {selectedBooking.booking_status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Payment</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${getPaymentStatusColor(selectedBooking.payment_status)}`}>
                      {selectedBooking.payment_status}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleQuickAction(selectedBooking, 'confirm')} className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border border-green-200">
                    <Check size={16} /> Confirm
                  </button>
                  <button onClick={() => handleQuickAction(selectedBooking, 'cancel')} className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border border-red-200">
                    <XCircle size={16} /> Cancel
                  </button>
                  <button onClick={() => handleQuickAction(selectedBooking, 'markPaid')} className="flex-1 bg-[#136b8a]/10 text-[#136b8a] hover:bg-[#136b8a]/20 px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#136b8a]/20">
                    <CreditCard size={16} /> Mark Paid
                  </button>
                </div>

                {/* Customer Details */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-1"><User size={14} /> Customer</h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <div>
                      <div className="text-xs text-gray-500">Name</div>
                      <div className="font-semibold text-gray-900">{selectedBooking.customer_name}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-500">Phone</div>
                        <div className="font-semibold text-gray-900">{selectedBooking.phone}</div>
                      </div>
                      <button onClick={() => handleQuickAction(selectedBooking, 'copyPhone')} className="text-gray-400 hover:text-[#136b8a]"><Copy size={16} /></button>
                    </div>
                    {selectedBooking.email && (
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="font-semibold text-gray-900">{selectedBooking.email}</div>
                        </div>
                        <button onClick={() => handleQuickAction(selectedBooking, 'copyEmail')} className="text-gray-400 hover:text-[#136b8a]"><Copy size={16} /></button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trip Details */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-1"><Package size={14} /> Package Details</h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <div>
                      <div className="text-xs text-gray-500">Package</div>
                      <div className="font-semibold text-[#136b8a]">{selectedBooking.package_title}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-500">Travel Date</div>
                        <div className="font-semibold text-gray-900">{selectedBooking.travel_date ? new Date(selectedBooking.travel_date).toLocaleDateString() : 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Travellers</div>
                        <div className="font-semibold text-gray-900">{selectedBooking.travellers} Person(s)</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Sharing</div>
                        <div className="font-semibold text-gray-900 capitalize">{selectedBooking.selected_sharing || 'N/A'}</div>
                      </div>
                    </div>
                    {selectedBooking.special_request && (
                      <div>
                         <div className="text-xs text-gray-500">Special Request</div>
                         <div className="text-sm bg-orange-50 text-orange-800 p-2 rounded border border-orange-100 mt-1">{selectedBooking.special_request}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Billing Details */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-1"><CreditCard size={14} /> Payment & Billing</h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="text-sm font-semibold text-gray-700">Total Amount</div>
                      <div className="text-lg font-black text-[#136b8a]">₹{Number(selectedBooking.final_amount || selectedBooking.total_amount || 0).toLocaleString()}</div>
                    </div>
                    {selectedBooking.razorpay_payment_id && (
                       <div>
                         <div className="text-xs text-gray-500">Razorpay ID</div>
                         <div className="font-mono text-sm text-gray-800 break-all bg-gray-50 p-1.5 rounded border border-gray-100 mt-1">{selectedBooking.razorpay_payment_id}</div>
                       </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-1"><Clock size={14} /> Timeline</h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-sm flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#136b8a] mt-1.5"></div>
                      <div>
                        <div className="font-medium text-gray-900">Booking Created</div>
                        <div className="text-xs text-gray-500">{new Date(selectedBooking.created_at).toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 pb-12 flex gap-3">
                  <button 
                    onClick={() => downloadVoucher(selectedBooking)}
                    className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download size={18} /> Download Voucher
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default AdminBookings;
