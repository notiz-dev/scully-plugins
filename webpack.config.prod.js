module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          syntax: 'postcss-scss',
          plugins: () => [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
            require('@fullhuman/postcss-purgecss')({
              // Specify the paths to all of the template files in your project
              content: ['./src/**/*.html', './src/**/*.ts'],
              defaultExtractor: content =>
                content.match(/[A-Za-z0-9-_:/]+/g) || []
            })
          ]
        }
      }
    ]
  }
};
