/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'primary-gradient': `linear-gradient(
            86.88deg,
            #7D6AFF 1.38%,
            #FFB86C 64.35%,
            #FC2872 119.91%
        )`,
        'secondary-gradient': `linear-gradient(
          86.88deg,
          #142112 1.38%,
          #FC8192 64.35%,
          #891471 119.91%
      )`,
      },
    },
  },
  plugins: [],
};
