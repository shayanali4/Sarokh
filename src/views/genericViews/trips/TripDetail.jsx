import React, { useState, useEffect, Fragment, useRef } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { tripDetailApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import moment from 'moment';
import { toast } from 'react-toastify';
import { isUndefined } from 'underscore';
import ReactToPrint from 'react-to-print';
import PrintTripDetail from './PrintTripDetail';

export default function TripDetail(props) {
	const hist = useHistory();
	const componentRef = useRef();
	const [response, setresponse] = useState({ loading: true });
	console.log(hist.location.state);

	useEffect(() => {
		if (response.loading && !isUndefined(hist.location.state)) {
			tripDetailApi(hist.location.state.id)
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		} else {
			hist.goBack();
		}
	}, []);

	const handleClick = (row) => {
		console.log(row.row.original.id);
		hist.push({
			pathname: '/shipper/shipments/vieworder',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const columns = [
		{
			Header: 'Tracking No',
			accessor: 'shipmentOrderId',
		},
		{
			Header: 'Location Type',
			accessor: 'pickupLocation',
		},
		{
			Header: 'Location',
			accessor: '',
			Cell: (row) => {
				return <>{row.row.original.pickupLocation}</>;
			},
		},
		{
			Header: 'Pickups/Delivery',
			accessor: 'pickupDelivery',
		},
		{
			Header: 'Amount Collect',
			accessor: 'codCollection',
		},
		{
			Header: 'Checkout Time',
			accessor: '',
			Cell: () => {
				return (
					<>{moment(response.data.dispatchDatetime).format('YYYY-MM-DD')}</>
				);
			},
		},
		{
			Header: 'Transaction Slip',
			accessor: '',
		},
	];

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

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">Trip Detail</h2>
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6"> Trip ID:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.data.id}</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Warehouse:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.data.startPoint}</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Driver Name:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.data.driverName}</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">City:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{response.data.vehicle.warehouse.city}
											</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Vehicle:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.data.vehicle.name}</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{moment(response.data.dispatchDatetime).format(
													'YYYY-MM-DD hh:mm:ss'
												)}
											</p>
										</label>
									</div>
								</div>
								<div className="row mt-3">
									<div className="flex-row col-md-3">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">
														{response.data.pickupShipments}
													</span>
													<br />
													Pick ups
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">
														{response.data.deliveryShipments}
													</span>
													<br />
													Deliveries
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">
														{response.data.codCollection}
													</span>
													<br />
													Amount Collected
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">
														{response.data.tripDetailItemsList.length}
													</span>
													<br />
													Locations
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									{response.data.tripDetailItemsList && (
										<div style={{ width: '100%' }}>
											<div style={{ display: 'none' }}>
												<PrintTripDetail
													ref={componentRef}
													response={response}
													columns={columns}
												/>
											</div>
											<ReactToPrint
												trigger={() => (
													<button className="btn btn-primary mt-4 float-right">
														Print Table
													</button>
												)}
												content={() => componentRef.current}
												pageStyle="width:100%"
											/>
										</div>
									)}
									<div class="col-sm-12 creatbill">
										<h2>Trip Summary</h2>
										<Table
											data={response.data.tripDetailItemsList}
											columns={columns}
											tableclass={'table-responsive custom-table'}
											pagination={true}
											filter={true}
										/>
									</div>
								</div>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
