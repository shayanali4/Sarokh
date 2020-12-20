import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import AddUserForm from '../../../components/Forms/AddUserForm';
import { toast } from 'react-toastify';
import { addUserApi } from '../../../Api/adminApi';
import { useHistory } from 'react-router-dom';
import { warehouseListApi } from '../../../Api/adminApi';
import Loading from '../../../components/Loading/Loading';

export default function AddUser(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const [data, setdata] = useState({});
	const user = JSON.parse(localStorage.getItem('user'));

	const Roles = [
		{ id: 4, name: 'Driver', parentRole: 'Admin' },
		{ id: 8, name: 'WarehouseUser', parentRole: 'Admin' },
		{ id: 9, name: 'WarehouseManager', parentRole: 'Admin' },
		{ id: 10, name: 'FinanceManager', parentRole: 'Admin' },
	];
	console.log(data);
	useEffect(() => {
		if (Object.keys(data).length !== 0) {
			addUserApi(data)
				.then((res) => {
					toast.success('user created successfully');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [data]);

	useEffect(() => {
		warehouseListApi()
			.then((res) => {
				setresponse({
					loading: false,
					warehouses: res.warehouseList,
				});
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	return response.loading ? (
		<Loading />
	) : (
		<Container>
			<AddUserForm
				form={setdata}
				formData={data}
				operation={'new'}
				designation={['Manager', 'Supervisor']}
				userType={'Admin'}
				data={Roles}
				warehouses={response.warehouses}
			/>
		</Container>
	);
}
