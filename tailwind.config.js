/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'formal-accent': 'var(--formal-accent)',
        tertiary: 'var(--tertiary)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-semi-transparent': 'var(--primary-semi-transparent)',
        black: {
          background: 'var(--black-background)',
        },
      },
      boxShadow: {
        '2xl': '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25)',
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        button: '0rem 0rem 1.625rem rgb(0 0 0 / 1)',
        'button-active': '0rem 0rem 0.375rem rgb(0 0 0 / 1)',
        card: '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25), inset 0px 0px 1rem rgb(0 0 0 / 0.25)',
      },
      maxWidth: {
        cookie: '25.625rem',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
