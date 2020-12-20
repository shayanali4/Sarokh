import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import Container from '../../../components/Containers/ListingContainer';
import { sarokhWarehouseList } from '../../../Api/generalApi';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../Api/generalApi';
import { addVehicleApi, updateVehicleApi } from '../../../Api/adminApi';
import { has, isNull } from 'underscore';

export default function Step1(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	console.log(hist);

	useEffect(() => {
		if (response.loading) {
			sarokhWarehouseList()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	});

	console.log(response);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: isNull(hist.location.state) ? {} : hist.location.state,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});
	const onSubmit = (formData) => {
		const file = has(response, 'registrationFile')
			? response.registrationFile
			: hist.location.state.registrationFile;
		if (hist.location.state) {
			updateVehicleApi({
				...formData,
				registrationFile: file,
				createdDate: new Date(formData.createdDate).toISOString(),
			})
				.then((res) => {
					toast.success('vehicle data updated successfully');
					hist.push('/admin/vehicles/allvehicles');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		} else {
			addVehicleApi({
				...formData,
				registrationFile: response.registrationFile,
				createdDate: new Date(formData.createdDate).toISOString(),
			})
				.then((res) => {
					toast.success('vehicle has been added!');
					hist.push('/admin/vehicles/allvehicles');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const uploadRegistration = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setresponse({ ...response, registrationFile: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const cancel = () => {
		hist.push('/admin/vehicles/allvehicles');
	};

	/* checks for the registrationFile variable in the json object if it exists the button is not disabled if not
    than the button is disabled */

	const buttonDisabled = () => {
		if (
			has(response, 'registrationFile') ||
			has(hist.location.state, 'registrationFile')
		) {
			if (has(hist.location.state, 'registrationFile')) {
				return isNull(hist.location.state.registrationFile) ? true : false;
			}
			return false;
		} else {
			return true;
		}
	};
	return response.loading ? (
		<Loading />
	) : (
		<Container>
			<div className="card-header">
				<h2>Add Vechile</h2>
			</div>
			<div classname="card-body">
				<form className="margintop10 p-2" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row mb-3">
						<div className="col">
							<label for="owner">Vehicle Owner</label>
							<select
								id="owner"
								className="form-control"
								name="owner"
								ref={register({
									required: true,
									validate: (value) => value != 'true',
								})}
							>
								<option value="true">Select Owner</option>
								<option value="sarokh">Sarokh</option>
								<option value="leasedoroperator">
									Leased Or Operator Owned
								</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.owner && 'Owner is required'}
							</span>
						</div>
						<div className="col">
							<label for="currentMileage">Current Milage</label>
							<input
								id="currentMileage"
								type="number"
								className="form-control"
								placeholder="Current Milage"
								name="currentMileage"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.currentMilage && 'Current Milage is required'}
							</span>
						</div>
					</div>
					<div className="form-row mb-3">
						<div className="col">
							<label for="make">Vehicle Make</label>
							<input
								id="make"
								type="text"
								className="form-control"
								placeholder="Make"
								name="make"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.make && 'Make is required'}
							</span>
						</div>
						<div className="col">
							<label for="model">Vehicle Model</label>
							<input
								id="model"
								type="text"
								className="form-control"
								placeholder="Model"
								name="model"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.model && 'Model is required'}
							</span>
						</div>
					</div>
					<div className="form-row mb-3">
						<div className="col">
							<label for="createdDate">Vehicle Creation Date</label>
							<input
								id="createdDate"
								type="date"
								className="form-control"
								placeholder="Created Date"
								name="createdDate"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.createdDate && 'Creation Date is required'}
							</span>
						</div>
						<div className="col">
							<label for="name">Vehicle Name</label>
							<input
								id="name"
								type="text"
								className="form-control"
								placeholder="Name"
								name="name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.name && 'Name is required'}
							</span>
						</div>
					</div>
					<div className="form-row mb-3">
						<div className="col">
							<label for="cargoCapacity">Vehicle Cargo Capacity</label>
							<input
								id="cargoCapacity"
								type="text"
								className="form-control"
								placeholder="Cargo Capacity"
								name="cargoCapacity"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.cargoCapacity && 'Cargo Capacity is required'}
							</span>
						</div>
						<div className="col">
							<label for="file">Vehicle Registration File</label>
							<input
								id="file"
								type="file"
								name="registrationFile"
								accept=".png, .jpg, .jpeg, .pdf"
								className="form-control"
								placeholder="RegistrationFile"
								onChange={(e) => uploadRegistration(e.target.files[0])}
							/>
						</div>
					</div>
					<div className="form-row mb-3">
						<div className="col">
							<label for="regno">Vehicle Registration Number</label>
							<input
								id="regno"
								type="text"
								className="form-control"
								placeholder="Registration Number"
								name="registrationNumber"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.registrationNumber && 'Registration Number is required'}
							</span>
						</div>
						<div className="col">
							<label for="vehreg">Vehicle Registration Year</label>
							<input
								id="vehreg"
								type="text"
								className="form-control"
								placeholder="Registration Year"
								name="registrationYear"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.registrationYear && 'Registration Year is required'}
							</span>
						</div>
					</div>
					<div className="form-row mb-3">
						<div className="col">
							<label for="status">Current Status</label>
							<select
								id="status"
								className="form-control"
								name="status"
								formcontrolname="status"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Select Status</option>
								<option value="active">Active</option>
								<option value="undermaintinence">Under Maintinence</option>
								<option value="accidented">Accidented</option>
								<option value="sold">Sold</option>
								<option value="returned">Returned</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.status && 'Status is required'}
							</span>
						</div>
						<div className="col">
							<label for="type">Vehicle Type</label>
							<input
								id="type"
								type="text"
								className="form-control"
								placeholder="Type"
								name="type"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.type && 'Type is required'}
							</span>
						</div>
					</div>
					<div className="form-row mb-3">
						<div className="col-6">
							<label for="warehouse">Warehouse</label>
							<select
								id="warehouse"
								className="form-control"
								name="warehouseId"
								placeholder="Assign Warehouse"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Select Warehouse</option>
								{response.data.map((doc, i) => {
									return (
										<option key={i} value={doc.id}>
											{doc.name}
										</option>
									);
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.warehouseId && 'Warehouse is required'}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-secondary dark-grey"
							type="button"
							onClick={() => cancel()}
						>
							Cancel
						</button>
						&nbsp;
						{hist.location.state ? (
							<button
								className="btn btn-success"
								type="submit"
								disabled={buttonDisabled()}
							>
								Update
							</button>
						) : (
							<button
								className="btn btn-success"
								type="submit"
								disabled={buttonDisabled()}
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
