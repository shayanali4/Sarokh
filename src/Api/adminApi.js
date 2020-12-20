import axios from 'axios';
import { sarokhWarehouseList } from './generalApi';

const user = JSON.parse(localStorage.getItem('user'));

export async function adminDashboard() {
	const user = await JSON.parse(localStorage.getItem('user'));
	return await axios
		.get(`${process.env.REACT_APP_API}/web-dashboard/admin/${user.id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-all-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deliveredShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-delivered-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function pendingShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-pending-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function noResponseShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-noresponse-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function CODShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-cod-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function prepaidShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-prepaid-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function returnShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-returned-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function pickupShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-pickup-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deliveryShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-delivery-shipments/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function shipmentIssuesApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-shipment-issues/`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allShippersApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/shipper/get-list`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function shipperBillingApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-shipper-billing`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addUserApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/user/add`, {
			...data,
			dob: new Date(data.dob).toISOString(),
		})
		.then((response) => {
			if (response.data.status === 200) {
				return true;
			} else {
				throw new Error('username already taken');
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allUsersApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/user/get-list`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteUserApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/user/delete/${id}`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateUserApi(data, id) {
	return await axios
		.patch(`${process.env.REACT_APP_API}/user/update`, {
			...data,
			roleId: parseInt(data.roleId),
			dob: new Date(data.dob).toISOString(),
			userId: id,
		})
		.then((res) => {
			if (res.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addShipperWarehouseApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/sarokh-warehouse/add`, {
			...data,
			locationLatitude: data.location[0].latitude,
			locationLongitude: data.location[0].longitude,
		})
		.then((res) => {
			if (res.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateShipperWarehouseApi(data) {
	return await axios
		.put(`${process.env.REACT_APP_API}/sarokh-warehouse/update`, {
			...data,
			locationLatitude: data.location[0].latitude,
			locationLongitude: data.location[0].longitude,
		})
		.then((res) => {
			if (res.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function warehouseListApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/sarokh-warehouse/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteWarehouseApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/sarokh-warehouse/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function assignCardToShipmentApi(data) {
	return await axios
		.post(
			`${process.env.REACT_APP_API}/sarokh-warehouse/assign-card-to-shipment`,
			data
		)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(res.data.message);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function assignDriverToShipmentApi(data) {
	return await axios
		.post(
			`${process.env.REACT_APP_API}/sarokh-warehouse/assign-driver-to-shipment`,
			data
		)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addDriverApi(data) {
	const payload = {
		...data,
		contactValidTill: new Date(data.contractValidTill).toISOString(),
		contractStartDate: new Date(data.contractStartDate).toISOString(),
		dateOfBirth: new Date(data.dateOfBirth).toISOString(),
	};

	return await axios
		.post(`${process.env.REACT_APP_API}/driver/add`, payload)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteDriverApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/driver/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateDriverApi(data) {
	const payload = {
		...data,
		contactValidTill: new Date(data.contractValidTill).toISOString(),
		contractStartDate: new Date(data.contractStartDate).toISOString(),
		dateOfBirth: new Date(data.dateOfBirth).toISOString(),
	};

	return await axios
		.put(`${process.env.REACT_APP_API}/driver/update`, payload)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allDriversApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/driver/get-list`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addVehicleApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/vehicle/add`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allVehiclesApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/vehicle/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateVehicleApi(data) {
	return await axios
		.put(`${process.env.REACT_APP_API}/vehicle/update`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteVehicleApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/vehicle/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function maintenanceRecordsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/vehicle/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addPointApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/dealer-point/add`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updatePointApi(data) {
	return await axios
		.put(`${process.env.REACT_APP_API}/dealer-point/update`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function pointListingApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/dealer-point/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deletePointApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/dealer-point/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addDealerApi(data) {
	const payload = {
		...data,
		contractStartDate: new Date(data.contractStartDate).toISOString(),
		contractEndDate: new Date(data.contractEndDate).toISOString(),
		dateOfBirth: new Date(data.dateOfBirth).toISOString(),
	};

	return await axios
		.post(`${process.env.REACT_APP_API}/dealer/add`, payload)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allDealersApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/dealer/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateDealerApi(data) {
	const payload = {
		...data,
		contractStartDate: new Date(data.contractStartDate).toISOString(),
		contractEndDate: new Date(data.contractEndDate).toISOString(),
		dateOfBirth: new Date(data.dateOfBirth).toISOString(),
	};

	return await axios
		.put(`${process.env.REACT_APP_API}/dealer/update`, payload)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteDealerApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/dealer/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function getCreateTripDataApi() {
	try {
		const warehouses = await sarokhWarehouseList();
		const vehicles = await allVehiclesApi();
		const drivers = await allDriversApi();

		return await {
			warehouses: warehouses,
			vehicles: vehicles,
			drivers: drivers,
		};
	} catch (e) {
		throw e.message;
	}
}

export async function tripShipmentsApi(id) {
	return await axios
		.get(`${process.env.REACT_APP_API}/trip/get-trips-shipments/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function createTrip(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/trip/create-trip`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else if (res.data.status === 400) {
				throw new Error(res.data.message);
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteTripApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/trip/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allTripsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/trip/get-list`)
		.then((res) => {
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function tripDetailApi(id) {
	return await axios
		.get(`${process.env.REACT_APP_API}/trip/get-details/${id}`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function financeDashboardApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/wallet/get-list`)
		.then((res) => {
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function billListApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/bill/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteBillApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/bill/delete/${id}`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function billDetailApi(id) {
	return await axios
		.get(`${process.env.REACT_APP_API}/bill/get-details/${id}`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function createBillApi(data) {
	const payload = {
		...data,
		startDate: new Date(data.startDate).toISOString(),
		endDate: new Date(data.endDate).toISOString(),
		dueDate: new Date(data.dueDate).toISOString(),
	};

	return await axios
		.post(`${process.env.REACT_APP_API}/bill/create-bill`, payload)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function searchShipperShipmentsApi(dates) {
	const payload = {
		startDate: new Date(dates.startDate).toISOString(),
		endDate: new Date(dates.endDate).toISOString(),
	};

	return await axios
		.post(
			`${process.env.REACT_APP_API}/order/search-shipper-shipments/`,
			payload
		)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function getBillToDetailApi(user) {
	return await axios
		.post(`${process.env.REACT_APP_API}/bill/get-bill-to-details/${user}`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function getShipperDetailApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/shipper/get-list`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateShipperDetailApi(payload) {
	return await axios
		.put(`${process.env.REACT_APP_API}/shipper/update`, payload)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function shipperSettingApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/shipper/add-delivery-charges`, data)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function getShipperDeliveryChargesApi(user) {
	return await axios
		.get(
			`${process.env.REACT_APP_API}/shipper/get-shipper-delivery-charges/${user}`
		)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addVendorApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/vendor/add`, data)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteVendorApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/vendor/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateVendorApi(data) {
	return await axios
		.put(`${process.env.REACT_APP_API}/vendor/update`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function vendorListingApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/vendor/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function vendorDetailApi(id) {
	return await axios
		.get(`${process.env.REACT_APP_API}/vendor/get-details/${id}`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function getUserWalletsApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/wallet/get-user-wallets/`, data)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function getUserBillsApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/bill/get-user-bills/`, data)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function recordBillPaymentApi(data) {
	const payload = {
		...data,
		paymentDate: new Date(data.paymentDate).toISOString(),
	};

	return await axios
		.post(`${process.env.REACT_APP_API}/bill/record-bill-payment`, payload)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function updateWalletApi(data) {
	return await axios
		.put(`${process.env.REACT_APP_API}/wallet/update`, data)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return true;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function getCreateBillDetailApi(data) {
	const payload = {
		...data,
		startDate: new Date(data.startDate).toISOString(),
		endDate: new Date(data.endDate).toISOString(),
	};

	return await axios
		.post(`${process.env.REACT_APP_API}/bill/get-create-bill-detail/`, payload)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function transactionAddApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/transaction/add`, data)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}
