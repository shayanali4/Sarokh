import axios from 'axios';

export const postData = async (data, operation) => {
	const user = JSON.parse(localStorage.getItem('user'));

	let finalData = [];
	data.map((doc) => {
		if (doc.deliveryLocation === 'To Customer Address') {
			return finalData.push({
				...doc,
				shipperWarehouseId:
					doc.pickupType !== 'Shipper Warehouse'
						? undefined
						: doc.shipperWarehouseId,
				sarokhWarehouseId:
					doc.pickupType !== 'Sarokh Warehouse'
						? undefined
						: doc.sarokhWarehouseId,

				deliveryLocation: 'To Sarokh Point',
				deliveryLocationRadio: 'customerAddress',
				dealerPointId: undefined,
				address:
					doc.location[0].label === undefined
						? undefined
						: doc.location[0].label,
				locationLatitude: doc.location[0].latitude,
				locationLongitude: doc.location[0].longitude,
				shipperId: user.id,
			});
		} else if (doc.deliveryLocation === 'To Sarokh Point') {
			return finalData.push({
				...doc,
				shipperWarehouseId:
					doc.pickupType !== 'Shipper Warehouse'
						? undefined
						: doc.shipperWarehouseId,
				sarokhWarehouseId:
					doc.pickupType !== 'Sarokh Warehouse'
						? undefined
						: doc.sarokhWarehouseId,
				deliveryLocationRadio: 'sarokhPoint',
				dealerPointId: undefined,
				shipperId: user.id,
			});
		} else {
			return finalData.push({
				...doc,
				shipperWarehouseId:
					doc.pickupType !== 'Shipper Warehouse'
						? undefined
						: doc.shipperWarehouseId,
				sarokhWarehouseId:
					doc.pickupType !== 'Sarokh Warehouse'
						? undefined
						: doc.sarokhWarehouseId,

				deliveryLocation: 'To Sarokh Point',
				deliveryLocationRadio: 'customerAddress',
				dealerPointId: undefined,
				address: doc.shipperWarehouseAddress.address,
				locationLatitude: doc.shipperWarehouseAddress.latitude,
				locationLongitude: doc.shipperWarehouseAddress.longitude,
				shipperId: user.id,
			});
		}
		// else {
		// 	return finalData.push({
		// 		...doc,
		// 		deliveryLocation: 'To Predefined Location',
		// 		shipperWarehouseId:
		// 			doc.pickupType !== 'Shipper Warehouse'
		// 				? undefined
		// 				: doc.shipperWarehouseId,
		// 		sarokhWarehouseId:
		// 			doc.pickupType !== 'Sarokh Warehouse'
		// 				? undefined
		// 				: doc.sarokhWarehouseId,
		// 		shipperId: user.id,
		// 	});

		// }
	});
	console.log(finalData);

	if (operation === 'update') {
		await axios
			.put(`${process.env.REACT_APP_API}/order/update`, finalData)
			.then((res) => {
				console.log('this is put response', res);
				if (res.data.status === 200) {
					return true;
				} else {
					throw new Error('order was not created!!');
				}
			})
			.catch((err) => {
				throw err;
			});
	} else {
		await axios
			.post(`${process.env.REACT_APP_API}/order/create-web-order`, finalData)
			.then((res) => {
				if (res.data.status === 200) {
					return true;
				} else {
					throw new Error('order was not created!!');
				}
			})
			.catch((err) => {
				throw err;
			});
	}
};

//the section above is a check on the values from step 2 since the values are no longer valid when the data is being edit
// so these checks make sure that only corrent information is posted to the server
// in the first two checks the data pickuptype is checked which is the pickup location is step2 form, changing values on the
// the form does not reset the values the new values are appended over the previous values meaning if shipperwarehouse was selected before
// and then after editing it is changed to sarokhware house the shipperwarehouseid still remains there so we need to correct that and syn the values
// with the newly changed data through the edit option
