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
			<div className="add-address-container">
				<div className="form-row margintop30">
					<div class="col-md-12">
						<h5>Select Last Mile</h5>
						<GoogleMapComponent
							keepMarker={true}
							defaultCenter={{
								lat: parseFloat(response.location[0].latitude),
								lng: parseFloat(response.location[0].longitude),
								label: response.location[0].label,
							}}
							isMarkerShown={true}
							position={response.location || []}
							changeFunction={setresponse}
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
										margin: `0 auto`,
									}}
								/>
							}
							globalState={response}
							mapElement={<div style={{ height: `100%` }} />}
							autocompleted={true}
						/>
						<div
							className="mt-5"
							style={{ display: 'flex', justifyContent: 'center' }}
						>
							<button
								className="btn btn-primary mt-2"
								ref={buttonRef}
								onClick={submitAddress}
							>
								Submit Address
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
