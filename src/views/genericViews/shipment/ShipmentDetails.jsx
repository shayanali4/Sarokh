import Container from '../../../components/Containers/OrderDetailsContainer';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { isUndefined } from 'underscore';
import DetailContainer from '../../../components/ShipperComponents/ShipperDetailsComponent/DetailComponent';
import Loading from '../../../components/Loading/Loading';

export default function ShipmentDetails(props) {
	const loc = useLocation();
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		async function fetchData() {
			return await axios
				.get(`${process.env.REACT_APP_API}/order/get-details/${loc.state.id}`)
				.then((response) => {
					console.log(response);
					setresponse({ loading: false, data: response.data.data });
				})
				.catch((err) => {
					window.alert(err.message);
				});
		}
		if (isUndefined(loc.state)) {
			hist.goBack();
		} else {
			fetchData();
		}
	}, []);

	return response.loading ? (
		<Loading />
	) : (
		<Container>
			<DetailContainer
				response={response.data}
				items={response.data.shipmentOrderItems[0]}
			/>
		</Container>
	);
}
