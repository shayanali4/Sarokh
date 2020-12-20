import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function DealerDashboard(props) {
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
									<h2 className="float-left"> Create Shipment - Shipment Detail</h2>
								</div>
								<div className="card-body">
									<div className="form-row mb-3">
										<div className="col">
											<label>Sender Name</label>
											<input
												id="fullname"
												type="text"
												name="fullName"
												className="form-control"
												placeholder="Enter Sender Name"
											/>
										</div>
										<div className="col">
											<label htmlFor="email">Sender Contact Number</label>
											<input
												id="email"
												type="text"
												className="form-control"
												name="email"
												placeholder="9665"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>National ID or Iqama Number</label>
											<input
												id="fullname"
												type="text"
												name="fullName"
												className="form-control"
												placeholder="Enter Iqama or National ID Number"
											/>
										</div>
										<div className="col">
											<label htmlFor="email">Upload ID or Iqama</label>
											<input
												id="email"
												type="text"
												className="form-control"
												name="email"
												placeholder="Upload File"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Sender Address</label>
											<input
												id="fullname"
												type="text"
												name="fullName"
												className="form-control"
												placeholder="Enter Sender Address"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Receiver Name</label>
											<input
												id="fullname"
												type="text"
												name="fullName"
												className="form-control"
												placeholder="Enter Receiver Name"
											/>
										</div>
										<div className="col">
											<label htmlFor="email">Receiver Contact</label>
											<input
												id="email"
												type="text"
												className="form-control"
												name="email"
												placeholder="9665"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Receiver City</label>
											<input
												id="fullname"
												type="text"
												name="fullName"
												className="form-control"
												placeholder="Select Receiver City"
											/>
										</div>
										<div className="col">
											<label htmlFor="email">Shipment Type</label>
											<input
												id="email"
												type="text"
												className="form-control"
												name="email"
												placeholder="Select Shipment Type"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label htmlFor="email">Shipment Weight</label>
											<input
												id="email"
												type="text"
												className="form-control"
												name="email"
												placeholder="Select Shipment Weight"
											/>
										</div>
										<div className="col">
											<label>Shipment Content</label>
											<input
												id="fullname"
												type="text"
												name="fullName"
												className="form-control"
												placeholder="Scan or Type Shipment Tracking Number"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label htmlFor="email">Shipment Value</label>
											<input
												id="email"
												type="text"
												className="form-control"
												name="email"
												placeholder="Enter Shipment Value"
											/>
										</div>
										<div className="col">
											<label htmlFor="email">Delivery Type</label>
											<input
												id="email"
												type="text"
												className="form-control"
												name="email"
												placeholder="Select Delivery Type"
											/>
										</div>
									</div>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
