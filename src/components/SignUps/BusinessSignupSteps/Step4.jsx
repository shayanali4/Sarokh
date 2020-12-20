import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Redirect, useHistory } from 'react-router-dom';
import { businessSignupData } from './state';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';

export default function Step4(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(businessSignupData);
	const { register, handleSubmit, errors } = useForm({
		shouldFocusError: true,
		defaultValues: data,
		mode: 'onChange',
		criteriaMode: 'all',
	});
	console.log(data);
	if (Object.keys(data).length === 0 && data.constructor === Object) {
		return <Redirect to="/business/signup/step1" />;
	}

	const OnSubmit = async (formdata) => {
		console.log(formdata);
		setdata({ ...data, ...formdata, postReady: true });
	};

	if (data.postReady) {
		axios
			.post(`${process.env.REACT_APP_API}/shipper/add`, {
				billingAddress: {
					address: data.address,
					city: data.city,
					concernedPerson: data.concernedPerson,
					concernedPersonDesignation: data.concernedPersonDesignation,
					country: data.country,
					locationLatitude: '',
					locationLongitude: '',
					postCode: data.postCode,
				},
				security: {
					username: data.username,
					password: data.password,
					confirmPassword: data.confirmPassword,
				},
				shipperBasicInfo: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					// dateOfBirth: new Date(data.dateOfBirth).toISOString(),
					contact: data.contact,
					profilePicture: '',
				},
				shipperBusinessDetail: {
					bankName: data.bankName,
					businessLogo: '',
					businessName: data.businessName,
					iban: data.iban,
					iqamaNumber: data.iqamaNumber,
					iqamaFile: data.iqamaFile,
					vatFile: '',
					vatNumber: '',
				},
				shipperWarehouse: {},
				verification: {
					emailOTP: '',
					mobileOTP: '',
				},
			})
			.then((res) => {
				console.log(res);
				if (res.data.status === 200) {
					toast.success(res.data.message);
					setdata({});
					hist.push('/');
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}
	return (
		<Container>
			<div className="card-header">
				<h2>Business Signup</h2>
			</div>
			<div className="card-body">
				<StepIndicator step1="done" step2="done" step3="done" step4="current" />
				<form className="margintop30" onSubmit={handleSubmit(OnSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								className="form-control"
								name="username"
								placeholder="User Name"
								ref={register({ required: true })}
							/>
							{errors?.username?.types?.required && (
								<p style={{ color: 'red' }}>firstName is required</p>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								name="password"
								placeholder="Password"
								ref={register({ required: true })}
							/>
							{errors?.password?.types?.required && (
								<p style={{ color: 'red' }}>password is required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								className="form-control"
								name="confirmPassword"
								placeholder="Confirm Password"
								ref={register({ required: true })}
							/>
							{errors?.confirmPassword?.types?.required && (
								<p style={{ color: 'red' }}>confirm password is required</p>
							)}
						</div>
					</div>
					<div className="btn-container float-right form-row">
						<div className="col-sm-12">
							<button
								className="btn btn-primary dark-grey mr-1"
								type="button"
								onClick={() => hist.goBack()}
							>
								Back
							</button>
							<button className="btn btn-success mr-0" type="submit">
								Finish
							</button>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
