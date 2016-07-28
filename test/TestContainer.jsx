'use strict';
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../mapActions.js';
import Mapbox from '../Mapbox.jsx';
import MarkerLayer from './MarkerLayer.jsx';

class TestContainer extends React.Component
{
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
					<MarkerLayer />
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