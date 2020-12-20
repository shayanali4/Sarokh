import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function SarokhTask(props) {
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
									<h2 className="float-left">Sarokh Task</h2>
									<button className="btn btn-info float-right btnbrown">Confirm</button>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-md-8">
											<div className="form-row">
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor"> Driver Name:</label>
													<label className="col-sm-6 col-6">
														<p className=" text-left">abc</p>
													</label>
												</div>
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor">Driver ID:</label>
													<label className="col-sm-6 col-6">
														<p className=" text-left">123</p>
													</label>
												</div>
											</div>
											<div className="form-row">
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor"> Receiver Shipment:</label>
													<label className="col-sm-6 col-6">
														<p className=" text-left">abc</p>
													</label>
												</div>
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor">Give Shipment:</label>
													<label className="col-sm-6 col-6">
														<p className=" text-left">123</p>
													</label>
												</div>
												<div className="col-md-6">

												</div>
												<div className="col-md-6">

												</div>
											</div>
										</div>
										<div className="col-md-4">
											<div className="sarokh-pay-detail">
												<h3>Amount to Pay</h3>
												<div className="col">
													<label for="fullname">Enter Traking No:</label>
													<input id="fullname" type="text" name="fullName" class="form-control" placeholder=" Scan or Type Shipment Tracking Number" value="" />
													<button className="btn btn-info float-right btnbrown mt-2">Submit</button>
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
