'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
	//map : undefined,
	mapLoaded: false,
	viewport: {
		width: 0,
		height: 0,
		lng: 0,
		lat: 0,
		zoom: 0
	}
	//drag : undefined,
	//touch : undefined,
	//move : undefined,
	//zoom : undefined,
	//boxzoom : undefined,
	//rotate : undefined
};

module.exports = function () {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'MAP_RESET':
			return initialState;
		case 'MAP_SET_VIEWPORT':
			return _extends({}, state, { viewport: action.viewport });
		case 'MAP_LOAD':
			return _extends({}, state, { mapLoaded: true });
		case 'MAP_INIT':
			return _extends({}, state, { map: action.map });
		case 'MAP_DRAG_START':
			return _extends({}, state, { drag: true });
		case 'MAP_DRAG_END':
			return _extends({}, state, { drag: false });
		case 'MAP_TOUCH_START':
			return _extends({}, state, { touch: true });
		case 'MAP_TOUCH_END':
			return _extends({}, state, { touch: false });
		case 'MAP_TOUCH_CANCEL':
			return _extends({}, state, { touch: false });
		case 'MAP_MOVE_START':
			return _extends({}, state, { move: true });
		case 'MAP_MOVE_END':
			return _extends({}, state, { move: false });
		case 'MAP_ZOOM_START':
			return _extends({}, state, { zoom: true });
		case 'MAP_ZOOM_END':
			return _extends({}, state, { zoom: false });
		case 'MAP_BOXZOOM_START':
			return _extends({}, state, { boxzoom: true });
		case 'MAP_BOXZOOM_END':
			return _extends({}, state, { boxzoom: false });
		case 'MAP_BOXZOOM_CANCEL':
			return _extends({}, state, { boxzoom: false });
		case 'MAP_ROTATE_START':
			return _extends({}, state, { rotate: true });
		case 'MAP_ROTATE_END':
			return _extends({}, state, { rotate: false });
		default:
			return state;
	}
};