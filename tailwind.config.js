/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          background: 'var(--black-background)',
        },
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
