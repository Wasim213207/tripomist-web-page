# TripoMist - Product Requirements Document

## Overview
TripoMist is a travel booking web application that allows users to explore destinations, browse group trips, view itineraries, and complete bookings online.

## Core Features

### 1. Home Page (/)
- Hero section with background image, tagline "Find Yourself With TripoMist"
- CTA buttons: "Explore Group Trips" and "See Upcoming Departures"
- Destination exploration circles with scroll (Spain, Japan, Vietnam, Bali, Thailand, Ladakh, Spiti Valley, Andaman)
- Camera roll destination cards with pricing (Ladakh ₹21,999, Spiti Valley ₹16,999, Kashmir ₹17,999)
- Featured Group Trips section with Book Now buttons
- Stats: 4.9 Google Rating, 10K+ Happy Travellers, 100+ Domestic Trips
- Floating action buttons for call and WhatsApp

### 2. Navigation (Navbar)
- Logo/Brand name linking to home
- Navigation links: Home, Group Trips, Weekend Trips, Upcoming Trips
- Mobile responsive with hamburger menu

### 3. Group Trips Page (/group-trips)
- Browse all available group trips
- Filter by style (Mountains, Beaches, etc.)
- Search by destination

### 4. Weekend Trips Page (/weekend-trips)
- Weekend trip packages listing

### 5. Upcoming Trips Page (/upcoming-trips)
- List of upcoming departures with dates

### 6. Itinerary Page (/itinerary/:id)
- Detailed trip itinerary
- Download itinerary modal popup
- Day-by-day plan

### 7. Checkout Page (/checkout)
- Accepts query params: ?trip=TripName&price=Amount
- Traveller information form fields
- Booking summary with trip name and price
- Payment/booking completion

## User Journeys
1. Home → Explore Group Trips → Browse → Book Now → Checkout
2. Home → Destination Card → Itinerary → Download Itinerary
3. Home → See Upcoming Departures → Browse upcoming trips
4. Home → Weekend filter → Weekend Trips page
5. Direct navigation via Navbar
