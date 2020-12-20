import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import StepIndicator from './StepIndicator';
import { useHistory, Redirect } from 'react-router-dom';
import {
	newShipment,
	newShipmentList,
	defaultData,
	shipperSetting,
} from './state';
import { useRecoilState } from 'recoil';
import Table from './DataTable';
import Map from './Map';
import { toast } from 'react-toastify';
import { postData } from './Api';
import { has, isEmpty } from 'underscore';

export default function Step3(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(newShipment);
	const [list, setlist] = useRecoilState(newShipmentList);
	const [shipperSettings, setShipperSettings] = useRecoilState(shipperSetting);
	const [nopackaging, setNoPackaging] = useState(false);

	const { register, errors, handleSubmit, reset, setValue } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	const defaultValuesSetting = () => {
		if (
			data.deliveryLocation === 'To Customer Address' &&
			(data.update !== true || data.update === undefined)
		) {
			/* when the delivery location is set to customer address, then the customer will be charged for the delivery to his
			her address, the delivery charges are as according to the shipper settings */

			setdata({
				...data,
				...defaultData,
				additionalCharges: 0,
				deliveryCharges: 0,
				customerAddressCharges: shipperSettings.lastMile,
			});
		} else if (data.update !== true || data.update === undefined) {
			setdata({
				...data,
				...defaultData,
				additionalCharges: 0,
				customerAddressCharges: 0,
				deliveryCharges: 0,
				shipmentValue: 10,
			});
		} else if (data.update && data.deliveryLocation === 'To Customer Address') {
			setdata({
				...data,
				additionalCharges: data.additionalCharges,
				deliveryCharges: 0,
				customerAddressCharges: shipperSettings.lastMile,
			});
		} else if (data.update) {
			setdata({
				...data,
				additionalCharges: data.additionalCharges,
				customerAddressCharges: 0,
				deliveryCharges: 0,
			});
		}
	};

	/* this effect below intializes the default values for the form when the form is not being updated */

	useEffect(() => {
		defaultValuesSetting();
		if (!data.normalPackaging && !data.giftPackaging) {
			setNoPackaging(true);
		}
		if (!data.update) {
			setValue(
				'receiverContact',
				'9665'
			); /* to set the defailt value of the contact. */
		}
	}, []);

	/* this effect prefilles the value of cod input as soon as the billing Type of COD is selected, since we want to have a prefilled value of
	the shipment value input field for cod input field */

	useEffect(() => {
		if (data.billingType === 'COD') {
			setValue('codValue', data.shipmentValue);
		}
	}, [data.billingType, data.shipmentValue]);

	/* this effect will take place is form is being updated, since the form is being updated we want the delivery charges to be set
	according to the values from the api, this sets the deliveryCharges which is then reflected in the deliveryCharges in the UI */

	useEffect(() => {
		if (
			(data.update && data.deliveryCharges === 0) ||
			(data.editing && data.deliveryCharges === 0)
		) {
			setDeliveryCharges(data.shipmentWeight);
		}
	}, [data]);

	if (isEmpty(data) || isEmpty(shipperSettings)) {
		return <Redirect to="/shipper/newshipment/step1" />;
	}

	console.log(data.additionalCharges);

	/* on submit function which is triggered when add to way bill button is pressed is adds the submitted data of form to the
  array of global list state, after that step3 form data is reset so that new values can be added */

	const onSubmit = (value) => {
		setlist([
			...list,
			{
				...data,
				...value,
				additionalCharges: data.additionalCharges,
				shipmentCost: (
					data.additionalCharges +
					data.deliveryCharges +
					data.customerAddressCharges +
					((data.additionalCharges +
						data.deliveryCharges +
						data.customerAddressCharges) /
						100) *
						15
				).toFixed(2),
				total:
					data.additionalCharges +
					data.deliveryCharges +
					data.customerAddressCharges,
			},
		]);
		defaultValuesSetting();
		setNoPackaging(true);
		reset();
	};
	console.log(list);
	console.log(data);

	/* when the finish button is clicked submitData function is executed which firstly check if the list state which contains the array of previosly submiited data
  or the global state array is empty, if its empty the length will probably be zero so first condition is fired other wise the data is passed to the api function for
  validation and posting */

	const submitData = () => {
		if (list.length === 0) {
			toast.warning('Please add data first by using add way bill or clone');
		} else {
			postData(list)
				.then((res) => {
					toast.success('order was created successfully');
					cancel();
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	/* this checkes if the list has the the key of name 'updateReady' if it is present the data is posted, this occurs if the data
	is being updated, since only one shipment at a time can be updated so therefore this condition is put */

	if (has(list[0], 'updateReady')) {
		postData(list, 'update')
			.then((res) => {
				toast.success('order was successfully updated!');
				cancel();
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	const updateData = (value) => {
		if (list.length === 0) {
			setlist([
				...list,
				{
					...data,
					...value,
					additionalCharges: data.additionalCharges,
					shipmentCost: (
						data.additionalCharges +
						data.deliveryCharges +
						data.customerAddressCharges +
						((data.additionalCharges +
							data.deliveryCharges +
							data.customerAddressCharges) /
							100) *
							15
					).toFixed(2),
					updateReady: true,
				},
			]);
		} else {
			toast.warning('only one order can be updated at a time');
		}
	};

	/* this function is executed when the checkboxes are checked and when the shipment value field is changed when the option is normalPackaging and the check is true
the values are reset same goes for other checkboxes the only difference is with the last option which is the shipment value whenever the shipment value changes
this function is called because onchange listener is attached on calls this function on every change, additional charges are updated along with the total as the insurance
value is deducted from these fields this does not include the gift packaging value if its selected */

	const addCharges = (type, check) => {
		// eslint-disable-next-line default-case
		switch (type) {
			case 'noPackaging':
				if (!nopackaging && (data.giftPackaging || data.normalPackaging)) {
					setdata({
						...data,
						normalPackaging: false,
						giftPackaging: false,
						additionalCharges: 0,
						insurance: false,
					});
					setNoPackaging(true);
				}
				break;

			case 'normalPackaging':
				if ((nopackaging || data.giftPackaging) && !data.normalPackaging) {
					setdata({
						...data,
						normalPackaging: check,
						giftPackaging: check ? false : data.giftPackaging,
						additionalCharges: check
							? shipperSettings.normalPackaging
							: data.additionalCharges - shipperSettings.normalPackaging,
						insurance: check ? false : data.insurance,
					});
					if (nopackaging) {
						setNoPackaging(false);
					}
				}
				break;

			case 'giftPackaging':
				if ((data.normalPackaging || nopackaging) && !data.giftPackaging) {
					setdata({
						...data,
						giftPackaging: check,
						normalPackaging: check ? false : true,
						additionalCharges: data.normalPackaging
							? data.additionalCharges +
							  shipperSettings.giftPackaging -
							  shipperSettings.normalPackaging
							: data.additionalCharges + shipperSettings.giftPackaging,
					});
					if (nopackaging) {
						setNoPackaging(false);
					}
				}

				break;

			case 'insurance':
				setdata({
					...data,
					insurance: check,
					// normalPackaging: data.giftPackaging ? false : true,
					additionalCharges: check
						? data.additionalCharges +
						  (data.shipmentValue / 100) * shipperSettings.insurance
						: data.additionalCharges -
						  (data.shipmentValue / 100) * shipperSettings.insurance,
				});
				break;

			case 'shipmentValue':
				console.log(check);
				if (Number.isNaN(check) !== true) {
					setdata({
						...data,
						shipmentValue: check, // in this case check is the value
						insurance: false,
						additionalCharges: data.insurance
							? data.additionalCharges -
							  (
									(data.shipmentValue / 100) *
									shipperSettings.insurance
							  ).toFixed(2)
							: data.additionalCharges,
					});
					break;
				}
		}
	};

	const setDeliveryCharges = (value) => {
		switch (value) {
			case 'Upto 5 kg':
				setdata({ ...data, deliveryCharges: shipperSettings.weightUptoFiveKg });
				break;
			case '5 kg to 10 kg':
				setdata({ ...data, deliveryCharges: shipperSettings.weightFiveToTen });
				break;
			case 'Above 15 kg':
				setdata({
					...data,
					deliveryCharges: shipperSettings.weightTenToFifteen,
				});
				break;
			default:
				break;
		}
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
		setlist([]);
		hist.push('/shipper/allshipments');
	};

	return (
		<>
			<StepIndicator step1={'done'} step2={'done'} step3={'current'} />
			<div className="order-step-detail">
				<div className="form-row">
					<div className="col-sm-12">
						<h2>Receiver Information</h2>
					</div>
				</div>
				<form>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="receiverName">Receiver Name</label>
							<input
								type="text"
								className="form-control"
								name="receiverName"
								id="receiverName"
								placeholder="Receiver Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.receiverName && 'Name is required *'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="receiverMobileNumber">Receiver Contact No</label>
							<input
								type="tel"
								className="form-control"
								id="receiverMobileNumber"
								name="receiverContact"
								placeholder="Receiver Contact No"
								Value={'9665'}
								ref={register({
									required: true,
									pattern: new RegExp(/^(9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/),
								})}
							/>
							<span style={{ color: 'red' }}>
								{errors?.receiverContact?.types?.pattern &&
									'Contact should be a valid no e.g "966512345678 *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<Map />
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-12">
							<h2>Shipment Information</h2>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="shipmentTitle">Shipment Title</label>
							<input
								type="text"
								className="form-control"
								id="shipmentTitle"
								name="shipmentTitle"
								placeholder="Shipment Title"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{errors.shipmentTitle && 'Shipment name is required *'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">Shipment Type</label>
							<select
								className="form-control"
								id="shipmentType"
								name="shipmentType"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Shipment Type</option>
								<option value="Electronics">Electronics</option>
								<option value="General Goods">General Goods</option>
								<option value="Apparel">Apparel</option>
								<option value="Others">Others</option>
							</select>
							<span style={{ color: 'red' }}>
								{errors.shipmentType && 'Shipment Type is required *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="weight">Shipment Weight</label>
							<select
								className="form-control"
								id="shipmentWeight"
								name="shipmentWeight"
								onChange={(e) => {
									setDeliveryCharges(e.target.value);
								}}
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Shipment Weight</option>
								<option value="Upto 5 kg">Upto 5 kg</option>
								<option value="5 kg to 10 kg"> 5 kg to 10 kg</option>
								<option value="Above 15 kg">Above 15 kg</option>
							</select>
							<span style={{ color: 'red' }}>
								{errors.shipmentWeight && 'Shipment weight is required *'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="shipmentValue">Shipment Value (SAR)</label>
							<input
								type="number"
								className="form-control"
								name="shipmentValue"
								defaultValue={data.shipmentValue}
								placeholder="Enter shipment value"
								min="1"
								onChange={(e) =>
									addCharges('shipmentValue', parseInt(e.target.value))
								}
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{errors.shipmentValue && 'Shipment value is required *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-sm-12">
							<label htmlFor="shipmentcontent">Shipment Contents</label>
							<textarea
								style={{ resize: 'none' }}
								className="form-control"
								id="content"
								name="content"
								placeholder="What does the shipment contain?"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{errors.content && 'Shipment content is required *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="col-md-6">
							<h2>Shipper Bill</h2>
							<h3>Additional Services</h3>
							{data ? (
								<table className="table">
									<tr>
										<td className="bordertop font14" align="left">
											<input
												key={756}
												type="checkbox"
												checked={nopackaging}
												onClick={(e) =>
													addCharges('noPackaging', e.target.checked)
												}
											/>
											Shipper Packaging
										</td>
										<td className="bordertop font14" align="right">
											SAR 0/-
										</td>
									</tr>
									<tr>
										<td className="bordertop font14" align="left">
											<input
												key={756}
												type="checkbox"
												name="normalPackaging"
												checked={data.normalPackaging}
												onClick={(e) =>
													addCharges('normalPackaging', e.target.checked)
												}
												ref={register()}
											/>
											Sarokh Packaging
										</td>
										<td className="bordertop font14" align="right">
											SAR {shipperSettings.normalPackaging}/-
										</td>
									</tr>
									<tr>
										<td className="font14" align="left">
											<input
												key={556}
												type="checkbox"
												name="giftPackaging"
												checked={data.giftPackaging}
												onClick={(e) => {
													addCharges('giftPackaging', e.target.checked);
												}}
												ref={register()}
											/>
											Gift Packaging
										</td>
										<td className="font14" align="right">
											SAR {shipperSettings.giftPackaging}/-
										</td>
									</tr>
									<tr>
										<td className="font14" align="left">
											<input
												key={65}
												type="checkbox"
												name="insurance"
												checked={data.insurance}
												onClick={(e) => {
													addCharges('insurance', e.target.checked);
												}}
												ref={register()}
											/>
											Insurance ({shipperSettings.insurance} % of Shipment
											Value)
										</td>
										<td className="font14" align="right">
											SAR{' '}
											{(
												(data.shipmentValue / 100) *
												shipperSettings.insurance
											).toFixed(2)}
											/-
										</td>
									</tr>
								</table>
							) : null}
							<table className="table">
								<tr>
									<td className="bordertop" align="left">
										Additional Services Total:
									</td>
									<td className="bordertop" align="right">
										SAR {data.additionalCharges}/-
									</td>
								</tr>
								<tr>
									{/* after adjusting below values which are service charges and receiver address surcharge
                  add both these values and then whatever the sum is add that to the state.js file in the varibale
                  name 'total' so that the changes are reflected on the form because total represent the sum of both these
                  values */}
									<td>Delivery Charges:</td>
									<td align="right">SAR {data.deliveryCharges}/-</td>
								</tr>
								<tr>
									<td>Receiver Address Surcharge:</td>
									<td align="right">
										SAR {data.customerAddressCharges}
										/-
									</td>
								</tr>
							</table>
							<table className="table">
								<tr>
									<td className="bordertop" align="left">
										Sub Total:
									</td>
									<td className="bordertop" align="right">
										SAR{' '}
										{(
											data.additionalCharges +
											data.deliveryCharges +
											data.customerAddressCharges
										).toFixed(2)}
										/-
									</td>
								</tr>
								<tr>
									<td align="left">VAT: (15%)</td>
									<td align="right">
										SAR{' '}
										{(
											((data.additionalCharges +
												data.deliveryCharges +
												data.customerAddressCharges) /
												100) *
											15
										).toFixed(2)}
										/-
									</td>{' '}
									{/* calculation of 15% of the total of all charges */}
								</tr>
							</table>
							<table className="table">
								<tr>
									<td className="font18" align="left">
										Total: (VAT Inclusive)
									</td>
									<td className="font18" align="right">
										SAR{' '}
										{(
											data.additionalCharges +
											data.deliveryCharges +
											data.customerAddressCharges +
											((data.additionalCharges +
												data.deliveryCharges +
												data.customerAddressCharges) /
												100) *
												15
										).toFixed(2)}
										/-
									</td>{' '}
									{/* this is the total including the tax of 15% */}
								</tr>
							</table>
						</div>
						<div className="col-md-6">
							<h2>Receiver Bill</h2>
							<div className="form-row">
								<div className="form-group col-md-12">
									<label htmlFor="billingType">Shipment Bill</label>
									<select
										type="text"
										className="form-control"
										name="billingType"
										placeholder="Enter COD Amount"
										onChange={(e) =>
											setdata({ ...data, billingType: e.target.value })
										}
										ref={register({
											required: true,
											validate: (value) => value !== 'true',
										})}
									>
										<option key={987} value="true">
											Select Shipment Bill (COD/Prepaid)
										</option>
										<option key={10879} value="COD">
											Cash On Delievery (COD)
										</option>
										<option key={19023} value="Prepaid">
											Prepaid
										</option>
									</select>
									<span style={{ color: 'red' }}>
										{errors.billingType && 'Billing Type is required *'}
									</span>
								</div>

								{data.billingType === 'COD' ? (
									<div className="form-group col-md-12">
										<label htmlFor="shipmentValue">
											Cash On Delivery (COD)
										</label>
										<input
											type="number"
											className="form-control"
											name="codValue"
											min="1"
											placeholder="Enter Shipment Cash on Delivery Amount"
											onChange={(e) =>
												setdata({ ...data, codValue: e.target.value })
											}
											ref={register({ min: 1, required: true })}
										/>
										<span style={{ color: 'red' }}>
											{errors?.codValue?.types?.required &&
												'COD value is required *'}
										</span>
										<span style={{ color: 'red' }}>
											{errors?.codValue?.types?.min &&
												'the minimum COD amount is SAR 1/-'}
										</span>
									</div>
								) : null}
							</div>
							{data.billingType === 'COD' ? (
								<>
									<table className="table bordernone mb-3">
										<thead>
											<tr>
												<td className="font18 bordernone redcolor" align="left">
													Cash to be collected from Receiver
												</td>
												<td
													className="font18 bordernone redcolor"
													align="right"
												>
													SAR {data.codValue}/-
												</td>
											</tr>
										</thead>
									</table>
									<div className="form-row">
										<div className="col-sm-12">
											<p>
												Note: COD does not include delivery charges. Shipper is
												liable to pay all delivery and additional service
												charges
											</p>
										</div>
									</div>
								</>
							) : null}
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-sm-6">
							<div className="form-row mb-4 mt-4">
								<div>
									<label className="mr-3">
										<input type="hidden" />
									</label>
								</div>
							</div>
						</div>
						<div className="form-group col-md-6">
							<input
								type="hidden"
								className="form-control"
								id="billedAmount"
								placeholder="Billed Amount"
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-12">
							<div className="btn-container float-left">
								<button
									type="button"
									className="btn btn-danger canclebtn"
									onClick={() => cancel()}
								>
									Cancel
								</button>
							</div>
							<div className="btn-container float-right">
								{data.update ? (
									<button
										className="btn btn-success mt-3 width206 finishbtn"
										type="button"
										onClick={() => handleSubmit(updateData)()}
									>
										Update
									</button>
								) : (
									<>
										<input
											className="btn btn-success"
											value="Add to way bill"
											type="button"
											onClick={() => handleSubmit(onSubmit)()}
										/>

										<div className="clearfix"></div>
										<button
											className="btn btn-success mt-3 width130 finishbtn"
											type="button"
											onClick={() => submitData()}
										>
											Finish
										</button>
									</>
								)}
							</div>
							<div className="clearfix" />
						</div>
					</div>
				</form>
				<div className="clearfix"></div>
				<div className="col-sm-12 margintop30">
					<Table data={list} />
				</div>
			</div>
		</>
	);
}
