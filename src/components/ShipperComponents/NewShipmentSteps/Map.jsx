import React from 'react';
import { newShipment } from './state';
import { useRecoilState } from 'recoil';
import { GoogleMapComponent } from '../../GoogleMap/GoogleMapComponent';

export default function Map(props) {
	const [data, setdata] = useRecoilState(newShipment);
	return data.deliveryLocation === 'To Customer Address' ? (
		<>
			<label htmlFor="receiverAddress">Receiver Address</label>
			<GoogleMapComponent
				defaultCenter={{
					lat: parseFloat(data.location[0].latitude),
					lng: parseFloat(data.location[0].longitude),
					label: data.location[0].label,
				}}
				isMarkerShown={true}
				position={data.location}
				changeFunction={setdata}
				draggable={true}
				autocompleted={true}
				globalState={data}
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
							width: `85%`,
							margin: `0 auto`,
						}}
					/>
				}
				mapElement={<div style={{ height: `100%` }} />}
				autocomplete={false}
			/>
			<div className="form-row mt-2 margintop40">
				<div className="form-group col-md-6">
					<div>
						Latitude:
						<input
							className="form-control"
							type="text"
							value={data.location[0].latitude}
						/>
					</div>
				</div>
				<div className="form-group col-md-6">
					<div>
						longitude:
						<input
							className="form-control"
							type="text"
							value={data.location[0].longitude}
						/>
					</div>
				</div>
			</div>
		</>
	) : null;
}
