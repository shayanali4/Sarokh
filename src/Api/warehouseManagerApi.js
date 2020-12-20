import axios from 'axios';

export async function dashboardApi() {
	const user = JSON.parse(localStorage.getItem('user'));
	return await axios
		.get(
			`${process.env.REACT_APP_API}/sarokh-warehouse/get-warehouse-dashboard/${user.warehouseId}`
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
