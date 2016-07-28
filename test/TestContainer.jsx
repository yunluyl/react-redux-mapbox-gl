'use strict';
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../mapActions.js';
import Mapbox from '../Mapbox.jsx';
import Marker from './Marker.jsx';

class TestContainer extends React.Component
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

	componentWillUnmount()
    {
        this.props.dispatch(action.reset());
    }

	render()
	{
		const divStyle =
		{
			height : '100%'
		};
		return (
			<div style={divStyle}>
				<Mapbox>
					<Marker lnglat={this.items[0].lnglat} image={this.items[0].image}/>
				</Mapbox>
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

export default connect(mapState)(TestContainer);