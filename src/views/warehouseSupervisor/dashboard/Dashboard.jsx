import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { warehouseListApi } from '../../../Api/adminApi';
import Container from '../../../components/Containers/ListingContainer';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';
import Table from '../../../components/Generictable/generatictable';
import { useTransition, animated } from 'react-spring';

export default function WarehouseList(porps) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

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

	const warehouseDetail = (data) => {
		hist.push({
			pathname: '/admin/warehouses/warehouseshipments',
			state: {
				id: data.id,
			},
		});
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
								<button className="btn btn-info btnbrown float-right">
									Add New
								</button>
							</div>
							<div className="card-body">
								<GoogleMapComponent
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
