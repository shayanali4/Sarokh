import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TrackingInput from '../views/trackingShipment/TrackingInput';
import Header from '../components/TopNav/TrackingShipmentTopNav.jsx';
import TrackingProgress from '../views/trackingShipment/TrackingProgress';
import AddAddress from '../views/trackingShipment/AddAddress';
import SelectPoint from '../views/trackingShipment/SelectPoint';
import { RecoilRoot } from 'recoil';

export default function TrackingShipmentRouter(props) {
	return (
		<RecoilRoot>
			<Switch>
				<Route path="/tracking/input" component={TrackingInput} />
				<NavRoute path="/tracking/details" component={TrackingProgress} />
				{/* <NavRoute path="/tracking/addaddress" component={AddAddress} />
				<NavRoute path="/tracking/addarea" component={SelectPoint} /> */}
			</Switch>
		</RecoilRoot>
	);
}

const NavRoute = ({ component: Component, ...rest }) => {
	return (
		<Header>
			<Component />
		</Header>
	);
};
