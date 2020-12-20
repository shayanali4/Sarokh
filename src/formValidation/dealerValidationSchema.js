import Joi from 'joi';

export const basicInformation = Joi.object({
	owner: Joi.string().required(),
	businessGroupName: Joi.string().allow('').optional(),
	contactNo: Joi.string()
		.pattern(new RegExp(/^(9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/))
		.required()
		.label('Contact')
		.messages({
			'string.pattern.base': 'Contact should be a valid no e.g "966512345678"',
		}),
	email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
	nicNumber: Joi.string()
		.min(10)
		.max(10)
		.required()
		.label('Iqama/NIC/Passport No'),
	dateOfBirth: Joi.string().required().label('Date Of Birth'),
	country: Joi.string().required(),
	city: Joi.string().required(),
	address: Joi.string().min(5).max(200).required(),
	postCode: Joi.string().min(5).max(5).required().label('Post Code'),
});

export const businessInformation = Joi.object({
	contractId: Joi.number().integer().positive().label('Contact ID'),
	contractStartDate: Joi.string().required().label('Contract Start Date'),
	contractEndDate: Joi.string().required().label('Contract End Date'),
	compensationPerShipment: Joi.number()
		.min(0)
		.max(100000)
		.required()
		.label('Compensation Per Shipment'),
	compensationCycle: Joi.number()
		.min(0)
		.max(100000)
		.required()
		.label('Compensation Cycle'),
	bank: Joi.string().required(),
	iban: Joi.string()
		.pattern(
			new RegExp(
				'SA[a-zA-Z0-9]{2}s?([0-9]{2})([a-zA-Z0-9]{2}s?)([a-zA-Z0-9]{4}s?){4}s?'
			)
		)
		.required()
		.messages({
			'string.pattern.base':
				'IBAN Is Not Valid must be like "SA4420000001234567891234"',
		})
		.label('IBAN'),
	userName: Joi.string().alphanum().required().label('Username'),
	password: Joi.string().required().label('Password'),
});
