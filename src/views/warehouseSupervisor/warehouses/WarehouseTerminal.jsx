import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import Table from '../../../components/Generictable/generatictable';
import { useHistory } from 'react-router-dom';
import {
	allDriversApi,
	warehouseListApi,
	assignCardToShipmentApi,
	assignDriverToShipmentApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { find, isUndefined } from 'underscore';

export default function WarehouseTerminal(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	const { register, errors, handleSubmit, watch } = useForm({
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const warehouses = await warehouseListApi();
				const drivers = await allDriversApi();
				setresponse({
					tableData: [],
					loading: false,
					warehouses: warehouses.warehouseList,
					drivers: drivers,
				});
			} catch (e) {
				toast.error(e.message);
			}
		}
		fetchData();
	}, []);

	console.log(response);

	const columns = [
		{
			Header: 'Tracking Number',
			accessor: 'trackingNumber',
		},
		{
			Header: 'Shipper',
			accessor: 'shipper',
		},
		{
			Header: 'From',
			accessor: 'fromCity',
		},
		{
			Header: 'To',
			accessor: 'toCity',
		},
		{
			Header: 'Address',
			accessor: 'address',
		},
	];

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-270px,0,0)',
			transition: 'ease-out 0.3s',
		},
	});

	const onSubmit = (formData) => {
		console.log(formData);
		if (formData.assignCard === 'true') {
			assignCardToShipmentApi(formData)
				.then((res) => {
					addTrackingNumber(res);
				})
				.catch((err) => {
					toast.error(err.message);
				});
		} else {
			const payload = {
				assignDriver: true,
				...formData,
			};
			assignDriverToShipmentApi(payload)
				.then((res) => {
					addTrackingNumber(res);
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const addTrackingNumber = (res) => {
		let checkTrackingNumber = find(response.tableData, function (doc) {
			return doc.trackingNumber === res.trackingNumber;
		});

		if (!isUndefined(checkTrackingNumber)) {
			if (res.trackingNumber === checkTrackingNumber.trackingNumber) {
				toast.warning('Tracking number already recieved in warehouse');
			}
		} else {
			setresponse({
				...response,
				tableData: [...response.tableData, { ...res }],
			});
		}
	};

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								<h2 className="float-left">Warehouse Terminal</h2>
							</div>
							<div className="card-body">
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Warehouse</label>
										<select
											name="warehouseId"
											className="form-control"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">Select Warehouse</option>
											{response.warehouses.map((doc) => {
												return (
													<option key={doc.id} value={doc.id}>
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
									<div className="col">
										<div className="btn-group btn-group-toggle float-right mt-4">
											<label id="1" className="btn btn-secondary active">
												<input
													type="radio"
													name="assignCard"
													value="true"
													defaultChecked={true}
													onClick={(e) => {
														document.getElementById('1').className =
															'btn btn-secondary active';
														document.getElementById('2').className =
															'btn btn-secondary';
													}}
													ref={register()}
												/>{' '}
												Check In
											</label>
											<label id="2" className="btn btn-secondary">
												<input
													type="radio"
													name="assignCard"
													value="false"
													onClick={(e) => {
														document.getElementById('1').className =
															'btn btn-secondary';
														document.getElementById('2').className =
															'btn btn-secondary active';
													}}
													ref={register()}
												/>{' '}
												Check Out
											</label>
											<span style={{ color: 'red' }}>
												{' '}
												{errors.enable && 'Field required'}
											</span>
										</div>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Tracking Number</label>
										<div className="input-group mb-3">
											<input
												name="trackingNumber"
												type="text"
												className="form-control"
												placeholder="Enter Tracking Number"
												onChange={(e) => {
													if (e.target.value.length === 11) {
														handleSubmit(onSubmit)();
													}
												}}
												ref={register({ required: true })}
											/>
											<div className="input-group-append">
												<button
													className="btn btn-success"
													type="button"
													id="button-addon2"
													onClick={() => handleSubmit(onSubmit)()}
												>
													Enter
												</button>
											</div>
										</div>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.trackingNumber && 'Tracking Number is required'}
										</span>
									</div>
									{watch('assignCard') === 'false' ? (
										<div className="col">
											<label>Select Driver</label>
											<select
												name="driverId"
												className="form-control"
												ref={register({
													required: true,
													validate: (value) => value !== 'true',
												})}
											>
												<option value="true">Select Driver</option>
												{response.drivers.map((doc) => {
													return (
														<option key={doc.id} value={doc.id}>
															{doc.user.fullName}
														</option>
													);
												})}
											</select>
											<span style={{ color: 'red' }}>
												{' '}
												{errors.driverId && 'Driver is required'}
											</span>
										</div>
									) : null}
								</div>
								<Table
									data={response.tableData}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
