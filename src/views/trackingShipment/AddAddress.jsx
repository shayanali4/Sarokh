import React, { useEffect, Fragment, useState, useRef } from 'react';
import { trackingOrderDetail } from './state';
import { useRecoilState } from 'recoil';
import { isEmpty } from 'underscore';
import Loading from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { GoogleMapComponent } from '../../components/GoogleMap/GoogleMapComponent';
import { updateDeliveryApi } from '../../Api/trackingApi';
import { toast } from 'react-toastify';

export default function AddAdress(props) {
	const hist = useHistory();
	const [data, setData] = useRecoilState(trackingOrderDetail);
	const buttonRef = useRef();
	const [response, setresponse] = useState({
		location: [
			{
				latitude: '24.5246542',
				longitude: '39.5691841',
				label: 'Medina Saudi Arabia',
			},
		],
	});

	useEffect(() => {
		if (isEmpty(data)) {
			hist.push('/tracking/input');
		} else {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					console.log(position);
					setresponse({
						location: [
							{
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								label: '',
							},
						],
					});
				},
				function (error) {
					console.log(error);
				},
				{ maximumAge: 60000, timeout: 15000, enableHighAccuracy: true }
			);
		}
	}, []);

	console.log(response);

	const submitAddress = () => {
		buttonRef.current.disabled = true;

		const payload = {
			address: response.location[0].label,
			deliveryLocation: 'Last Mile',
			trackingNumber: data.order.orderId,
			locationLatitude: response.location[0].latitude,
			locationLongitude: response.location[0].longitude,
		};

		updateDeliveryApi(payload)
			.then((res) => {
				toast.success(res.message);
				hist.goBack();
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return isEmpty(data) ? (
		<Loading />
	) : (
		<Fragment>
			
		</Fragment>
	);
}
