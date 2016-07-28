'use strict';
import React from 'react';
import {connect} from 'react-redux';
import * as action from './mapActions.js';
import mapAccessToken from './test/mapToken.js';

class Mapbox extends React.Component
{
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
		let markerPosition = [];
		let index = -1;
		const childrenWithProps = React.Children.map(this.props.children, (child) =>
		{
			if (this.props.mapState.mapLoaded)
			{
				if (child.props.lnglat)
				{
					const viewport = this.props.mapState.viewport;
					const globPixel = Math.pow(2, viewport.zoom + 9);
					const lnglat = child.props.lnglat;
					let showMarker = 'block';
					const pointPixel = this.map.project(lnglat);
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
						showMarker = 'none';
					}
					for (let i = 0; i < markerPosition.length; i++)
					{
						if (Math.pow((pixels[0] - markerPosition[i][0]), 2)
							+ Math.pow((pixels[1] - markerPosition[i][1]), 2)
							< 100)
						{
							showMarker = 'none';
							break;
						}
					}
					if (showMarker === 'block')
					{
						markerPosition.push(pixels);
					}
					const markerStyle =
					{
						position : 'absolute',
						left : pixels[0] - 25.57022603955158414669481207016163464282786458961580121961,
						top : pixels[1] - 25.57022603955158414669481207016163464282786458961580121961,
						display : showMarker
					};
					index++;
					return (
						<div key={index} style={markerStyle}>
							{React.cloneElement(child, {map : this.map})}
						</div>
					);
				}
			}
			return;
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