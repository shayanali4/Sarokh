import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { financeDashboardApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { filter, uniq } from 'underscore';

let radioIntialValue = {
	driverWallet: false,
	dealerWallet: false,
	driverCompensation: false,
	dealerCompensation: false,
	shipperCod: false,
	shipperDelivery: false,
	vendorPay: false,
};

export default function CodShipments(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const [users, setusers] = useState([]); // contains users of userType selected
	const [data, setdata] = useState([]); // contains the filtered results which are displayed in the table
	const [radio, setradio] = useState({
		...radioIntialValue,
	}); /* to reset radio button values*/

	useEffect(() => {
		financeDashboardApi()
			.then((res) => {
				setresponse({ loading: false, data: res });
				setdata(res);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

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

	const columns = [
		{
			Header: 'Wallet Holder',
			accessor: 'walletHolder',
		},
		{
			Header: 'User Type',
			accessor: 'userType',
		},
		{
			Header: 'Wallet Type',
			accessor: 'walletType',
		},
		{
			Header: 'Balance',
			accessor: 'currentBalance',
		},
	];

	const filterResults = (type, value) => {
		switch (type) {
			case 'userType':
				filteredData(value);
				setradio({ ...radioIntialValue }); // to reset radio as new values are populated in the table
				setdata(
					filter(response.data, function (doc) {
						return doc.userType === value;
					})
				);
				setresponse({ ...response, selectedUser: undefined }); // to reset the user when new userType is selected
				break;
			case 'user':
				setradio({ ...radioIntialValue }); // to reset radio as new values are populated in the table
				// setdata(
				// 	filter(users, function (doc) {
				// 		return doc.walletHolder === value;
				// 	})
				// );
				setdata(
					filter(response.data, function (doc) {
						return doc.walletHolder === value; // to set the user and display the results of the user selected in the table
					})
				);
				setresponse({ ...response, selectedUser: value }); // to set the selected user only
				break;
			case 'driverWallet':
				walletFiltering(type, value);
				break;
			case 'dealerWallet':
				walletFiltering(type, value);
				break;
			case 'driverCompensation':
				walletFiltering(type, value);
				break;
			case 'dealerCompensation':
				walletFiltering(type, value);
				break;
			case 'shipperCod':
				walletFiltering(type, value);
				break;
			case 'shipperDelivery':
				walletFiltering(type, value);
				break;
			case 'vendorPay':
				walletFiltering(type, value);
				break;
		}
	};

	const walletFiltering = (type, value) => {
		setradio({ ...radioIntialValue, [type]: true }); // to check only the selected button
		if (response.selectedUser) {
			setdata(
				filter(response.data, function (doc) {
					return (
						doc.walletType === value &&
						doc.walletHolder === response.selectedUser
						/*this condition will filter results on the basis of selected user */
					);
				})
			);
		} else {
			setdata(
				filter(response.data, function (doc) {
					return doc.walletType === value;
					/* this condition will only be true when there is no user selected the filter will be applied to initial
					data from the api without any userType selected this condition will also be executed if the userType is
					selected but no user is selected*/
				})
			);
		}
	};

	const filteredData = (value) => {
		/* the response from the api returns json with record of all users, there can be multiple documents with the same
		wallet holder but in the user drop down only one user needs to be displayed instead of the same user having multiple enteries
		in the drop down. This function takes care of that at the end all the users in the response are displayed without multiple entries
		in the drop down */

		let filteredData = filter(response.data, function (doc) {
			return doc.userType === value;
		});
		filteredData = filteredData.map((doc) => {
			return doc.walletHolder;
		});
		filteredData = uniq(filteredData);
		setusers(filteredData);
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
								<h2 className="float-left">Finance Dashboard</h2>
							</div>
							<div className="card-body">
								<div className="row">
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 4500/-</span>
													<br />
													Sarokh Wallet
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 35000/-</span>
													<br />
													SAROKH PAY
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 4500/-</span>
													<br />
													Sarokh Wallet
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 3500/-</span>
													<br />
													Sarokh Wallet
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 35000/-</span>
													<br />
													All Drivers Wallet
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 1500/-</span>
													<br />
													Drivers Compensation
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 25000/-</span>
													<br />
													Shipper Unbilled
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 1400/-</span>
													<br />
													Shipper Billed
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 15000/-</span>
													<br />
													All Dealers Wallet
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 13000/-</span>
													<br />
													Dealers Compensation
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 1200/-</span>
													<br />
													COD Pendings
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-3">
										<div className="thumnail-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">SAR 1500/-</span>
													<br />
													Vehicle Maintanace Dues
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
								</div>
								<div className="row finance-detail">
									<div className="col-sm-12">
										<h3 className="mb-3">View All Wallets</h3>
										<h4>Filters</h4>
										<div className="form-row mb-3">
											<div className="col pl-2">
												<select
													className="form-control"
													onChange={(e) => {
														filterResults('userType', e.target.value);
													}}
												>
													<option value="true" disabled selected>
														Select User Type (Shipper, Dealer, Driver, Vendor,
														Dealer Point) (Drop down)
													</option>
													<option value="Shipper">Shipper</option>
													<option value="Dealer">Dealer</option>
													<option value="Driver">Driver</option>
													<option value="Vendor">Vendor</option>
													<option value="DealerPoint">Dealer Point</option>
												</select>
											</div>
											<div className="col pr-2">
												<select
													className="form-control"
													onChange={(e) => {
														filterResults('user', e.target.value);
													}}
												>
													<option value="true">
														Select User (Filter on bases of User Type) (Show all
														user in Drop Down)
													</option>
													{users.map((doc) => {
														return (
															<option key={doc} value={doc}>
																{doc}
															</option>
														);
													})}
												</select>
											</div>
										</div>
										<form>
											<div className="form-row">
												<div className="col-sm-12">
													<div className="form-check form-check-inline">
														<input
															className="form-check-input"
															name="wallet"
															type="radio"
															value="Driver Collection"
															checked={radio.driverWallet}
															onClick={(e) => {
																filterResults('driverWallet', e.target.value);
															}}
														/>
														<label className="form-check-label">
															Driver Wallet
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input
															name="wallet"
															className="form-check-input"
															type="radio"
															value="Dealer Collection"
															checked={radio.dealerWallet}
															onClick={(e) => {
																filterResults('dealerWallet', e.target.value);
															}}
														/>
														<label className="form-check-label">
															Dealer Wallet
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input
															name="wallet"
															className="form-check-input"
															type="radio"
															value="Driver Compensation"
															checked={radio.driverCompensation}
															onClick={(e) => {
																filterResults(
																	'driverCompensation',
																	e.target.value
																);
															}}
														/>
														<label className="form-check-label">
															Driver Compensation
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input
															name="wallet"
															className="form-check-input"
															type="radio"
															value="Dealer Compensation"
															checked={radio.dealerCompensation}
															onClick={(e) => {
																filterResults(
																	'dealerCompensation',
																	e.target.value
																);
															}}
														/>
														<label className="form-check-label">
															Dealer Compensation
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input
															name="wallet"
															className="form-check-input"
															type="radio"
															value="Shipper COD"
															checked={radio.shipperCod}
															onClick={(e) => {
																filterResults('shipperCod', e.target.value);
															}}
														/>
														<label className="form-check-label">
															Shipper COD
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input
															name="wallet"
															className="form-check-input"
															type="radio"
															value="ShipperDeliveryCharges"
															checked={radio.shipperDelivery}
															onClick={(e) => {
																filterResults(
																	'shipperDelivery',
																	e.target.value
																);
															}}
														/>
														<label className="form-check-label">
															Shipper Delivery Charges
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input
															name="wallet"
															className="form-check-input"
															type="radio"
															value="Vendor Pay"
															checked={radio.vendorPay}
															onClick={(e) => {
																filterResults('vendorPay', e.target.value);
															}}
														/>
														<label className="form-check-label">
															Vendor Pay
														</label>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
								<Table
									data={data}
									columns={columns}
									tableclass={'table-responsive custom-table margintop30'}
									pagination={true}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
