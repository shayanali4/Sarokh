import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function DeliverShipment(props) {
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
									<h2 className="float-left">Deliver Shipment</h2>
								</div>
								<div className="card-body">
									<label for="fullname">Traking No</label>
									<input id="fullname" type="text" name="fullName" class="form-control" placeholder="  Enter Tracking No" value="" />
									<button className="btn btn-info float-right btnbrown mt-2">Search</button>
									<div className="clearfix"></div>
									<div className="form-row">
										<div className="col-sm-6">
											<div className="row">
												<label className="col-sm-6 col-6 redcolor">Tracking No:</label>
												<label className="col-sm-6 col-6">
													<p className=" text-left">00007000125</p>
												</label>
											</div>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6 redcolor">Receiver Name:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left">Salman Arif</p>
											</label>
										</div>
										<div className="col-sm-12 right-align">
											<label className="col-sm-6 col-6 redcolor">Amount:</label>
											<label className="col-sm-6 col-6 text-right">Sar 175/-</label>
										</div>
										<div className="col-md-6">
											<label for="fullname">Receiver OTP:</label>
											<input id="fullname" type="text" name="fullName" class="form-control" placeholder="Enter OTP" value="" />
										</div>
										<div className="col-md-6">
											<label for="fullname">Paid Amount:</label>
											<input id="fullname" type="text" name="fullName" class="form-control" placeholder="Enter Amount" value="" />
											<button className="btn btn-info float-right btnbrown mt-2">Deliver</button>
										</div>
									</div>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
