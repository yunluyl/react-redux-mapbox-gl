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
### Combine MapReducer into Redux
````js
import {createStore, combineReducers} from 'redux';
import {mapReducer} from 'react-redux-mapbox-gl';

const reducer = combineReducers(
{
	mapReducer
	//...other reducers in the app
});

const store = createStore(reducer);
````
### Add overlay


## Spec
### `<Mapbox>` props
 Property | Type | Required | Description |
:--------:|:----:|:--------:|-------------|
 mapboxgl | object | no | mapboxgl object from Mapbox GL JS, </br> If using Mapbox GL JS with `<script>` tag, omit this prop |
 accessToken | string | yes | Mapbox API access token |
 options | object | yes | Mapbox [options](https://www.mapbox.com/mapbox-gl-js/api/#Map) used to create a new Map object, </br> options.style is required |
#### Examples

### MapReducer states

### Overlay props

## Prerequisites
