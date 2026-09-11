---
name: Serene Cognitive Care
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#40484c'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#70787c'
  outline-variant: '#bfc8cc'
  surface-tint: '#21667b'
  primary: '#004152'
  on-primary: '#ffffff'
  primary-container: '#0e5a6f'
  on-primary-container: '#91cfe8'
  inverse-primary: '#91cfe8'
  secondary: '#2d6953'
  on-secondary: '#ffffff'
  secondary-container: '#afedd1'
  on-secondary-container: '#326d57'
  tertiary: '#5d3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#7f4300'
  on-tertiary-container: '#ffb77d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8eaff'
  primary-fixed-dim: '#91cfe8'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004d61'
  secondary-fixed: '#b2f0d4'
  secondary-fixed-dim: '#96d3b8'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#0f503c'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display:
    fontFamily: Public Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Public Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  label-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  label-sm:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1.25rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 1.75rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is built specifically for elderly individuals experiencing mild-to-moderate cognitive decline and dementia, alongside their primary family caregivers. The brand personality is grounded, deeply compassionate, clinically dependable, and quiet. It avoids sensory overload, disorienting motion, and ambiguous interface patterns. 

The aesthetic marries **human-centered healthcare** with **warm minimalism**:
- **Cognitive Ease & Reassurance:** Interfaces present one primary cognitive task per screen. Information density is kept low to avoid confusion, agitation, or visual fatigue.
- **Dignity & Independence:** Visual elements do not look clinical, patronizing, or juvenile. Instead, they feel like a dependable, tactile personal notebook or reassuring companion.
- **Physical Usability:** Sizing, contrast ratios, and structural affordances accommodate age-related tremors, reduced contrast sensitivity, macular degeneration, and slower motor control.

## Colors

The palette relies on gentle, restorative bio-inspired hues that anchor psychological safety while strictly surpassing WCAG 2.1 AAA contrast benchmarks (7:1 for normal text, 4.5:1 for large text and UI components).

- **Primary (`#0E5A6F` - Deep Calming Teal):** The foundational anchor for major calls-to-action, active bottom navigation states, and primary focal structures. It conveys authority, stability, and peacefulness without the clinical coldness of institutional hospital blues.
- **Secondary (`#3F7A63` - Muted Sage):** Used for affirmative feedback, task completion milestones, and supportive reassurance indicators.
- **Tertiary (`#D97706` - Warm Amber):** Reserved for timely reminders, hydration alerts, and scheduled prompts that require attention without inducing panic.
- **Critical / Alert (`#C53030`):** Used sparingly for urgent caregiver alerts, missed medication notices, or emergency calling triggers. Paired with soft tint backgrounds (`#FEE2E2`) to avoid aggressive visual flashing.
- **Surfaces & Grounds:** Base canvas uses `#FBFBFA` (warm parchment) rather than stark `#FFFFFF` to mitigate glare. Elevated surfaces, modules, and interactable cards utilize pure `#FFFFFF` framed by `#E2E8F0` borders for unambiguous physical edge definition.
- **Text & Contrast Hierarchy:** Headings sit at `#0F172A` (near-black ink), primary instructions and labels at `#1E293B` (high-contrast slate), and metadata/subtext rests at `#475569`.

## Typography

Typography prioritizes legibility, character disambiguation (e.g., distinguishing `I`, `l`, and `1`), and sustained reading comfort.

- **Primary Body & Interface Typeface:** **Atkinson Hyperlegible Next**. Developed explicitly to assist users with low vision and cognitive processing variations. Its distinct glyph shapes eliminate visual ambiguity.
- **Display & Headings:** **Public Sans**. A sturdy, authoritative, geometric-humanist sans-serif that lends dignity, institutional trust, and structure to screen titles and step counters.
- **Scale Rules:**
  - Absolute minimum body font size is strictly `18px`, with `20px` serving as default body for elderly screens.
  - Line height is deliberately wide (1.5× to 1.6× font size) to prevent crowded text blocks.
  - All interactive buttons and touch targets feature `20px` to `24px` bold text to ensure instantaneous comprehension.

## Layout & Spacing

The layout philosophy follows a **Single Focused Action (SFA)** model arranged via a structured 4-column fluid mobile grid (expanding to 8 columns on tablet and 12 columns on desktop web caregiver dashboards).

- **Touch Bounds & Safe Zones:** All clickable and interactive regions must adhere to a hard floor minimum of `56px × 56px`, with primary user journey buttons occupying at least `60px` to `68px` in height.
- **Vertical Spacing:** Elements maintain open spacing to prevent mis-taps caused by motor control tremors. Adjacent tappable cards must be separated by at least `1.25rem` (`space-md`).
- **Caregiver & Senior Adaptive Reflow:** On mobile devices, screens never stack more than 2 secondary actionable options at a time. Content scrolls smoothly in a vertical orientation with no nested horizontal carousels or swipe gestures that could cause disorientation.

## Elevation & Depth

Elderly visual perception frequently struggles with purely flat interfaces and indistinguishable borders. This design system pairs **tonal elevation with low-contrast structural outlines**:

- **Ground Level (Level 0):** `#FBFBFA` surface. Background canvas remains un-shadowed and matte.
- **Resting Card State (Level 1):** Solid `#FFFFFF` background with a crisp `1.5px` border in `#E2E8F0` and an ambient diffuse shadow: `0 4px 12px -2px rgba(14, 90, 111, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)`.
- **Active / Focused Interactive State (Level 2):** When tapped or selected, elements lift with an enhanced outline (`2px solid #0E5A6F`), accompanied by `0 8px 24px -4px rgba(14, 90, 111, 0.12)`.
- **Floating Modals & Prompt Sheets (Level 3):** Modal overlays employ a high-contrast dim backdrop (`rgba(15, 23, 42, 0.6)`) to aggressively focus attention on the central prompt, eliminating background peripheral noise.

## Shapes

The interface embraces a gentle, physical roundedness (`roundedness: 2` = 16px / 1rem base radius) that feels soft, friendly, and non-threatening.

- **Buttons & Large Interactive CTAs:** Utilize large `1rem` (16px) or full pill radii (`9999px`) to visually signal clickability and organic comfort.
- **Informational & Memory Cards:** Standardized on `1rem` (16px) to maintain a neat, card-based notebook presentation.
- **Badges, Status Chips, & Multilingual Switchers:** Rounded pills (`9999px`) to differentiate categorized metadata from actionable card modules.

## Components

### Buttons
- **Primary CTA:** Minimum height `64px`. Background `#0E5A6F`, text `#FFFFFF`, bold `20px`. Border radius `16px`. Always incorporates an unambiguous high-contrast left icon (e.g., telephone, mic, checkmark).
- **Secondary Action:** Minimum height `60px`. Background `#FFFFFF`, border `2px solid #0E5A6F`, text `#0E5A6F`.
- **Emergency / Assistance:** Background `#C53030`, text `#FFFFFF`, height `68px`, accompanied by tactile haptic feedback on devices where supported.

### Memory & Daily Activity Cards
- Distinct `1.5px` border `#E2E8F0`, padded with `1.5rem` (`space-lg`).
- High-contrast typography paired with real-world photographic previews or high-contrast icons.
- Never use swipe-to-reveal or multi-tap actions; a single direct touch triggers full-card access.

### Status Chips & Badges
- Heights standard at `36px` to `40px` with `14px` horizontal padding.
- **"Completed":** `#D1E7DD` background with `#0F5132` text and bold checkmark icon.
- **"Today's Task":** `#E0F2FE` background with `#0369A1` text.
- **"Needs Attention":** `#FEF3C7` background with `#92400E` text.
- **"Offline Ready":** `#F1F5F9` background with `#475569` text and cloud-check icon.

### Multilingual Badges
- Persistent top-bar selector with language indicators (English, हिंदी, தமிழ், తెలుగు, ಕನ್ನಡ).
- Clear, readable native scripts with minimum `16px` font size, contained in high-contrast pill toggles to allow immediate switching by family members or seniors.

### Form Inputs & Checkboxes
- **Checkboxes & Radios:** Giant touch regions (`32px × 32px` visual box inside a `56px × 56px` touch frame) with heavy `3px` stroke check indicators when selected.
- **Input Fields:** Minimum height `60px`, background `#FFFFFF`, border `2px solid #CBD5E1`, focusing to `2px solid #0E5A6F` with an outer ring. Label is permanently visible above the input, never placeholder-only.