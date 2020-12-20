import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import StepIndicator from './StepIndicator';
import { toast } from 'react-toastify';
import { uploadFile } from '../../Api/generalApi';
import { Redirect } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers';
import { vehicleDetails } from '../../formValidation/driverSchemavalidation';

export default function VehicleDetail(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(driverData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(vehicleDetails),
	});

	if (Object.keys(data).length === 1 && data.constructor === Object) {
		return <Redirect to={props.defaultPath} />;
	}

	console.log(errors);

	const onSubmit = (formData) => {
		console.log(formData);
		setdata({ ...data, ...formData });
		hist.push(props.next);
	};

	const uploadRegistrationFile = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, registrationFile: res });
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
					<StepIndicator step1="done" step2="done" step3="current" />
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="vehicleName">Vehicle Name</label>
							<input
								id="vehicleName"
								type="text"
								className="form-control"
								name="vehicleName"
								placeholder="Vehicle Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.vehicleName && errors.vehicleName.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="vehicleModel">Vehicle Model</label>
							<input
								id="vehicleModel"
								type="number"
								className="form-control"
								name="vehicleModel"
								placeholder="Vehicle Model"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.vehicleModel && errors.vehicleModel.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="make">Vehicle Maker</label>
							<input
								id="make"
								type="text"
								className="form-control"
								placeholder="Vehicle Maker"
								name="make"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.make && errors.make.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="type">Vehicle Type</label>
							<input
								id="type"
								type="text"
								className="form-control"
								name="type"
								placeholder="Vehicle Type"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.type && errors.type.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="cargoCapacity">Vehicle Cargo Capacity</label>
							<input
								id="cargoCapacity"
								type="number"
								className="form-control"
								name="cargoCapacity"
								placeholder="Vehicle Cargo Capacity"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.cargoCapacity && errors.cargoCapacity.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="registrationNumber">Vehicle Reg No</label>
							<input
								id="registrationNumber"
								type="text"
								className="form-control"
								name="registrationNumber"
								placeholder="Vehicle Reg No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.registrationNumber && errors.registrationNumber.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="registrationFile">
								Vehicle Registration Copy
							</label>
							<div className="col">
								<input
									type="file"
									accept=".png, .jpg, .jpeg, .pdf"
									className="form-control"
									placeholder="RegistrationFile"
									name="registrationFile"
									onChange={(e) => uploadRegistrationFile(e.target.files[0])}
								/>
							</div>
						</div>
						<div className="form-group col-md-6">
							<label for="productionYear">Production Year</label>
							<input
								id="productionYear"
								type="number"
								className="form-control"
								name="productionYear"
								placeholder="Production Year"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.productionYear && errors.productionYear.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="registrationYear">Registration Year</label>
							<input
								id="registrationYear"
								type="number"
								className="form-control"
								name="registrationYear"
								placeholder="Registration Year"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.registrationYear && errors.registrationYear.message}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-danger dark-grey m-2"
							type="button"
							onClick={() => hist.goBack()}
						>
							Back
						</button>
						<button
							className="btn btn-success"
							type="submit"
							disabled={data.registrationFile ? false : true}
						>
							Next
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
