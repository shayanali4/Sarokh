import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
	allShipmentsApi,
	deleteShipmentApi,
	editShipmentApi,
} from '../../Api/shipperApi';
import { shipmentEditHelper } from '../../Utils/shipmentEditHelper';
import { useTransition, animated } from 'react-spring';
import { useRecoilState } from 'recoil';
import { newShipment } from '../../components/ShipperComponents/NewShipmentSteps/state';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

export default function AllShipments(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const [data, setdata] = useRecoilState(newShipment);

	useEffect(() => {
		if (response.loading) {
			allShipmentsApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const handleClick = (row) => {
		console.log(row.row.original.id);
		hist.push({
			pathname: '/shipper/shipments/vieworder',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const deleteData = (id) => {
		deleteShipmentApi(id)
			.then((res) => {
				toast.success('Shipment has been deleted successfully');
				setresponse({ ...response, loading: true });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const editData = (id) => {
		editShipmentApi(id)
			.then((res) => {
				console.log('this is the id', id);
				const dataToSet = shipmentEditHelper(res, id);
				setdata(dataToSet);
				hist.push('/shipper/newshipment/step1');
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const columns = [
		{
			Header: 'Action',
			accessor: '',
			Cell: (row) => {
				return (
					<Fragment>
						<i
							className="fa fa-info-circle"
							onClick={() => handleClick(row)}
						></i>
						&nbsp;&nbsp;
						<i
							className="fa fa-trash"
							onClick={() => deleteData(row.row.original.id)}
						></i>
						&nbsp;&nbsp;
						<i
							className="fa fa-edit"
							onClick={() => {
								editData(row.row.original.id);
							}}
						></i>
					</Fragment>
				);
			},
		},
		{
			Header: 'id',
			accessor: 'id',
		},
		{
			Header: 'Tracking No',
			accessor: 'orderId',
		},
		{
			Header: 'Location',
			accessor: 'pickType',
		},
		{
			Header: 'Delivery',
			accessor: 'deliveryType',
		},
		{
			Header: 'Date And Time',
			accessor: 'dateTime',
		},
		{
			Header: 'Receiver',
			accessor: 'receiverName',
		},
		{
			Header: 'Status',
			accessor: 'status',
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
						{console.log(item)}
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">All Shipments</h2>
								<button
									className="btn btn-success float-right"
									onClick={() => hist.push('/shipper/newshipment/step1')}
								>
									Add New
								</button>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
									hiddenColumns={['id']}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
