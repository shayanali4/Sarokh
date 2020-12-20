import React, { useState, useEffect } from 'react';
import Container from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import AddUserForm from '../../components/Forms/AddUserForm';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import axios from 'axios';
import { getShipperWarehousesApi } from '../../Api/shipperApi';
import Loading from '../../components/Loading/Loading';

export default function AllUsers(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true }); //contains the response and loading state
	const [formToggle, setformToggle] = useState({ form: false }); //decides when we display the form
	const [data, setdata] = useState(); // the data from the api is stored here which is then passed to the form to get populated
	var user;

	useEffect(() => {
		/* this side effect is used to redirect the user to the all users page, since the userform and user details
    are contained in the same component so pressing the backbutton in the browser will take to previous location
     in history in stead of going to the all users page */
		hist.listen((newLocation, action) => {
			if (action === 'POP') {
				hist.replace('/shipper/users/allusers');
			}
		});
		return () => (window.onpopstate = null);
	}, []);

	useEffect(() => {
		// in here api is called and value is stored in the response object
		async function fetchData() {
			user = await JSON.parse(localStorage.getItem('user'));
			return await axios
				.get(
					`${process.env.REACT_APP_API}/user/get-shipper-users-list/${user.id}`
				)
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						getShipperWarehousesApi()
							.then((res) => {
								setresponse({
									loading: false,
									data: response.data,
									warehouses: res.warehouseList,
								});
							})
							.catch((err) => {
								toast.error(err.message);
							});
					}
				})
				.catch((err) => {
					window.alert(err.message);
				});
		}
		fetchData();
	}, [formToggle]);

	/*when ever the formtoggle state is changed this will be called, this is done in order
   to refresh the page when the user has been edited in the user form. without this dependency the
   the data in the table will not be updated */

	useEffect(() => {
		//this function is called when ever the data is submitted in the userdata form
		if (data !== undefined) {
			//since the side effect will be called on component mounting this check is done so that the below code is not called
			if (data.userPassword !== '') {
				/* the data set in the handleclick function changes the data but we donot require that data to be posted, since the response from api
        does not send userpassword we can use that as a check, when ever the data is submitted from the userform that will have a password init along with the completed data we will then send the patch request to the api */

				axios
					.patch(`${process.env.REACT_APP_API}/user/update`, {
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
						userId: formToggle.userId,
						roleId: 2,
						parentTypeId: user.id,
						warehouseId: data.warehouseId,
					})
					.then((response) => {
						if (response.status === 200) {
							toast.success('User updated successfully');
							setformToggle({ form: false });
						}
					})
					.catch((err) => {
						window.alert(err.message);
					});
			}
		}
	}, [data]);
	/* when ever the edit button is clicked this side effect is called what this does is
	 updating the data object since it is being passed to the form which will then populate the fields of the
	 form of the selected user */

	const handleClick = (row) => {
		let data = row.row.original; //data from the row clicked is being stored in this

		setformToggle({ form: true, userId: data.userId }); //userId is the id that will be send along with the updated user data to update the user information
		setdata({
			//this function sets the state of the form which will be passed to the userForm component to get populated there
			fullName: data.fullName,
			designation: data.designation,
			userName: data.userName,
			userPassword: '',
			email: data.email,
			contact: data.contact,
			gender: data.gender,
			dob: moment(data.dob).format(moment.HTML5_FMT.DATE),
			warehouseId: data.warehouseId,
		});
	};

	const handleDelete = async (id) => {
		await axios
			.delete(`${process.env.REACT_APP_API}/user/delete/${id}`)
			.then((response) => {
				console.log(response);
				if (response.data.status === 200) {
					toast.success(response.data.data);
					setformToggle({ form: false });
				} else {
					toast.error('something went wrong');
				}
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
					<>
						<i className="fa fa-edit" onClick={() => handleClick(row)}></i>
						&nbsp;
						<i
							className="fa fa-trash"
							onClick={() => handleDelete(row.row.original.userId)}
						></i>
					</>
				);
			},
		},
		{
			Header: 'User ID',
			accessor: 'userId',
		},
		{
			Header: 'User Name',
			accessor: 'userName',
		},
		{
			Header: 'Full Name',
			accessor: 'fullName',
		},
		{
			Header: 'Email',
			accessor: 'email',
		},
		{
			Header: 'Contact',
			accessor: 'contact',
		},
		{
			Header: 'Gender',
			accessor: 'gender',
		},
		{
			Header: 'DOB',
			accessor: 'dob',
			Cell: (row) => {
				return (
					<>{moment(row.row.original.dob).format(moment.HTML5_FMT.DATE)}</>
				);
			},
		},
		{
			Header: 'Designation',
			accessor: 'designation',
		},
	];

	if (formToggle.form === false) {
		return response.loading ? (
			<Loading />
		) : (
			<Container>
				<div className="card-header">
					<h2 className="float-left">All Users</h2>
					<Link to="/shipper/users/adduser">
						<button className="btn btn-success float-right">Add User</button>
					</Link>
				</div>
				<div className="card-body">
					<Table
						data={response.data}
						columns={columns}
						tableclass={'table-responsive custom-table'}
						pagination={true}
					/>
				</div>
			</Container>
		);
	} else {
		return (
			<Container>
				<AddUserForm
					form={setdata}
					formData={data}
					formToggle={setformToggle}
					operation={'update'}
					designation={['Manager', 'Supervisor']}
					warehouses={response.warehouses}
				/>
			</Container>
		);
	}
}
