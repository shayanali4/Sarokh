import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Redirect, useHistory } from 'react-router-dom';
import { businessSignupData } from './state';
import { useForm, get } from 'react-hook-form';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';
import { cities } from '../../../Utils/cities';
import { joiResolver } from '@hookform/resolvers';
import { billingDetail } from '../../../formValidation/businessSignupValidation';

export default function Step3(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(businessSignupData);
	const { register, handleSubmit, errors } = useForm({
		shouldFocusError: true,
		defaultValues: data,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(billingDetail),
	});
	console.log(data);

	const onSubmit = (formdata) => {
		console.log(formdata);
		setdata({ ...data, ...formdata });
		hist.push('/business/signup/step4');
	};

	if (Object.keys(data).length === 0 && data.constructor === Object) {
		return <Redirect to="/business/signup/step1" />;
	}

	return (
		<Container>
			<div className="card-header">
				<h2>Business Signup</h2>
			</div>
			<div className="card-body">
				<StepIndicator step1="done" step2="done" step3="current" />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="address">Office/Billing Address</label>
							<input
								id="address"
								type="text"
								className="form-control"
								name="address"
								placeholder="Office/Billing Address"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.address && errors.address.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="country">Select Country</label>
							<select
								id="country"
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
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="city">Select City</label>
							<select
								id="city"
								className="form-control"
								name="city"
								ref={register({
									required: true,
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
						<div className="form-group col-md-6">
							<label for="postCode">Post Code</label>
							<input
								id="postCode"
								type="number"
								className="form-control"
								name="postCode"
								placeholder="Post Code"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.postCode && errors.postCode.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="concernedPerson">Contact Person</label>
							<input
								id="concernedPerson"
								type="text"
								className="form-control"
								name="concernedPerson"
								placeholder="Concern Person"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.concernedPerson && errors.concernedPerson.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="concernedPersonDesignation">Designation</label>
							<input
								id="concernedPersonDesignation"
								type="text"
								className="form-control"
								name="concernedPersonDesignation"
								placeholder="Designation"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.concernedPersonDesignation &&
									errors.concernedPersonDesignation.message}
							</span>
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
								Next
							</button>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
