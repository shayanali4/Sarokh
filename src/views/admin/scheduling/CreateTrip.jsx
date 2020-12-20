import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import Form from '../../../components/CreateTripForm/CreateTripForm';
import { useHistory } from 'react-router-dom';
import {
	getCreateTripDataApi,
	tripShipmentsApi,
	createTrip,
} from '../../../Api/adminApi';
import { createTripTableListingHelper } from '../../../Utils/tripHelper';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function CreateTrip(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const [pickData, setpickData] = useState([]);
	const [deliveryData, setdeliveryData] = useState([]);
	const [pointsData, setpointsData] = useState([]);
	console.log(response);

	useEffect(() => {
		if (response.loading && response.id === undefined) {
			getCreateTripDataApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
		if (response.id && response.loading) {
			tripShipmentsApi(response.id.warehouse)
				.then((res) => {
					console.log(res);
					setresponse({
						...response,
						loading: false,
						tabledata: createTripTableListingHelper(res),
					});
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const submitResponse = () => {
		if (
			(pickData.length !== 0 && deliveryData.length === 0) ||
			(pickData.length === 0 && deliveryData.length !== 0) ||
			(pickData.length !== 0 && deliveryData.length !== 0) ||
			pointsData.length !== 0
		) {
			let dataset1 = [];
			let dataset2 = [];
			pickData.map((doc) => {
				dataset1.push(doc.original);
			});
			deliveryData.map((doc) => {
				dataset1.push(doc.original);
			});
			pointsData.map((doc) => {
				dataset2.push(doc.original);
			});
			const finalresult = {
				shipmentsList: dataset1,
				pointsList: dataset2,
				warehouseId: response.id.warehouse,
				driverId: response.id.driver,
				vehicleId: response.id.vehicle,
			};
			console.log(finalresult);
			createTrip(finalresult)
				.then((res) => {
					toast.success('Trip Created');
					hist.push('/admin/scheduling/alltrips');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		} else {
			toast.error('please select from the tables to create trip');
		}
	};

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-270px,0,0)',
			transition: 'ease-out 0.3s',
		},
	});

	const columns = [
		{
			Header: 'Tracking Number',
			accessor: 'shipmentId',
		},
		{
			Header: 'Shipper',
			accessor: 'shipper',
		},
		{
			Header: 'Location Name',
			accessor: 'locationName',
		},
		{
			Header: 'Destination Address',
			accessor: 'address',
		},
		{
			Header: 'COD',
			accessor: 'codcollection',
		},
	];

	const columns1 = [
		{
			Header: 'Dealer Name',
			accessor: 'dealerPointName',
		},
		{
			Header: 'Wallet Balance',
			accessor: 'walletBalance',
		},
		{
			Header: 'Destination Address',
			accessor: 'address',
		},
	];

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								<h2 className="float-left">Create Trip</h2>
							</div>
							<div className="card-body">
								<Form
									listing={response}
									setId={setresponse}
									deliveryData={deliveryData}
									pointsData={pointsData}
									pickUpData={pickData}
								/>
								{response.tabledata ? (
									<Fragment>
										<h2 style={{ margin: '10px' }}> Pickups</h2>
										<Table
											data={response.tabledata.pickups}
											columns={columns}
											tableclass={'table-responsive custom-table'}
											pagination={true}
											filter={true}
											selectionToggle={true}
											rowToggle={true}
											selectedData={setpickData}
											dataCheck={pickData}
										/>
										<div className="margintop30 bordertopcustom">
											<h2 style={{ margin: '10px' }}> Deliveries</h2>
											<Table
												data={response.tabledata.deliveries}
												columns={columns}
												tableclass={'table-responsive custom-table'}
												pagination={true}
												filter={true}
												rowToggle={true}
												selectedData={setdeliveryData}
												dataCheck={deliveryData}
											/>
										</div>
										<div className="margintop30 bordertopcustom">
											<h2 style={{ margin: '10px' }}> Payment Collection</h2>
											<Table
												data={response.tabledata.pointsList}
												columns={columns1}
												tableclass={'table-responsive custom-table'}
												pagination={true}
												filter={true}
												rowToggle={true}
												selectedData={setpointsData}
												dataCheck={pointsData}
											/>
										</div>
										<div className="btn-container">
											<button
												className="btn btn-success float-right"
												onClick={() => submitResponse()}
											>
												Create Trip
											</button>
										</div>
									</Fragment>
								) : null}
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
