import React, { Suspense } from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import Login from '../views/Authentication/login';
import Loader from '../components/Loading/Loading';
import DealerPoints from '../views/publicViews/dealerPoints/DealerPoints';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';
const AdminRouter = React.lazy(() => import('./AdminRouter'));
const ShipperRouter = React.lazy(() => import('./ShipperRouter'));
const BusinessSignup = React.lazy(() =>
	import('../views/sign-ups/ShipperSignup')
);
const IndividualSignup = React.lazy(() =>
	import('../views/sign-ups/IndividualSignUp')
);
const TrackingShipmentRouter = React.lazy(() =>
	import('./TrackingShipmentRouter')
);
const WarehouseManagerRouter = React.lazy(() =>
	import('./warehouseManagerRouter')
);
const WarehouseSupervisorRouter = React.lazy(() =>
	import('./WarehouseSupervisorRouter')
);
const DealerRouter = React.lazy(() => import('./DealerRouter'));

function ApplicationRouter(porps) {
	toast.configure({
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	return (
		<ErrorBoundary>
			<Suspense fallback={<Loader />}>
				<BrowserRouter>
					<Route exact={true} path="/" component={Login} />
					<Route exact={true} path="/logout" component={Logout} />
					<Route path="/business/signup" component={BusinessSignup} />
					<Route path="/individual/signup" component={IndividualSignup} />
					<Route path="/dealerPoints" component={DealerPoints} />
					<Route path="/tracking" component={TrackingShipmentRouter} />
					<Route path="/admin" component={AdminRouter} />
					<Route path="/shipper" component={ShipperRouter} />
					<Route path="/warehouseManager" component={WarehouseManagerRouter} />
					<Route
						path="/warehouseSupervisor"
						component={WarehouseSupervisorRouter}
					/>
					<Route path="/dealer" component={DealerRouter} />
				</BrowserRouter>
			</Suspense>
		</ErrorBoundary>
	);
}

function Logout() {
	localStorage.clear();
	toast.success('LOGOUT SUCCESSFUL');
	return <Redirect to="/" />;
}

export default React.memo(ApplicationRouter);
