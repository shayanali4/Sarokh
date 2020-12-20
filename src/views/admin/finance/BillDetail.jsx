import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { billDetailApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { isUndefined } from 'underscore';
import moment from 'moment';

export default function BillDetail(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (isUndefined(hist.location.state)) {
			hist.goBack();
		} else {
			billDetailApi(hist.location.state.id)
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, []);

	// const calculatePendingAmount = (data) => {
	// 	if (data.paymentTransaction) {
	// 		let pendingAmount = 0;
	// 		let newData = { ...data };
	// 		data.billSummary.map((doc) => {
	// 			pendingAmount += doc.amount;
	// 		});
	// 		pendingAmount -= data.paymentTransaction.amountPaid;
	// 		newData.paymentTransaction.amountPending = pendingAmount;
	// 		return newData;
	// 	} else {
	// 		return data;
	// 	}
	// };

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

	const column1 = [
		{
			Header: 'Date',
			Cell: (row) => {
				return (
					<>{moment(row.row.original.datetime).format('YYYY-MM-DD hh:mm:ss')}</>
				);
			},
		},
		{
			Header: 'Amount Paid',
			accessor: 'amountPaid',
		},
		{
			Header: 'Payment Type',
			accessor: 'paymentMethod',
		},
		{
			Header: 'Pending Amount',
			accessor: 'amountPending',
		},
	];

	const column2 = [
		{
			Header: 'Tracking NO',
			accessor: 'trackingNumber',
		},
		{
			Header: 'Date',
			accessor: 'date',
		},
		{
			Header: 'Units',
			accessor: 'units',
		},
		{
			Header: 'Amount',
			accessor: 'amount',
		},
	];

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								<h2 className="float-left">Bill Detail</h2>
							</div>
							<div className="card-body billdetail">
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6"> Bill Type:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> {response.data.billType}</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6"> Bill Category:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{' '}
												{response.data.billCategory}
											</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6"> User Type</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> {response.data.userType}</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Bill To</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.data.billTo}</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Creation Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{' '}
												{moment(response.data.creationDate).format(
													'DD-MM-YYYY'
												)}
											</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Due Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{' '}
												{moment(response.data.dueDate).format('DD-MM-YYYY')}
											</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Starting Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{moment(response.data.startingDate).format(
													'DD-MM-YYYY'
												)}
											</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Ending Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{moment(response.data.endingDate).format('DD-MM-YYYY')}
											</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Wallet Name:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> {response.data.walletName}</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Status:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.data.status}</p>
										</label>
									</div>
								</div>
								<Table
									data={
										response.data.paymentTransaction
											? [response.data.paymentTransaction]
											: []
									}
									columns={column1}
									tableclass={'table-responsive custom-table margintop10'}
									hiddenColumns={['id']}
								/>
								<h4
									style={{
										color: 'red',
										marginTop: '20px',
										marginBottom: '20px',
									}}
								>
									Bill Summary
								</h4>
								<Table
									data={response.data.billSummary}
									columns={column2}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
									hiddenColumns={['id']}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
