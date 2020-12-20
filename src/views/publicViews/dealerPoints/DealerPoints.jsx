import React, { useEffect, useState } from 'react';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';
import { Link } from 'react-router-dom';
import { allDealersApi } from '../../../Api/adminApi';
import { toast } from 'react-toastify';

export default function DealerPoints(props) {
	const [response, setresponse] = useState({ data: [] });

	useEffect(() => {
		allDealersApi()
			.then((res) => {
				let points = [];
				for (let i = 0; i < res.length; i++) {
					for (let j = 0; j < res[i].dealerPoints.length; j++) {
						points.push({
							latitude: res[i].dealerPoints[j].locationLatitude,
							longitude: res[i].dealerPoints[j].locationLongitude,
							label: res[i].dealerPoints[j].dealerPointName,
						});
					}
				}
				setresponse({ data: points });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);
	return (
		<>
			<div
				className="container-fluid d-flex justify-content-center"
				style={{ height: '50px', backgroundColor: 'white' }}
			>
				<Link to="/">
					<img
						className="p-2"
						src={require('../../../assets/images/sarokh-logo.png')}
					/>
				</Link>
			</div>
			<div className="container mt-5">
				<GoogleMapComponent
					isMarkerShown={true}
					defaultCenter={{
						lat: 23.8859,
						lng: 39.1925,
					}}
					position={response.data || []}
					changefunction={setresponse}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
					loadingElement={
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					}
					containerElement={
						<div
							style={{
								height: `600px`,
								width: `95%`,
								margin: `0 auto`,
							}}
						/>
					}
					mapElement={<div style={{ height: `100%` }} />}
					autocomplete={false}
					keepMarker={true}
				/>
			</div>
		</>
	);
}
