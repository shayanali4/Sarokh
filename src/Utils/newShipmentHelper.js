export const shipmentDropdownOptions = (settings) => {
	let pickupLocationDD = [];
	let deliveryLocationDD = [];

	if (settings.pickupSarokhPoint) {
		pickupLocationDD.push('Sarokh Point');
	}
	if (settings.pickupShipperWarehouse) {
		pickupLocationDD.push('Shipper Warehouse');
	}
	if (settings.pickupSarokhWarehouse) {
		pickupLocationDD.push('Sarokh Warehouse');
	}
	if (settings.deliverySarokhPoint) {
		deliveryLocationDD.push('To Sarokh Point');
	}
	if (settings.deliveryLastMile) {
		deliveryLocationDD.push('To Customer Address');
	}
	if (settings.deliveryCustomerChoice) {
		deliveryLocationDD.push('Shipper Location');
	}
	return { pickupLocationDD, deliveryLocationDD };
};
