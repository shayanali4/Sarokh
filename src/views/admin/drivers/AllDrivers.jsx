import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allDriversApi, deleteDriverApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { driverEditHelper } from '../../../Utils/driverHelper';
import { useRecoilState } from 'recoil';
import { driverData } from '../../../components/DriverFormSteps/state';

export default function AllDrivers(props) {
	const [data, setdata] = useRecoilState(driverData);
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			allDriversApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const handleClick = (row) => {
		console.log(row.row.original);
		try {
			const result = driverEditHelper(row.row.original);
			console.log(result);
			setdata(result);
			hist.push('/admin/drivers/adddriver/step1');
		} catch (e) {
			toast.error(e.message);
		}
	};

	const deleteDriver = (row) => {
		deleteDriverApi(row.row.original.id)
			.then((res) => {
				toast.success('Driver Deleted!');
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
						<i className="fa fa-edit" onClick={() => handleClick(row)}></i>
						&nbsp;
						<i className="fa fa-trash" onClick={() => deleteDriver(row)} />
					</Fragment>
				);
			},
		},
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
