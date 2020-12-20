import React, { useState, useEffect } from 'react';
import Container from '../../components/Containers/ListingContainer';
import AddUserForm from '../../components/Forms/AddUserForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { getShipperWarehousesApi } from '../../Api/shipperApi';

export default function AddUser(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const [data, setdata] = useState({});
	var user;

	useEffect(() => {
		async function getuser() {
			user = await JSON.parse(localStorage.getItem('user'));
		}
		getuser();
	}, []);

	useEffect(() => {
		if (Object.keys(data).length !== 0) {
			axios
				.post(`${process.env.REACT_APP_API}/user/add-shipper-user/`, {
					fullName: data.fullName,
					designation: data.designation,
					userName: data.userName,
					userPassword: data.userPassword,
					email: data.email,
					contact: data.contact,
					gender: data.gender,
					dob: new Date(data.dob).toISOString(),
					userType: 'shipper',
					profilePicture: 'string',
					roleId: 2,
					parentTypeId: user.id,
					warehouseId: data.warehouseId,
				})
				.then((response) => {
					if (response.data.status === 200) {
						toast.success('user created');
						setTimeout(() => {
							hist.go();
						}, 1000);
					} else {
						toast.error('username already taken');
					}
				})
				.catch((err) => {
					window.alert(err.message);
				});
		}
	}, [data]);

	useEffect(() => {
		getShipperWarehousesApi()
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
				warehouses={response.warehouses}
			/>
		</Container>
	);
}
