// Test script to insert a dummy booking into Supabase and log result
import { supabase } from './supabaseClient.js';

(async () => {
  try {
    const { data, error } = await supabase.from('bookings').insert([
      {
        customer_name: 'Test User',
        phone: '9999999999',
        email: 'test@example.com',
        source: 'test',
        package_id: null,
        package_title: 'Test Package',
        destination: 'Test Destination',
        travel_date: new Date().toISOString().split('T')[0],
        travellers: 1,
        special_request: null,
        total_amount: 12345,
        booking_status: 'new',
        payment_status: 'pending'
      }
    ]).select('id, booking_id');
    if (error) throw error;
    console.log('Insert successful:', data);
    // Cleanup: delete inserted row
    const del = await supabase.from('bookings').delete().eq('id', data.id);
    console.log('Cleanup result:', del);
  } catch (e) {
    console.error('Error inserting booking:', e);
  }
})();
