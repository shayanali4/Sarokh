import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	allDealersApi,
	pointListingApi,
	deletePointApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';
import { pointEditHelper } from '../../../Utils/dealerHelper';

export default function PointListing(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			pointListingApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const handleClick = (row) => {
		const result = pointEditHelper(row.row.original);
		hist.push({ pathname: '/admin/dealer/addpoint', state: result });
		console.log(result);
	};

	const deletePoint = (row) => {
		deletePointApi(row.row.original.id)
			.then((res) => {
				toast.success('Point Deleted');
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
						<i
							className="fa fa-trash"
							onClick={() => {
								deletePoint(row);
							}}
						/>
					</Fragment>
				);
			},
		},
		{
			Header: 'Owner Name',
			accessor: 'owner',
		},
		{
			Header: 'Point Name',
			accessor: 'dealerPointName',
		},
		{
			Header: 'City',
			accessor: 'city',
		},
		{
			Header: 'Contact No',
			accessor: 'operatorContact',
		},
		{
			Header: 'Wallet Balance',
			accessor: '',
		},
		{
			Header: 'Current Inventory',
			accessor: '',
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
								<h2 className="float-left">Points</h2>
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
