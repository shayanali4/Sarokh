import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { dealerData } from './state';
import { uploadFile } from '../../Api/generalApi';
import { addDealerApi, updateDealerApi } from '../../Api/adminApi';
import StepIndicator from './StepIndicator';
import { toast } from 'react-toastify';
import { isEmpty } from 'underscore';
import { joiResolver } from '@hookform/resolvers';
import { businessInformation } from '../../formValidation/dealerValidationSchema';

export default function BusinessInformation(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(dealerData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(businessInformation),
	});

	if (isEmpty(data)) {
		return <Redirect to={props.defaultPath} />;
	}

	console.log(data);

	if (data.ready && data.update === undefined) {
		addDealerApi(data)
			.then((res) => {
				toast.success('Dealer has been added');
				hist.push(props.next);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	} else if (data.ready && data.update) {
		updateDealerApi(data)
			.then((res) => {
				toast.success('Dealer has been updated!');
				hist.push(props.next);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	const onSubmit = (formData) => {
		setdata({ ...data, ...formData, ready: true });
		// hist.push(props.next);
	};

	const uploadContract = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, contractFile: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const cancel = () => {
		setdata({});
		hist.push(props.next);
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Add Dealer</h2>
			</div>
			<div classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="done" step2="current" />
				</div>
				<form class="margintop30 padding20">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstName">Contract ID</label>
							<input
								type="number"
								class="form-control"
								name="contractId"
								placeholder="Enter Contract ID"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contractId && errors.contractId.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Contract Upload</label>
							<input
								type="file"
								accept=".png, .jpg, .jpeg, .pdf"
								className="form-control"
								placeholder="RegistrationFile"
								name="contactFile"
								onChange={(e) => uploadContract(e.target.files[0])}
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstName">Contract Starting Date</label>
							<input
								type="date"
								class="form-control"
								name="contractStartDate"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contractStartDate && errors.contractStartDate.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Contract Ending Date</label>
							<input
								type="date"
								class="form-control"
								name="contractEndDate"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contractEndDate && errors.contractEndDate.message}
							</span>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Compensation Per Shipment</label>
							<input
								type="text"
								class="form-control"
								name="compensationPerShipment"
								placeholder="Enter Amount in SAR"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.compensationPerShipment &&
									errors.compensationPerShipment.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Compensation Cycle</label>
							<input
								type="number"
								class="form-control"
								name="compensationCycle"
								placeholder="Compensation Cycle"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.compensationCycle && errors.compensationCycle.message}
							</span>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label htmlFor="bank">Bank Name</label>
							<select className="form-control" name="bank" ref={register()}>
								<option value="">Select Bank Name</option>
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
								<option value="Arab National Bank"> Arab National Bank </option>
								<option value="Bank AlBilad"> Bank AlBilad </option>
								<option value="Bank AlJazira"> Bank AlJazira </option>
								<option value="Gulf International Bank Saudi Aribia (GIB-SA)">
									{' '}
									Gulf International Bank Saudi Aribia (GIB-SA){' '}
								</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.bank && errors.bank.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Enter IBAN</label>
							<input
								type="text"
								class="form-control"
								name="iban"
								placeholder="Enter IBAN"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.iban && errors.iban.message}
							</span>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Username</label>
							<input
								type="text"
								class="form-control"
								name="userName"
								placeholder="Enter Username"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.userName && errors.userName.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Password</label>
							<input
								type="password"
								class="form-control"
								name="password"
								placeholder="Enter Password"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.password && errors.password.message}
							</span>
						</div>
					</div>
					<div className="btn-container float-right mt-2 mb-2">
						<button
							className="btn btn-secondary dark-grey"
							type="button"
							onClick={() => hist.goBack()}
						>
							Cancel
						</button>
						&nbsp;
						{data.update ? (
							<button
								className="btn btn-success"
								type="button"
								onClick={() => handleSubmit(onSubmit)()}
								disabled={data.contractFile ? false : true}
							>
								Update
							</button>
						) : (
							<button
								className="btn btn-success"
								type="button"
								onClick={() => handleSubmit(onSubmit)()}
								disabled={data.contractFile ? false : true}
							>
								Finish
							</button>
						)}
					</div>
				</form>
			</div>
		</Container>
	);
}
