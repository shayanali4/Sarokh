import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allTripsApi, deleteTripApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function AllTrips(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			allTripsApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const handleClick = (row) => {
		console.log(row.row.original.tripId);
		hist.push({
			pathname: '/admin/scheduling/tripdetail',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const deleteTrip = (row) => {
		if (
			window.confirm(
				'Are you sure to delete this trip ? (CheckIn shipments at Warehouse terminal)'
			)
		) {
			deleteTripApi(row.row.original.id)
				.then((res) => {
					toast.success('Trip Deleted!');
					setresponse({ ...response, loading: true });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const columns = [
		{
			Header: 'Action',
			accessor: '',
			Cell: (row) => {
				return (
					<Fragment>
						<i
							className="fa fa-info-circle"
							onClick={() => handleClick(row)}
						></i>
						&nbsp;
						<i className="fa fa-trash" onClick={() => deleteTrip(row)} />
					</Fragment>
				);
			},
		},
		{
			Header: 'Trip Id',
			accessor: 'id',
		},
		{
			Header: 'Date',
			accessor: 'dispatchDatetime',
			Cell: (row) => {
				return (
					<>{moment(row.row.original.dispatchDatetime).format('DD-MM-YYYY')}</>
				);
			},
		},
		{
			Header: 'Sarokh Warehouse',
			accessor: 'startPoint',
		},
		{
			Header: 'Driver',
			accessor: 'driverName',
		},
		{
			Header: 'Vehicle',
			accessor: 'vehicle.name',
		},
		{
			Header: 'Pick Up',
			accessor: 'pickupShipments',
		},
		{
			Header: 'Deliveries',
			accessor: 'deliveryShipments',
		},
		{
			Header: 'Amount Collection',
			accessor: 'codCollection',
		},
		{
			Header: 'Status',
			accessor: 'tripStatus',
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

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">All Trips</h2>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
									hiddenColumns={['id']}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
