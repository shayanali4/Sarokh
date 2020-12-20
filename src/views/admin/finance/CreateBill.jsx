import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	getBillToDetailApi,
	getCreateBillDetailApi,
	createBillApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function CreateBill(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({
		loading: false,
		tableData: [],
		data: [],
		check: false,
	});

	console.log(response.data);
	const [deliveryData, setdeliveryData] = useState([]);

	const [otherData, setotherData] = useState([]);

	const [selectedOtherData, setselectedOtherData] = useState([]);

	console.log(selectedOtherData);
	const { register, errors, watch, handleSubmit, getValues, trigger } = useForm(
		{
			shouldFocusError: true,
			mode: 'onChange',
			criteriaMode: 'all',
		}
	);

	useEffect(() => {
		if (response.check) {
			getBillToDetailApi(getValues('userType'))
				.then((res) => {
					setresponse({
						loading: false,
						data: res,
						tableData: [],
						check: false,
					});
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.check]);

	const columns = [
		{
			Header: 'Tracking Number',
			accessor: 'trackingNumber',
		},
		{
			Header: 'Date',
			accessor: 'date',
			Cell: (row) => {
				return (
					<Fragment>
						{moment(row.row.original.date).format('YYYY-MM-DD')}
					</Fragment>
				);
			},
		},
		{
			Header: 'Units',
			accessor: 'units',
			Cell: (row) => {
				return <Fragment>1</Fragment>;
			},
		},
		{
			Header: 'Amount',
			accessor: 'amount',
		},
	];

	const columns_others = [
		{
			Header: 'Item',
			accessor: 'item',
		},
		{
			Header: 'Unit Price',
			accessor: 'unitPrice',
		},
		{
			Header: 'Units',
			accessor: 'units',
		},
		{
			Header: 'Amount',
			accessor: 'totalAmount',
		},
	];

	const onSubmit = (formData) => {
		if (deliveryData.length === 0 && otherData.length === 0) {
			toast.warning('Please Select a Record from the Table');
		} else {
			createBillApi({
				...formData,
				shipmentsIdList: getTrackingNumber(),
			})
				.then((res) => {
					toast.success('Bill Has Been Created !');
					hist.push('/admin/finance/billlisting');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const getTrackingNumber = () => {
		let trackingNo = '';
		deliveryData.map((doc) => {
			console.log(doc.original.trackingNumber);
			trackingNo = trackingNo.concat(doc.original.trackingNumber, ',');
		});
		if (trackingNo === '') {
			return null;
		} else {
			return trackingNo;
		}
	};

	const getDetails = (formData) => {
		formData = {
			...formData,
			userTypeId: formData.billTo,
			billType: formData.billType,
			billCategory: formData.billCategory,
		};

		getCreateBillDetailApi(formData)
			.then((res) => {
				if (res.length === 0) {
					toast.error('No Records Found');
				} else {
					setresponse({ ...response, tableData: res });
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const addRow = () => {
		const values = getValues(['item', 'unitPrice', 'units', 'totalAmount']);
		if (
			values.item === '' &&
			values.unitPrice === '' &&
			values.units === '' &&
			values.unitPrice === ''
		) {
			trigger(['item', 'unitPrice', 'units', 'totalAmount']);
		} else {
			setotherData([
				{
					item: values.item,
					unitPrice: values.unitPrice,
					units: values.units,
					totalAmount: values.totalAmount,
				},
			]);
			setdeliveryData([]);
		}
	};

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
						<Container>
							<div className="card-header">
								<h2 className="float-left">Create Bill</h2>
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="col-sm-6">
										<div className="form-check form-check-inline">
											<label className="form-check-label">
												Select Bill Type
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billType"
												className="form-check-input"
												type="radio"
												value="Invoice"
												ref={register()}
											/>
											<label className="form-check-label">Invoice</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billType"
												className="form-check-input"
												type="radio"
												value="CreditNote"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Credit Note</label>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-check form-check-inline">
											<label className="form-check-label">
												Billed Category
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="ShipmentCharges"
												ref={register()}
											/>
											<label className="form-check-label">
												Shipment Charges
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="COD"
												ref={register()}
											/>
											<label className="form-check-label">COD</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="Compensation"
												ref={register()}
											/>
											<label className="form-check-label">Compensation</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="Other"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Others</label>
										</div>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>User Type</label>
										<select
											name="userType"
											className="form-control"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
											onChange={(e) => {
												setresponse({
													...response,
													check: true,
												});
											}}
										>
											<option key={1} value="true" disabled selected>
												Select User Type (Shipper, Dealer, Driver, Dealer Point,
												Vendor) (Drop down)
											</option>
											<option key={2} value="Shipper">
												Shipper
											</option>
											<option key={3} value="Dealer">
												Dealer
											</option>
											<option key={4} value="Driver">
												Driver
											</option>
											<option key={4} value="DealerPoint">
												Dealer Point
											</option>
											<option key={5} value="Vendor">
												Vendor
											</option>
										</select>
									</div>
									<div className="col">
										<label>Bill To</label>
										<select
											name="billTo"
											className="form-control"
											ref={register({ required: true })}
										>
											<option value="true" disabled selected>
												Select Bill Receiver
											</option>
											{response.data.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.name}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Bill Date</label>
										<input
											type="date"
											name="billDate"
											defaultValue={moment(new Date()).format('YYYY-MM-DD')}
											disabled={true}
											className="form-control"
											placeholder="Select Date Bill Created (Auto Fill Current Date)"
										/>
									</div>
									<div className="col">
										<label>Due Date</label>
										<input
											type="date"
											name="dueDate"
											className="form-control"
											placeholder="Select Due Date"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.dueDate && 'Due Date is required'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Start Date</label>
										<input
											type="date"
											name="startDate"
											className="form-control"
											placeholder="Select Starting Date of Billing Period"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.startDate && 'Start Date is required'}
										</span>
									</div>
									<div className="col">
										<label>End Date</label>
										<input
											type="date"
											name="endDate"
											className="form-control"
											placeholder="Select Ending Date of Billing Period"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.endDate && 'End Date is required'}
										</span>
									</div>
								</div>
								{watch('billCategory') === 'Other' ? (
									<Fragment>
										<div className="col-sm-12 creatbill">
											<h2>Others</h2>
										</div>
										<div className="form-row mb-3 mt-3">
											<div className="col">
												<label>Description</label>
												<input
													type="text"
													name="item"
													className="form-control"
													placeholder="Enter Description"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.item && 'Item is required'}
												</span>
											</div>
											<div className="col">
												<label>Unit Price</label>
												<input
													type="number"
													name="unitPrice"
													className="form-control"
													placeholder="Enter unit price"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.unitPrice && 'Unit Price is required'}
												</span>
											</div>
										</div>
										<div className="form-row mb-3 mt-3">
											<div className="col">
												<label>Quantity</label>
												<input
													type="number"
													name="units"
													className="form-control"
													placeholder="No Of Quantity"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.units && 'Units are required'}
												</span>
											</div>
											<div className="col">
												<label>Amount</label>
												<input
													type="number"
													name="totalAmount"
													className="form-control"
													placeholder="Enter the amount in SAR"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.totalAmount && 'Amount is required'}
												</span>
											</div>
										</div>
									</Fragment>
								) : null}
								<div className="form-row mb-3 mt-3">
									{watch('billCategory') !== 'Other' ? (
										<div className="col-sm-12 mb-3">
											<button
												type="button"
												className="btn btn-danger float-left btnbrown"
												onClick={() => {
													handleSubmit(getDetails)();
												}}
											>
												Get Detail
											</button>
										</div>
									) : (
										<div className="col-sm-12 mb-3">
											<button
												type="button"
												className="btn btn-danger float-left btnbrown"
												onClick={() => {
													addRow();
												}}
												disabled={otherData.length === 1 ? true : false}
											>
												Add Row
											</button>
											<p className="float-right">
												Total Amount:{' '}
												<span>SAR {watch('unitPrice') * watch('units')}/-</span>
											</p>
										</div>
									)}
									<div className="col-sm-12">
										<button
											type="button"
											className="btn btn-success btngreen float-right"
											onClick={() => handleSubmit(onSubmit)()}
										>
											Generate Bill
										</button>
									</div>
								</div>

								<Table
									data={
										watch('billCategory') === 'Other'
											? otherData
											: response.tableData
									}
									columns={
										watch('billCategory') === 'Other' ? columns_others : columns
									}
									tableclass={'table-responsive custom-table margintop30'}
									pagination={true}
									rowToggle={true}
									selectedData={
										watch('billCategory') === 'Other'
											? setselectedOtherData
											: setdeliveryData
									}
									dataCheck={
										watch('billCategory') === 'Other'
											? selectedOtherData
											: deliveryData
									}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
