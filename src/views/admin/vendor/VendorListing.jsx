import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	vendorListingApi,
	deleteVendorApi,
	vendorDetailApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function AllVendors(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			vendorListingApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const Edit = (row) => {
		vendorDetailApi(row.row.original.id)
			.then((res) => {
				hist.push({
					pathname: '/admin/vendors/addvendor',
					state: {
						...res,
						userName: res.user.userName,
						bankName: res.bankAccount.bank,
						bankAccountIban: res.bankAccount.iban,
						bankAccountId: res.bankAccount.id,
						update: true,
					},
				});
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const details = (row) => {
		hist.push({
			pathname: '/admin/vendors/vendordetail',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const deleteRecord = (row) => {
		deleteVendorApi(row.row.original.id)
			.then((res) => {
				toast.success('Vendor Deleted');
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
						<i className="fa fa-info-circle" onClick={() => details(row)} />
						&nbsp;
						<i className="fa fa-edit" onClick={() => Edit(row)}></i>
						&nbsp;
						<i className="fa fa-trash" onClick={() => deleteRecord(row)}></i>
					</Fragment>
				);
			},
		},
		{
			Header: 'Vendor Name',
			accessor: 'user.fullName',
		},
		{
			Header: 'Vendor Contact',
			accessor: 'user.contact',
		},
		{
			Header: 'Vendor Email',
			accessor: 'user.email',
		},
		{
			Header: 'Vendor City',
			accessor: 'city',
		},
		{
			Header: 'Vendor Balance',
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
						{console.log(item)}
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">View Vendors</h2>
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
