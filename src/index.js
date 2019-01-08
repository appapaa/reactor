'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './styles.scss';
import Loading from './Components/Loading';
const F1 = Loadable({
	loader: () => import('./Components/F1' /* webpackChunkName: 'F1' */),
	loading: Loading
});
const F2 = Loadable({
	loader: () => import('./Components/F2' /* webpackChunkName: 'F2' */),
	loading: Loading
});
const F3 = Loadable({
	loader: () => import('./Components/F3' /* webpackChunkName: 'F3' */),
	loading: Loading
});

window.__mainComponent = (name, root, props = {}) => {
   const C = eval(name);
   ReactDOM.render(
   	<C {...props}/>
   	, root)
};