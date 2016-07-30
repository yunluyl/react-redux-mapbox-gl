'use strict';
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../mapActions.js';
import Mapbox from '../Mapbox.jsx';
import Marker from './Marker.jsx';
import mapAccessToken from './mapToken.js';

class TestContainer extends React.Component
{
	getMap = (map) =>
	{
		this.map = map;
	};

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

    componentDidMount()
    {
    	this.map.on('load', function(e)
    	{
    		console.log('map loaded!');
    	});
    }

	render()
	{
		const mapChildren = this.items.map((item, i) =>
		{
			const overlay =
			{
				lnglat : item.lnglat,
				width : 30 + i * 5,
				height : 30 + i * 5,
				neighborDistance : 15
			};
			return (
				<Marker
					key={i}
					overlay={overlay}
					image={item.image}
				/>
			);
		});
		return (
			<Mapbox
				accessToken={mapAccessToken}
				getMap={this.getMap}
				boundMargin={15}
			>
				{mapChildren}
			</Mapbox>
		);
	}
}

const mapState = (state) =>
{
	return {
		mapState : state.mapReducer
	};
};

export default connect(mapState)(TestContainer);