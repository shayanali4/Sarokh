import { atom } from 'recoil';

export const warehouseData = atom({
	key: 'warehouseData',
	default: {
		location: [{ latitude: '23.8859', longitude: '39.1925' }],
	},
});
