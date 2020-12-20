import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { billListApi, deleteBillApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function BillListing(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			billListApi()
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
			pathname: '/admin/finance/billdetail',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const deleteRecord = (row) => {
		if (window.confirm(`do you want to delete this bill?`)) {
			deleteBillApi(row.row.original.id)
				.then((res) => {
					toast.success('Bill has been deleted');
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
						<i
							className="ml-1 fa fa-trash"
							onClick={() => deleteRecord(row)}
						></i>
					</Fragment>
				);
			},
		},
		{
			Header: 'Bill No',
			accessor: 'id',
		},
		{
			Header: 'User Type',
			accessor: 'userType',
		},
		{
			Header: 'Bill To',
			accessor: 'billTo',
		},
		{
			Header: 'Bill Type',
			accessor: 'billType',
		},
		{
			Header: 'Bill Category',
			accessor: 'billCategory',
		},
		{
			Header: 'Due Date',
			accessor: 'dueDate',
			Cell: (row) => {
				return (
					<Fragment>
						{moment(row.row.original.dueDate).format('YYYY-MM-DD')}
					</Fragment>
				);
			},
		},
		{
			Header: 'Amount',
			accessor: 'totalAmount',
		},
		{
			Header: 'Status',
			accessor: 'paymentStatus',
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
								<h2 className="float-left">All Bill Details</h2>
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
