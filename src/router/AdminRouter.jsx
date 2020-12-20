import React from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import AdminDashboard from '../views/admin/dashboard/AdminDashboard';
import DriverLocation from '../views/admin/tracking/DriverLocation';
import OrderLocation from '../views/admin/tracking/OrderLocation';
import AllShipments from '../views/admin/shipments/AllShipments';
import PendingShipments from '../views/admin/shipments/PendingShipments';
import DeliveredShipments from '../views/admin/shipments/DeliveredShipments';
import CodShipments from '../views/admin/shipments/CodShipments';
import PrepaidShipments from '../views/admin/shipments/PrepaidShipments';
import ReturnShipments from '../views/admin/shipments/ReturnShipments';
import PickupShipments from '../views/admin/shipments/PickupShipments';
import DeliveryShipments from '../views/admin/shipments/DeliveryShipments';
import ShipmentIssues from '../views/admin/shipments/ShipmentIssues';
import AllShippers from '../views/admin/shippers/AllShippers';
import ShipperSetting from '../views/admin/shippers/ShipperSetting';
import ShipperDetail from '../views/admin/shippers/ShipperDetail';
import ShipperBilling from '../views/admin/shippers/ShipperBilling';
import AddUser from '../views/admin/users/AddUser';
import AllUsers from '../views/admin/users/AllUsers';
import AddShipperWarehouse from '../views/admin/warehouses/AddShipperWarehouse';
import WarehouseTerminal from '../views/admin/warehouses/WarehouseTerminal';
import WarehouseDetail from '../views/genericViews/warehouse/WarehouseDetail';
import AddDriver from '../views/admin/drivers/AddDriver';
import FinanceDashboard from '../views/admin/finance/FinanceDashboard';
import CreateTrip from '../views/admin/scheduling/CreateTrip';
import AllTrips from '../views/admin/scheduling/AllTrips';
import TripDetail from '../views/genericViews/trips/TripDetail';
import AddVehicle from '../views/admin/Vehicle/AddVehicle';
import AllVehicles from '../views/admin/Vehicle/AllVehicle';
import MaintenanceRecords from '../views/admin/Vehicle/MaintenanceRecords';
import AddDealer from '../views/admin/dealer/AddDealer';
import AddPoint from '../views/admin/dealer/AddPoint';
import PointListing from '../views/admin/dealer/PointListing';
import CreateBill from '../views/admin/finance/CreateBill';
import PaymentRecord from '../views/admin/finance/RecordPayment';
import BillDetail from '../views/admin/finance/BillDetail';
import BillListing from '../views/admin/finance/BillListing';
import AddVendor from '../views/admin/vendor/AddVendor';
import AllVendors from '../views/admin/vendor/VendorListing';
import VendorDetail from '../views/admin/vendor/VendorDetail';
import FinanceReport from '../views/admin/reports/FinanceReport';
import ShipmentReport from '../views/admin/reports/ShipmentReport';
import ShipmentDetails from '../views/genericViews/shipment/ShipmentDetails';
import PrintOrder from '../views/genericViews/printWayBill/PrintWayBill';
import { Switch, Redirect } from 'react-router-dom';
import { adminRoutes } from '../navRoutes/adminRoutes';
import { toast } from 'react-toastify';

export default function AdminRouter(props) {
	return (
		<Switch>
			<ProtectedRoute path="/admin/dashboard" component={AdminDashboard} />
			<ProtectedRoute
				path="/admin/tracking/driverlocations"
				component={DriverLocation}
			/>
			<ProtectedRoute
				path="/admin/tracking/orderlocations"
				component={OrderLocation}
			/>
			<ProtectedRoute
				path="/admin/shipments/allshipments"
				component={AllShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/vieworder"
				component={ShipmentDetails}
			/>
			<ProtectedRoute path="/admin/printwaybill" component={PrintOrder} />
			<ProtectedRoute
				path="/admin/shipments/deliveredshipments"
				component={DeliveredShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/pendingshipments"
				component={PendingShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/CODshipments"
				component={CodShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/prepaidshipments"
				component={PrepaidShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/returnshipments"
				component={ReturnShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/pickupshipments"
				component={PickupShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/deliveryshipments"
				component={DeliveryShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/shipmentissues"
				component={ShipmentIssues}
			/>
			<ProtectedRoute
				path="/admin/shippers/allshippers"
				component={AllShippers}
			/>

			<ProtectedRoute
				path="/admin/shippers/shipperbilling"
				component={ShipperBilling}
			/>
			<ProtectedRoute
				path="/admin/shippers/shipperdetail"
				component={ShipperDetail}
			/>
			<ProtectedRoute
				path="/admin/shippers/shippersetting"
				component={ShipperSetting}
			/>

			<ProtectedRoute path="/admin/users/adduser" component={AddUser} />
			<ProtectedRoute path="/admin/users/allusers" component={AllUsers} />
			<ProtectedRoute
				path="/admin/warehouses/warehouseterminal"
				component={WarehouseTerminal}
			/>
			<ProtectedRoute
				path="/admin/warehouses/warehouseshipments"
				component={WarehouseDetail}
			/>
			<ProtectedRoute
				path="/admin/warehouses/"
				component={AddShipperWarehouse}
			/>

			<ProtectedRoute path="/admin/drivers/" component={AddDriver} />
			<ProtectedRoute
				path="/admin/finance/dasboard"
				component={FinanceDashboard}
			/>
			<ProtectedRoute
				path="/admin/vehicles/addvehicle"
				component={AddVehicle}
			/>
			<ProtectedRoute
				path="/admin/vehicles/allvehicles"
				component={AllVehicles}
			/>

			<ProtectedRoute
				path="/admin/vehicles/maintenancerecords"
				component={MaintenanceRecords}
			/>

			<ProtectedRoute path="/admin/dealer/allpoints" component={PointListing} />
			<ProtectedRoute path="/admin/dealer/addpoint" component={AddPoint} />
			<ProtectedRoute path="/admin/dealer/" component={AddDealer} />
			<ProtectedRoute path="/admin/finance/createbill" component={CreateBill} />

			<ProtectedRoute
				path="/admin/finance/paymentrecord"
				component={PaymentRecord}
			/>
			<ProtectedRoute path="/admin/finance/billdetail" component={BillDetail} />
			<ProtectedRoute
				path="/admin/finance/billlisting"
				component={BillListing}
			/>
			<ProtectedRoute
				path="/admin/scheduling/createtrip"
				component={CreateTrip}
			/>

			<ProtectedRoute path="/admin/scheduling/alltrips" component={AllTrips} />
			<ProtectedRoute
				path="/admin/scheduling/tripdetail"
				component={TripDetail}
			/>
			<ProtectedRoute path="/admin/vendors/addvendor" component={AddVendor} />
			<ProtectedRoute
				path="/admin/vendors/vendordetail"
				component={VendorDetail}
			/>
			<ProtectedRoute path="/admin/vendors/allvendors" component={AllVendors} />
			<ProtectedRoute
				path="/admin/reports/financereport"
				component={FinanceReport}
			/>
			<ProtectedRoute
				path="/admin/reports/shipmentreport"
				component={ShipmentReport}
			/>
		</Switch>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar
				routes={adminRoutes}
				links={'admin'}
				redirect={'/admin/dashboard'}
			>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

{
	/* <Route
    {...rest}
    render={(props) => {
        return <Component {...props} />;
    }}
/> */
}
