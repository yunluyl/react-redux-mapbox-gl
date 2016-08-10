var initialState =
{
	//map : undefined,
	mapLoaded : false,
	viewport :
	{
		width : 0,
		height : 0,
		lng : 0,
		lat : 0,
		zoom : 0
	}
	//drag : undefined,
	//touch : undefined,
	//move : undefined,
	//zoom : undefined,
	//boxzoom : undefined,
	//rotate : undefined
};

module.exports = function(state = initialState, action)
{
	switch(action.type)
	{
		case 'MAP_RESET':
			return initialState;
		case 'MAP_SET_VIEWPORT':
			return {...state, viewport : action.viewport};
		case 'MAP_LOAD':
			return {...state, mapLoaded : true};
		case 'MAP_INIT':
			return {...state, map : action.map};
		case 'MAP_DRAG_START':
			return {...state, drag : true};
		case 'MAP_DRAG_END':
			return {...state, drag : false};
		case 'MAP_TOUCH_START':
			return {...state, touch : true};
		case 'MAP_TOUCH_END':
			return {...state, touch : false};
		case 'MAP_TOUCH_CANCEL':
			return {...state, touch : false};
		case 'MAP_MOVE_START':
			return {...state, move : true};
		case 'MAP_MOVE_END':
			return {...state, move : false};
		case 'MAP_ZOOM_START':
			return {...state, zoom : true};
		case 'MAP_ZOOM_END':
			return {...state, zoom : false};
		case 'MAP_BOXZOOM_START':
			return {...state, boxzoom : true};
		case 'MAP_BOXZOOM_END':
			return {...state, boxzoom : false};
		case 'MAP_BOXZOOM_CANCEL':
			return {...state, boxzoom : false};
		case 'MAP_ROTATE_START':
			return {...state, rotate : true};
		case 'MAP_ROTATE_END':
			return {...state, rotate : false};
		default:
			return state;
	}
};