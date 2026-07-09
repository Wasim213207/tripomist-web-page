import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer class="bg-surface-container-lowest border-t border-outline-variant/30 w-full mt-auto">
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-center md:text-left flex flex-col items-center md:items-start gap-2">
          <Link class="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2" to="/">
            <img alt="TripoMist Logo" class="h-8 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf4iPOLD4TW-emcX7qi8W7qPZhFbm5OzAQitvDsMARyOfBuAo9ztt29roRULWmZnSZXWDU9C66-5CEUsII9ClNmyCllVfZSQsk_Zh8SNMinjoMc_fWjzIKKChJB0UTFRB6QTigHPgLb0E2DZsOlp_JhvJp0lXnbSsTzGVqfLBMNk-0_rDP3tmtkhWYAQN9_F1nRcn8PpFGemDTJHOLelhxsCRyeTqUu0-JvD0GzZAkXaVLereGaQFPqUxJgRLojmOnEGYfiVmgV8Js0WY" />
            TripoMist
          </Link>
          <p class="font-body-md text-body-md text-on-surface-variant">© 2024 TripoMist. Your Safe Travel Our Responsibility.</p>
        </div>
        <div class="flex flex-wrap gap-6 justify-center md:justify-end text-sm">
          <Link class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider text-[11px]" to="/contact">Contact Us</Link>
          <Link class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider text-[11px]" to="/terms-conditions">Terms & Conditions</Link>
          <Link class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider text-[11px]" to="/privacy-policy">Privacy Policy</Link>
          <Link class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider text-[11px]" to="/refund-policy">Refund Policy</Link>
          <Link class="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider text-[11px]" to="/shipping-policy">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
