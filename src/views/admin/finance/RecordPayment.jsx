import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	getUserWalletsApi,
	getUserBillsApi,
	getBillToDetailApi,
	recordBillPaymentApi,
	updateWalletApi,
	transactionAddApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { filter, isEmpty } from 'underscore';

export default function RecordPayment(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({
		loading: false,
		users: [],
		wallets: [],
		bills: [],
		userType: '',
		dueDate: '',
		amount: '',
	});
	console.log(response);

	const {
		register,
		errors,
		watch,
		handleSubmit,
		reset,
		getValues,
		trigger,
		unregister,
	} = useForm({
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	console.log(errors);
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

	const getWalletAndBill = async (id) => {
		/* this function get the wallet and bills of the selected user */

		try {
			const data = { userId: id, userType: response.userType };
			const wallets = await getUserWalletsApi(data);
			const bills = await getUserBillsApi(data);
			reset({
				walletId: 'true',
				billNo: 'true',
				paymentNote: '',
				paymentMethod: 'true',
				paymentType: 'true',
			}); // reset function clears out the previous selected values in the field

			if (wallets.length !== 0 || bills.length !== 0) {
				setresponse({
					...response,
					wallets: wallets,
					bills: bills,
					dueDate: null,
					amount: null,
				});
			} else {
				toast.error('No Bills and Wallets Found For This User');
				setresponse({
					...response,
					wallets: [],
					bills: [],
					dueDate: null,
					amount: null,
				});
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	const getUsers = (userType) => {
		/* this function calls the api to get users list of the selected userType */

		getBillToDetailApi(userType)
			.then((res) => {
				reset({ userId: 'true' });
				setresponse({
					...response,
					users: res,
					userType: userType,
					wallets: [],
					dueDate: null,
					amount: null,
				});
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	// const selectedBillDetails = () => {
	// 	/* this function is used to populated duedate , amount and the input field with name amountPaid */

	// 	if (
	// 		(response.userType === 'Dealer' || response.userType === 'Driver') &&
	// 		(getValues('paymentType') === 'Credit' ||
	// 			getValues('paymentType') === 'Debit') &&
	// 		getValues('billNo') === ''
	// 	) {
	// 		const wallet = filter(response.wallets, function (doc) {
	// 			return doc.walletId == getValues('walletId');
	// 		});

	// 		if (wallet.length !== 0) {
	// 			setresponse({
	// 				...response,
	// 				amount: wallet[0].currentBalance,
	// 			});
	// 		}
	// 	} else if (getValues('BillNo') !== '') {
	// 		const bill = getValues('billNo');
	// 		console.log(bill);
	// 		response.bills.map((doc) => {
	// 			if (bill === doc.id.toString()) {
	// 				setresponse({
	// 					...response,
	// 					dueDate: moment(doc.dueDate).format('YYYY-MM-DD'),
	// 					amount: doc.totalAmount,
	// 				});
	// 				reset({ paymentNote: '', paymentMethod: 'true' });
	// 			}
	// 		});
	// 	} else {
	// 		setresponse({
	// 			...response,
	// 			amount: null,
	// 			dueDate: null,
	// 		});
	// 	}
	// };

	// const onsubmit = (formData) => {
	// 	if (response.userType === 'Shipper') {
	// 		/* incase of shipper there must a billNo to post request */

	// 		if (formData.billNo === '') {
	// 			toast.error('Please select a bill No to submit');
	// 		}
	// 	} else {
	// 		formData = {
	// 			...formData,
	// 			amountPaid: response.amount - formData.amountPaid,
	// 		};

	// 		recordBillPaymentApi(formData)
	// 			.then((res) => {
	// 				toast.success('Data Submitted Successfully');
	// 			})
	// 			.catch((err) => {
	// 				toast.error(err.message);
	// 			});
	// 		formData = {
	// 			...formData,
	// 			currentBalance: formData.amountPaid,
	// 		};

	// 		updateWalletApi(formData)
	// 			.then((res) => {
	// 				console.log(res);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err.message);
	// 			});
	// 	}
	// };

	const selectedBillDetails = () => {
		if (getValues('userId') === 'true') {
			trigger(['userId', 'walletId', 'paymentType', 'billNo']);
		} else {
			if (
				getValues('paymentType') === 'true' ||
				getValues('walletId') === 'true'
			) {
				trigger(['paymentType', 'walletId']);
			} else {
				if (
					(response.userType === 'Driver' ||
						response.userType === 'DealerPoint') &&
					(getValues('paymentType') === 'Credit' ||
						getValues('paymentType') === 'Debit')
				) {
					let wallet = filter(response.wallets, function (doc) {
						return doc.walletId == getValues('walletId');
					});

					if (
						wallet[0].description === 'Driver Collection Wallet' ||
						wallet[0].description === 'Point Collection Wallet'
					) {
						unregister('billNo');
						setresponse({
							...response,
							amount: wallet[0].currentBalance,
						});
					}
				} else {
					if (isEmpty(getValues('billNo'))) {
						register(
							{ name: 'billNo' }
							// { required: true, validate: (value) => value !== 'true' }
						);
					} else {
						console.log('this is called');
						console.log(getValues('billNo'));
						if (getValues('billNo') !== 'true') {
							response.bills.map((doc) => {
								console.log(doc.id, getValues('billNo'));
								if (getValues('billNo') === doc.id.toString()) {
									setresponse({
										...response,
										dueDate: moment(doc.dueDate).format('YYYY-MM-DD'),
										amount: doc.totalAmount,
									});
									reset({ paymentNote: '', paymentMethod: 'true' });
								}
							});
						} else {
							trigger('billNo');
						}
					}
				}
			}
		}
	};

	const onSubmit = (formData) => {
		console.log(formData);
		if (response.userType === 'DealerPoint' || response.userType === 'Driver') {
			let wallet = filter(response.wallets, function (doc) {
				return doc.walletId == getValues('walletId');
			});

			if (
				wallet[0].description === 'Driver Collection Wallet' ||
				wallet[0].description === 'Point Collection Wallet'
			) {
				if (response.amount !== '' || response.amount !== null) {
					formData = {
						...formData,
						billNo: 0,
					};

					recordBillPaymentApi(formData)
						.then((res) => {
							toast.success('Data Submitted Successfully');
						})
						.catch((err) => {
							toast.error(err.message);
						});
				} else {
					toast.error("Please click 'Get Details' before proceding");
				}
			} else {
				if (getValues('billNo') == 'true' || isEmpty(getValues('billNo'))) {
					toast.warning('Please select a Bill No to proceed');
				} else {
					recordBillPaymentApi(formData)
						.then((res) => {
							toast.success('Data Submitted Successfully');
						})
						.catch((err) => {
							toast.error(err.message);
						});
				}
			}
		} else {
			if (getValues('billNo') == 'true' || isEmpty(getValues('billNo'))) {
				toast.warning(
					"Please select a Bill No and then click 'Get Details' to proceed "
				);
			} else {
				recordBillPaymentApi(formData)
					.then((res) => {
						toast.success('Data Submitted Successfully');
					})
					.catch((err) => {
						toast.error(err.message);
					});
			}
		}
	};

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								<h2 className="float-left">Record Payment</h2>
							</div>
							<div className="card-body">
								<div className="form-row mb-3">
									<div className="col">
										<label>User Type</label>
										<select
											className="form-control"
											onChange={(e) => {
												if (e.target.value !== 'true') {
													getUsers(e.target.value);
												}
											}}
										>
											<option value="true">Select User Type</option>
											<option value="Shipper">Shipper</option>
											<option value="DealerPoint">Dealer Point</option>
											<option value="Driver">Driver</option>
										</select>
									</div>
									<div className="col">
										<label>User Name</label>
										<select
											name="userId"
											className="form-control"
											onChange={(e) => {
												getWalletAndBill(e.target.value);
											}}
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">Select User</option>
											{response.users.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.name}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.userId && 'Please select a user'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Wallet</label>
										<select
											className="form-control"
											name="walletId"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">Select wallet</option>
											{response.wallets.map((doc, i) => {
												return (
													<option key={doc.id} value={doc.walletId}>
														{doc.description}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.walletId && 'Please select a wallet'}
										</span>
									</div>
									<div className="col">
										<label>Payment Type</label>
										<select
											className="form-control"
											name="paymentType"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">Select Payment Type</option>
											<option value="Invoice">Invoice</option>
											<option value="CreditNote">CreditNote</option>
											<option value="Credit">Credit</option>
											<option value="Debit">Debit</option>
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.paymentType && 'Please select payment type'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Bill No (If Credit Note/Invoice)</label>
										<select
											className="form-control"
											name="billNo"
											ref={register}
										>
											) <option value="true">Select Bill No</option>
											{response.bills.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.id}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.billNo && 'please select a bill No'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<button
											type="button"
											className="btn btn-danger float-right btnbrown"
											onClick={() => {
												selectedBillDetails();
											}}
										>
											Get Details
										</button>
									</div>
								</div>

								<div className="form-row mb-3 creatbill">
									<div className="col-sm-12">
										<h2>Bill Information</h2>
									</div>
								</div>
								<div className="form-row billdetail mb-3">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Due Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.dueDate}</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Amount:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">{response.amount}</p>
										</label>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Payment Method</label>
										<select
											className="form-control"
											name="paymentMethod"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">Select Payment Method</option>
											<option value="Cash">Cash</option>
											<option value="BankTransfer">BankTransfer</option>
											<option value="Cheque">Cheque</option>
											<option value="InternalTransfer">InternalTransfer</option>
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.paymentMethod && 'Please select a payment method'}
										</span>
									</div>
									<div className="col">
										<label>Payment Note:</label>
										<input
											type="text"
											name="paymentNote"
											className="form-control"
											placeholder="Write Note"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.paymentNote && 'please select a payment note'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Amount Paid:</label>
										<input
											type="number"
											name="amountPaid"
											className="form-control"
											placeholder="Enter Paid Amount (Auto Fill Billed Amount/COD)"
											defaultValue={response.amount}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.amountPaid && 'please add amount paid'}
										</span>
									</div>
									<div className="col">
										<label>Payment Date:</label>
										<input
											type="date"
											name="paymentDate"
											className="form-control"
											placeholder="Select Payment Date"
											defaultValue={moment(new Date()).format('YYYY-MM-DD')}
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.paymentDate && 'Please select date'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<button
											type="button"
											className="btn btn-danger float-right btnbrown"
											onClick={() => {
												handleSubmit(onSubmit)();
											}}
										>
											Submit
										</button>
									</div>
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
