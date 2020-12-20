import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import StepIndicator from './StepIndicator';
import { Redirect } from 'react-router-dom';
import { addDriverApi, updateDriverApi } from '../../Api/adminApi';
import { toast } from 'react-toastify';

export default function BasicInformation(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(driverData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	if (Object.keys(data).length === 1 && data.constructor === Object) {
		return <Redirect to={props.defaultPath} />;
	}

	console.log(data);

	if (data.ready && data.update === undefined) {
		addDriverApi(data)
			.then((res) => {
				toast.success('driver successfully added');
				setdata({});
				hist.push(props.next);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	} else if (data.ready && data.update) {
		console.log(data);
		updateDriverApi(data)
			.then((res) => {
				toast.success('driver updated');
				setdata({});
				hist.push(props.next);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	const onSubmit = (formData) => {
		let driverData = { ...data };
		delete driverData['warehouse'];
		delete driverData['user'];
		delete driverData['role'];
		delete driverData['bankAccount'];

		setdata({ ...driverData, ...formData, ready: true });
	};

	return (
		<Container>
			<div className="card-header">
				<h2>{data.update ? 'Edit Driver' : 'Add Driver'}</h2>
			</div>
			<div style={{ padding: '25px' }} classname="card-body">
				<div className="margintop30">
					<StepIndicator
						step1="done"
						step2="done"
						step3="done"
						step4="done"
						step5="current"
					/>
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								className="form-control"
								name="userName"
								placeholder="Username"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.username && 'Username is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								name="password"
								placeholder="Passsword"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.password && 'Password is required'}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-danger dark-grey m-2"
							type="button"
							onClick={() => hist.goBack()}
						>
							Previous Step
						</button>
						{data.update ? (
							<button className="btn btn-success" type="submit">
								Update
							</button>
						) : (
							<button className="btn btn-success" type="submit">
								Finish
							</button>
						)}
					</div>
				</form>
			</div>
		</Container>
	);
}
