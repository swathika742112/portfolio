/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        'surface-2':  'var(--color-surface-2)',
        border:       'var(--color-border)',
        accent:       'var(--color-accent)',
        'accent-2':   'var(--color-accent-2)',
        'accent-hover':'var(--color-accent-hover)',
        primary:      'var(--color-primary)',
        secondary:    'var(--color-secondary)',
        muted:        'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%':       { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
