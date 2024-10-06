/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFD6A5',
          DEFAULT: '#FFA94D',
          dark: '#FB8C00',
        },
        secondary: {
          light: '#A5D8FF',
          DEFAULT: '#4DABF7',
          dark: '#1C7ED6',
        },
        accent: {
          light: '#FFB3BA',
          DEFAULT: '#FF8C94',
          dark: '#FF6B6B',
        },
        background: '#F8F9FA',
        text: {
          DEFAULT: '#495057',
          light: '#868E96',
        },
      },
      fontFamily: {
        sans: ['Merriweather', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.DEFAULT'),
            h1: {
              color: theme('colors.primary.DEFAULT'),
            },
            h2: {
              color: theme('colors.primary.dark'),
            },
            h3: {
              color: theme('colors.secondary.DEFAULT'),
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              '&:hover': {
                color: theme('colors.accent.dark'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}