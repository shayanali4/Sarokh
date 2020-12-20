import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	getShipperDetailApi,
	updateShipperDetailApi,
} from '../../../Api/adminApi';
import { uploadFile } from '../../../Api/generalApi';
import { useTransition, animated } from 'react-spring';
import { cities } from '../../../Utils/cities';
import { toast } from 'react-toastify';
import { filter } from 'underscore';
import { shipperDetailSchema } from '../../../formValidation/shipperDetailValidation';
import { joiResolver } from '@hookform/resolvers';

export default function ShipperDetail(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({
		loading: true,
	});
	const [fileUrls, setFileUrls] = useState({});

	const { register, errors, handleSubmit, reset } = useForm({
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(shipperDetailSchema),
	});

	useEffect(() => {
		getShipperDetailApi().then((res) => {
			setresponse({ loading: false, shipperList: res });
		});
	}, []);

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

	const uploadContent = async (file, name) => {
		await uploadFile(file)
			.then((res) => {
				setFileUrls({ ...fileUrls, [name]: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const setShipperData = (id) => {
		if (id !== 'none') {
			let result = filter(response.shipperList, function (doc) {
				return doc.id == id;
			});
			structureData(result[0]);
		}
	};

	const structureData = (data) => {
		const newValues = {
			...data,
			userName: data.user?.userName,
			userPassword: data.user?.userPassword,
			email: data.user?.email,
			contact: data.user?.contact,
		};
		reset(newValues);
		setresponse({ ...response, userId: newValues.id });
	};

	const onSubmit = (formData) => {
		const payload = {
			...formData,
			...fileUrls,
			userId: response.userId,
			// user: {
			// 	email: formData.email,
			// 	userName: formData.userName,
			// 	userPassword: formData.userPassword,
			// },
		};
		updateShipperDetailApi(payload)
			.then((res) => {
				toast.success('Shipper Detail Updated');
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">Shipper Detail</h2>
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">Shippers</label>
										<select
											className="form-control"
											onChange={(e) => setShipperData(e.target.value)}
										>
											<option value="none">Select Shipper</option>
											{response.shipperList?.map((doc) => {
												return (
													<option key={doc.id} value={doc.id}>
														{doc.user?.fullName}
													</option>
												);
											})}
										</select>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">First Name</label>
										<input
											type="text"
											className="form-control"
											name="firstName"
											placeholder="Shipper Owner First Name"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.firstName && errors.firstName.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="lastName">Last Name</label>
										<input
											type="text"
											className="form-control"
											name="lastName"
											placeholder="Shipper Owner Last Name"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.lastName && errors.lastName.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">Contact No</label>
										<input
											type="text"
											className="form-control"
											name="contact"
											placeholder="Contact No"
											ref={register}
											defaultValue={'9665'}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.contact && errors.contact.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="lastName">Email</label>
										<input
											type="text"
											className="form-control"
											name="email"
											placeholder="Email"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.email && errors.email.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">National ID/ Iqama Number</label>
										<input
											type="text"
											className="form-control"
											name="nicNumber"
											placeholder="National ID/ Iqama Number"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.nicNumber && errors.nicNumber.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="lastName">
											Upload Copy of ID Card/ Iqama
										</label>
										<input
											type="file"
											className="form-control"
											placeholder="Upload Copy of ID Card/ Iqama"
											onChange={(e) =>
												uploadContent(e.target.files[0], 'nicFile')
											}
										/>
									</div>
								</div>
								{/* <div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="firstName">Buisness Name</label>
											<input
												type="text"
												className="form-control"
												name="buisnessName"
												placeholder="Buiness Name"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="lastName">Account Type</label>
											<input
												type="text"
												className="form-control"
												name="lastName"
												placeholder="Account Type"
											/>
										</div>
									</div> */}
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">VAT Number</label>
										<input
											type="text"
											className="form-control"
											name="vatNumber"
											placeholder="First Name"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.vatNumber && errors.vatNumber.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="lastName">
											Commercial Registration Number
										</label>
										<input
											type="text"
											className="form-control"
											name="crNumber"
											placeholder="Commercial Registration Number"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.crNumber && errors.crNumber.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">
											Commercial Registration Copy
										</label>
										<input
											type="file"
											className="form-control"
											placeholder="Commercial Registration Copy"
											onChange={(e) =>
												uploadContent(e.target.files[0], 'crFile')
											}
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="lastName">Bank Name</label>
										<input
											type="text"
											className="form-control"
											name="bank"
											placeholder="Bank Name"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.bank && errors.bank.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">IBAN</label>
										<input
											type="text"
											className="form-control"
											name="iban"
											placeholder="IBAN"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.iban && errors.iban.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="lastName">Select Country</label>
										<select
											type="text"
											className="form-control"
											name="country"
											placeholder="Select Country"
											ref={register}
										>
											<option value="SUA">Saudi Arabia</option>
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.country && errors.country.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">Select City</label>
										<select
											type="text"
											className="form-control"
											name="city"
											placeholder="Select City"
											ref={register}
										>
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
									<div className="form-group col-md-6">
										<label htmlFor="lastName">Office/ Billing Address</label>
										<input
											type="text"
											className="form-control"
											name="address"
											placeholder="Office/ Billing Address"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.address && errors.address.message}
										</span>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstName">Post Code</label>
										<input
											type="number"
											className="form-control"
											name="postCode"
											placeholder="Post Code"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.postCode && errors.postCode.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="firstName">Username</label>
										<input
											type="password"
											className="form-control"
											name="userName"
											placeholder="Username"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.userName && errors.userName.message}
										</span>
									</div>
								</div>
								{/* <div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="firstName">Designation</label>
											<input
												type="text"
												className="form-control"
												name="firstName"
												placeholder="Designation"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="lastName">Concern Person</label>
											<input
												type="text"
												className="form-control"
												name="lastName"
												placeholder="Concern Person"
											/>
										</div>
									</div> */}
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="lastName">Password</label>
										<input
											type="text"
											className="form-control"
											name="userPassword"
											placeholder="Password"
											ref={register}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.userPassword && errors.userPassword.message}
										</span>
									</div>
								</div>
								<div class="form-row">
									<div class="col-sm-12">
										<div class="btn-container float-right">
											<button
												class="btn btn-success"
												type="submit"
												onClick={() => handleSubmit(onSubmit)()}
											>
												Update
											</button>
										</div>
									</div>
								</div>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
