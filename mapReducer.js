var initialState =
{
	map : undefined,
	mapLoaded : false,
	isDragging : false,
	viewport :
	{
		width : 0,
		height : 0,
		lng : 0,
		lat : 0,
		zoom : 0
	}
};

module.exports = function(state = initialState, action)
{
	switch(action.type)
	{
		case 'MAP_RESET':
			return initialState;
		case 'MAP_MOUSE_DOWN':
			return {
				map : state.map,
				mapLoaded : state.mapLoaded,
				isDragging : true,
				viewport : state.viewport,
			};
		case 'MAP_MOUSE_UP':
			return {
				map : state.map,
				mapLoaded : state.mapLoaded,
				isDragging : false,
				viewport : state.viewport,
			};
		case 'MAP_SET_VIEWPORT':
			return {
				map : state.map,
				mapLoaded : state.mapLoaded,
				isDragging : state.isDragging,
				viewport : action.viewport,
			};
		case 'MAP_LOAD':
			return {
				map : state.map,
				mapLoaded : true,
				isDragging : state.isDragging,
				viewport : state.viewport,
			};
		case 'MAP_INIT':
			return {
				map : action.map,
				mapLoaded : state.mapLoaded,
				isDragging : state.isDragging,
				viewport : state.viewport,
			};
		default:
			return state;
	}
};