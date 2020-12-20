import React, { useState, useEffect, useRef } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactToPrint from 'react-to-print';
import { useLocation, useHistory } from 'react-router-dom';
import { getPendingTrackingNumberApi } from '../../../Api/shipperApi';
import { isUndefined } from 'underscore';

export default function PrintWayBill(props) {
	const [response, setresponse] = useState({ loading: true });
	const componentRef = useRef();
	const hist = useHistory();
	const loc = useLocation();

	if (loc.pathname !== '/shipper/printwaybill' && isUndefined(loc.state)) {
		hist.goBack(); /* this is a check to see if this component is being accessed in the admin console, if its not it should act
		like the component of shipper */
	}

	useEffect(() => {
		if (isUndefined(loc.state)) {
			getPendingTrackingNumberApi()
				.then((res) => {
					if (res.length === 0) {
						toast.info('No Tracking Numbers found');
					}
					setresponse({ loading: false, list: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		} else {
			setresponse({ loading: false });
		}
	}, []);

	useEffect(() => {
		if (!isUndefined(loc.state)) {
			if (!response.loading && response.content === undefined) {
				handleChange(loc.state.trackingNumber);
			}
		}
	}, [
		response.loading,
		response.content,
	]); /* this effect is called when ever the redirect is done from the detail page */

	const handleChange = async (value) => {
		if (value !== 'true') {
			await axios
				.get(
					`${process.env.REACT_APP_API}/order/find-shipment-trackingno/${value}`
				)
				.then((res) => {
					console.log(res);
					setresponse({ ...response, content: true, data: res.data.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return response.loading ? (
		<Loading />
	) : (
		<ListingContainer>
			<div>
				<div className="card-header">
					<h2>Print Way Bill</h2>
				</div>
				<div className="card-body">
					{isUndefined(loc.state) ? (
						<>
							<label>Select Tracking Numbers</label>
							<select
								className="form-control mb-5"
								id="status"
								onChange={(e) => {
									handleChange(e.target.value);
								}}
							>
								<option value="true">---Select Order id---</option>
								{response.list.map((doc, i) => {
									return (
										<option key={i} value={doc.orderId}>
											{doc.orderId}
										</option>
									);
								})}
							</select>{' '}
						</>
					) : (
						<>
							<label>Tracking Number</label>
							<input
								className="form-control mb-5"
								type="text"
								defaultValue={loc.state.trackingNumber}
								disabled={true}
							/>
						</>
					)}

					{response.content === undefined ? null : (
						<>
							<ComponentToPrint1 ref={componentRef} response={response} />
							<ReactToPrint
								trigger={() => (
									<button className="btn btn-primary mt-4 float-right">
										Print WayBill
									</button>
								)}
								content={() => componentRef.current}
								pageStyle="width:50%"
							/>
						</>
					)}
				</div>
			</div>
		</ListingContainer>
	);
}

class ComponentToPrint1 extends React.Component {
	render() {
		return (
			<div id="print-section" className="print-order">
				<div className="print-heading">
					<div className="form-row">
						<div
							style={{ width: '63%', textAlign: 'center' }}
							className="mb-2 text-right"
						>
							<img
								className="mr-3"
								src={require('../../../assets/images/sarokh-logo.png')}
							/>
						</div>
						<div
							style={{ width: '30%', textAlign: 'center' }}
							className="text-left"
						>
							<img
								src={this.props.response.data.shipmentOrderItems[0].qrcode}
								style={{ width: 80 }}
								alt="Logo"
							/>
						</div>
					</div>
				</div>
				<div className="print-body">
					<div className="form-row mt-3" style={{ width: '100%' }}>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver Name
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].receiverName}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver Contact
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].contact}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver Address
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							N/A
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6">&nbsp;</div>
						<div className="col-sm-6">&nbsp;</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver City
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipToCity}
						</div>
					</div>
					<hr />
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Shipper Name
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							dfadfdf
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Phone Number
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].contact}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Address
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].address}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6">&nbsp;</div>
						<div className="col-sm-6">&nbsp;</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							City
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipFromCity}
						</div>
					</div>
					<hr />
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Pick up Date
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{new Date(
								this.props.response.data.createdDatetime
							).toDateString()}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Delivery Date
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							N/A
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Piece
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							1 of 1
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Service
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].paymentType}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Weight
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].weight}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Note
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{
								this.props.response.data.shipmentOrderItems[0]
									.additionalServices
							}
						</div>
					</div>
					<hr />
					<div className="print-footer">
						<div className="form-row">
							<div
								style={{ width: '70%', textAlign: 'center' }}
								className="text-center"
							>
								<img
									style={{ width: '100%' }}
									src={this.props.response.data.shipmentOrderItems[0].barCode}
									alt="Logo"
								/>
								<p>{this.props.response.data.orderId}</p>
							</div>
							<div
								style={{ width: '30%', textAlign: 'center' }}
								className="text-left font40"
							>
								JED
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
