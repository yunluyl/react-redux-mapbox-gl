'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _mapActions = require('./mapActions.js');

var action = _interopRequireWildcard(_mapActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mapbox = function (_React$Component) {
	_inherits(Mapbox, _React$Component);

	function Mapbox() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Mapbox);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mapbox)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.mapDivRef = function (c) {
			_this.mapDiv = c;
		}, _this.handleMouseUp = function (e) {
			if (_this.dragged) {
				_this.map.stop();
				_this.dragged = false;
			}
		}, _this.handleResize = function (e) {
			_this.handleViewportChange();
		}, _this.handleViewportChange = function () {
			var size = _this.mapDiv.getBoundingClientRect();
			var lnglat = _this.map.getCenter();
			var viewport = {
				width: size.width,
				height: size.height,
				lng: lnglat.lng,
				lat: lnglat.lat,
				zoom: _this.map.getZoom()
			};
			_this.props.dispatch(action.setViewport(viewport));
		}, _this.handleDragStart = function (e) {
			_this.dragged = true;
			_this.props.dispatch(action.dragStart());
		}, _this.handleDragEnd = function (e) {
			_this.props.dispatch(action.dragEnd());
		}, _this.handleTouchStart = function (e) {
			_this.props.dispatch(action.touchStart());
		}, _this.handleTouchEnd = function (e) {
			_this.props.dispatch(action.touchEnd());
		}, _this.handleTouchCancel = function (e) {
			_this.props.dispatch(action.touchCancel());
		}, _this.handleMoveStart = function (e) {
			_this.props.dispatch(action.moveStart());
		}, _this.handleMoveEnd = function (e) {
			_this.props.dispatch(action.moveEnd());
		}, _this.handleZoomStart = function (e) {
			_this.props.dispatch(action.zoomStart());
		}, _this.handleZoomEnd = function (e) {
			_this.props.dispatch(action.zoomEnd());
		}, _this.handleBoxZoomStart = function (e) {
			_this.props.dispatch(action.boxZoomStart());
		}, _this.handleBoxZoomEnd = function (e) {
			_this.props.dispatch(action.boxZoomEnd());
		}, _this.handleBoxZoomCancel = function (e) {
			_this.props.dispatch(action.boxZoomCancel());
		}, _this.handleRotateStart = function (e) {
			_this.props.dispatch(action.rotateStart());
		}, _this.handleRotateEnd = function (e) {
			_this.props.dispatch(action.rotateEnd());
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Mapbox, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.dragged = false;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var mapboxRef = void 0;
			if (this.props.mapboxgl) {
				mapboxRef = this.props.mapboxgl;
			} else {
				mapboxRef = mapboxgl;
			}
			mapboxRef.accessToken = this.props.accessToken;
			var options = Object.assign({ container: 'map' }, this.props.options);
			this.map = new mapboxRef.Map(options);
			if (this.props.getMap) {
				this.props.getMap(this.map);
			}
			this.handleViewportChange();

			this.map.on('move', this.handleViewportChange);
			this.map.on('load', function (e) {
				_this2.props.dispatch(action.mapLoad());
			});
			window.addEventListener('resize', this.handleResize);
			window.addEventListener('mouseup', this.handleMouseUp);
			if (this.props.mapEventListener) {
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
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.handleResize);
			window.removeEventListener('mouseup', this.handleMouseUp);
			this.props.dispatch(action.reset());
			if (this.map) {
				this.map.remove();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var overlays = void 0;
			if (this.props.children) {
				var childrenWithProps = [];
				var boundMargin = void 0;
				if (this.props.boundMargin) {
					boundMargin = this.props.boundMargin;
				} else {
					boundMargin = 0;
				}
				var index = -1;
				for (var i = this.props.children.length - 1; i >= 0; i--) {
					var child = this.props.children[i];
					var hideMarker = false;
					if (this.props.mapState.mapLoaded) {
						if (child.props.overlay) {
							var viewport = this.props.mapState.viewport;
							var globPixel = Math.pow(2, viewport.zoom + 9);
							var lnglat = child.props.overlay.lnglat;
							var pointPixel = this.map.project(lnglat);
							var pixels = [pointPixel.x, pointPixel.y];
							pixels[0] = pixels[0] % globPixel;
							if (pixels[0] < (viewport.width - 3 * globPixel) / 2) {
								pixels[0] += 2 * globPixel;
							} else if (pixels[0] < (viewport.width - globPixel) / 2) {
								pixels[0] += globPixel;
							}
							if (pixels[0] < -boundMargin || pixels[0] > viewport.width + boundMargin || pixels[1] < -boundMargin || pixels[1] > viewport.height + boundMargin) {
								continue;
							}
							for (var _i = 0; _i < childrenWithProps.length; _i++) {
								var idxChild = childrenWithProps[_i].props.children;
								var neighborDistance = void 0;
								if (!idxChild.props.overlay) {
									continue;
								}
								if (!child.props.overlay.neighborDistance && !idxChild.props.overlay.neighborDistance) {
									continue;
								}
								if (child.props.overlay.neighborDistance && !idxChild.props.overlay.neighborDistance) {
									neighborDistance = child.props.overlay.neighborDistance;
								} else if (!child.props.overlay.neighborDistance && idxChild.props.overlay.neighborDistance) {
									neighborDistance = idxChild.props.overlay.neighborDistance;
								} else {
									neighborDistance = Math.max(child.props.overlay.neighborDistance, idxChild.props.overlay.neighborDistance);
								}
								if (neighborDistance === 0) {
									continue;
								}
								if (idxChild.props.pixels) {
									if (Math.pow(pixels[0] - idxChild.props.pixels[0], 2) + Math.pow(pixels[1] - idxChild.props.pixels[1], 2) < Math.pow(neighborDistance, 2)) {
										hideMarker = true;
										break;
									}
								}
							}
							if (hideMarker) {
								continue;
							}
							var childStyle = {
								position: 'absolute',
								left: pixels[0],
								top: pixels[1]
							};
							if (child.props.overlay.width) {
								childStyle.left -= child.props.overlay.width / 2;
								childStyle.width = child.props.overlay.width;
							}
							if (child.props.overlay.height) {
								childStyle.top -= child.props.overlay.height / 2;
								childStyle.height = child.props.overlay.height;
							}
							index++;
							childrenWithProps.unshift(_react2.default.createElement(
								'div',
								{ key: index, style: childStyle },
								_react2.default.cloneElement(child, { map: this.map, pixels: pixels })
							));
						} else {
							var _childStyle = {
								position: 'absolute',
								left: 0,
								top: 0
							};
							index++;
							childrenWithProps.unshift(_react2.default.createElement(
								'div',
								{ key: index, style: _childStyle },
								_react2.default.cloneElement(child, { map: this.map })
							));
						}
					}
				}
				var overlayStyle = {
					position: 'absolute',
					width: this.props.style.width,
					height: this.props.style.height,
					overflow: 'hidden',
					pointerEvents: 'none',
					left: 0,
					top: 0
				};
				overlays = _react2.default.createElement(
					'div',
					{ id: 'overlays', style: overlayStyle },
					childrenWithProps
				);
			}
			var divStyle = this.props.style;
			var mapStyle = {
				position: 'absolute',
				width: this.props.style.width,
				height: this.props.style.height,
				overflow: 'hidden'
			};
			return _react2.default.createElement(
				'div',
				{ ref: this.mapDivRef, id: 'mapWrap', style: divStyle },
				_react2.default.createElement('div', { id: 'map', style: mapStyle }),
				overlays
			);
		}
	}]);

	return Mapbox;
}(_react2.default.Component);

Mapbox.propTypes = {
	style: _react2.default.PropTypes.object.isRequired,
	accessToken: _react2.default.PropTypes.string.isRequired
};
Mapbox.defaultProps = {
	mapEventListener: true
};


var mapState = function mapState(state) {
	return {
		mapState: state.mapReducer
	};
};

exports.default = (0, _reactRedux.connect)(mapState)(Mapbox);