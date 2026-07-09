---
name: Alpine Daybreak
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7881'
  outline-variant: '#bec8d2'
  surface-tint: '#006591'
  primary: '#006591'
  on-primary: '#ffffff'
  primary-container: '#0ea5e9'
  on-primary-container: '#003751'
  inverse-primary: '#89ceff'
  secondary: '#006686'
  on-secondary: '#ffffff'
  secondary-container: '#7ed4fd'
  on-secondary-container: '#005b78'
  tertiary: '#576065'
  on-tertiary: '#ffffff'
  tertiary-container: '#949da3'
  on-tertiary-container: '#2c3539'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c9e6ff'
  primary-fixed-dim: '#89ceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004c6e'
  secondary-fixed: '#c0e8ff'
  secondary-fixed-dim: '#7bd1fa'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#004d66'
  tertiary-fixed: '#dbe4ea'
  tertiary-fixed-dim: '#bfc8ce'
  on-tertiary-fixed: '#141d21'
  on-tertiary-fixed-variant: '#3f484d'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style
The design system embodies the clarity and precision of high-altitude mornings. It is designed for premium SaaS and professional tools that require an environment of focus, transparency, and trust. The personality is crystalline and serene, avoiding visual clutter in favor of breathability.

The aesthetic direction is **Modern Glassmorphism** evolved for light mode. It utilizes "frosted glass" surfaces—white translucency paired with subtle backdrop blurs—to create a sense of layered depth without the weight of traditional shadows. The interface feels airy and architectural, using light as the primary tool for defining space.

## Colors
The palette is rooted in a "High-Contrast Glacial" scheme. 

- **Primary**: A deepened Ice Blue (#0EA5E9) ensures AA accessibility for text and icons against white backgrounds, while maintaining the cool temperature of the brand.
- **Secondary**: The original Ice Blue (#7DD3FC) is reserved for decorative elements, soft hover states, and large-scale accents.
- **Neutrals**: Pure white (#FFFFFF) is the foundation. Surface containers use a very light Slate (#F8FAFC) to differentiate tiers. Text uses Deep Charcoal (#0F172A) for maximum legibility and a premium feel.
- **Translucency**: Frosted surfaces are achieved using 70-80% opacity white with a 12px to 20px background blur.

## Typography
The typographic system strikes a balance between technical precision and modern elegance. 

- **Headlines**: Manrope provides a geometric yet warm structure. Tight letter-spacing and heavy weights convey authority and modernity.
- **Body**: Inter is used for its exceptional legibility and neutral tone, ensuring the interface feels functional and unobtrusive.
- **Labels/Data**: JetBrains Mono is utilized for metadata, tags, and small labels to reinforce the "precision tool" aspect of the brand.

All type should be set in Deep Charcoal (#0F172A) for core content, with Slate-500 used for secondary supporting text.

## Layout & Spacing
The layout follows a **Fluid Grid** model with high-density inner content and expansive outer margins. 

- **Grid**: A 12-column system on desktop, collapsing to 8 columns for tablet and 4 for mobile. 
- **Rhythm**: Uses a 4px baseline shift. Layout components (cards, sections) should favor generous `lg` (48px) vertical padding to maintain the "airy" feel.
- **Reflow**: On mobile, horizontal margins shrink to 16px, and frosted glass effects should be simplified to solid white surfaces with thin borders to maintain performance and clarity on smaller screens.

## Elevation & Depth
Depth is created through **Atmospheric Layering** rather than heavy shadows.

- **Level 0 (Base)**: Pure White (#FFFFFF).
- **Level 1 (Cards/Containers)**: Very light gray (#F8FAFC) with a 1px border (#F1F5F9).
- **Level 2 (Modals/Popovers)**: White at 80% opacity with a `blur(20px)` backdrop filter. Instead of black shadows, use a soft, diffused Blue-Tinted shadow (`0 10px 25px -5px rgba(14, 165, 233, 0.1)`).
- **Level 3 (Floating Elements)**: High-blur surfaces with a 1px semi-transparent white border to simulate the edge of a glass pane catching the light.

## Shapes
The shape language is refined and consistent. A standard **Rounded** (0.5rem) corner radius is used for interactive components like buttons and inputs. Larger containers like cards use `rounded-xl` (1.5rem) to soften the overall appearance of the grid. Pill-shapes are used exclusively for status indicators (Chips) and search bars to provide visual variety.

## Components
- **Buttons**: Primary buttons use a solid gradient from #0EA5E9 to #7DD3FC with white text. Secondary buttons are "ghosted"—frosted glass backgrounds with primary-colored text.
- **Input Fields**: Soft gray backgrounds (#F1F5F9) that transition to white with a 1px primary-colored border on focus.
- **Cards**: Minimalist with 1.5rem rounded corners, a subtle 1px border, and no shadow unless hovered. On hover, apply a soft blue ambient lift.
- **Chips**: Use the `label-sm` monospace font. Backgrounds should be very desaturated versions of their status color (e.g., light blue-wash for info).
- **Lists**: Interactive list items should use a "glass-reveal" on hover—a subtle white translucent overlay that makes the item feel like it's rising to the surface.