import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Step1 from '../../components/ShipperComponents/AddShipperWarehouse/Step1';
import Step2 from '../../components/ShipperComponents/AddShipperWarehouse/Step2';
import Step3 from '../../components/ShipperComponents/AddShipperWarehouse/Step3';
import OurLocation from '../../views/shipper/OurLocation';

export default function AddShipperWarehouseFormRoutes(props) {
	const routes = {
		step1: '/shipper/shipperwarehouse/add/step1',
		step2: '/shipper/shipperwarehouse/add/step2',
		step3: '/shipper/shipperwarehouse/add/step3',
		redirect: '/shipper/shipperwarehouse/ourlocation',
	};

	/* path in the steps define the next route after the form is submitted on a step. default path is the path that leads to
	the first step in case of refresh or incase the global state data is lost. redirect is the route which leads to the
	path after the final form is submitted */

	return (
		<RecoilRoot>
			<Switch>
				<Route exact path="/shipper/shipperwarehouse/ourlocation">
					<OurLocation />
				</Route>
				<Route exact path={routes.step1}>
					<Step1 path={routes.step2} />
				</Route>
				<Route exact path={routes.step2}>
					<Step2 path={routes.step3} defaultPath={routes.step1} />
				</Route>
				<Route exact path={routes.step3}>
					<Step3 defaultPath={routes.step1} redirect={routes.redirect} />
				</Route>
			</Switch>
		</RecoilRoot>
	);
}
