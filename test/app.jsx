'use strict';
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import reduxReducer from './reducer.js';
import TestContainer from './TestContainer.jsx';

const loggerMiddleware = createLogger();
const store = createStore(reduxReducer, applyMiddleware(loggerMiddleware)); //, applyMiddleware(loggerMiddleware)

render(
	<Provider store={store}>
		<TestContainer />
	</Provider>,
	document.getElementById('root')
);