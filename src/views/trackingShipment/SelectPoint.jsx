import React, { useEffect, Fragment, useState } from 'react';
import { GoogleMapComponent } from '../../components/GoogleMap/GoogleMapComponent';
import { useHistory } from 'react-router-dom';
import { trackingOrderDetail } from './state';
import { useRecoilState } from 'recoil';
import { isEmpty } from 'underscore';
import Loading from '../../components/Loading/Loading';
import { pointListingApi } from '../../Api/adminApi';
import { updateDeliveryApi } from '../../Api/trackingApi';
import { toast } from 'react-toastify';
import { filter } from 'underscore';

export default function AddArea(props) {
	const hist = useHistory();
	const [data, setData] = useRecoilState(trackingOrderDetail);
	console.log(data);
	const [response, setresponse] = useState({
		location: [{ latitude: '23.8859', longitude: '39.1925' }],
		loading: true,
	});
	console.log(response);

	useEffect(() => {
		if (isEmpty(data)) {
			hist.push('/tracking/input');
		} else if (response.loading) {
			pointListingApi()
				.then((res) => {
					let points = filter(res, function (doc) {
						return doc.city === data.order.shipToCity;
					});
					structureData(points);
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}

		if (response.ready) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					console.log(position);
					setresponse({
						...response,
						location: [
							{
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								label: 'Your Location',
							},
							...response.location,
						],
					});
				},
				function (error) {
					console.log(error);
				},
				{ maximumAge: 60000, timeout: 15000, enableHighAccuracy: true }
			);
		}
	}, [response.loading]);

	useEffect(() => {
		if (response.dealerPointId) {
			const payload = {
				dealerPointId: response.dealerPointId,
				deliveryLocation: 'Sarokh Point',
				trackingNumber: data.order.orderId,
			};
			updateDeliveryApi(payload)
				.then((res) => {
					toast.success(res.message);
					setData({});
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response]);

	const structureData = (data) => {
		let points = [];
		data.map((doc) => {
			points.push({
				latitude: doc.locationLatitude,
				longitude: doc.locationLongitude,
				dealerPointId: doc.id,
				label: doc.dealerPointName,
			});
		});

		setresponse({
			loading: false,
			ready: true,
			location: [...points],
		});
	};
	return isEmpty(data) && response.loading ? (
		<Loading />
	) : (
		<Fragment>
			
		</Fragment>
	);
}
