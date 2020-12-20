import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allVehiclesApi, deleteVehicleApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function AllShipments(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			allVehiclesApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const Edit = (row) => {
		console.log(row.row.original.id);
		hist.push({
			pathname: '/admin/vehicles/addvehicle',
			state: {
				...row.row.original,
				createdDate: moment(row.row.original.createdDate).format(
					moment.HTML5_FMT.DATE
				),
			},
		});
	};

	const Delete = (id) => {
		deleteVehicleApi(id)
			.then((res) => {
				toast.success('vehicle deleted');
				setresponse({ ...response, loading: true });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const columns = [
		{
			Header: 'Action',
			accessor: '',
			Cell: (row) => {
				return (
					<Fragment>
						<i className="fa fa-edit" onClick={() => Edit(row)}></i>
						&nbsp;
						<i
							className="fa fa-trash"
							onClick={() => Delete(row.row.original.id)}
						></i>
					</Fragment>
				);
			},
		},
		{
			Header: 'Vehicle Name',
			accessor: 'name',
		},
		{
			Header: 'Owner',
			accessor: 'owner',
		},
		{
			Header: 'Type',
			accessor: 'type',
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
							{console.log(item)}
							<ListingContainer>
								<div className="card-header">
									<h2 className="float-left">All Vehicles</h2>
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
