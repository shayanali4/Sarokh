import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allShippersApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function AllShippers(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			allShippersApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const handleClick = (row) => {
		console.log(row.row.original.id);
		hist.push({
			pathname: '/shipper/shipments/vieworder',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const columns = [
		{
			Header: 'Shipper ID',
			accessor: 'id',
		},
		{
			Header: 'Shipper Name',
			accessor: 'user.userName',
		},
		{
			Header: 'Shipper Type',
			accessor: 'shipperType',
		},
		{
			Header: 'Contact No',
			accessor: 'user.contact',
		},
		{
			Header: 'Email',
			accessor: 'user.email',
		},
		{
			Header: 'Status',
			accessor: 'status',
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
								<h2 className="float-left">All Shippers</h2>
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
