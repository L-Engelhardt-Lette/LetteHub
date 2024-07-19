/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode switching
  content: [
    "./index.html",
    "./src/**/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0e76a8',
        'primary-content': '#bce5f9',
        'primary-dark': '#0a5579',
        'primary-light': '#1297d7',

        secondary: '#570ea8',
        'secondary-content': '#d9bcf9',
        'secondary-dark': '#3f0a79',
        'secondary-light': '#6f12d7',

        backgrounddark: '#172c36',
        'background-light': '#ebf1f4',
        'foreground-dark': '#fafcfc',
        foregroundlight: '#0f1818',
        'border-dark': '#d5e3e9',
        'border-light': '#1f323a',

        copy: '#1a2a32',
        'copy-light': '#467186',
        'copy-lighter': '#6899b0',

        delete: '#c71010',
        add: '#3bc42c',

        success: '#0ea80e',
        warning: '#a8a80e',
        error: '#a80e0e',
        'success-content': '#bcf9bc',
        'warning-content': '#000000',
        'error-content': '#f9bcbc',
      },
      fontFamily: {
        UnageoRegular: ['UnageoRegular', 'sans-serif'],
        UnageoBold: ['UnageoBold', 'sans-serif'],
        MonaspaceNeonRegular: ['MonaspaceNeonRegular', 'monospace'],
      },
    },
  },
  plugins: [],
};
