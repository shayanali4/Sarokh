import React from 'react';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Step1 from '../../../components/ShipperComponents/AddShipperWarehouse/Step1';
import Step2 from '../../../components/ShipperComponents/AddShipperWarehouse/Step3';
import Step3 from '../../../components/ShipperComponents/AddShipperWarehouse/Step4';
import WarehouseList from './WarehouseList';

export default function AddShipperWarehouse(props) {
	const routes = {
		step1: '/admin/warehouses/addshipperwarehouse/step1',
		step2: '/admin/warehouses/addshipperwarehouse/step2',
		step3: '/admin/warehouses/addshipperwarehouse/step3',
		redirect: '/admin/warehouses/warehouselist',
	};

	/* path in the steps define the next route after the form is submitted on a step. default path is the path that leads to
	the first step in case of refresh or incase the global state data is lost. redirect is the route which leads to the
	path after the final form is submitted */

	/* type props defines the step indicator it can be shipper or admin in this case admin so indicator of admin steps
    will appear */

	return (
		<RecoilRoot>
			<Switch>
				<Route exact path={routes.redirect}>
					<WarehouseList />
				</Route>
				<Route exact path={routes.step1}>
					<Step1 path={routes.step2} type="Admin" />
				</Route>
				<Route exact path={routes.step2}>
					<Step2 path={routes.step3} defaultPath={routes.step1} type="Admin" />
				</Route>
				<Route exact path={routes.step3}>
					<Step3
						defaultPath={routes.step1}
						redirect={routes.redirect}
						type="Admin"
					/>
				</Route>
			</Switch>
		</RecoilRoot>
	);
}
