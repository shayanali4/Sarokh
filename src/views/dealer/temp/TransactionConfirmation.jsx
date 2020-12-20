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
									<h2 className="float-left">Dashboard</h2>
									<button class="btn btn-info float-right btnbrown">Confirm</button>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-md-8">
											<p>Transaction from dealer [Point Name] having ID [Point ID] to Driver [Driver Name] having ID [Driver ID] in Trip having ID [Trip ID] on [Date] at [Time].</p>
										</div>
										<div className="col-md-4">
											<div className="transaction-detail">
												<label>Give Shipment:</label>
												<p></p>
											</div>
											<div className="transaction-detail">
												<label>Pending Give Shipment:</label>
												<p></p>
											</div>
											<div className="transaction-detail">
												<label>Receive Shipment:</label>
												<p></p>
											</div>
											<div className="transaction-detail">
												<label>Pending Receive Shipment:</label>
												<p></p>
											</div>
											<div className="transaction-detail">
												<label>Amount Paid:</label>
												<p></p>
											</div>
											<div className="transaction-detail">
												<label>Pending Amount:</label>
												<p></p>
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
