import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Container from '../../components/Containers/ListingContainer';
import { GoogleMapComponent } from '../../components/GoogleMap/GoogleMapComponent';
import Table from '../../components/Generictable/generatictable';
import { warehouseData } from '../../components/ShipperComponents/AddShipperWarehouse/state';
import { useTransition, animated } from 'react-spring';
import Loading from '../../components/Loading/Loading';

export default function Maps(porps) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(warehouseData);
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(
					`${process.env.REACT_APP_API}/shipper-warehouse/get-list-by-shipperId/${user.id}`
				)
				.then((res) => {
					console.log(res);
					if (res.data.status === 200) {
						setresponse({ loading: false, data: res.data.data });
					} else {
						toast.error('something went wrong');
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
		if (response.loading) {
			fetchData();
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
			operationalTimefrom: moment(dataToEdit.operationalTimefrom).format(
				'hh:mm A'
			), //gives time for html input type='time' e.g "08:15"
			operationalTimeto: moment(dataToEdit.operationalTimeto).format('hh:mm A'),
		});

		hist.push('/shipper/shipperwarehouse/add/step1');
	};

	const deleteData = async (dataToDelete) => {
		await axios
			.delete(
				`${process.env.REACT_APP_API}/shipper-warehouse/delete/${dataToDelete.id}`
			)
			.then((res) => {
				if (res.data.status === 200) {
					toast.success(res.data.data);
					setresponse({ ...response, loading: true });
				} else {
					toast.error('something went wrong');
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const warehouseDetail = (data) => {
		hist.push({
			pathname: '/shipper/shipperwarehouse/ourlocation/warehouseshipments',
			state: {
				id: data.id,
			},
		});
	};

	const addNewWarehouse = () => {
		setdata({ location: [{ latitude: '23.8859', longitude: '39.1925' }] }); //resets the global state incase any previous data was present
		hist.push('/shipper/shipperwarehouse/add/step1');
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
			Header: 'Location Id',
			accessor: 'id',
		},
		{
			Header: 'Name',
			accessor: 'name',
		},
		{
			Header: 'Manager Name',
			accessor: 'managerName',
		},
		{
			Header: 'Manager Contact',
			accessor: 'mangerContact',
		},
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
	console.log(response);
	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								<h2 className="float-left">Our Location</h2>
								<button
									className="btn btn-info float-right btnbrown"
									onClick={() => addNewWarehouse()}
								>
									Add New
								</button>
							</div>
							<div className="card-body">
								<GoogleMapComponent
									isMarkerShown={true}
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
