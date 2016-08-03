# react-redux-mapbox-gl

* react-redux-mapbox-gl provides a React Mapbox element and a Redux state reducer for the map.  
* Mapbox GL and your React overlays on the map can be conveniently integrated into your React-Redux app.  
* All Mapbox GL APIs are still available.  

![react-redux-mapbox-gl-screenshot](/assets/react-redux-mapbox-gl.png)

## Installation
```
npm install react-redux-mapbox-gl --save
```

## Usage
###Using Browserify or Webpack
````js
import Mapbox from 'react-redux-mapbox-gl';
import mapboxgl from 'mapbox-gl';
...
render()
{
  const mapOptions =
  {
    style : 'mapbox://styles/mapbox/streets-v9'
  };
  const mapStyle =
  {
    width : 200,
    height : 300
  };
  
  return (
    <Mapbox
      mapboxgl={mapboxgl}
      accessToken="your map access token"
      style={this.mapStyle}
      options={this.mapOptions}
    >
    </Mapbox>
  );
}
...
````
###Using `<script>` tag
````js
import Mapbox from 'react-redux-mapbox-gl';
...
render()
{
  const mapOptions =
  {
    style : 'mapbox://styles/mapbox/streets-v9'
  };
  const mapStyle =
  {
    width : 200,
    height : 300
  };
  
  return (
    <Mapbox
      accessToken="your map access token"
      style={this.mapStyle}
      options={this.mapOptions}
    >
    </Mapbox>
  );
}
...
````
### `<Mapbox>` props
* mapboxgl: [object] mapboxgl object from Mapbox GL JS; If using Mapbox GL JS with <script> tag, omit this prop
* accessToken: [string] Mapbox API access token (required

