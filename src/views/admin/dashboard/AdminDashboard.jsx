import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { adminDashboard } from '../../../Api/adminApi';
import { toast } from 'react-toastify';
import { useTransition, animated } from 'react-spring';
import Loading from '../../../components/Loading/Loading';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';

export default function AdminDashboard(props) {
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		adminDashboard()
			.then((res) => {
				setresponse({ loading: false, data: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

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
						<Container>
							<div className="pr-3 pl-3">
								<div className="row mt-4">
									<div className="col-sm-6 col-lg-3">
										<div className="card text-white bg-info">
											<div className="card-body pb-4">
												<div className="text-value">
													{response.data.totalOrders}
												</div>
												<div>Total Orders</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6 col-lg-3">
										<div className="card text-white bg-primary">
											<div className="card-body pb-4">
												<div className="text-value">
													{response.data.inProgressOrders}
												</div>
												<div>Orders in Progress</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6 col-lg-3">
										<div className="card text-white bg-warning">
											<div className="card-body pb-4">
												<div className="text-value">
													{response.data.pendingDelivery}
												</div>
												<div>Pending Deliveries</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6 col-lg-3">
										<div className="card text-white bg-danger">
											<div className="card-body pb-4">
												<div className="text-value">
													{response.data.pendingPickups}
												</div>
												<div>Pending Pickups</div>
											</div>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-9">
										<div className="card">
											<div className="card-body">
												<div className="row">
													<div className="col-sm-12">
														<GoogleMapComponent
															isMarkerShown={true}
															position={[
																{
																	label: 'sup',
																	latitude: 23.8859,
																	longitude: 39.1925,
																},
															]}
															label={true}
															changefunction={setresponse}
															googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
															loadingElement={
																<div className="spinner-border" role="status">
																	<span className="sr-only">Loading...</span>
																</div>
															}
															containerElement={
																<div
																	style={{
																		height: `400px`,
																		width: `100%`,
																		margin: `50px auto`,
																	}}
																/>
															}
															mapElement={<div style={{ height: `100%` }} />}
															autocomplete={false}
														/>
													</div>
												</div>
												<div className="chart-wrapper"></div>
											</div>
										</div>
									</div>
									<div className="col-3">
										<div className="row">
											<div className="col-12">
												<div className="card text-white bg-warning">
													<div className="card-body pb-4">
														<div className="text-value">
															{response.data.walletPickups}
														</div>
														<div>Wallet Pickups</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card text-white bg-primary">
													<div className="card-body pb-4">
														<div className="text-value">
															{response.data.codPayable}
														</div>
														<div>COD Payables</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card text-white bg-info">
													<div className="card-body pb-4">
														<div className="text-value">
															{response.data.prepaidOrdersReceivable}
														</div>
														<div>Prepaid Order Receivables</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card text-white bg-primary">
													<div className="card-body pb-4">
														<div className="text-value">
															{response.data.agentsPayable}
														</div>
														<div>Dealer Points Payables</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card text-white bg-danger">
													<div className="card-body pb-4">
														<div className="text-value">
															{response.data.agentsReceivable}
														</div>
														<div>Dealer Points Receivables</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card text-white bg-warning">
													<div className="card-body pb-4">
														<div className="text-value">
															{response.data.driverReceivable}
														</div>
														<div>Driver Receivables</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card text-white bg-primary">
													<div className="card-body pb-4">
														<div className="text-value">
															{response.data.driverPayable}
														</div>
														<div>Driver Payables</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
