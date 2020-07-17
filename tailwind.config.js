module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.ts'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#55b9f3',
        secondary: '#55f3de',
        tertiary: '#556af3',
        dark: '#121212'
      },
      fontFamily: {
        sans: ['Muli']
      },
      screens: {
        light: { raw: '(prefers-color-scheme: light)' }
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: []
};
