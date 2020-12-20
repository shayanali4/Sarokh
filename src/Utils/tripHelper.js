import { filter } from 'underscore';

/* this function only return data where locationName is not null and where wallet balance is not 0 */

export const createTripTableListingHelper = (data) => {
	let deliveries = filter(data.deliveries, function (doc) {
		return doc.locationName !== null;
	});

	let pickups = filter(data.pickups, function (doc) {
		return doc.locationName !== null;
	});

	let pointsList = filter(data.pointsList, function (doc) {
		return doc.walletBalance !== '0.0';
	});

	return { deliveries: deliveries, pickups: pickups, pointsList: pointsList };
};

export const warehouseManagerCreateTripFilter = (data) => {
	let user = JSON.parse(localStorage.getItem('user'));

	let drivers = filter(data.drivers, function (doc) {
		return doc.warehouse.id === user.warehouseId;
	});

	let vehicles = filter(data.vehicles, function (doc) {
		return doc.warehouse.id === user.warehouseId;
	});

	let warehouses = filter(data.warehouses, function (doc) {
		return doc.id === user.warehouseId;
	});

	return { drivers: drivers, vehicles: vehicles, warehouses: warehouses };
};
