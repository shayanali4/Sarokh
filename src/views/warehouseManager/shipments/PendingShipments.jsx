import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { pendingShipmentsApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { warehouseFilter } from '../../../Utils/warehouseManagerWarehouseFilter';
import { toast } from 'react-toastify';

export default function PendingShipments(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			pendingShipmentsApi()
				.then(async (res) => {
					setresponse({
						loading: false,
						data: await warehouseFilter(res, 'fromCity', 'city'),
					});
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const columns = [
		{
			Header: 'Tracking No',
			accessor: 'shipmentId',
		},
		{
			Header: 'Shipper',
			accessor: 'shipper',
		},
		{
			Header: 'Current Location',
			accessor: 'currentLocation',
		},
		{
			Header: 'From (City)',
			accessor: 'fromCity',
		},

		{
			Header: 'To (City)',
			accessor: 'toCity',
		},
		{
			Header: 'Delivery Type',
			accessor: 'deliveryType',
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
								<h2 className="float-left">Pending Shipments</h2>
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
