import React from 'react';
import Table from '../../../components/Generictable/generatictable';
import moment from 'moment';

class PrintTripDetail extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				Header: 'Tracking No',
				accessor: 'shipmentOrderId',
			},
			{
				Header: 'Long/lat',
				Cell: (row) => {
					return (
						<>
							{row.row.original.locationLongitude +
								'/' +
								row.row.original.locationLatitude}
						</>
					);
				},
			},
			{
				Header: 'Location',
				accessor: '',
				Cell: (row) => {
					return <>{row.row.original.pickupLocation}</>;
				},
			},
			{
				Header: 'Pickups/Delivery',
				accessor: 'pickupDelivery',
			},
			{
				Header: 'Amount Collect',
				accessor: 'codCollection',
			},
		];
	}

	render() {
		return (
			<div>
				<div className="form-row">
					<div className="col-sm-6">
						<label className="col-sm-6 col-6"> Trip ID:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">{this.props.response.data.id}</p>
						</label>
					</div>
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Warehouse:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.startPoint}
							</p>
						</label>
					</div>
				</div>
				<div className="form-row">
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Driver Name:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.driverName}
							</p>
						</label>
					</div>
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">City:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.vehicle.warehouse.city}
							</p>
						</label>
					</div>
				</div>
				<div className="form-row">
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Vehicle:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.vehicle.name}
							</p>
						</label>
					</div>
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Date:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{moment(this.props.response.data.dispatchDatetime).format(
									'YYYY-MM-DD hh:mm:ss'
								)}
							</p>
						</label>
					</div>
				</div>
				<Table
					data={this.props.response.data.tripDetailItemsList}
					columns={this.columns}
					tableclass={'custom-table w-100'}
					pagination={false}
					filter={false}
					pagesize={Number.MAX_SAFE_INTEGER}
				/>
			</div>
		);
	}
}

export default PrintTripDetail;
