# react-redux-mapbox-gl

* react-redux-mapbox-gl provides a React Mapbox element and a Redux state reducer for the map.  
* Mapbox GL and your React element overlays on the map can be conveniently integrated into your React-Redux app.  
* All Mapbox GL APIs are still available.  

![react-redux-mapbox-gl-screenshot](/assets/react-redux-mapbox-gl.png)

## Installation
```
npm install react-redux-mapbox-gl --save
```
## Examples
In root directory of this module
```
npm install
npm test
```
Server starts at localhost:3000  
------------------------------------
Example using Mapbox GL with Webpack  
https://github.com/yunluyl/react-redux-mapbox-gl-example

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
      style={mapStyle}
      options={mapOptions}
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
import {MapReducer} from 'react-redux-mapbox-gl';
...
const reducer = combineReducers(
{
  MapReducer,
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
### Add overlays
You can add customized React elements onto the map. They will be placed at the longitude latitude position spicified in the props. You can change the prop values from render to render.
````js
render()
{
  const childProps1 = {
    lnglat : [-122.203071, 37.7505],
    width : 50,
    height : 50,
    neighborDistance : 5
  };
  const childProps2 = {
    lnglat : [-132.2, 40.05],
    width : 80 + Math.random() * 10,
    height : 80 + Math.random() * 10,
    neighborDistance : 30
  }; 
  return (
    <Mapbox
      //props - see spec section
    >
      <Child1
        overlay={childProps1}
        //...other props passed to your overlay
      />
      <Child2
      	overlay={childProps2}
        //...other props passed to your overlay
      />
    </Mapbox>
  );
}
````
## Prerequisites
react, redux, react-redux are needed to use this package
```
npm install react redux react-redux --save
```
## Specifications
### `<Mapbox>` props
 Property | Type | Required | Default | Description |
:--------:|:----:|:--------:|:-------:|-------------|
 mapboxgl | object | no | undefined | mapboxgl object from Mapbox GL JS, </br> If using Mapbox GL JS with `<script>` tag, omit this prop |
 accessToken | string | yes | undefined | Mapbox API access token |
 getMap | function | no | undefined | `<Mapbox>` passes the map object to its parent React element through this function | 
 options | object | yes | undefined | [Mapbox options](https://www.mapbox.com/mapbox-gl-js/api/#Map) used to create a new Map object; </br> options.style is required; |
 style | object | yes | undefined | React inline CSS style object used to style the container of the map; </br> style.width is required; </br> style.height is required; |
 mapEventListener | boolean | no | true | Enables/disables event listeners that control MapReducer state changes; see MapReducer states section for details |
 boundMargin | number | no | 0 | Adjust the distance from the boundary of the map that overlays stop displaying |
 
#### Examples
Use Mapbox APIs in parent module
````js
class example extends React.Component
{
  getMap = (map) =>
  {
  	this.map = map;
  };
  
  componentDidMount()
  {
  	this.map.addControl(new mapboxgl.Navigation({position: 'top-left'}));
  }

  render()
  {
    return (
      <Mapbox
        getMap={this.getMap}
        //...other props
      />
    );
  }
}
````
 
### Overlay props
There is a overlay object you can define to tie the overlay module to a certain location on the map. If you omit the overlay object, the overlay module is just a child of the `<Mapbox>` without any special behavior. Other than that, you can pass any prop to your overlays just like normal React modules.  

Fileds of overlay object  

 Field | Type | Required | Default | Description |
:-----:|:----:|:--------:|:-------:|-------------|
 lnglat | array | yes | undefined | The overlay is placed at position [lng, lat] on the map |
 width | number | yes | undefined | Width of the overlay in pixel |
 height | number | yes | undefined | Height of the overlay in pixel |
 neighborDistance | number | no | 0 | If any two of the overlays' distance is shorter than neighborDistance, one of the overlays is not displayed |

#### Examples
````js
...
const overlay = {
  lnglat : [12.323, -23.43],
  width : 100,
  height : 200
};

return (
  <Mapbox
    //map props
  >
    <Child1
      overlay={overlay}
      //other customized props for Child1
    />
  </Mapbox>
);
...
````

### MapReducer states
MapReducer states can be used in any react module under `<Provider>` using the **connect** function from react-redux
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
		mapState : state.MapReducer
	};
}

export default connect(mapState)(example);
````
MapReducer states when `<Mapbox>` prop mapEventListener is **false**
````js
var MapReducer =
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
MapReducer states when `<Mapbox>` prop mapEventListener is **true**
````js
var MapReducer =
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
	drag : undefined, //(boolean) set to true when user is dragging the map, false otherwise
	touch : undefined, //(boolean) set to true when user is touching the map, false otherwise
	move : undefined, //(boolean) set to true when the map is moving, false otherwise
	zoom : undefined, //(boolean) set to true when the map is zooming, false otherwise
	boxzoom : undefined, //(boolean) set to true when user is using boxzoom, false otherwise
	rotate : undefined //(boolean) set to true when user is rotating the map, false otherwise
};
````
