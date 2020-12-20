import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	allShippersApi,
	shipperSettingApi,
	getShipperDeliveryChargesApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const initialValues = {
	weightUptoFiveKg: '',
	weightFiveToTen: '',
	weightTenToFifteen: '',
	returnCharges: '',
	lastMile: '',
	normalPackaging: '',
	giftPackaging: '',
	insurance: '',
	pickupSarokhPoint: 'true',
	pickupShipperWarehouse: 'true',
	pickupSarokhWarehouse: 'true',
	deliverySarokhPoint: 'true',
	deliveryLastMile: 'true',
	deliveryCustomerChoice: 'true',
	shipperId: '',
	notes: '',
	enable: 'false',
};

export default function ShipperSetting(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({
		loading: true,
		userData: initialValues,
		userId: '',
		getdata: false,
	});
	console.log(response);
	const { register, errors, handleSubmit } = useForm({
		shouldFocusError: true,
		mode: 'onSubmit',
		criteriaMode: 'all',
	});

	useEffect(() => {
		if (response.loading) {
			allShippersApi()
				.then((res) => {
					setresponse({ ...response, loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, []);

	useEffect(() => {
		if (response.getdata) {
			getShipperDeliveryChargesApi(response.userId)
				.then((res) => {
					if (res !== null) {
						setresponse({
							...response,
							loading: false,
							userData: res,
							getdata: false,
						});
					} else {
						/* if the response returns empty array that means the setting for the selected shipper are not 
						set yet so the form is set back to the default values in this check */

						setresponse({
							...response,
							loading: false,
							userData: initialValues,
							getdata: false,
						});
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const onSubmit = (formData) => {
		console.log(formData);
		shipperSettingApi({ ...formData, id: response.userData.id })
			.then((res) => {
				toast.success('Shipper Settings Submitted');
				setTimeout(() => {
					hist.go();
				}, 1500);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-270px,0,0)',
			transition: 'ease-out 0.3s',
		},
	});

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">Shipper Setting</h2>
							</div>
							<div className="card-body shippersetting">
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Select Shipper</label>
										<select
											name="shipperId"
											className="form-control"
											onChange={(e) => {
												if (e.target.value !== 'true') {
													setresponse({
														...response,
														userId: e.target.value,
														loading: true,
														getdata: true,
													});
												}
											}}
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
											defaultValue={response.userId}
										>
											<option value="true">Select Shipper</option>
											{response.data.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.user.fullName}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.shipperId && 'Shipper is required'}
										</span>
									</div>
									<div className="col">
										<div className="btn-group btn-group-toggle float-right mt-4">
											<label
												id="1"
												className={
													response.userData.enable.toString() === 'true'
														? 'btn btn-secondary'
														: 'btn btn-secondary active'
												}
											>
												<input
													key={Math.random()}
													type="radio"
													name="enable"
													value="false"
													defaultChecked={
														response.userData.enable.toString() === 'false'
													}
													onChange={(e) => {
														document.getElementById('1').className =
															'btn btn-secondary active';
														document.getElementById('2').className =
															'btn btn-secondary';
													}}
													ref={register()}
												/>{' '}
												Disable
											</label>
											<label
												id="2"
												className={
													response.userData.enable.toString() === 'true'
														? 'btn btn-secondary active'
														: 'btn btn-secondary'
												}
											>
												<input
													key={Math.random()}
													/* radio values are not reset when the response changes unless the key is math.random 
													but if default values are populated  using useForm default values then it will give an error so math,random can not be used 
													if useform default values are being used */

													type="radio"
													name="enable"
													value="true"
													defaultChecked={
														response.userData.enable.toString() === 'true'
													}
													onChange={(e) => {
														document.getElementById('1').className =
															'btn btn-secondary';
														document.getElementById('2').className =
															'btn btn-secondary active';
													}}
													ref={register({ required: true })}
												/>{' '}
												Enable
											</label>
											<span style={{ color: 'red' }}>
												{' '}
												{errors.enable && 'Field required'}
											</span>
										</div>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col-sm-4">
										<h3>Pickup Setting</h3>
										<div className="form-check form-check-inline">
											<label className="form-check-label width138">
												Sarokh Point
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="pickupSarokhPoint"
												value="true"
												className="form-check-input"
												type="radio"
												defaultChecked={
													response.userData.pickupSarokhPoint.toString() ===
													'true'
												}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="pickupSarokhPoint"
												value="false"
												className="form-check-input"
												type="radio"
												defaultChecked={
													response.userData.pickupSarokhPoint.toString() ===
													'false'
												}
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width138">
												Shipper Warehouse
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="pickupSarokhWarehouse"
												value="true"
												className="form-check-input"
												type="radio"
												defaultChecked={
													response.userData.pickupShipperWarehouse.toString() ===
													'true'
												}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="pickupSarokhWarehouse"
												value="false"
												className="form-check-input"
												type="radio"
												defaultChecked={
													response.userData.pickupShipperWarehouse.toString() ===
													'false'
												}
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width138">
												Sarokh Warehouse
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="pickupShipperWarehouse"
												value="true"
												className="form-check-input"
												type="radio"
												defaultChecked={
													response.userData.pickupSarokhWarehouse.toString() ===
													'true'
												}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="pickupShipperWarehouse"
												className="form-check-input"
												value="false"
												type="radio"
												defaultChecked={
													response.userData.pickupSarokhWarehouse.toString() ===
													'false'
												}
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
									</div>
									<div className="col-sm-4">
										<h3>Delivery Setting</h3>
										<div className="form-check form-check-inline">
											<label className="form-check-label width125">
												Sarokh Point
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="deliverySarokhPoint"
												className="form-check-input"
												value="true"
												type="radio"
												defaultChecked={
													response.userData.deliverySarokhPoint.toString() ===
													'true'
												}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="deliverySarokhPoint"
												className="form-check-input"
												value="false"
												type="radio"
												defaultChecked={
													response.userData.deliverySarokhPoint.toString() ===
													'false'
												}
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width125">
												Last Mile
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="deliveryLastMile"
												className="form-check-input"
												value="true"
												type="radio"
												defaultChecked={
													response.userData.deliveryLastMile.toString() ===
													'true'
												}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="deliveryLastMile"
												className="form-check-input"
												value="false"
												type="radio"
												defaultChecked={
													response.userData.deliveryLastMile.toString() ===
													'false'
												}
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width125">
												Customer Choice
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="deliveryCustomerChoice"
												className="form-check-input"
												value="true"
												type="radio"
												defaultChecked={
													response.userData.deliveryCustomerChoice.toString() ===
													'true'
												}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												key={Math.random()}
												name="deliveryCustomerChoice"
												className="form-check-input"
												value="false"
												type="radio"
												defaultChecked={
													response.userData.deliveryCustomerChoice.toString() ===
													'false'
												}
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
									</div>
									<div className="col-sm-4">
										<h3>Notes:</h3>
										<textarea
											key={Math.random()}
											name="notes"
											className="form-control"
											ref={register()}
											defaultValue={response.userData.notes}
										></textarea>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.notes && 'Notes are required'}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-12">
										<h3>Billing Setting</h3>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Up to 5 Kg</label>
										<input
											type="number"
											name="weightUptoFiveKg"
											className="form-control"
											placeholder="Enter Amount"
											defaultValue={response.userData.weightUptoFiveKg}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.weightUptoFiveKg && 'Field required'}
										</span>
									</div>
									<div className="col">
										<label>Last Mile</label>
										<input
											type="number"
											name="lastMile"
											className="form-control"
											placeholder="Enter Amount"
											defaultValue={response.userData.lastMile}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.lastMile && 'Last Mile is required'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Up to 10 kg</label>
										<input
											type="number"
											name="weightFiveToTen"
											className="form-control"
											placeholder="Enter Amount"
											defaultValue={response.userData.weightFiveToTen}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.weightFiveToTen && 'Field required'}
										</span>
									</div>
									<div className="col">
										<label>Normal Packaging</label>
										<input
											type="number"
											name="normalPackaging"
											className="form-control"
											placeholder="Enter Amount"
											defaultValue={response.userData.normalPackaging}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.normalPackaging && 'Field required'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Upto 15 kg</label>
										<input
											type="number"
											name="weightTenToFifteen"
											className="form-control"
											placeholder="Enter Amount"
											defaultValue={response.userData.weightTenToFifteen}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.weightTenToFifteen && 'Field required'}
										</span>
									</div>
									<div className="col">
										<label>Gift Packaging</label>
										<input
											type="number"
											name="giftPackaging"
											className="form-control"
											placeholder="Enter Amount"
											defaultValue={response.userData.giftPackaging}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.giftPackaging && 'Field required'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Return Shipment Charges; (Undelivered)</label>
										<input
											type="number"
											name="returnCharges"
											className="form-control"
											placeholder="Enter Amount"
											defaultValue={response.userData.returnCharges}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.returnCharges && 'Return Charges required'}
										</span>
									</div>
									<div className="col">
										<label>Insurance Percentage</label>
										<input
											type="number"
											name="insurance"
											className="form-control"
											placeholder="Enter Percentage"
											defaultValue={response.userData.insurance}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.insurance && 'Insurance is required'}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-12">
										<button
											type="button"
											className="btn btn-danger float-left"
											onClick={() => {
												setresponse({
													...response,
													userData: initialValues,
													userId: '',
													getdata: false,
												});
											}}
										>
											Discard
										</button>
										<button
											type="button"
											className="btn btn-danger float-right btnbrown"
											onClick={() => {
												handleSubmit(onSubmit)();
											}}
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
