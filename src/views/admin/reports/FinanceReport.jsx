import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	allDealersApi,
	pointListingApi,
	deletePointApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function FinanceReport(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

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
								<div className="card-header">
									<h2 className="float-left">Finance Report</h2>
								</div>
								<div className="card-body">
									<div className="form-row">
										<div className="col-sm-12">
											<h4 className="fs-20 redcolor">Filters</h4>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<input
												type="tel"
												name="contact"
												className="form-control"
												placeholder="Select Srart Date"
											/>
										</div>
										<div className="col">
											<input
												type="tel"
												name="contact"
												className="form-control"
												placeholder="Select End Date"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<input
												type="tel"
												name="contact"
												className="form-control"
												placeholder="Select User Type"
											/>
										</div>
										<div className="col">
											<input
												type="tel"
												name="contact"
												className="form-control"
												placeholder="Select User"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<h4 className="fs-20 redcolor">Bill Type</h4>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Credit Note
														</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Invoice
														</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Credit/ Debit
														</label>
											</div>
										</div>
										<div className="col">
											<h4 className="fs-20 redcolor">Transaction</h4>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Credit
														</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Debit
														</label>
											</div>
											<div className="clearfix"></div>
										</div>
										<div className="col">
											<h4 className="fs-20 redcolor">Payment Type</h4>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Sarokh Delivery
														</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Sarokh Pay
														</label>
											</div>
										</div>
										<div className="col">
											<h4 className="fs-20 redcolor">Status</h4>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Paid
														</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Unpaid
														</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<input
													className="form-check-input"
													name="wallet"
													type="checkbox"
													value="Driver Collection"
												/>
												<label className="form-check-label">
													Partially Paid
														</label>
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
