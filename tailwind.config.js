/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFFFF',
          100: '#FFFDFB',
          200: '#FFF9F4',
          300: '#F9EFE6',
          400: '#F0DEC',
          500: '#E6CBB8',
        },
        chocolate: {
          100: '#F3ECE7',
          200: '#D5C3B8',
          400: '#6B4237',
          600: '#4A2A22',
          800: '#3A211B',
          900: '#241512',
        },
        pinksoft: {
          100: '#FDF0F2',
          200: '#F8D8DC',
          300: '#F4C8CF',
          400: '#E8A3AF',
        },
        strawberry: {
          500: '#E25B6C',
          600: '#D94B5C',
          700: '#B83848',
        },
        gold: {
          400: '#DDB26A',
          500: '#C99A55',
          600: '#AA7E3B',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(58, 33, 27, 0.06), 0 2px 6px -1px rgba(58, 33, 27, 0.04)',
        'card': '0 8px 30px rgba(58, 33, 27, 0.08)',
        'floating': '0 12px 35px rgba(36, 21, 18, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
