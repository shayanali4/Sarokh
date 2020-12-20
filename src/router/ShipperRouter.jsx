import React from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import ShipperDashboard from '../views/shipper/ShipperDashboard';
import CodShipments from '../views/shipper/CodShipments';
import PendingShipments from '../views/shipper/PendingShipments';
import ShippmentIssues from '../views/shipper/ShipmentIssues';
import ShipmentDetails from '../views/genericViews/shipment/ShipmentDetails';
import AddUser from '../views/shipper/AddUser';
import AllUsers from '../views/shipper/AllUsers';
import NewShipment from '../views/shipper/NewShipment';
import PrintWayBill from '../views/genericViews/printWayBill/PrintWayBill';
import PrintBulkShipment from '../views/shipper/PrintBulkShipment';
import BulkShipmentUpload from '../views/shipper/BulkShipmentUpload';
import AllShipments from '../views/shipper/AllShipments';
import AddShipperWarehouseFormRoutes from '../views/shipper/AddShipperWarehouseFormRoutes';
import WarehouseDetail from '../views/genericViews/warehouse/WarehouseDetail';
import { shipperRoutes } from '../navRoutes/shipperRoutes';
import { RecoilRoot } from 'recoil';
import { toast } from 'react-toastify';

function ShipperRouter(props) {
	return (
		<RecoilRoot>
			<Switch>
				<ProtectedRoute
					path="/shipper/dashboard"
					component={ShipperDashboard}
				/>
				<ProtectedRoute path="/shipper/codshipments" component={CodShipments} />
				<ProtectedRoute
					path="/shipper/pendingshipments"
					component={PendingShipments}
				/>
				<ProtectedRoute
					path="/shipper/shipmentissues"
					component={ShippmentIssues}
				/>

				<ProtectedRoute path="/shipper/allshipments" component={AllShipments} />

				<ProtectedRoute
					path="/shipper/shipments/vieworder"
					component={ShipmentDetails}
				/>
				<ProtectedRoute
					exact
					path="/shipper/users/adduser"
					component={AddUser}
				/>
				<ProtectedRoute path="/shipper/users/allusers" component={AllUsers} />
				<ProtectedRoute path="/shipper/printwaybill" component={PrintWayBill} />
				<ProtectedRoute
					path="/shipper/order/printwaybill"
					component={PrintWayBill}
				/>
				<ProtectedRoute
					path="/shipper/printbulkshipment"
					component={PrintBulkShipment}
				/>
				<ProtectedRoute
					path="/shipper/bulkshipmentupload"
					component={BulkShipmentUpload}
				/>

				<ProtectedRoute path="/shipper/newshipment" component={NewShipment} />
				<ProtectedRoute
					path="/shipper/shipperwarehouse/ourlocation/warehouseshipments"
					component={WarehouseDetail}
				/>
				<ProtectedRoute
					path="/shipper/shipperwarehouse"
					component={AddShipperWarehouseFormRoutes}
				/>
			</Switch>
		</RecoilRoot>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar
				routes={shipperRoutes}
				links={'shipper'}
				redirect={'/shipper/dashboard'}
			>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

export default ShipperRouter;

{
	/* <Route
	{...rest}
	render={(props) => {
		return <Component {...props} />;
	}}
/> */
}
