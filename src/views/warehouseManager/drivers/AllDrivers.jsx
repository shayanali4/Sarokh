import React, { useState, useEffect } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allDriversApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { filter } from 'underscore';

export default function AllDrivers(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			allDriversApi()
				.then((res) => {
					setresponse({ loading: false, data: filterDrivers(res) });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	function filterDrivers(data) {
		// this function returns driver which belong to the same warehouse as the warehouse manager
		let user = JSON.parse(localStorage.getItem('user'));
		return filter(data, function (doc) {
			return user.warehouseId === doc.warehouseId;
		});
	}

	const columns = [
		{
			Header: 'First Name',
			accessor: 'firstName',
		},
		{
			Header: 'Last Name',
			accessor: 'lastName',
		},
		{
			Header: 'Contact No',
			accessor: 'user.contact',
		},
		{
			Header: 'Driver Type',
			accessor: 'driverType',
		},
		{
			Header: 'Warehouse',
			accessor: 'warehouse.name',
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
								<h2 className="float-left">All Drivers</h2>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
