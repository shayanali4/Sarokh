import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allDealersApi, deleteDealerApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';
import { dealerEditHelper } from '../../../Utils/dealerHelper';
import { useRecoilState } from 'recoil';
import { dealerData } from '../../../components/DealerFormSteps/state';

export default function AllDealers(props) {
	const [data, setdata] = useRecoilState(dealerData);
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			allDealersApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const handleClick = (row) => {
		const result = dealerEditHelper(row.row.original);
		setdata(result);
		hist.push('/admin/dealer/adddealer/step1');
		console.log(result);
	};

	const deleteDealer = (row) => {
		deleteDealerApi(row.row.original.id)
			.then((res) => {
				toast.success('Dealer Has Been Deleted!');
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
						<i className="fa fa-trash" onClick={() => deleteDealer(row)} />
					</Fragment>
				);
			},
		},
		{
			Header: 'Owner Name',
			accessor: 'ownerName',
		},
		{
			Header: 'Contact No',
			accessor: 'contact',
		},
		{
			Header: 'Contract Ending',
			accessor: 'contractEndDate',
			Cell: (row) => {
				return (
					<>{moment(row.row.original.contractEndDate).format('YYYY-MM-DD')}</>
				);
			},
		},
		{
			Header: 'Compensation Rate',
			accessor: 'perShipmentsCompensation',
		},
		{
			Header: 'Current Points (No of Points Owned)',
			accessor: '',
			Cell: (row) => {
				return <>{row.row.original.dealerPoints.length}</>;
			},
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
								<h2 className="float-left">Dealer Owners</h2>
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
