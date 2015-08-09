var menubar = require('menubar');

var mb = menubar({
	width: 180,
	height: 220,
	preloadWindow: true
});

mb.on('ready', function ready () {
  // your app code here
});

mb.on('after-show', function () {
	mb.window.openDevTools();
});
