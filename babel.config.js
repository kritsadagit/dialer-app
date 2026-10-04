module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@': './src',
          '@custom-libraries': './src/custom-libraries',
          '@hooks': './src/hooks',
          '@modules': './src/modules',
          '@styles': './styles',
          '@assets': './assets',
        },
      },
    ],
  ],
};
