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
        primarycontent: '#bce5f9',
        primarydark: '#0a5579',
        primarylight: '#1297d7',

        secondary: '#570ea8',
        secondarycontent: '#d9bcf9',
        secondarydark: '#3f0a79',
        secondarylight: '#6f12d7',

        backgrounddark: '#172c36',
        backgroundlight: '#ebf1f4',
        foregrounddark: '#fafcfc',
        foregroundlight: '#0f1818',
        borderdark: '#d5e3e9',
        borderlight: '#1f323a',

        copy: '#1a2a32',
        copylight: '#467186',
        copylighter: '#6899b0',

        delete: '#c71010',
        add: '#3bc42c',

        success: '#0ea80e',
        warning: '#a8a80e',
        error: '#a80e0e',
        successcontent: '#bcf9bc',
        warningcontent: '#000000',
        errorcontent: '#f9bcbc',
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
