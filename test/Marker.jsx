'use strict';
import React from 'react';

const Marker = (props) =>
{
	const imgStyle =
	{
		borderStyle : 'solid',
		borderWidth : '2px',
		borderColor : '#fff',	
		pointerEvents : 'none',
		width : props.overlay.width,
		height : props.overlay.height
	}
	let imageUrl;
	if (props.image)
	{
		imageUrl = props.image;
	}
	else
	{
		imageUrl = 'https://s3.amazonaws.com/mapbox-gl-react-redux-example/placeholder.jpg';
	}
	return (
		<img src={imageUrl} style = {imgStyle} />
	);
}

Marker.propTypes =
{
	image : React.PropTypes.string.isRequired
};

export default Marker;