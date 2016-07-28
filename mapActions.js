var AD = require('./actionDefine');

module.exports.reset = function()
{
	return {
		type : AD.MAP_RESET
	};
};

module.exports.mouseDown = function()
{
	return {
		type : AD.MAP_MOUSE_DOWN
	};
};

module.exports.mouseUp = function()
{
	return {
		type : AD.MAP_MOUSE_UP
	};
};

module.exports.setViewport = function(viewport)
{
	return {
		type : AD.MAP_SET_VIEWPORT,
		viewport
	};
};

module.exports.mapLoad = function()
{
	return {
		type : AD.MAP_LOAD
	};
};

module.exports.mapInit = function(map)
{
	return {
		type : AD.MAP_INIT,
		map
	};
}