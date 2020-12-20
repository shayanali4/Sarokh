import React, { useState, useEffect } from 'react';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';

export default function OrderLocation(props) {
	const [response, setresponse] = useState({ loading: true, data: [] });
	return (
		<GoogleMapComponent
			isMarkerShown={true}
			position={response.data.mapLocations || []}
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
						height: `400px`,
						width: `85%`,
						margin: `50px auto`,
					}}
				/>
			}
			mapElement={<div style={{ height: `100%` }} />}
			autocomplete={false}
		/>
	);
}
