import type { Config } from 'tailwindcss'

const rgb = (name: string) => `rgb(var(${name}) / <alpha-value>)`

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        DEFAULT: '1536px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      screens: {
        xs: '480px',
      },
      padding: {
        container: 'clamp(1rem, 5vw, 3rem)',
      },
      fontSize: {
        '5xl': ['clamp(2.25rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['clamp(2.75rem, 5.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '7xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      colors: {
        background: {
          DEFAULT: rgb('--bg'),
          offset: rgb('--bg-offset'),
          panel: rgb('--bg-panel'),
        },
        foreground: {
          DEFAULT: rgb('--fg'),
          secondary: rgb('--fg-secondary'),
          tertiary: rgb('--fg-tertiary'),
        },
        line: {
          DEFAULT: rgb('--line'),
          subtle: rgb('--line-subtle'),
        },
        letter: {
          c: rgb('--c'),
          m: rgb('--m'),
          d: rgb('--d'),
        },
        // shadcn tokens for components/ui
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 6px)',
        xl: '1rem',
      },
      transitionTimingFunction: {
        motion: 'cubic-bezier(0.90, 0, 0.05, 1)',
        smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
