import React from 'react';
import { useRecoilState } from 'recoil';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';
import { GoogleMapComponent } from '../../GoogleMap/GoogleMapComponent';
import { warehouseData } from './state';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { cities } from '../../../Utils/cities';
import { warehouseAddress } from '../../../formValidation/warehouseSchemaValidation';
import { joiResolver } from '@hookform/resolvers';

export default function Step1(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(warehouseData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(warehouseAddress),
	});

	console.log(data);

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata });
		hist.push(props.path);
	};

	return (
		<Container>
			<div className="card-header">
				{data.update ? <h2>Edit Location</h2> : <h2>Add New Location</h2>}
			</div>
			<div className="card-body">
				<StepIndicator step1="current" type={props.type} />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								name="name"
								placeholder="Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.name && errors.name.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								className="form-control"
								name="address"
								placeholder="Address"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.address && errors.address.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label>Select Country</label>
							<select
								id="selectid"
								className="form-control"
								name="country"
								ref={register({
									required: true,
									validate: (value) => value !== '',
								})}
							>
								<option key={12345} value="SAU">
									Saudi Arabia
								</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.country && errors.country.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label>Select City</label>
							<select
								className="form-control"
								name="city"
								ref={register({
									required: true,
									validate: (value) => value !== '',
								})}
							>
								<option value="">---Select City---</option>
								{cities.map((doc) => {
									return (
										<option key={doc} value={doc}>
											{doc}
										</option>
									);
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.city && errors.city.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="postalCode">Post Code</label>
							<input
								type="text"
								className="form-control"
								name="postalCode"
								placeholder="Post Code"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.postalCode && errors.postalCode.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<label htmlFor="latitude">Select Location</label>
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
								globalState={data}
								autocompleted={true}
								googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={
									<div
										style={{ height: `400px`, width: `85%`, margin: `0 auto` }}
									/>
								}
								mapElement={<div style={{ height: `100%` }} />}
							/>
							<div className="form-row mt-2 margintop30">
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
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-12">
							<div className="btn-container float-right">
								<button className="btn btn-success" type="submit">
									Next
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
