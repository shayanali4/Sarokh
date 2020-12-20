import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import AddUserForm from '../../../components/Forms/AddUserForm';
import Loading from '../../../components/Loading/Loading';
import {
	allUsersApi,
	deleteUserApi,
	updateUserApi,
	warehouseListApi,
} from '../../../Api/adminApi';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import axios from 'axios';

export default function AllUsers(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true }); //contains the response and loading state
	const [formToggle, setformToggle] = useState({ form: false }); //decides when we display the form
	const [data, setdata] = useState(); // the data from the api is stored here which is then passed to the form to get populated

	const Roles = [
		{ id: 4, name: 'Driver', parentRole: 'Admin' },
		{ id: 8, name: 'WarehouseUser', parentRole: 'Admin' },
		{ id: 9, name: 'WarehouseManager', parentRole: 'Admin' },
		{ id: 10, name: 'FinanceManager', parentRole: 'Admin' },
	];

	console.log(response);

	useEffect(() => {
		/* this side effect is used to redirect the user to the all users page, since the userform and user details
    are contained in the same component so pressing the backbutton in the browser will take to previous location
     in history in stead of going to the all users page */
		hist.listen((newLocation, action) => {
			if (action === 'POP') {
				hist.replace('/admin/users/allusers');
			}
		});
		return () => (window.onpopstate = null);
	}, []);

	useEffect(() => {
		// in here api is called and value is stored in the response object
		allUsersApi()
			.then((res) => {
				warehouseListApi()
					.then((res1) => {
						setresponse({
							...response,
							loading: false,
							warehouses: res1.warehouseList,
							data: res,
						});
					})
					.catch((err) => {
						toast.error(err.message);
					});
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, [formToggle]);

	/*when ever the formtoggle state is changed this will be called, this is done in order
   to refresh the page when the user has been edited in the user form. without this dependency the
   the data in the table will not be updated */

	useEffect(() => {
		//this function is called when ever the data is submitted in the userdata form
		if (data !== undefined) {
			//since the side effect will be called on component mounting this check is done so that the below code is not called
			if (data.update === undefined) {
				/* whenever the form update button is clicked the data will be reset according to the form field values and with that the update field
				in the data hook will not longer exist so data.update will be a check when updating the user*/
				updateUserApi(data, formToggle.userId)
					.then((res) => {
						toast.success('User Data Updated!!');
						setformToggle({ form: false });
					})
					.catch((err) => {
						toast.error(err.message);
					});
			}
		}
	}, [data]);
	/* when ever the edit button is clicked this side effect is called what this does is
	 updating the data object since it is being passed to the form which will then populate the fields of the
	 form of the selected user */

	const handleClick = (row) => {
		let data = row.row.original; //data from the row clicked is being stored in this
		// console.log(data.dob);
		// console.log(
		// 	'this is the date',
		// 	moment(data.dob).format(moment.HTML5_FMT.DATE)
		// );
		setformToggle({ form: true, userId: data.userId }); //userId is the id that will be send along with the updated user data to update the user information
		setdata({
			//this function sets the state of the form which will be passed to the userForm component to get populated there
			...data,
			// userPassword: '',
			update: false,
			dob: moment(data.dob).format(moment.HTML5_FMT.DATE),
		});
	};

	const handleDelete = async (id) => {
		deleteUserApi(id)
			.then((res) => {
				toast.success('User Deleted!');
				setformToggle({ form: false });
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
				console.log(row);
				return <>{moment(row.row.original.dob).format('DD-MM-YYYY')}</>;
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
					<Link to="/admin/users/adduser">
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
					data={Roles}
					userType={'Admin'}
					warehouses={response.warehouses}
				/>
			</Container>
		);
	}
}
