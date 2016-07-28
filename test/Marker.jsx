'use strict';
import React from 'react';

const Marker = (props) =>
{
	const divStyle =
	{
		left : props.pixels[0] - 25.57022603955158414669481207016163464282786458961580121961,
		top : props.pixels[1] - 25.57022603955158414669481207016163464282786458961580121961,
		borderStyle : 'solid',
    	borderWidth : '2px',
    	borderColor : '#fff',
    	position : 'absolute',
    	pointerEvents : 'none',
    	width : 50,
    	height : 50
	};
	const imgStyle =
	{
		width : 50,
		height : 50
	};
	if (props.show)
	{
		divStyle.display = 'block';
	}
	else
	{
		divStyle.display = 'none';
	}
	let imageUrl;
	if (props.item.image)
	{
		imageUrl = props.item.image;
	}
	else
	{
		imageUrl = 'https://s3.amazonaws.com/mapbox-gl-react-redux-example/placeholder.jpg';
	}
	return (
		<div
			style = {divStyle}
		>
			<img src={imageUrl} style={imgStyle} />
		</div>
	);
}

Marker.propTypes =
{
	show : React.PropTypes.bool.isRequired,
	pixels : React.PropTypes.array.isRequired,
	item : React.PropTypes.object.isRequired
};

export default Marker;