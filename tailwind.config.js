/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'], // Adjust as needed
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '90ch', // Increases the max width for better readability
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],

};
