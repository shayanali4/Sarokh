import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { dealerData } from './state';
import { uploadFile } from '../../Api/generalApi';
import { cities } from '../../Utils/cities';
import StepIndicator from './StepIndicator';
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers';
import { basicInformation } from '../../formValidation/dealerValidationSchema';

export default function BasicInformation(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(dealerData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(basicInformation),
	});

	console.log(data);

	const onSubmit = (formData) => {
		setdata({ ...data, ...formData });
		hist.push(props.next);
	};

	const uploadProfilePicture = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, profilePicture: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const uploadIqamaFile = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, iqamaFile: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Add Dealer</h2>
			</div>
			<div classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="current" />
				</div>
				<form class="margintop30 padding20" onSubmit={handleSubmit(onSubmit)}>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstName">Owner Name</label>
							<input
								type="text"
								class="form-control"
								name="owner"
								placeholder="Owner Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.owner && errors.owner.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="BusinessGroupName">
								Business Group Name: (Optional)
							</label>
							<input
								type="text"
								class="form-control"
								name="businessGroupName"
								placeholder="Business Group Name"
								ref={register()}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.businessGroupName && errors.businessGroupName.message}
							</span>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="contactNo">Contact Number</label>
							<input
								type="text"
								class="form-control"
								name="contactNo"
								placeholder="Contact Number"
								defaultValue={'9665'}
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contactNo && errors.contactNo.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="email">Email</label>
							<input
								type="email"
								class="form-control"
								name="email"
								placeholder="abc@gmail.com"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.email && errors.email.message}
							</span>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="nicNumber">National ID/Iqama Number</label>
							<input
								type="text"
								class="form-control"
								name="nicNumber"
								placeholder="National ID/Iqama Number"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.nicNumber && errors.nicNumber.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">National ID/Iqama Copy</label>
							<input
								type="file"
								accept=".png, .jpg, .jpeg, .pdf"
								className="form-control"
								placeholder="RegistrationFile"
								name="iqamaFile"
								onChange={(e) => uploadIqamaFile(e.target.files[0])}
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Date Of Birth:</label>
							<input
								type="date"
								class="form-control"
								name="dateOfBirth"
								placeholder="DOB"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.dateOfBirth && errors.dateOfBirth.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Profile Picture</label>
							<input
								type="file"
								accept=".png, .jpg, .jpeg, .pdf"
								className="form-control"
								name="profilePicture"
								onChange={(e) => uploadProfilePicture(e.target.files[0])}
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Country</label>
							<select
								type="text"
								class="form-control"
								name="country"
								placeholder="Country"
								ref={register({ required: true })}
							>
								<option value="SAU">Saudi Arabia</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.country && errors.country.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">City</label>
							<select
								type="text"
								class="form-control"
								name="city"
								placeholder="City"
								ref={register({ required: true })}
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
								{errors.city && errors.city.message}
							</span>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Address</label>
							<input
								type="text"
								class="form-control"
								name="address"
								placeholder="Address"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.address && errors.address.message}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Post Code</label>
							<input
								type="text"
								class="form-control"
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
					<div className="btn-container float-right mt-2 mb-2 mr-1">
						<button
							className="btn btn-danger dark-grey"
							type="button"
							onClick={() => hist.goBack()}
						>
							Cancel
						</button>
						&nbsp;
						<button
							className="btn btn-success"
							type="submit"
							disabled={
								data.profilePicture !== undefined &&
								data.iqamaFile !== undefined
									? false
									: true
							}
						>
							Next step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
