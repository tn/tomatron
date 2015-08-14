var menubar = require('menubar');
var config = require('./config');

var mb = menubar({
	width: config.app.width,
	height: config.app.height,
	preloadWindow: true,
	icon: __dirname + config.path.icons.default
});

mb.on('ready', function () {
	mb.tray.setToolTip(config.app.name);
	mb.tray.setPressedImage(__dirname + config.path.icons.pressed);
});

if (config.debug) {
	mb.on('after-show', function () {
		mb.window.openDevTools();
	});
}
