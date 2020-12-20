import React, { useEffect } from 'react';
import { warehouseData } from './state';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';
import {
	addShipperWarehouseApi,
	updateShipperWarehouseApi,
} from '../../../Api/adminApi';
import { toast } from 'react-toastify';

export default function Step2(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(warehouseData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onSubmit',
		criteriaMode: 'all',
	});

	useEffect(() => {
		if (data.ready && data.update === undefined) {
			// this condition is when creating new warehouse, in that case update will be undefined
			addShipperWarehouseApi(data)
				.then((res) => {
					toast.success('warehouse has been added');
					setdata({
						location: [{ latitude: '23.8859', longitude: '39.1925' }],
					});
					hist.push(props.redirect);
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
		if (data.ready && data.update) {
			console.log('this is the data', data);
			updateShipperWarehouseApi(data)
				.then((res) => {
					toast.success('warehouse data has been updated');
					setdata({
						location: [{ latitude: '23.8859', longitude: '39.1925' }],
					});
					hist.push(props.redirect);
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [data]);

	if (Object.keys(data).length === 1 && data.constructor === Object) {
		return <Redirect to={props.defaultPath} />;
	}
	console.log(data);

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata, ready: true });
	};

	return (
		<Container>
			<div className="card-header">
				{data.update ? <h2>Edit Location</h2> : <h2>Add New Location</h2>}
			</div>
			<div className="card-body">
				<StepIndicator
					step1="done"
					step3="done"
					step4="current"
					type={props.type}
				/>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="racksPerRow">Racks Per Row</label>
							<input
								type="number"
								className="form-control"
								name="racksPerRow"
								placeholder="Racks Per Row"
								ref={register({ required: true })}
							/>
							{errors?.racksPerRow?.types?.required && (
								<p style={{ color: 'red' }}>Racks Per Row are required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="rows">Rows</label>
							<input
								type="number"
								className="form-control"
								name="rows"
								placeholder="Rows"
								ref={register({ required: true })}
							/>
							{errors?.rows?.types?.required && (
								<p style={{ color: 'red' }}>rows are required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="columnsPerRow">Columns</label>
							<input
								type="number"
								className="form-control"
								name="columnsPerRow"
								placeholder="Columns Per Row"
								ref={register({ required: true })}
							/>
							{errors?.columnsPerRow?.types?.required && (
								<p style={{ color: 'red' }}>Columns per Row are required</p>
							)}
						</div>
					</div>
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
				</form>
			</div>
		</Container>
	);
}

// console.log(moment(new Date()).format('hh:mm'))
// console.log(new Date(new Date().toDateString()+" "+"18:56"))
