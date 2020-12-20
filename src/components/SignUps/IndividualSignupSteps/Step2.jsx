import React from 'react';
import { useRecoilState } from 'recoil';
import { Redirect, useHistory } from 'react-router-dom';
import { state } from './state';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';
import { joiResolver } from '@hookform/resolvers';
import { businessDetails } from '../../../formValidation/individualSignupValidation';

export default function Step2(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(state);
	const { register, handleSubmit, errors } = useForm({
		shouldFocusError: true,
		defaultValues: data,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(businessDetails),
	});
	console.log(data);

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata });
		hist.push('/individual/signup/step3');
	};

	if (Object.keys(data).length === 0 && data.constructor === Object) {
		return <Redirect to="/individual/signup/step1" />;
	}

	const uploadFile = async (file) => {
		const formdata = new FormData();
		formdata.append('file', file);
		formdata.append('filename', file.name);

		await axios
			.post(`${process.env.REACT_APP_API}/upload-file`, formdata, {
				headers: {
					'Content-Type': 'multipart/form-data;',
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					console.log(res.data.data);
					setdata({ ...data, iqamaFile: res.data.data });
				}
			})
			.catch((err) => {
				window.alert(err.message);
			});
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Individual Signup</h2>
			</div>
			<div className="card-body">
				<StepIndicator step1="done" step2="current" />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="businessName">Business Name</label>
							<input
								id="businessName"
								name="businessName"
								type="text"
								className="form-control"
								placeholder="Business Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.businessName && errors.businessName.message}
							</span>
						</div>

						<div className="form-group col-md-6">
							<label for="iqamaNumber">National ID/Iqama No</label>
							<input
								id="iqamaNumber"
								name="iqamaNumber"
								type="text"
								className="form-control"
								placeholder="Iqama No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.iqamaNumber && errors.iqamaNumber.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="bankName">Bank Name</label>
							<select
								id="bankName"
								className="form-control"
								name="bankName"
								ref={register({
									required: true,
								})}
							>
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
								{errors.bankName && errors.bankName.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="inputEmail4">National ID/Iqama Picture</label>
							<div className="input-group">
								<div className="input-group">
									<div className="col">
										<input
											type="file"
											accept=".png, .jpg, .jpeg, .pdf"
											className="form-control"
											placeholder="RegistrationFile"
											onChange={(e) => {
												uploadFile(e.target.files[0]);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="iban">IBAN</label>
							<input
								id="iban"
								name="iban"
								type="text"
								className="form-control"
								placeholder="IBAN"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.iban && errors.iban.message}
							</span>
						</div>
					</div>
					<div className="btn-container float-right margintop30 form-row">
						<div className="col-sm-12">
							<button
								className="btn btn-primary dark-grey mr-1"
								type="button"
								onClick={() => hist.goBack()}
							>
								Back
							</button>
							<button
								className="btn btn-success mr-0"
								type="submit"
								disabled={data.iqamaFile === undefined ? true : false}
							>
								Next
							</button>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
