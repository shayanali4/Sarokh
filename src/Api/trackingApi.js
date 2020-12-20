import axios from 'axios';

export async function searchOrderApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/receiver/searchorder`, data)
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

export async function updateDeliveryApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/receiver/updatedelivery`, data)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data;
			} else {
				throw new Error(res.data.message);
			}
		})
		.catch((err) => {
			throw err;
		});
}
