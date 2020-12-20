import React, { useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { trackingOrderDetail } from './state';
import { useRecoilState } from 'recoil';
import moment from 'moment';
import { isEmpty } from 'underscore';
import Loading from '../../components/Loading/Loading';
import './styles.css';
// import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { GrTwitter } from 'react-icons/gr'
import { BiMobile } from 'react-icons/bi'
import { HiOutlineChatAlt } from 'react-icons/hi'
export default function TrackingProgress(props) {
	const hist = useHistory();
	const [data, setData] = useRecoilState(trackingOrderDetail);
	console.log("my data",data);

	// useEffect(() => {
	// 	if (isEmpty(data)) {
	// 		// hist.push('/tracking/input');
	// 	}
	// }, []);

	return isEmpty(data) ? (
		<Loading />
	) : (
		<Fragment>
			    <div>
					<h2 className="shipment">Shipment Details</h2>
					<div className="main0">
						<div className="main1">
							<div className="main2">
								<div>Tracking No:</div>
								<div>{data.order.orderId}</div>
							</div>
							{data.order.deliveryLocation === "To Sarokh Point" ?
								(
							<div>
								<Link to="/tracking/addarea">
									<button className="button1">Select Delivery Location</button>
								</Link>
							</div>								
								) :data.order.deliveryLocation === "Last Mile" ? (
							<div>
								<Link to="/tracking/addaddress">
									<button className="button1">Select Delivery Location</button>
								</Link>
							</div>									
							):<></>}

						</div>
						<div className="main3">Delivery Status</div>
						<br/>
						<div className="main4">
							<div className="first">Pending</div>
							<div className="second"></div>
						</div>
						<br/>
					</div>
					<div className="main00">
						<div className="main11">
							<p>Shipment Details</p>
							<div className="shipment"> 
								<div className="shipmenttitle">Shipment Tite:</div>
								<div className="shipmentanswer" >{data.shipperName}</div>
							</div>
							<div className="shipment"> 
								<div className="shipmenttitle">Delivery Type :</div>
								<div className="shipmentanswer" >{data.order.deliveryLocation}</div>
							</div>
							{data.order.deliveryLocation === "To Sarokh Point" ?
							(<div className="shipment"> 
								<div className="shipmenttitle">Point Name:</div>
									<div className="shipmentanswer" >{data.order.deliveryLocationDetail}</div>
							</div>):(<></>)
							}
							{data.order.shipmentOrderItems[0].address ? (
							<div className="shipment"> 
								<div className="shipmenttitle" > Delivery Address: </div>
								<div className="shipmentanswer" >{data.order.shipmentOrderItems[0].address}</div>
							</div>								
							) : (
							<div className="shipment"> 
								<div className="shipmenttitle" > Delivery Address: </div>
								<div className="shipmentanswer" >N/A</div>
							</div>									
							)}
			
						</div>
						<div className="main22">
							<p>.</p>
							<div className="shipment"> 
								<div className="shipmenttitle" >Creation Date:</div>
								<div className="shipmentanswer" >{data.order.createdDatetime}</div>
							</div>	
							{data.order.shippedDatetime ? (
							<div className="shipment"> 
								<div className="shipmenttitle" >Shipped Date: </div>
								<div className="shipmentanswer" >{data.order.shippedDatetime}</div>
							</div>								
							) : (
							<div className="shipment"> 
								<div className="shipmenttitle" >Shipped Date: </div>
								<div className="shipmentanswer" >N/A</div>
							</div>									
							)}

							<div className="shipment"> 						
								<div className="shipmenttitle" >Delivered:</div>
								<div className="shipmentanswer" >{data.order.shipmentOrderItems[0].deliveryStatus}</div>
							</div>
						</div>
					</div>
				</div>
			{/* <div className="add-address-container">
				<div className="progress">
					<div
						className="progress-bar"
						role="progressbar"
						style={{ width: '20%' }}
					>
						20%
					</div>
				</div>
				<div
					className="form-row margintop30"
					style={{ justifyContent: 'center' }}
				>
					<div className="col-md-6">
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Tracking No</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.orderId}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Shipper</label>
							</div>
							<div class="col-md-6">
								<p>{data.shipperName}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Receiver Name</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].receiverName}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Contact No</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].contact}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Shipment Title</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].shipmentTitle}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Creation Date</label>
							</div>
							<div class="col-md-6">
								<p>{moment(data.order.createdDatetime).format('DD-MM-YYYY')}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Delivery Type</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.deliveryLocation}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">
									Point Name: (if Point)
								</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.deliveryLocationDetail}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Delivery Address</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].address}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">City</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipToCity}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">
									Coordinates( Lat/Lng )
								</label>
							</div>
							<div class="col-md-6">
								<p>
									{data.order.shipmentOrderItems[0].locationLatitude}
									&nbsp;/&nbsp;
									{data.order.shipmentOrderItems[0].locationLongitude}
								</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Delivery Status</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.status}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-12 mb-2 mt-3">
								<h5 className="font-weight-bolder">Contact Support:</h5>
							</div>
							<div class="col-md-6">
								<label className="font-weight-bold">Contact No</label>
							</div>
							<div class="col-md-6">
								<p>920033995</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Email</label>
							</div>
							<div class="col-md-6">
								<p>complaint@sarokh.sa</p>
							</div>
						</div>
					</div>
				</div>
			</div> */}
		</Fragment>
	);
}
