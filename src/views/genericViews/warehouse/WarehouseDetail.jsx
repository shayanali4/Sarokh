import React, { useState, useEffect } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import { isUndefined } from 'underscore';
import { warehouseShipmentsApi } from '../../../Api/generalApi';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function WarehouseDetail(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	useEffect(() => {
		if (isUndefined(hist.location.state)) {
			hist.goBack();
		} else {
			warehouseShipmentsApi(hist.location.state.id)
				.then((res) => {
					if (res.length !== 0) {
						setresponse({ loading: false, data: res });
					} else {
						setresponse({ loading: false, data: [] });
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, []);

	const columns = [
		{
			Header: 'Tracking No',
			accessor: 'shipmentOrderItems[0].trackingNumber',
		},
		{
			Header: 'Shipper',
			accessor: 'shipperId',
		},
		{
			Header: 'Delivery Location',
			accessor: 'deliveryLocationDetail',
		},
		{
			Header: 'Check In',
			Cell: (row) => {
				return (
					<>
						{moment(row.row.original.updatedDatetime).format(
							'DD-MM-YYYY hh:mm:ss'
						)}
					</>
				);
			},
		},
		{
			Header: 'From City',
			accessor: 'shipFromCity',
		},
		{
			Header: 'To City',
			accessor: 'shipToCity',
		},
		{
			Header: 'Receiver',
			accessor: 'shipmentOrderItems[0].receiverName',
		},
		{
			Header: 'Status',
			accessor: 'shipmentOrderItems[0].deliveryStatus',
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
								<h2 className="float-left">Warehouse Shipments</h2>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
