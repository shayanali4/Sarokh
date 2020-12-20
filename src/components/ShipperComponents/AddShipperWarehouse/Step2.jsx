import React from 'react';
import { warehouseData } from './state';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';
import { warehouseManager } from '../../../formValidation/warehouseSchemaValidation';
import { joiResolver } from '@hookform/resolvers';

export default function Step2(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(warehouseData);
	const { register, errors, handleSubmit, watch, control } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(warehouseManager),
	});

	if (Object.keys(data).length === 1 && data.constructor === Object) {
		return <Redirect to={props.defaultPath} />;
	}
	console.log(data);

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata });
		console.log(formdata);
		hist.push(props.path);
	};
	console.log(watch('operationalTimeto'));

	return (
		<Container>
			<div className="card-header">
				{data.update ? <h2>Edit Location</h2> : <h2>Add New Location</h2>}
			</div>
			<div className="card-body">
				<StepIndicator step1="done" step2="current" type={props.type} />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="mangerContact">Contact No</label>
							<input
								type="text"
								className="form-control"
								name="mangerContact"
								placeholder="Contact No"
								defaultValue="9665"
								ref={register({})}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.mangerContact && errors.mangerContact.message}
							</span>
						</div>

						<div className="form-group col-sm-6" />
						<div className="form-group col-md-6">
							<label htmlFor="operationalTimeto">Operational Time From</label>
							<input
								type="text"
								className="form-control"
								placeholder="e.g 09:00 AM"
								name="operationalTimeto"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.operationalTimeto && errors.operationalTimeto.message}
							</span>
						</div>
						<div className="col-md-6">
							<label htmlFor="operationalTimeto">Operational Time To</label>
							<input
								type="text"
								className="form-control"
								placeholder="e.g 09:00 PM"
								name="operationalTimefrom"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.operationalTimefrom &&
									errors.operationalTimefrom.message}
							</span>
						</div>
					</div>
					<div className="btn-container float-right">
						<button
							className="btn btn-danger mr-2"
							type="button"
							onClick={() => hist.goBack()}
						>
							Back
						</button>
						<button className="btn btn-success" type="submit">
							Next
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}

// console.log(moment(new Date()).format('hh:mm'))
// console.log(new Date(new Date().toDateString()+" "+"18:56"))
