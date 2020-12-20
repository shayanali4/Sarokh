import moment from 'moment';

export const driverEditHelper = (data) => {
	if (data.vehicle) {
		return {
			...data,
			...data.bankAccount,
			...data.user,
			...data.vehicle,
			contractStartDate: moment(data.contractStartDate).format('YYYY-MM-DD'),
			contractValidTill: moment(data.contractValidTill).format('YYYY-MM-DD'),
			dateOfBirth: moment(data.user.dob).format('YYYY-MM-DD'),
			postCode: data.postalCode,
			vehicleName: data.vehicle.name,
			vehicleModel: data.vehicle.model,
			userName: data.user.userName,
			password: data.user.userPassword,
			update: true,
		};
	} else {
		return {
			...data,
			...data.bankAccount,
			...data.user,
			contractStartDate: moment(data.contractStartDate).format('YYYY-MM-DD'),
			contractValidTill: moment(data.contractValidTill).format('YYYY-MM-DD'),
			dateOfBirth: moment(data.user.dob).format('YYYY-MM-DD'),
			postCode: data.postalCode,
			userName: data.user.userName,
			password: data.user.userPassword,
			update: true,
		};
	}
};
