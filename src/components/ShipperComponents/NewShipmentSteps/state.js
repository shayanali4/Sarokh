import { atom, selector } from 'recoil';

/* this is the main global state which is shared among all the three forms its has 8 default values which is for form
3 because these values reflect some of the default setting for form 3 */

export const newShipment = atom({
	key: 'newShipment',
	default: {
		shipmentValue: 10,
		normalPackaging: false,
		giftPackaging: false,
		insurance: false,
		additionalCharges: 0,
		total: 45,
		billingType: 'true',
		location: [{ latitude: '23.8859', longitude: '39.1925' }],
	},
});

/* this atom below is used to store all the orders in an array which is later posted after some modifications in the
api file */

export const newShipmentList = atom({
	key: 'newShipmentList',
	default: [],
});

/* these values below are used to set the step3 form data to default values when add to way button is pressed so that
the user can enter new values again in the form */

export const defaultData = {
	shipmentValue: 10,
	normalPackaging: false,
	giftPackaging: false,
	insurance: false,
	additionalCharges: 0,
	location: [{ latitude: '23.8859', longitude: '39.1925' }],
	shipmentWeight: 'true',
	billingType: 'true',
	shipmentType: 'true',
	receiverContact: '',
	receiverName: '',
	codValue: '',
};

export const shipperSetting = atom({
	key: 'shipperSetting',
	default: {},
});
