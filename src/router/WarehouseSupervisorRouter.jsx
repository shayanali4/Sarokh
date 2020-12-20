import React from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from '../views/warehouseSupervisor/dashboard/Dashboard';
import WarehouseTerminal from '../views/warehouseSupervisor/warehouses/WarehouseTerminal';
import { warehouseSupervisorRoutes } from '../navRoutes/warehouseSupervisorRoutes';
import { RecoilRoot } from 'recoil';
import { toast } from 'react-toastify';

function WarehouseManagerRouter(props) {
	return (
		<RecoilRoot>
			<Switch>
				<ProtectedRoute
					path="/warehouseSupervisor/dashboard"
					component={Dashboard}
				/>
				<ProtectedRoute
					path="/warehouseSupervisor/warehouseTerminal"
					component={WarehouseTerminal}
				/>
			</Switch>
		</RecoilRoot>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar
				routes={warehouseSupervisorRoutes}
				links={'warehouseSupervisor'}
				redirect={'/warehouseSupervisor/dashboard'}
			>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

export default WarehouseManagerRouter;

{
	/* <Route
	{...rest}
	render={(props) => {
		return <Component {...props} />;
	}}
/> */
}
