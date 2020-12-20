import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { newShipment, newShipmentList, shipperSetting } from './state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cities } from '../../../Utils/cities';
import { getShipperDeliveryChargesApi } from '../../../Api/adminApi';
import { toast } from 'react-toastify';
import { isEmpty } from 'underscore';
import Loading from '../../Loading/Loading';

export default function Step1(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(newShipment);
	const setState = useSetRecoilState(newShipmentList);
	const [shipperSettings, setShipperSettings] = useRecoilState(shipperSetting);

	useEffect(() => {
		async function fetchData() {
			const user = await JSON.parse(localStorage.getItem('user'));
			getShipperDeliveryChargesApi(user.id)
				.then((res) => {
					shipperSettingCheck(res);
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
		fetchData();
	}, []);

	const shipperSettingCheck = (data) => {
		if (data === null) {
			toast.info('ACCOUNT NOT ACTIVE CONTACT SUPPORT');
			hist.push('/shipper/dashboard');
		} else if (!data.enable) {
			toast.info('YOUR ACCOUNT IS DISABLED PLEASE CONTACT SUPPORT');
			hist.push('/shipper/dashboard');
		} else {
			if (
				(!data.pickupSarokhPoint &&
					!data.pickupShipperWarehouse &&
					!data.pickupSarokhWarehouse) ||
				(!data.deliverySarokhPoint &&
					!data.deliveryLastMile &&
					!data.deliveryCustomerChoice)
			) {
				toast.info(
					'ALL YOUR SETTINGS HAVE BEEN DISABLED PLEASE CONTACT SUPPORT'
				);
				hist.push('/shipper/dashboard');
			} else {
				setShipperSettings(
					data
				); /* this  contains all the shipper setting data from the api in the shippersettings state */
			}
		}
	};

	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});
	const onSubmit = (formData) => {
		setdata({ ...data, ...formData });
		hist.push('/shipper/newshipment/step2');
		console.log(data);
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

	return isEmpty(shipperSettings) ? (
		<Loading marginTop="0%" />
	) : (
		<>
			<StepIndicator step1={'current'} />
			<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
				<p>
					Please select the city that you are shipping from and where you would
					like for it to be received.
				</p>
				<div className="form-row" style={{ display: 'none' }}></div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label>Ship From </label>
						<select
							className="form-control"
							id="shipFromCity"
							name="shipFromCity"
							placeholder="--- Ship From City ---"
							ref={register({
								required: true,
								validate: (value) => value !== 'true',
							})}
						>
							{cities.map((doc, i) => {
								return (
									<option key={i} value={doc}>
										{doc}
									</option>
								);
							})}
						</select>
						<span style={{ color: 'red' }}>
							{' '}
							{errors.shipFromCity && 'City is required'}
						</span>
					</div>
					<div className="form-group col-md-6">
						<label>Ship To</label>
						<select
							className="form-control"
							id="shipToCity"
							name="shipToCity"
							ref={register({
								required: true,
								validate: (value) => value !== 'true',
							})}
						>
							{cities.map((doc, i) => {
								return (
									<option key={i} value={doc}>
										{doc}
									</option>
								);
							})}
						</select>
						<span style={{ color: 'red' }}>
							{' '}
							{errors.shipToCity && 'City is required'}
						</span>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-12">
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
							<button className="btn btn-success" type="submit">
								Next Step
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
