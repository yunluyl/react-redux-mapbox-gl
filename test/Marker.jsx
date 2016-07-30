'use strict';
import React from 'react';

const Marker = (props) =>
{
	const divStyle =
	{
		borderStyle : 'solid',
    	borderWidth : '2px',
    	borderColor : '#fff',	
    	pointerEvents : 'none',
    	width : 50,
    	height : 50
	};
	const imgStyle =
	{
		width : 50,
		height : 50
	};
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
		<div style = {divStyle}>
			<img src={imageUrl} style={imgStyle} />
		</div>
	);
}

Marker.propTypes =
{
	image : React.PropTypes.string.isRequired
};

export default Marker;