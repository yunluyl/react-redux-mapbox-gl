# react-redux-mapbox-gl

* react-redux-mapbox-gl provides a React Mapbox element and a Redux state reducer for the map.  
* Mapbox GL and your React overlays on the map can be conveniently integrated into your React-Redux app.  
* All Mapbox GL APIs are still available.  

![react-redux-mapbox-gl-screenshot](/assets/react-redux-mapbox-gl.png)

## Installation
```
npm install react-redux-mapbox-gl --save
```
## Example
In root directory of this module
```
npm install
npm test
```
Server starts at localhost:3000

## Usage
### Using Mapbox GL with Browserify or Webpack
````js
import Mapbox from 'react-redux-mapbox-gl';
import mapboxgl from 'mapbox-gl';
...
render()
{
  const mapStyle =
  {
    width : 200,
    height : 300
  };
  const mapOptions =
  {
    style : 'mapbox://styles/mapbox/streets-v9'
  };
  
  return (
    <Mapbox
      mapboxgl={mapboxgl}
      accessToken="your map access token"
      style={this.mapStyle}
      options={this.mapOptions}
    />
  );
}
...
````
### Using Mapbox GL with `<script>` tag
````js
import Mapbox from 'react-redux-mapbox-gl';
...
render()
{
  const mapStyle =
  {
    width : 200,
    height : 300
  };
  const mapOptions =
  {
    style : 'mapbox://styles/mapbox/streets-v9'
  };
  
  return (
    <Mapbox
      accessToken="your map access token"
      style={this.mapStyle}
      options={this.mapOptions}
    />
  );
}
...
````
### Combine MapReducer into React-Redux app
````js
import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {mapReducer} from 'react-redux-mapbox-gl';
...
const reducer = combineReducers(
{
	mapReducer,
	//...other reducers in the app
});

const store = createStore(reducer);
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
...
````
### Add overlay


## Spec
### `<Mapbox>` props
 Property | Type | Required | Description |
:--------:|:----:|:--------:|-------------|
 mapboxgl | object | no | mapboxgl object from Mapbox GL JS, </br> If using Mapbox GL JS with `<script>` tag, omit this prop |
 accessToken | string | yes | Mapbox API access token |
 options | object | yes | [Mapbox options](https://www.mapbox.com/mapbox-gl-js/api/#Map) used to create a new Map object, </br> options.style is required |
#### Examples

### MapReducer states
#### mapReducer states can be used in any react module under `<Provider>` using the connect function from react-redux
````js
import {connect} from 'react-redux';
import {Component} from 'react';

class example extends Component
{
	...
}

const mapState = (state) =>
{
	return {
		mapState : state.mapReducer
	};
}

export default connect(mapState)(example);
````
#### mapReducer states when `<Mapbox>` prop mapEventListener is **false**
````js
var mapReducer =
{
	mapLoaded : false, //(boolean) set to true when the inital map loading is done
	viewport :
	{  
		width : 0, //(number) width of the map
		height : 0, //(number) height of the map
		lng : 0, //(number) the longitude that the map is currently centered at
		lat : 0, //(number) the latitude that the map is currently centered at
		zoom : 0 //(number) the current zoom level of the map
	}
};
````
#### mapReducer states when `<Mapbox>` prop mapEventListener is **true**
````js
var mapReducer =
{
	mapLoaded : false, //(boolean) set to true when the inital map loading is done
	viewport :
	{
		width : , //(number) width of the map
		height : , //(number) height of the map
		lng : , //(number) the longitude that the map is currently centered at
		lat : , //(number) the latitude that the map is currently centered at
		zoom : 0 //(number) the current zoom level of the map
	}
	drag : undefined, //(boolean) set to true when user is dragging the map, false otherwise
	touch : undefined, //(boolean) set to true when user is touching the map, false otherwise
	move : undefined, //(boolean) set to true when the map is moving, false otherwise
	zoom : undefined, //(boolean) set to true when the map is zooming, false otherwise
	boxzoom : undefined, //(boolean) set to true when user is using boxzoom, false otherwise
	rotate : undefined //(boolean) set to true when user is rotating the map, false otherwise
};
````
### Overlay props

## Prerequisites
