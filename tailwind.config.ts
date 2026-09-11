import type { Config } from 'tailwindcss';

// Brand directions: swap `active` to 'sand' or 'slate' to re-theme the whole site
// from one place. Palettes approved in design review.
const themes = {
  harbour: { bg: '#FAF9F6', surface: '#FFFFFF', primary: '#0E6B5C', soft: '#E4F0EC',
             ink: '#1A1A1A', muted: '#565656', border: '#E6E3DD', emergency: '#B42318' },
  sand:    { bg: '#FBF7EF', surface: '#FFFFFF', primary: '#9A5B2E', soft: '#F3E8D9',
             ink: '#26221D', muted: '#5C554C', border: '#EAE1D2', emergency: '#A8381F' },
  slate:   { bg: '#F7F8F9', surface: '#FFFFFF', primary: '#35506B', soft: '#E8EDF2',
             ink: '#1B1F24', muted: '#565D64', border: '#E3E6E9', emergency: '#A2332F' },
};
const active = themes.harbour;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: active,
      },
      fontFamily: {
        // Atkinson Hyperlegible: high legibility for low-vision + older users.
        // Arabic/CJK fall back to system fonts with full glyph coverage.
        sans: ['var(--font-body)', 'system-ui', 'Tahoma', 'sans-serif'],
      },
      borderRadius: { card: '0.75rem' },
    },
  },
  plugins: [],
};
export default config;
