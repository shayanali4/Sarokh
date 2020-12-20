import React from 'react';
import { warehouseData } from './state';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import axios from 'axios';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';

export default function Step3(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(warehouseData);
	const user = JSON.parse(localStorage.getItem('user'));
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});
	console.log(data);

	if (Object.keys(data).length === 1 && data.constructor === Object) {
		return <Redirect to={props.defaultPath} />;
	}

	if (data.ready && data.update === undefined) {
		axios
			.post(`${process.env.REACT_APP_API}/shipper-warehouse/add`, {
				address: data.address,
				city: data.city,
				country: data.country,
				forkLifter: data.forkLifter,
				locationLatitude: data.location[0].latitude,
				locationLongitude: data.location[0].longitude,
				managerName: data.managerName,
				mangerContact: data.mangerContact,
				mangerEmail: data.mangerEmail,
				name: data.name,
				operationalTimefrom: new Date(
					new Date().toDateString() + ' ' + data.operationalTimefrom
				).toISOString(),
				operationalTimeto: new Date(
					new Date().toDateString() + ' ' + data.operationalTimeto
				).toISOString(),
				postalCode: data.postalCode,
				qrscanner: data.qrscanner,
				thermalPrinter: data.thermalPrinter,
				shipperId: user.id,
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					toast.success('warehouse has been added');
					setdata({
						location: [{ latitude: '23.8859', longitude: '39.1925' }],
					});
					hist.push('/shipper/shipperwarehouse/ourlocation');
				} else {
					toast.error('something went wrong');
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	if (data.ready && data.update) {
		axios
			.put(`${process.env.REACT_APP_API}/shipper-warehouse/update`, {
				address: data.address,
				city: data.city,
				country: data.country,
				forkLifter: data.forkLifter,
				locationLatitude: data.location[0].latitude,
				locationLongitude: data.location[0].longitude,
				managerName: data.managerName,
				mangerContact: data.mangerContact,
				mangerEmail: data.mangerEmail,
				name: data.name,
				operationalTimefrom: new Date(
					new Date().toDateString() + ' ' + data.operationalTimefrom
				).toISOString(),
				operationalTimeto: new Date(
					new Date().toDateString() + ' ' + data.operationalTimeto
				).toISOString(),
				postalCode: data.postalCode,
				qrscanner: data.qrscanner,
				thermalPrinter: data.thermalPrinter,
				shipperId: user.id,
				id: data.id,
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					toast.success('warehouse data has been updated');
					setdata({
						location: [{ latitude: '23.8859', longitude: '39.1925' }],
					});
					hist.push(props.redirect);
				} else {
					toast.error('something went wrong');
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	const onSubmit = (formdata) => {
		if (props.path) {
			/* this if condition is for admin adding warehouses since this is the second step in the admin warehouse
			so this check if put in place to redirect to the final step */

			setdata({ ...data, ...formdata });
			hist.push(props.path);
		} else {
			setdata({ ...data, ...formdata, ready: true });
		}
	};

	return (
		<Container>
			<div className="card-header">
				{data.update ? <h2>Edit Location</h2> : <h2>Add New Location</h2>}
			</div>
			<div className="card-body">
				<StepIndicator
					step1="done"
					step2="done"
					step3="current"
					type={props.type}
				/>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="margintop30">
							<div className="form-row">
								<div className="form-group col-md-6">
									<label style={{ marginRight: 10, fontWeight: 'bold' }}>
										Fork Lifter
									</label>
									<select
										className="form-control"
										name="forkLifter"
										ref={register({ required: true })}
									>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
								</div>
								<div className="form-group col-md-6">
									<label style={{ marginRight: 10, fontWeight: 'bold' }}>
										QR Scanner
									</label>
									<select
										className="form-control"
										name="qrscanner"
										ref={register({ required: true })}
									>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label style={{ marginRight: 10, fontWeight: 'bold' }}>
										Thermal Printer
									</label>
									<select
										className="form-control"
										name="thermalPrinter"
										ref={register({ required: true })}
									>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
								</div>
							</div>
						</div>

						{props.type === 'Admin' ? (
							<div className="btn-container float-right">
								<button
									className="btn btn-secondary dark-grey"
									type="button"
									onClick={() => hist.goBack()}
								>
									Go to previous step
								</button>
								&nbsp;
								<button className="btn btn-secondary dark-grey" type="submit">
									Next
								</button>
							</div>
						) : (
							<div className="btn-container float-right">
								<button
									className="btn btn-danger"
									type="button"
									onClick={() => hist.goBack()}
								>
									Back
								</button>
								&nbsp;
								{data.update === undefined ? (
									<button className="btn btn-success" type="submit">
										Finish
									</button>
								) : (
									<button className="btn btn-secondary dark-grey" type="submit">
										Update
									</button>
								)}
							</div>
						)}
					</form>
				</div>
			</div>
		</Container>
	);
}
