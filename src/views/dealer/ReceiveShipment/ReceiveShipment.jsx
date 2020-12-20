import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function ReceiveShipment(props) {
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
									<h2 className="float-left">Receive Shipment</h2>
									<button className="btn btn-info float-right btnbrown">Complete</button>
								</div>
								<div className="card-body">
									<label for="fullname">Traking No</label>
									<input id="fullname" type="text" name="fullName" class="form-control" placeholder="  Enter Tracking No
" value="" />
									<button className="btn btn-info float-right btnbrown mt-2">Receive</button>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
