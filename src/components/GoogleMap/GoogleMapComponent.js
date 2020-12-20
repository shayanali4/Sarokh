import React, { useState } from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';

export const GoogleMapComponent = withScriptjs(
	withGoogleMap((props) => {
		const [state, setstate] = useState(false);

		async function changeLocation(type, data) {
			// eslint-disable-next-line default-case
			switch (type) {
				case 'MarkerDrag':
					props.changeFunction({
						...props.globalState,
						location: [
							{
								latitude: data.latLng.lat(),
								longitude: data.latLng.lng(),
							},
						],
					});
					break;
				case 'AutoComplete':
					props.changeFunction({
						...props.globalState,
						location: [
							{
								label: data.formatted_address,
								latitude: data.geometry.location.lat(),
								longitude: data.geometry.location.lng(),
							},
						],
					});
					break;
			}
		}

		function setClickedMarker(pointId, pointName) {
			if (window.confirm(`Are you sure to select " ${pointName} " ?`)) {
				props.changeFunction({
					...props.globalState,
					dealerPointId: pointId,
					locationName: pointName,
				});
			}
		}
	const [modal, setModal] = useState(false);

		return (
		<div>
								{modal ? (
				<div className="maincontainer ">
					<div className="gray">Sarokh Point</div>
					<div><img src="/shop-img.jpg" width="100%"  alt="" /></div>


						<div className="red"> 
						<div className="med">MED 17</div>
						<div>Mobile Store</div>

						</div>
						<div className="green"> Select this Location</div>
						<div><table>
							<tr>
							<th>Address</th>
							<th>Meed 17, Jeddah, Saudi Arabia</th>
							
							</tr>
							<tr>
							<td>Saturday to sunday timings</td>
							<td>9:00 AM to 11:00 PM</td>
							</tr>
							<tr>
							<td>FRIDAY TIMING</td>
							<td>03:00 PM TO 11:00 PM</td>
							</tr>
							
							
						</table>
							</div>	
													</div>
	
			):(
				<div className="maincontainer d-none">
					<div className="gray">Sarokh Point</div>
					<div><img src="/shop-img.jpg" width="100%"  alt="" /></div>


						<div className="red"> 
						<div className="med">MED 17</div>
						<div>Mobile Store</div>

						</div>
						<div className="green"> Select this Location</div>
						<div><table>
							<tr>
							<th>Address</th>
							<th>Meed 17, Jeddah, Saudi Arabia</th>
							
							</tr>
							<tr>
							<td>Saturday to sunday timings</td>
							<td>9:00 AM to 11:00 PM</td>
							</tr>
							<tr>
							<td>FRIDAY TIMING</td>
							<td>03:00 PM TO 11:00 PM</td>
							</tr>
							
							
						</table>
								</div>
															</div>

			)}
			<GoogleMap
				defaultZoom={props.zoom || 6}
				defaultCenter={
					props.defaultCenter
						? props.defaultCenter
						: {
								lat: 23.8859,
								lng: 39.1925,
						  }
				}
				center={
					props.defaultCenter
						? props.defaultCenter
						: {
								lat: 23.8859,
								lng: 39.1925,
						  }
				}
			>
				{props.isMarkerShown &&
					props.position.map((doc, i) => {
						return (
							<Marker
								key={i}
								position={{
									lat: parseFloat(doc.latitude),
									lng: parseFloat(doc.longitude),
								}}
								icon={{url: "/favicon.ico"}}
								draggable={props.draggable}
								onDragEnd={(e) => changeLocation('MarkerDrag', e)}
								onMouseOver={() => setstate(doc.label)}
								onMouseOut={() => setstate(false)}
								onClick={() => {
									if (
										props.markerClickAllow &&
										doc.dealerPointId !== undefined
									) {
										setModal(true);
										// setClickedMarker(doc.dealerPointId, doc.label);
									}
								}}
							>
								{((state === doc.label && doc.label !== undefined) ||
									(props.keepMarker && doc.label !== undefined)) && (
									<InfoWindow options={{ disableAutoPan: true }}>
										<p
											style={{
												color: 'red',
												padding: 'unset',
												margin: 'unset',
												fontWeight: 'bold',
											}}
										>
											{doc.label}
										</p>
									</InfoWindow>
								)}
							</Marker>
						);
					})}
				{props.autocompleted ? (
					<Autocomplete
						style={{ width: '100%' }}
						onPlaceSelected={(place) => changeLocation('AutoComplete', place)}
						types={[]}
						componentRestrictions={{ country: 'SA' }}
					/>
				) : null}

				</GoogleMap>
</div>
		);
	})
);
