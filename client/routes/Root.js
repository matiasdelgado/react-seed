import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "mobx-react";

import App from '../components/app';
import About from '../components/about';
import NotFound from '../components/not-found';
import Nav from '../components/nav/Nav';

import appStore from "../stores/app.store";
import links from './links';

const Root = () => (
	<BrowserRouter>
		<Provider app={appStore}>
			<div>
				<Nav />
				<Switch>
					<Route exact path={links.index} component={App} />
					<Route path={links.about} component={About} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</Provider>
	</BrowserRouter>
);

export default Root;
