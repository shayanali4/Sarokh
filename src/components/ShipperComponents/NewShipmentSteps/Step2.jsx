import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import { useHistory, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { newShipment, newShipmentList, shipperSetting } from './state';
import { getDeliveryLocationsApi } from '../../../Api/shipperApi';
import { shipmentDropdownOptions } from '../../../Utils/newShipmentHelper';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import Loading from '../../Loading/Loading';
import { isEmpty, filter } from 'underscore';

export default function Step2(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true, dropDowns: {} });
	const [data, setdata] = useRecoilState(newShipment);
	const setState = useSetRecoilState(newShipmentList);
	const shipperSettings = useRecoilValue(shipperSetting);

	console.log(data);

	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	const onsubmit = (formData) => {
		console.log(formData);
		setdata({
			...data,
			...formData,
			shipperWarehouseAddress:
				data.deliveryLocation === 'Shipper Location'
					? getShipperWarehouseLocation(data.shipperWarehouseId)
					: undefined,
		});
		hist.push('/shipper/newshipment/step3');
	};

	useEffect(() => {
		getDeliveryLocationsApi()
			.then((res) => {
				dropDownOptions(res);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	const dropDownOptions = (data) => {
		try {
			let dropDowns = shipmentDropdownOptions(shipperSettings);
			setresponse({ loading: false, data: data, dropDowns: dropDowns });
		} catch (err) {
			toast.error('somethings went wrong');
		}
	};

	const getShipperWarehouseLocation = (id) => {
		let location = filter(response.data.shipperWarehouses, function (doc) {
			return doc.id == id;
		});

		return {
			address: location[0].address,
			latitude: location[0].locationLatitude,
			longitude: location[0].locationLongitude,
		};
	};

	if (isEmpty(data) || isEmpty(shipperSettings)) {
		// this is to check if the values exist from step1 if they dont page will be redirected to step 1 the default values have the length of 8
		return <Redirect to="/shipper/newshipment/step1" />;
	}

	if (data.deliveryLocationRadio && data.deliveryLocation) {
		// this first check is to check if the values exist becasue these values wont exist when user comes from step1 to step2 in newly created form but will exist in editing existing record
		if (
			data.deliveryLocationRadio === 'sarokhPoint' &&
			data.location[0].latitude !== '23.8859' && // co-ordinates are checked if the co-oridinates are not as in this condition this means they are not default and need to be changed
			data.location[0].longitude !== '39.1925'
		) {
			setdata({
				...data,
				location: [{ latitude: '23.8859', longitude: '39.1925' }],
			}); //this check is in case the user edits the data from the table in step3 and chooses to select a sarokh point instead of customer address then we need to set the location to default instead of previous value inserted because map is only showen when the customeraddress is selected
		}
	}

	const goback = () => {
		hist.push({
			pathname: '/shipper/newshipment/step1',
		});
	};

	const cancel = () => {
		setdata({
			shipmentValue: 10,
			normalPackaging: false,
			giftPackaging: false,
			insurance: false,
			additionalCharges: 0,
			billingType: 'true',
			location: [{ latitude: '23.8859', longitude: '39.1925' }],
		});
		setState([]);
		hist.push('/shipper/allshipments');
	};

	return response.loading ? (
		<Loading marginTop="0%" />
	) : (
		<>
			<StepIndicator step1={'done'} step2={'current'} />
			<form className="margintop30" onSubmit={handleSubmit(onsubmit)}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="pickupType">Pickup Location</label>
						<select
							className="form-control"
							id="pickupType"
							name="pickupType"
							onChange={(e) => {
								setdata({ ...data, pickupType: e.target.value });
							}}
							ref={register({
								required: true,
								validate: (value) => value !== 'true',
							})}
						>
							<option value="true" style={{ fontWeight: 'bold' }}>
								Select location
							</option>
							{response.dropDowns.pickupLocationDD.map((doc) => {
								return (
									<option key={doc} value={doc}>
										{doc}
									</option>
								);
							})}
						</select>
						<span style={{ color: 'red' }}>
							{' '}
							{errors.pickupType && 'Pickup Location is required'}
						</span>
						{data.pickupType === 'Sarokh Warehouse' ? (
							<div className="mt-3">
								<label htmlFor="sarokhWarehouseId">Sarokh Warehouse</label>
								<select
									className="form-control"
									id="sarokhWarehouseId"
									name="sarokhWarehouseId"
									onChange={(e) => {
										setdata({ ...data, sarokhWarehouseId: e.target.value });
									}}
									ref={register({
										required: true,
										validate: (value) => value !== 'true',
									})}
								>
									<option key={12345} value="true">
										--- Select Sarokh Warehouse ---
									</option>
									{response.data.sarokhWarehouses.map((doc, i) => {
										return (
											<option key={i} value={doc.id}>
												{doc.name}
											</option>
										);
									})}
								</select>
								<span style={{ color: 'red' }}>
									{' '}
									{errors.sarokhWarehouseId && 'sarokh warehouse is required'}
								</span>
							</div>
						) : null}
						{data.pickupType === 'Shipper Warehouse' ||
						data.deliveryLocation === 'Shipper Location' ? (
							<div className="mt-3">
								<label htmlFor="shipperWarehouseId">Shipper Warehouse</label>
								<select
									className="form-control"
									id="shipperWarehouseId"
									name="shipperWarehouseId"
									onChange={(e) => {
										setdata({
											...data,
											shipperWarehouseId: e.target.value,
											shipperWarehouseAddress: getShipperWarehouseLocation(
												e.target.value
											),
										});
									}}
									ref={register({
										required: true,
										validate: (value) => value !== 'true',
									})}
								>
									<option key={12345} value="true">
										--- Select Shipper Warehouse ---
									</option>
									{response.data.shipperWarehouses.map((doc, i) => {
										return (
											<option key={i} value={doc.id}>
												{doc.name}
											</option>
										);
									})}
								</select>
								<span style={{ color: 'red' }}>
									{' '}
									{errors.shipperWarehouseId && 'Shipper Warehouse is required'}
								</span>
							</div>
						) : null}
					</div>
					<div className="form-group col-md-6">
						<label htmlFor="deliveryLocation">Delivery Location</label>
						<select
							className="form-control"
							id="deliveryLocation"
							name="deliveryLocation"
							defaultValue={data.deliveryLocation}
							onChange={(e) => {
								setdata({ ...data, deliveryLocation: e.target.value });
							}}
							ref={register({
								required: true,
								validate: (value) => value !== 'true',
							})}
						>
							<option key={1} value="true">
								Delivery Location{' '}
							</option>
							{response.dropDowns.deliveryLocationDD.map((doc) => {
								return (
									<option key={doc} value={doc}>
										{doc}
									</option>
								);
							})}
						</select>
						<span style={{ color: 'red' }}>
							{' '}
							{errors.deliveryLocation && 'Delivery location is required'}
						</span>
						{/* 
						<option key={1} value="true">
								Delivery Location{' '}
							</option>
							<option key={2} value="To Sarokh Point">
								Select Delivery Location Now
							</option>
							<option key={3} value="To Predefined Location">
								Let the Receiver Choose
							</option>
						{data.deliveryLocation === 'To Sarokh Point' ? (
							<div className="mt-3">
								<label name="deliveryLocationRadio">
									Choose the type of delivery location
								</label>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="deliveryLocationRadio"
										value="customerAddress"
										onClick={(e) => {
											setdata({
												...data,
												deliveryLocationRadio: 'customerAddress',
											});
										}}
										ref={register()}
									/>
									<span style={{ color: 'red' }}>
										{' '}
										{errors.deliveryLocationRadio && 'this is required'}
									</span>
									<label className="form-check-label" htmlFor="indeliverycase">
										Customer's Address
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="deliveryLocationRadio"
										value="sarokhPoint"
										onClick={(e) => {
											setdata({
												...data,
												deliveryLocationRadio: 'sarokhPoint',
											});
										}}
										ref={register({ required: true })}
									/>
									<span style={{ color: 'red' }}>
										{' '}
										{errors.deliveryLocationRadio && 'This field is required'}
									</span>
									<label className="form-check-label" htmlFor="selectNow">
										Sarokh Point
									</label>
								</div>
							</div>
						) : null}
						{data.deliveryLocationRadio === 'sarokhPoint' &&
						data.deliveryLocation === 'To Sarokh Point' ? (
							<div className="mt-3">
								<label htmlFor="concernPerson">Sarokh Point</label>
								<select
									className="form-control"
									name="dealerPointId"
									onChange={(e) => {
										setdata({ ...data, dealerPointId: e.target.value });
									}}
									ref={register({
										required: true,
										validate: (value) => value !== 'true',
									})}
								>
									<option key={12345} value="true">
										--- Select Sarokh Point ---
									</option>
									{response.data.sarokhPoints.map((doc, i) => {
										return (
											<option key={i} value={doc.id}>
												{doc.dealerPointName}
											</option>
										);
									})}
								</select>
								<span style={{ color: 'red' }}>
									{' '}
									{errors.dealerPointId && 'Sarokh Point is required'}
								</span>
							</div>
						) : null} */}
					</div>
				</div>
				<div className="form-row">
					<div className="col-sm-12">
						<div className="btn-container float-left">
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									cancel();
								}}
							>
								Cancel
							</button>
						</div>
						<div className="btn-container float-right">
							<button
								className="btn btn-danger dark-grey"
								onClick={() => {
									goback();
								}}
							>
								Go to previous step
							</button>
							&nbsp;&nbsp;
							<button className="btn btn-success" type="submit">
								Next step
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
