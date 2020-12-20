export const adminRoutes = [
	{
		to: '/admin/dashboard',
		name: 'Dashboard',
		iconClass: 'nav-icon fas fa-rocket',
	},
	{
		to: '/admin/shipments/',
		name: 'Shipments',
		iconClass: 'nav-icon fas fa-box',
		subRoutes: [
			{
				to: '/admin/shipments/allshipments',
				name: 'All Shipments',
				iconClass: 'nav-icon fas fa-list-alt',
			},
			{
				to: '/admin/shipments/deliveredshipments',
				name: 'Delivered Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/pendingshipments',
				name: 'Pending Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/CODshipments',
				name: 'COD Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/prepaidshipments',
				name: 'Prepaid Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/returnshipments',
				name: 'Return Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/pickupshipments',
				name: 'Pickup Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/deliveryshipments',
				name: 'Delivery Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
		],
	},
	{
		to: '/admin/shippers/',
		name: 'Shippers',
		iconClass: 'nav-icon fas fa-truck-loading',
		subRoutes: [
			{
				to: '/admin/shippers/allshippers',
				name: 'All Shippers',
				iconClass: 'nav-icon fas fa-truck-loading',
			},
			{
				to: '/admin/shippers/shipperbilling',
				name: 'Shipper Billing',
				iconClass: 'nav-icon fas fa-truck-loading',
			},
			{
				to: '/admin/shippers/shipperdetail',
				name: 'Shipper Detail',
				iconClass: 'nav-icon fas fa-truck-loading',
			},
			{
				to: '/admin/shippers/shippersetting',
				name: 'Shipper Setting',
				iconClass: 'nav-icon fas fa-truck-loading',
			},
		],
	},
	{
		to: '/admin/warehouses/',
		name: 'Warehouses',
		iconClass: 'nav-icon fa fa-warehouse',
		subRoutes: [
			{
				to: '/admin/warehouses/addshipperwarehouse/step1',
				name: 'Add Warehouse',
				iconClass: 'nav-icon fas fa-plus-square',
			},
			{
				to: '/admin/warehouses/warehouselist',
				name: 'Warehouse List',
				iconClass: 'nav-icon fa fa-warehouse',
			},
			{
				to: '/admin/warehouses/warehouseterminal',
				name: 'Warehouse Terminal',
				iconClass: 'nav-icon fa fa-warehouse',
			},
		],
	},
	{
		to: '/admin/scheduling/',
		name: 'Scheduling',
		iconClass: 'nav-icon fas fa-shipping-fast',
		subRoutes: [
			{
				to: '/admin/scheduling/createtrip',
				name: 'Create Trip',
				iconClass: 'nav-icon fas fa-route',
			},
			{
				to: '/admin/scheduling/alltrips',
				name: 'All Trips',
				iconClass: 'nav-icon fas fa-shipping-fast',
			},
		],
	},
	{
		to: '/admin/finance/',
		name: 'Finance',
		iconClass: 'nav-icon fas fa-wallet',
		subRoutes: [
			{
				to: '/admin/finance/dasboard',
				name: 'Finance Dashboard',
				iconClass: 'nav-icon fas fa-rocket',
			},
			{
				to: '/admin/finance/createbill',
				name: 'Create Bill',
				iconClass: 'nav-icon fas fa-file-invoice',
			},
			{
				to: '/admin/finance/billlisting',
				name: 'All Bills',
				iconClass: 'nav-icon fas fa-wallet',
			},
			{
				to: '/admin/finance/paymentrecord',
				name: 'Payment Record',
				iconClass: 'nav-icon fas fa-wallet',
			},
		],
	},
	{
		to: '/admin/drivers/',
		name: 'Drivers',
		iconClass: 'nav-icon fas fa-address-card',
		subRoutes: [
			{
				to: '/admin/drivers/adddriver/step1',
				name: 'Add Driver',
				iconClass: 'nav-icon fas fa-plus-square',
			},
			{
				to: '/admin/drivers/alldrivers',
				name: 'All Drivers',
				iconClass: 'nav-icon fas fa-list-alt',
			},
		],
	},
	{
		to: '/admin/dealer',
		name: 'Dealer',
		iconClass: 'nav-icon fas fa-store',
		subRoutes: [
			{
				to: '/admin/dealer/adddealer/step1',
				name: 'Add Dealer',
				iconClass: 'nav-icon fas fa-plus-square',
			},
			{
				to: '/admin/dealer/alldealers',
				name: 'All Dealers',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/ledger/allledger',
				name: 'Dealer Inventory',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/ledger/allledger',
				name: 'Received Ledgers',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/ledger/allledger',
				name: 'COD Ledgers',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/admin/dealer/addpoint',
				name: 'Add Point',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/admin/dealer/allpoints',
				name: 'Points',
				iconClass: 'nav-icon fas fa-store',
			},
		],
	},
	{
		to: '/admin/vendors/',
		name: 'Vendors',
		iconClass: 'nav-icon fas fa-tablet-alt',
		subRoutes: [
			{
				to: '/admin/vendors/addvendor',
				name: 'Add Vendor',
				iconClass: 'nav-icon fas fa-plus-square',
			},
			{
				to: '/admin/vendors/allvendors',
				name: 'All Vendors',
				iconClass: 'nav-icon fas fa-truck',
			},
		],
	},
	{
		to: '/admin/vehicles/',
		name: 'Vehicles',
		iconClass: 'nav-icon fas fa-truck',
		subRoutes: [
			{
				to: '/admin/vehicles/addvehicle',
				name: 'Add Vehicles',
				iconClass: 'nav-icon fas fa-plus-square',
			},
			{
				to: '/admin/vehicles/allvehicles',
				name: 'All Vehicles',
				iconClass: 'nav-icon fas fa-truck',
			},
			{
				to: '/admin/vehicles/maintenancerecords',
				name: 'Maintenance Records',
				iconClass: 'nav-icon fas fa-truck',
			},
		],
	},
	{
		to: '/admin/users',
		name: 'Users',
		iconClass: 'nav-icon fas fa-users',
		subRoutes: [
			{
				to: '/admin/users/adduser',
				name: 'Add User',
				iconClass: 'fas fa-user-plus nav-icon',
			},
			{
				to: '/admin/users/allusers',
				name: 'All Users',
				iconClass: 'fas fa-users nav-icon',
			},
		],
	},
	{
		to: '/admin/reports',
		name: 'Reports',
		iconClass: 'nav-icon fas fa-file-contract',
		subRoutes: [
			{
				to: '/admin/reports/financereport',
				name: 'Finance Report',
				iconClass: 'nav-icon fas fa-wallet',
			},
			{
				to: '/admin/reports/shipmentreport',
				name: 'Shipment Report',
				iconClass: 'nav-icon fas fa-box',
			},
		],
	},
];
