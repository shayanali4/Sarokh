import { atom } from 'recoil';

export const driverData = atom({
	key: 'driverData',
	default: {
		driverType: 'employee',
	},
});
