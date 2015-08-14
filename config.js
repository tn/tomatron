module.exports = {
  path: {
    source: './src',
    dist: './',
    app_file: './src/javascripts/app.jsx',
    bundle_file: './bundle/index.js',

    icons: {
      default: '/src/assets/images/Icon.png',
      pressed: '/src/assets/images/IconPressed.png'
    },

    sound: './src/assets/sounds/notify.mp3'
  },

  app: {
    name: 'Tomatron - Pomodoro Timer',
    width: 180,
    height: 220
  },

  debug: false
}
