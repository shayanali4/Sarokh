import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

export async function dashboardApi() {
	const user = await JSON.parse(localStorage.getItem('user'));
	return await axios
		.get(`${process.env.REACT_APP_API}/web-dashboard/shipper/${user.id}`)
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
	const user = await JSON.parse(localStorage.getItem('user'));
	return await axios
		.get(
			`${process.env.REACT_APP_API}/order/get-all-shipments/${await user.id}`
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

export async function deleteShipmentApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/order/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return res;
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

export async function editShipmentApi(id) {
	return await axios
		.get(`${process.env.REACT_APP_API}/order/edit-order/${id}`)
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

export async function getShipperWarehousesApi() {
	const user = await JSON.parse(localStorage.getItem('user'));
	return await axios
		.get(
			`${
				process.env.REACT_APP_API
			}/shipper-warehouse/get-list-by-shipperId/${await user.id}`
		)
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

export async function getTrackingNumberApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/order/get-all-shipments-trackingnumber`)
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

export async function getPendingTrackingNumberApi() {
	const user = await JSON.parse(localStorage.getItem('user'));
	return await axios
		.get(`${process.env.REACT_APP_API}/order/get-pending-orders/${user.id}`)
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

export async function getDeliveryLocationsApi() {
	const user = await JSON.parse(localStorage.getItem('user'));
	return await axios
		.get(
			`${process.env.REACT_APP_API}/order/get-pickup-delivery-locations/${user.id}`
		)
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
