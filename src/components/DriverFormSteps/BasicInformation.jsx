import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import { uploadFile } from '../../Api/generalApi';
import StepIndicator from './StepIndicator';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers';
import { basicInformation } from '../../formValidation/driverSchemavalidation';

export default function BasicInformation(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(driverData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(basicInformation),
	});

	console.log(errors);

	const onSubmit = (formData) => {
		setdata({ ...data, ...formData });
		hist.push(props.next);
	};

	const uploadPicture = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, profilePicture: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<Container>
			<div className="card-header">
				<h2>{data.update ? 'Edit Driver' : 'Add Driver'}</h2>
			</div>
			<div style={{ padding: '25px' }} classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="current" />
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="firstName">First Name</label>
							<input
								id="firstName"
								type="text"
								className="form-control"
								name="firstName"
								placeholder="First Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.firstName && errors.firstName.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="lastName">Last Name</label>
							<input
								id="lastName"
								type="text"
								className="form-control"
								name="lastName"
								placeholder="Last Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.lastName && errors.lastName.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="contact">Contact No</label>
							<input
								id="contact"
								type="text"
								className="form-control"
								name="contact"
								placeholder="Contact No"
								defaultValue={'9665'}
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contact && errors.contact.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="email">Email</label>
							<input
								id="email"
								type="email"
								className="form-control"
								name="email"
								placeholder="Email"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.email && errors.email.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">Profile Picture</label>
							<div className="input-group">
								<div className="col p-0">
									<input
										type="file"
										accept=".png, .jpg, .jpeg, .pdf"
										className="form-control"
										placeholder="RegistrationFile"
										name="profilePicture"
										onChange={(e) => uploadPicture(e.target.files[0])}
									/>
								</div>
							</div>
						</div>
						<div className="form-group col-md-6">
							<label for="dateOfBirth">Date of Birth</label>
							<input
								id="dateOfBirth"
								type="date"
								className="form-control"
								name="dateOfBirth"
								placeholder="Date of Birth"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.dateOfBirth && errors.dateOfBirth.message}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-success"
							type="submit"
							disabled={data.profilePicture ? false : true}
						>
							Next Step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
