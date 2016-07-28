'use strict';
import React from 'react';
import {connect} from 'react-redux';
import * as action from './mapActions.js';
import mapAccessToken from './test/mapToken.js';

class Mapbox extends React.Component
{
	handleInitFlyDone = () =>
	{
		this.props.dispatch(action.initFlyDone());
	};

	handleMouseDown = (e) =>
	{
		this.props.dispatch(action.mouseDown());
	};

	handleMouseUp = (e) =>
	{
		this.props.dispatch(action.mouseUp());
		if (this.dragged)
		{
			this.map.stop();
			this.dragged = false;
		}
	};

	handleDragStart = (e) =>
	{
		this.dragged = true;
	};

	handleResize = (e) =>
	{
		this.handleViewportChange();
	};

	handleViewportChange = () =>
	{
		const lnglat = this.map.getCenter();
		const viewport =
		{
			width : window.innerWidth,
			height : window.innerHeight,
			lng : lnglat.lng,
			lat : lnglat.lat,
			zoom : this.map.getZoom()
		};
		this.props.dispatch(action.setViewport(viewport));
	};

	componentWillMount()
	{
		this.dragged = false;
	}

	componentDidMount()
	{
		mapboxgl.accessToken = mapAccessToken;
		this.map = new mapboxgl.Map(
		{
			container : 'map',
			style : 'mapbox://styles/mapbox/outdoors-v9',
			zoom : 0,
			minZoom : 2,
			dragRotate : false,
			dragPan : true,
			keyboard : false
		});
		this.map.addControl(new mapboxgl.Navigation({position : 'bottom-right'}));
		this.handleViewportChange();

		this.map.on('move', this.handleViewportChange);
		this.map.on('mousedown', this.handleMouseDown);
		this.map.on('dragstart', this.handleDragStart);
		this.map.on('load', (e) =>
		{
			this.props.dispatch(action.mapLoad());
		});
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	componentWillUnmount()
	{
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('mouseup', this.handleMouseUp);
		if (this.map)
		{
			this.map.remove();
		}
	}

	render()
	{
		const childrenWithProps = React.Children.map(this.props.children, (child) =>
		{
			return React.cloneElement(child, {map : this.map});
		});
		const divStyle =
		{
			height : '100%'
		};
		const mapStyle =
		{
			position : 'absolute',
			height : '100%',
			width : '100%',
			overflow : 'hidden'
		};
		const overlayStyle =
		{
			position : 'absolute',
			width : '100%',
			height : '100%',
			pointerEvents : 'none',
			left : 0,
			top : 0
		}
		return (
			<div style={divStyle}>
				<div id='map' style={mapStyle} />
				<div id='overlays' style={overlayStyle}>
					{childrenWithProps}
				</div>
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

export default connect(mapState)(Mapbox);