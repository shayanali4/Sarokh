import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { filter } from 'underscore';

export default function CreateTripForm(props) {
	const { register, errors, handleSubmit } = useForm({
		defaultValues: props.listing.id,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	const [stats, setstats] = useState({
		pointPickup: 0,
		shipperPickup: 0,
		deliveriesToPoint: 0,
		deliveriesToLastMile: 0,
		lastMileCod: 0,
		pointCollection: 0,
	});

	const [filteredData, setFilteredData] = useState({
		drivers: [],
		vehicles: [],
	});

	useEffect(() => {
		if (props.pointsData.length !== 0) {
			let sum = 0;

			props.pointsData.map((doc) => {
				sum += parseInt(doc.original.walletBalance);
			});

			setstats({ ...stats, pointCollection: sum });
		} else {
			setstats({ ...stats, pointCollection: 0 });
		}
	}, [props.pointsData]);

	useEffect(() => {
		if (props.deliveryData.length !== 0) {
			let deliveriesToPoint = 0;
			let deliveriesToLastMile = 0;
			let lastMileCod = 0;

			props.deliveryData.map((doc) => {
				if (doc.original.deliveryType === 'To Sarokh Point') {
					deliveriesToPoint += 1;
				} else if (doc.original.deliveryType === 'Last Mile') {
					deliveriesToLastMile += 1;
					lastMileCod += doc.original.codcollection;
				}
			});

			setstats({
				...stats,
				deliveriesToPoint: deliveriesToPoint,
				deliveriesToLastMile: deliveriesToLastMile,
				lastMileCod: lastMileCod,
			});
		} else {
			setstats({
				...stats,
				deliveriesToPoint: 0,
				deliveriesToLastMile: 0,
				lastMileCod: 0,
			});
		}
	}, [props.deliveryData]);

	useEffect(() => {
		if (props.pickUpData.length !== 0) {
			let pointPickup = 0;
			let shipperPickup = 0;

			props.pickUpData.map((doc) => {
				if (
					doc.original.pickupType === 'Sarokh Point' ||
					doc.original.pickupType === 'Sarokh Warehouse'
				) {
					pointPickup += 1;
				}
				if (doc.original.pickupType === 'Shipper Warehouse') {
					shipperPickup += 1;
				}
			});

			setstats({
				...stats,
				pointPickup: pointPickup,
				shipperPickup: shipperPickup,
			});
		} else {
			setstats({ ...stats, pointPickup: 0, shipperPickup: 0 });
		}
	}, [props.pickUpData]);

	const onSubmit = (data) => {
		props.setId({ ...props.listing, loading: true, id: data });
	};

	const filterData = (id) => {
		let drivers = filter(props.listing.data.drivers, function (doc) {
			return doc.warehouse.id == id;
		});

		let vehicles = filter(props.listing.data.vehicles, function (doc) {
			return doc.warehouse.id == id;
		});

		console.log(drivers, vehicles);
		setFilteredData({ drivers: drivers, vehicles: vehicles });
	};

	return (
		<Fragment>
			<div className="form-row mb-3">
				<div className="col">
					<select
						className="form-control"
						name="warehouse"
						onChange={(e) => filterData(e.target.value)}
						ref={register({
							required: true,
							validate: (value) => value !== 'true',
						})}
					>
						<option value="true">--- Select Warehouse ---</option>
						{props.listing.data.warehouses.map((doc, i) => {
							return (
								<option key={i} value={doc.id}>
									{doc.name}
								</option>
							);
						})}
					</select>
					{errors?.warehouse && (
						<p style={{ color: 'red' }}>Warehouse is required *</p>
					)}
				</div>
				<div className="col">
					<select
						className="form-control"
						name="vehicle"
						ref={register({
							required: true,
							validate: (value) => value !== 'true',
						})}
					>
						<option value="true">--- Select Vehicle ---</option>
						{filteredData.vehicles.map((doc, i) => {
							return (
								<option key={i} value={doc.id}>
									{doc.name}
								</option>
							);
						})}
					</select>
					{errors?.vehicle && (
						<p style={{ color: 'red' }}>Vehicle is required *</p>
					)}
				</div>
			</div>
			<div className="form-row mb-3">
				<div className="col">
					<select
						className="form-control"
						name="driver"
						ref={register({
							required: true,
							validate: (value) => value !== 'true',
						})}
					>
						<option value="true">--- Select Driver ---</option>
						{filteredData.drivers.map((doc, i) => {
							return (
								<option key={i} value={doc.id}>
									{doc.user.fullName}
								</option>
							);
						})}
					</select>
					{errors?.driver && (
						<p style={{ color: 'red' }}>Driver is required *</p>
					)}
				</div>
			</div>
			<div className="form-row mb-3">
				<div className="col-sm-12">
					<button
						type="button"
						className="btn btn-success mb-3"
						onClick={() => handleSubmit(onSubmit)()}
					>
						Fetch Details
					</button>
					<div className="clearfix"></div>
				</div>
			</div>
			<div className="row">
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">{stats.pointPickup}</span>
								<br />
								Point Pick up
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">{stats.shipperPickup}</span>
								<br />
								Shipper Pick up
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">{stats.deliveriesToPoint}</span>
								<br />
								Deliveries to Point
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">{stats.deliveriesToLastMile}</span>
								<br />
								Deliveries to Lastmile
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">{stats.lastMileCod}</span>
								<br />
								Lastmile COD
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">{stats.pointCollection}</span>
								<br />
								Point Collection
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
