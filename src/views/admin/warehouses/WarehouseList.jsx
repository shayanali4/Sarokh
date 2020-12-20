import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { warehouseListApi, deleteWarehouseApi } from '../../../Api/adminApi';
import Container from '../../../components/Containers/ListingContainer';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';
import Table from '../../../components/Generictable/generatictable';
import { warehouseData } from '../../../components/ShipperComponents/AddShipperWarehouse/state';
import { useTransition, animated } from 'react-spring';

export default function WarehouseList(porps) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(warehouseData);
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (response.loading) {
			warehouseListApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const editData = (dataToEdit) => {
		setdata({
			...dataToEdit,
			update: true,
			location: [
				{
					latitude: dataToEdit.locationLatitude,
					longitude: dataToEdit.locationLongitude,
				},
			],
		});

		hist.push('/admin/warehouses/addshipperwarehouse/step1');
	};

	const deleteData = async (dataToDelete) => {
		if (window.confirm(`Are you sure to delete this warehouse?`)) {
			deleteWarehouseApi(dataToDelete.id)
				.then((res) => {
					toast.success('warehouse deleted!');
					setresponse({ loading: true });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const warehouseDetail = (data) => {
		hist.push({
			pathname: '/admin/warehouses/warehouseshipments',
			state: {
				id: data.id,
			},
		});
	};

	const addNewWarehouse = () => {
		setdata({ location: [{ latitude: '23.8859', longitude: '39.1925' }] }); //resets the global state incase any previous data was present
		hist.push('/admin/warehouses/addshipperwarehouse/step1');
	};

	const columns = [
		{
			Header: 'Actions',
			Cell: (row) => {
				return (
					<>
						<i
							className="fa fa-info-circle mr-2"
							onClick={() => warehouseDetail(row.row.original)}
						/>
						<i
							className="fa fa-edit mr-2"
							onClick={() => editData(row.row.original)}
						/>
						<i
							className="fa fa-trash"
							onClick={() => deleteData(row.row.original)}
						/>
					</>
				);
			},
		},
		{
			Header: 'Warehouse Id',
			accessor: 'id',
		},
		{
			Header: 'Name',
			accessor: 'name',
		},
		// {
		// 	Header: 'Manager Name',
		// 	accessor: 'managerName',
		// },
		// {
		// 	Header: 'Manager Contact',
		// 	accessor: 'mangerContact',
		// },
		{
			Header: 'Address',
			accessor: 'address',
		},
		{
			Header: 'City',
			accessor: 'city',
		},
	];

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: { opacity: 0 },
	});

	return response.loading ? (
		<div>loading...</div>
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								<h2 className="float-left">Warehouse List</h2>
								<button
									className="btn btn-info btnbrown float-right"
									onClick={() => addNewWarehouse()}
								>
									Add New
								</button>
							</div>
							<div className="card-body">
								<GoogleMapComponent
									defaultCenter={
										response.data.mapLocations === undefined
											? {
													lat: 23.8859,
													lng: 39.1925,
											  }
											: {
													lat: parseFloat(
														response.data.mapLocations[0].latitude
													),
													lng: parseFloat(
														response.data.mapLocations[0].longitude
													),
													label: response.data.mapLocations[0].label,
											  }
									}
									isMarkerShown={true}
									position={response.data.mapLocations || []}
									changefunction={setresponse}
									googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
									loadingElement={
										<div className="spinner-border" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									}
									containerElement={
										<div
											style={{
												height: `400px`,
												width: `85%`,
												margin: `0 auto`,
											}}
										/>
									}
									mapElement={<div style={{ height: `100%` }} />}
									autocomplete={false}
								/>
								<div className="margintop30"></div>
								<Table
									data={response.data.warehouseList}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
