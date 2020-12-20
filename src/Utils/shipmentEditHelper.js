/* this method transforms the data which is then send to shipment form for edit */

export const shipmentEditHelper = (data, id) => {
	console.log('this is the data and id', data, id);

	let deliveryLocation = "";

	if(data.deliveryLocation === 'Last Mile' && data.deliveryLocation !== 'To Predefined Location')
	{
		deliveryLocation = 'To Customer Address'
	}
	else if(data.deliveryLocation !== 'Last Mile' && data.deliveryLocation !== 'To Predefined Location')
	{
		deliveryLocation = 'To Sarokh Point'
	}
	else{
		deliveryLocation = 'Shipper Location'
	}

	return {
		...data,
		id: id,
		deliveryLocation: deliveryLocation,
		location: [
			{
				label: data.address,
				latitude: data.locationLatitude,
				longitude: data.locationLongitude,
			},
		],
		total: data.total - Math.round((data.total / 100) * 15) + 1,
		update: true,
	};
};
