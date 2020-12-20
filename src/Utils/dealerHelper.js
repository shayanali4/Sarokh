import moment from 'moment';

export const dealerEditHelper = (data) => {
	return {
		...data,
		owner: data.ownerName,
		contactNo: data.contact,
		postCode: data.zipCode,
		compensationPerShipment: data.perShipmentsCompensation,
		compensationCycle: data.compensationClearanceDuration,
		contractStartDate: moment(data.contractStartDate).format('YYYY-MM-DD'),
		contractEndDate: moment(data.contractEndDate).format('YYYY-MM-DD'),
		email: data.user.email,
		dateOfBirth: moment(data.user.dob).format('YYYY-MM-DD'),
		profilePicture: data.user.profilePicture,
		iban: data.bankAccount.iban,
		businessGroupName: data.companyName,
		userName: data.user.userName,
		password: data.user.userPassword,
		bank: data.bankAccount.bank,
		iqamaFile: data.nicFile,
		update: true,
	};
};

export const pointEditHelper = (data) => {
	return {
		...data,
		userName: data.user.userName,
		password: data.user.userPassword,
		location: [
			{
				label: data.address,
				latitude: data.locationLatitude,
				longitude: data.locationLongitude,
			},
		],
		update: true,
	};
};
