'use strict';
import React from 'react';
import {connect} from 'react-redux';
import Marker from './Marker.jsx';

class MarkerLayer extends React.Component
{
	componentWillMount()
	{
		this.items =
		[
			{
				lnglat : [-122.203071, 37.7505],
				image : 'https://s3.amazonaws.com/mapbox-gl-react-redux-example/oracle_arena_0.jpg'
			},
			{
				lnglat : [-109.592589, 38.732704],
				image : 'https://s3.amazonaws.com/mapbox-gl-react-redux-example/arches_national_park_0.jpg'
			},
			{
				lnglat : [-87.638717, 41.861013],
				image : 'https://s3.amazonaws.com/mapbox-gl-react-redux-example/chicago_0.jpg'
			},
			{
				lnglat : [-122.478244, 37.820157],
				image : 'https://s3.amazonaws.com/mapbox-gl-react-redux-example/golden_gate_bridge_0.jpg'
			},
		]
	}

	render()
	{
		const viewport = this.props.mapState.viewport;
		const items = this.items;
		let markers = [];
		let markerPosition = [];
		const globPixel = Math.pow(2, viewport.zoom + 9);
		if (this.props.mapState.mapLoaded)
		{
			for (let i=0;i<items.length;i++)
			{
				const lnglat = items[i].lnglat;
				let showMarker = true;
				const pointPixel = this.props.map.project(lnglat);
				const pixels = [pointPixel.x, pointPixel.y];
				pixels[0] = pixels[0] % globPixel;
				if (pixels[0] < 0)
				{
					pixels[0] += globPixel;
				}
				if ((pixels[0] * 2 + globPixel) / 2 <
					viewport.width / 2)
				{
					pixels[0] += globPixel;
				}
				if (pixels[0] < -50 || pixels[0] > viewport.width + 50
					|| pixels[1] < -50 || pixels[1] > viewport.height + 50)
				{
					showMarker = false;
				}
				for (let i = 0; i < markerPosition.length; i++)
				{
					if (Math.pow((pixels[0] - markerPosition[i][0]), 2)
						+ Math.pow((pixels[1] - markerPosition[i][1]), 2)
						< 100)
					{
						showMarker = false;
						break;
					}
				}
				if (showMarker)
				{
					markerPosition.push(pixels);
				}
				markers.unshift(
					<Marker
						key = {i}
						show = {showMarker}
						pixels = {pixels}
						item = {items[i]}
					/>
				);
			}
		}
		const divStyle =
		{
			position : 'absolute',
			overflow : 'hidden',
			height : '100%',
			width : '100%',
			pointerEvents : 'none',
			left : 0,
			top : 0
		}
		return (
			<div style={divStyle}>
				{markers}
			</div>
		);
	}
}

const mapState = (state) =>
{
	return {
		mapState : state.mapReducer
	};
};

export default connect(mapState)(MarkerLayer);