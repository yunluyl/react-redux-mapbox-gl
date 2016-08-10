'use strict';
import React from 'react';
import {connect} from 'react-redux';
import * as action from './mapActions.js';

class Mapbox extends React.Component
{
	static propTypes =
	{
		style : React.PropTypes.object.isRequired,
		accessToken : React.PropTypes.string.isRequired
	};

	static defaultProps =
	{
		mapEventListener : true
	};

	mapDivRef = (c) =>
	{
		this.mapDiv = c;
	};

	handleMouseUp = (e) =>
	{
		if (this.dragged)
		{
			this.map.stop();
			this.dragged = false;
		}
	};

	handleResize = (e) =>
	{
		this.handleViewportChange();
	};

	handleViewportChange = () =>
	{
		const size = this.mapDiv.getBoundingClientRect();
		const lnglat = this.map.getCenter();
		const viewport =
		{
			width : size.width,
			height : size.height,
			lng : lnglat.lng,
			lat : lnglat.lat,
			zoom : this.map.getZoom()
		};
		this.props.dispatch(action.setViewport(viewport));
	};

	handleDragStart = (e) =>
	{
		this.dragged = true;
		this.props.dispatch(action.dragStart());
	};
	handleDragEnd = (e) =>
	{
		this.props.dispatch(action.dragEnd());
	};

	handleTouchStart = (e) =>
	{
		this.props.dispatch(action.touchStart());
	};
	handleTouchEnd = (e) =>
	{
		this.props.dispatch(action.touchEnd());
	};
	handleTouchCancel = (e) =>
	{
		this.props.dispatch(action.touchCancel());
	};

	handleMoveStart = (e) =>
	{
		this.props.dispatch(action.moveStart());
	};
	handleMoveEnd = (e) =>
	{
		this.props.dispatch(action.moveEnd());
	};

	handleZoomStart = (e) =>
	{
		this.props.dispatch(action.zoomStart());
	};
	handleZoomEnd = (e) =>
	{
		this.props.dispatch(action.zoomEnd());
	};

	handleBoxZoomStart = (e) =>
	{
		this.props.dispatch(action.boxZoomStart());
	};
	handleBoxZoomEnd = (e) =>
	{
		this.props.dispatch(action.boxZoomEnd());
	};
	handleBoxZoomCancel = (e) =>
	{
		this.props.dispatch(action.boxZoomCancel());
	};

	handleRotateStart = (e) =>
	{
		this.props.dispatch(action.rotateStart());
	};
	handleRotateEnd = (e) =>
	{
		this.props.dispatch(action.rotateEnd());
	};

	componentWillMount()
	{
		this.dragged = false;
	}

	componentDidMount()
	{
		let mapboxRef;
		if (this.props.mapboxgl)
		{
			mapboxRef = this.props.mapboxgl;
		}
		else
		{
			mapboxRef = mapboxgl;
		}
		mapboxRef.accessToken = this.props.accessToken;
		const options = Object.assign({container : 'map'}, this.props.options);
		this.map = new mapboxRef.Map(options);
		if (this.props.getMap)
		{
			this.props.getMap(this.map);
		}
		this.handleViewportChange();

		this.map.on('move', this.handleViewportChange);
		this.map.on('load', (e) =>
		{
			this.props.dispatch(action.mapLoad());
		});
		window.addEventListener('resize', this.handleResize);
		window.addEventListener('mouseup', this.handleMouseUp);
		if (this.props.mapEventListener)
		{
			this.map.on('dragstart', this.handleDragStart);
			this.map.on('dragend', this.handleDragEnd);

			this.map.on('touchstart', this.handleTouchStart);
			this.map.on('touchend', this.handleTouchEnd);
			this.map.on('touchcancel', this.handleTouchCancel);

			this.map.on('movestart', this.handleMoveStart);
			this.map.on('moveend', this.handleMoveEnd);

			this.map.on('zoomstart', this.handleZoomStart);
			this.map.on('zoomend', this.handleZoomEnd);

			this.map.on('boxzoomstart', this.handleBoxZoomStart);
			this.map.on('boxzoomend', this.handleBoxZoomEnd);
			this.map.on('boxzoomcancel', this.handleBoxZoomCancel);

			this.map.on('rotatestart', this.handleRotateStart);
			this.map.on('rotateend', this.handleRotateEnd);
		}
	}

	componentWillUnmount()
	{
		window.removeEventListener('resize', this.handleResize);
		window.removeEventListener('mouseup', this.handleMouseUp);
		this.props.dispatch(action.reset());
		if (this.map)
		{
			this.map.remove();
		}
	}

	render()
	{
		let overlays;
		if (this.props.children)
		{
			let childrenWithProps = [];
			let boundMargin;
			if (this.props.boundMargin)
			{
				boundMargin = this.props.boundMargin;
			}
			else
			{
				boundMargin = 0;
			}
			let index = -1;
			for (let i = this.props.children.length - 1; i >= 0; i--)
			{
				const child = this.props.children[i];
				let hideMarker = false;
				if (this.props.mapState.mapLoaded)
				{
					if (child.props.overlay)
					{
						const viewport = this.props.mapState.viewport;
						const globPixel = Math.pow(2, viewport.zoom + 9);
						const lnglat = child.props.overlay.lnglat;
						const pointPixel = this.map.project(lnglat);
						const pixels = [pointPixel.x, pointPixel.y];
						pixels[0] = pixels[0] % globPixel;
						if (pixels[0] < (viewport.width - 3 * globPixel) / 2)
						{
							pixels[0] += 2 * globPixel;
						}
						else if (pixels[0] < (viewport.width - globPixel) / 2)
						{
							pixels[0] += globPixel;
						}
						if (pixels[0] < -boundMargin || pixels[0] > viewport.width + boundMargin
							|| pixels[1] < -boundMargin || pixels[1] > viewport.height + boundMargin)
						{
							continue;
						}
						for (let i = 0; i < childrenWithProps.length; i++)
						{
							const idxChild = childrenWithProps[i].props.children;
							let neighborDistance;
							if (!idxChild.props.overlay)
							{
								continue;
							}
							if (!child.props.overlay.neighborDistance && !idxChild.props.overlay.neighborDistance)
							{
								continue;
							}
							if (child.props.overlay.neighborDistance && !idxChild.props.overlay.neighborDistance)
							{
								neighborDistance = child.props.overlay.neighborDistance;
							}
							else if (!child.props.overlay.neighborDistance && idxChild.props.overlay.neighborDistance)
							{
								neighborDistance = idxChild.props.overlay.neighborDistance;
							}
							else
							{
								neighborDistance = Math.max(child.props.overlay.neighborDistance, idxChild.props.overlay.neighborDistance);
							}
							if (neighborDistance === 0)
							{
								continue;
							}
							if (idxChild.props.pixels)
							{
								if (Math.pow((pixels[0] - idxChild.props.pixels[0]), 2)
									+ Math.pow((pixels[1] - idxChild.props.pixels[1]), 2)
									< Math.pow(neighborDistance, 2))
								{
									hideMarker = true;
									break;
								}
							}
						}
						if (hideMarker)
						{
							continue;
						}
						const childStyle =
						{
							position : 'absolute',
							left : pixels[0],
							top : pixels[1]
						};
						if (child.props.overlay.width)
						{
							childStyle.left -= child.props.overlay.width / 2;
							childStyle.width = child.props.overlay.width;
						}
						if (child.props.overlay.height)
						{
							childStyle.top -= child.props.overlay.height / 2;
							childStyle.height = child.props.overlay.height;
						}
						index++;
						childrenWithProps.unshift(
							<div key={index} style={childStyle}>
								{React.cloneElement(child, {map : this.map, pixels : pixels})}
							</div>
						);
					}
					else
					{
						const childStyle =
						{
							position : 'absolute',
							left : 0,
							top : 0,
						};
						index++;
						childrenWithProps.unshift(
							<div key={index} style={childStyle}>
								{React.cloneElement(child, {map : this.map})}
							</div>
						);
					}
				}
			}
			const overlayStyle =
			{
				position : 'absolute',
				width : this.props.style.width,
				height : this.props.style.height,
				overflow : 'hidden',
				pointerEvents : 'none',
				left : 0,
				top : 0
			};
			overlays = (
				<div id='overlays' style={overlayStyle}>
					{childrenWithProps}
				</div>
			);
		}
		const divStyle = this.props.style;
		const mapStyle =
		{
			position : 'absolute',
			width : this.props.style.width,
			height : this.props.style.height,
			overflow : 'hidden'
		};
		return (
			<div ref={this.mapDivRef} id='mapWrap' style={divStyle}>
				<div id='map' style={mapStyle} />
				{overlays}
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