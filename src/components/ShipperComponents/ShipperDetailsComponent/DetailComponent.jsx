import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export default function ContentContainer({ response, items }) {
	const hist = useHistory();
	const [width, setWidth] = useState('0%');

	useEffect(() => {
		setTimeout(() => {
			setWidth('25%');
		}, 200);
	}, []);

	const printBill = (trackingNo) => {
		if (hist.location.pathname.search('admin') === 1) {
			hist.push({
				pathname: `/admin/printwaybill`,
				state: { trackingNumber: trackingNo },
			});
		} else {
			hist.push({
				pathname: `/shipper/order/printwaybill`,
				state: { trackingNumber: trackingNo },
			});
		}
	};
	return (
		<div>
			<div className="d-flex flex-row justify-content-end">
				<button
					className="btn btn-primary mr-1 btnbrown"
					onClick={() => {
						hist.push('/tracking/input');
					}}
				>
					Tracking Page
				</button>
				<button className="btn btn-primary mr-1 btnbrown">
					View Proof of delivery
				</button>
				<button
					className="btn btn-primary btnbrown"
					onClick={() => {
						printBill(items.trackingNumber);
					}}
				>
					Print label
				</button>
			</div>
			<div className="shipper-detail-container mt-3 mb-5">
				<h2 className="font20 redcolor">Shipment Delivery Status</h2>
				<div className="progress">
					<div
						className="progress-bar"
						role="progressbar"
						style={{
							width: width,
							transition: 'width 1s ease-in-out',
						}}
					>
						25%
					</div>
				</div>
				<div className="clearfix"></div>
			</div>
			<h2 className="mt-3 mb-1 font20 redcolor">Shipper Bill Detail</h2>

			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Tracking No</td>
						<td style={{ width: '30%' }}>{items.trackingNumber}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Creation (Date & Time)
						</td>
						<td style={{ width: '30%' }}>
							{moment(response.createdDatetime).format('DD-MM-YYYY hh:mm:ss')}
						</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>From City</td>
						<td style={{ width: '30%' }}>{response.shipFromCity}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Pickup Location
						</td>
						<td style={{ width: '30%' }}>
							{response.pickupLocationDetail || 'N/A'}
						</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>To City</td>
						<td style={{ width: '30%' }}>{response.shipToCity}</td>
						<td style={{ fontWeight: 'bold' }}>Delivery Location</td>
						<td
							style={{
								width: '30%',
								color: response.deliveryLocationDetail ? 'inherit' : 'red',
								fontWeight: response.deliveryLocationDetail
									? 'inherit'
									: 'bolder',
							}}
						>
							{response.deliveryLocationDetail || 'Pending Receiver Selection'}
						</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Receiver Confirmation
						</td>
						<td>{response.shipmentOrderItems[0].receiverConfirmation}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Delivered Date/Time
						</td>
						<td>
							{response.updatedDatetime
								? moment(response.updatedDatetime).format('YYYY-MM-DD hh:mm:ss')
								: 'N/A'}
						</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-3 mb-1 font20 redcolor">Receiver Detail</h2>
			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Receiver Name</td>
						<td style={{ width: '30%' }}>{items.receiverName}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Receiver Contact
						</td>
						<td style={{ width: '30%' }}>{items.contact}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Receiver Address
						</td>
						<td style={{ width: '30%' }}>{items.address}</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-3 mb-1 font20 redcolor">Parcel Detail</h2>
			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Title</td>
						<td style={{ width: '30%' }}>{items.shipmentTitle}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Type</td>
						<td style={{ width: '30%' }}>{items.shipmentType}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Value</td>
						<td style={{ width: '30%' }}>{items.shipmentValue}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Shipment Weight
						</td>
						<td style={{ width: '30%' }}>{items.weight}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Shipment Content
						</td>
						<td style={{ width: '30%' }}>{items.shipmentContent}</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-3 mb-1 font20 redcolor">Billing Details</h2>
			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Payment Type</td>
						<td style={{ width: '30%' }}>{items.paymentType}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Cash On Delivery (COD)
						</td>
						<td style={{ width: '30%' }}>{items.codAmount || 'N/A'}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Additional Services
						</td>
						<td style={{ width: '30%' }}>{items.additionalServices}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Additional Services Charges
						</td>
						<td style={{ width: '30%' }}>{items.additionalCharges}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}>Delivery Charges</td>
						<td style={{ width: '30%' }}>{items.shipmentDeliveryCharges}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Receiver Address Surcharge
						</td>
						<td style={{ width: '30%' }}>{items.vat || 'N/A'}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}></td>
						<td style={{ width: '30%' }}></td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Subtotal</td>
						<td style={{ width: '30%' }}>{items.vat || 'N/A'}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}></td>
						<td style={{ width: '30%' }}></td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>VAT (15%)</td>
						<td style={{ width: '30%' }}>{items.vat || 'N/A'}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}></td>
						<td style={{ width: '30%' }}></td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Total</td>
						<td style={{ width: '30%' }}>{items.vat || 'N/A'}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
