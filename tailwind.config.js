/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          background: '#1f2128',
        },
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
