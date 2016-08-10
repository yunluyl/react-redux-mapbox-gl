var AD = require('./actionDefine');

module.exports.reset = function()
{
	return {
		type : AD.MAP_RESET
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

module.exports.dragStart = function()
{
	return {
		type : AD.MAP_DRAG_START
	};
};

module.exports.dragEnd = function()
{
	return {
		type : AD.MAP_DRAG_END
	};
};

module.exports.touchStart = function()
{
	return {
		type : AD.MAP_TOUCH_START
	};
};

module.exports.touchEnd = function()
{
	return {
		type : AD.MAP_TOUCH_END
	};
};

module.exports.touchCancel = function()
{
	return {
		type : AD.MAP_TOUCH_CANCEL
	};
};

module.exports.moveStart = function()
{
	return {
		type : AD.MAP_MOVE_START
	};
};

module.exports.moveEnd = function()
{
	return {
		type : AD.MAP_MOVE_END
	};
};

module.exports.zoomStart = function()
{
	return {
		type : AD.MAP_ZOOM_START
	};
};

module.exports.zoomEnd = function()
{
	return {
		type : AD.MAP_ZOOM_END
	};
};

module.exports.boxZoomStart = function()
{
	return {
		type : AD.MAP_BOXZOOM_START
	};
};

module.exports.boxZoomEnd = function()
{
	return {
		type : AD.MAP_BOXZOOM_END
	};
};

module.exports.boxZoomCancel = function()
{
	return {
		type : AD.MAP_BOXZOOM_CANCEL
	};
};

module.exports.rotateStart = function()
{
	return {
		type : AD.MAP_ROTATE_START
	};
};

module.exports.rotateEnd = function()
{
	return {
		type : AD.MAP_ROTATE_END
	};
};
