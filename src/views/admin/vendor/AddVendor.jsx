import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { cities } from '../../../Utils/cities';
import { addVendorApi, updateVendorApi } from '../../../Api/adminApi';
import { uploadFile } from '../../../Api/generalApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { isNull, isUndefined } from 'underscore';
import moment from 'moment';

export default function AddVendor(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [fileURL, setfileURL] = useState('');
	const { register, errors, handleSubmit, setValue } = useForm({
		defaultValues: isNull(hist.location.state) ? {} : hist.location.state,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	useEffect(() => {
		if (!isNull(hist.location.state) && !isUndefined(hist.location.state)) {
			setfileURL({ crFile: hist.location.state.crFile });
		}
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

	const onSubmit = (formData) => {
		console.log({ ...formData, ...fileURL });
		if (!isNull(hist.location.state) && !isUndefined(hist.location.state)) {
			updateVendorApi({
				...formData,
				...fileURL,
				id: hist.location.state.id,
				userId: hist.location.state.user.userId,
				bankAccountId: hist.location.state.bankAccountId,
			})
				.then((res) => {
					toast.success('Vendor Data Updated');
					hist.push('/admin/vendors/allvendors');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		} else {
			addVendorApi({ ...formData, ...fileURL })
				.then((res) => {
					toast.success('Vendor Added');
					hist.push('/admin/vendors/allvendors');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const uploadCRFile = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setfileURL({ crFile: res });
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
						<Container>
							<div className="card-header">
								<h2 className="float-left">Add Vendor</h2>
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Company Name</label>
										<input
											type="text"
											className="form-control"
											name="companyName"
											placeholder="Company Name"
											ref={register({ required: true })}
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Contact</label>
										<input
											type="text"
											className="form-control"
											name="contact"
											placeholder="Contact"
											ref={register({ required: true })}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Email</label>
										<input
											type="email"
											className="form-control"
											name="email"
											placeholder="Email"
											ref={register({ required: true })}
										/>
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
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Country</label>
										<select
											type="text"
											className="form-control"
											name="country"
											placeholder="Country"
											disabled={true}
											ref={register({ required: true })}
										>
											<option value="SUA">Saudi Arabia</option>
										</select>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">City</label>
										<select
											type="text"
											className="form-control"
											name="city"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">Select City</option>
											{cities.map((doc, i) => {
												return (
													<option key={i} value={doc}>
														{doc}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Commercial Registration No</label>
										<input
											type="text"
											className="form-control"
											name="commercialRegistrationNumber"
											placeholder="Commercial Registration No"
											ref={register({ required: true })}
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Commercial Registration CR Upload</label>
										<input
											type="file"
											className="form-control"
											placeholder="file upload"
											onChange={(e) => {
												uploadCRFile(e.target.files[0]);
											}}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Bank Name</label>
										<select
											className="form-control"
											name="bankName"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">Select Bank Name</option>
											<option value="The National Commercial Bank">
												The National Commercial Bank{' '}
											</option>
											<option value="The Saudi British Bank">
												The Saudi British Bank{' '}
											</option>
											<option value="Saudi Investment Bank">
												Saudi Investment Bank{' '}
											</option>
											<option value="Alinma Bank">Alinma Bank </option>
											<option value="Banque Saudi Fransi">
												{' '}
												Banque Saudi Fransi{' '}
											</option>
											<option value="Riyad Bank"> Riyad Bank </option>
											<option value="Samba Financial Group (Samba)">
												{' '}
												Samba Financial Group (Samba){' '}
											</option>
											<option value="Alawwal Bank"> Alawwal Bank </option>
											<option value="Al Rajhi Bank"> Al Rajhi Bank </option>
											<option value="Arab National Bank">
												{' '}
												Arab National Bank{' '}
											</option>
											<option value="Bank AlBilad"> Bank AlBilad </option>
											<option value="Bank AlJazira"> Bank AlJazira </option>
											<option value="Gulf International Bank Saudi Aribia (GIB-SA)">
												{' '}
												Gulf International Bank Saudi Aribia (GIB-SA){' '}
											</option>
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.bank && 'Bank is required'}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Account No: (IBAN)</label>
										<input
											type="text"
											className="form-control"
											name="bankAccountIban"
											placeholder="Account No: (IBAN)"
											ref={register({ required: true })}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Payment API ID</label>
										<input
											type="text"
											className="form-control"
											name="paymentApiId"
											placeholder="Payment API ID"
											ref={register({ required: true })}
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Payment API Key</label>
										<input
											type="text"
											className="form-control"
											name="paymentApiKey"
											placeholder="Payment API Key"
											ref={register({ required: true })}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Payment API URL</label>
										<input
											type="text"
											className="form-control"
											name="paymentApiUrl"
											placeholder="Payment API URL"
											ref={register({ required: true })}
										/>
									</div>
									<div className="form-group col-md-6"></div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Username</label>
										<input
											type="text"
											className="form-control"
											name="userName"
											placeholder="Username"
											ref={register({ required: true })}
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Password</label>
										<input
											type="password"
											className="form-control"
											name="password"
											placeholder="Password"
											ref={register({ required: true })}
										/>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col-sm-12">
										<button
											type="button"
											className="btn btn-danger flaot-left"
											onClick={() => {
												hist.push('/admin/vendors/allvendors');
											}}
										>
											Cancel
										</button>
										<button
											type="button"
											className="btn btn-danger float-right btnbrown"
											onClick={() => {
												handleSubmit(onSubmit)();
											}}
											disabled={fileURL === '' ? true : false}
										>
											Submit
										</button>
									</div>
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
