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
        cream: {
          100: '#FFF5E6', // This is a light pastel cream color
        },
        lightBlue: '#E3F2FD', // Add this for the background
      },
      fontFamily: {
        sans: ['Merriweather', 'serif'],
        nunito: ['Nunito', 'sans-serif'], // Add Nunito font
        poppins: ['Poppins', 'sans-serif'], // Add Poppins font
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
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scale-in': 'scale-in 0.5s ease-out 0.3s both',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}