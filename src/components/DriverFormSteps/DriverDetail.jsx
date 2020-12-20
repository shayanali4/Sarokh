import React, { useState, useEffect } from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import StepIndicator from './StepIndicator';
import { cities } from '../../Utils/cities';
import { toast } from 'react-toastify';
import { uploadFile } from '../../Api/generalApi';
import { Redirect } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers';
import { driverDetails } from '../../formValidation/driverSchemavalidation';
import Loading from '../Loading/Loading';
import { sarokhWarehouseList } from '../../Api/generalApi';

export default function DriverDetails(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(driverData);
	const [response, setResponse] = useState({ loading: true });
	console.log(response);

	useEffect(() => {
		sarokhWarehouseList()
			.then((res) => {
				setResponse({ loading: false, data: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(driverDetails),
	});

	if (Object.keys(data).length === 1 && data.constructor === Object) {
		return <Redirect to={props.defaultPath} />;
	}

	const onSubmit = (formData) => {
		console.log(formData);
		setdata({ ...data, ...formData });

		if (data.driverType === 'Employee') {
			hist.push(props.next.step4);
		} else {
			hist.push(props.next.step3);
		}
	};

	const uploadNic = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, nicFile: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const uploadLicence = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, licenseFile: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return response.loading ? (
		<Loading />
	) : (
		<Container>
			<div className="card-header">
				<h2>{data.update ? 'Edit Driver' : 'Add Driver'}</h2>
			</div>
			<div style={{ padding: '25px' }} classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="done" step2="current" />
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-3">
						<label name="deliveryLocationRadio">Type of Driver</label>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="driverType"
								value="Employee"
								onChange={() => {
									setdata({ ...data, driverType: 'Employee' });
								}}
								ref={register()}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.driverType && 'this is required'}
							</span>
							<label className="form-check-label" htmlFor="indeliverycase">
								Employee
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="driverType"
								value="FreeLancer"
								onChange={() => {
									setdata({ ...data, driverType: 'FreeLancer' });
								}}
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.driverType && 'This field is required'}
							</span>
							<label className="form-check-label" htmlFor="selectNow">
								Free Lancer
							</label>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="address">Address</label>
							<input
								id="address"
								type="text"
								className="form-control"
								name="address"
								placeholder="Address"
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
								ref={register({ required: true })}
							>
								<option value="SAU">Saudi Arabia</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.country && errors.country.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label>Select City</label>
							<select
								className="form-control"
								name="city"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="">---Select City---</option>
								{cities.map((city) => {
									return <option value={city}>{city}</option>;
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
								type="text"
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
							<label for="nicNumber">National ID/Iqama/Passport No</label>
							<input
								id="nicNumber"
								type="text"
								className="form-control"
								name="nicNumber"
								placeholder="National ID/Iqama/Passport No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.nicNumber && errors.nicNumber.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">
								National ID/Iqama/Passport Copy Upload
							</label>
							<div className="input-group">
								<div className="col p-0">
									<input
										type="file"
										accept=".png, .jpg, .jpeg, .pdf"
										className="form-control"
										placeholder="RegistrationFile"
										name="nicFile"
										onChange={(e) => uploadNic(e.target.files[0])}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="licenceNumber">Driver License No</label>
							<input
								id="licenseNumber"
								type="text"
								className="form-control"
								name="licenseNumber"
								placeholder="Driver Licence No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.licenseNumber && errors.licenseNumber.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">License Copy Upload</label>
							<div className="input-group">
								<div className="col p-0">
									<input
										type="file"
										accept=".png, .jpg, .jpeg, .pdf"
										className="form-control"
										placeholder="RegistrationFile"
										name="licenseFile"
										onChange={(e) => uploadLicence(e.target.files[0])}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="Driver Warehouse">Driver Warehouse</label>
							<select
								className="form-control"
								name="warehouseId"
								id="driver Warehouse"
								ref={register()}
							>
								<option value="">--Select Warehouse--</option>
								{response.data.map((doc) => {
									return (
										<option key={doc.id} value={doc.id}>
											{doc.name}
										</option>
									);
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.warehouseId && errors.warehouseId.message}
							</span>
						</div>
					</div>

					<div
						class="btn-container float-right margintop30"
						style={{ margin: '10px' }}
					>
						<button
							class="btn btn-danger dark-grey m-2"
							type="button"
							onClick={() => hist.goBack()}
						>
							Back
						</button>
						<button
							class="btn btn-success"
							type="submit"
							disabled={data.nicFile && data.licenseFile ? false : true}
						>
							Next
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
