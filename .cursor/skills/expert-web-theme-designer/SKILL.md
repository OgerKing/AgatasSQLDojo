---
name: expert-web-theme-designer
description: Designs professional, distinctive website themes with strong visual identity, polished motion, and tasteful background artwork. Use when the user asks for theme design, visual direction, differentiated look-and-feel, or high-quality thematic styling.
---

# Expert Web Theme Designer

## Purpose

Create engaging but professional website themes with strong craft identity. Prioritize a Polish-guild visual language (heritage, craftsmanship, clarity), while keeping each theme clearly distinct beyond color swaps.

## When to use

- User asks for polished, thematic UI with stronger visual character.
- User wants professional design with tasteful graphics or background art.
- Product needs multiple themes with unique brand-style identities.
- Existing UI feels flat, generic, or insufficiently differentiated.

## Core design standards

- **Theme uniqueness first:** Every theme has a distinct visual DNA:
  - own color logic
  - own shape language
  - own typography pairing
  - own illustration/icon style
  - own motion personality
- **Professional polish:** Prefer restrained palettes, disciplined spacing, and clear information hierarchy.
- **Guild-inspired direction:** Use cues of heritage craft (wood, parchment, brass, stone, heraldic forms, workshop motifs) where relevant.
- **Tasteful graphics:** Favor subtle background motifs/textures over loud decorative stickers.
- **Controlled motion:** Use gentle, low-amplitude transitions and micro-feedback only.
- **Accessibility guardrails:** Preserve readable contrast, clear focus states, and reduced-motion support.
- **Performance guardrails:** Favor CSS transforms/opacity and lightweight assets; avoid heavy animation stacks that hurt FPS.

## Background image guidance

- Use lightweight SVG or optimized raster assets as subtle layered backdrops.
- Keep artwork low-contrast and non-distracting behind content surfaces.
- Scope image treatment per theme (unique motif per theme).
- Avoid noisy patterns under body text and data tables.
- Provide fallback to pure color/gradient when asset fails to load.

## Theme creation workflow

Use this flow for each new theme.

1. **Define Theme DNA (non-negotiable)**
   - Theme name and one-sentence vibe.
   - 3-5 adjectives (e.g. playful, electric, cozy, heroic).
   - "Never do" list (what visual choices are off-brand).

2. **Build the visual system**
   - Color tokens: `bg`, `surface`, `text`, `muted`, `primary`, `secondary`, `accent`, `success`, `warning`, `danger`.
   - Typography tokens: display, heading, body, mono.
   - Shape tokens: border radius scale, line thickness, shadow style.
   - Graphics tokens: icon stroke/fill rules, illustration style, texture/background motif.

3. **Define motion language**
   - Motion profile: calm / lively / energetic.
   - Standard durations (fast/medium/slow).
   - Easing defaults.
   - Signature micro-interactions (buttons, cards, progress, notifications).
   - Reduced-motion fallback behavior.

4. **Apply to key UI surfaces**
   - Navigation/header
   - Hero/banner
   - Card/grid systems
   - Buttons and form controls
   - Feedback states (success/warning/error)
   - Empty/loading states

5. **Differentiate against existing themes**
   - Explicitly compare with other themes.
   - Confirm this theme differs in at least 4 of these 6 axes:
     - palette logic
     - typography style
     - shapes/corners
     - illustration/icon approach
     - motion personality
     - texture/background treatment

## Deliverable format

When asked to design or update themes, provide:

1. **Theme Concept** (name, vibe, adjectives, anti-patterns)
2. **Token Starter Set** (colors, typography, spacing/radius/shadow basics)
3. **Graphics Direction** (illustration/icon/background guidance, including background image concept)
4. **Motion Plan** (micro-interactions + durations/easing)
5. **Component Examples** (button, card, header, form field, status badge)
6. **Uniqueness Check** (how it differs from other themes)
7. **Accessibility + Performance Notes**

## Practical defaults for professional themes

- Start with a neutral foundation plus one confident brand accent.
- Keep decorative textures subtle and purpose-driven.
- Use moderate corner radii and calm shadows.
- Make hover/focus states clear without visual noise.
- Keep text-heavy areas calm and high-contrast.
- Limit animation to meaningful micro-interactions.

## Anti-patterns to avoid

- Creating multiple themes that only change hex values.
- Over-saturated "toy-like" combinations for enterprise-style screens.
- Constant, high-amplitude animation on every component.
- Overcrowding screens with decoration that harms clarity.
- Low-contrast text on decorative backgrounds.
- Ignoring `prefers-reduced-motion`.

## Definition of done

A theme is ready when:

- It is visibly and structurally distinct from other themes.
- It feels bright, fun, and graphics-rich without losing usability.
- Motion enhances delight but does not distract.
- Core components are themed consistently.
- Accessibility and performance checks are satisfied.

## Additional resources

- For ready-made multi-theme presets, see [examples.md](examples.md).
