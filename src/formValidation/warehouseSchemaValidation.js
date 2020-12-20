import Joi from 'joi';

export const warehouseAddress = Joi.object({
	name: Joi.string().required().label('Warehouse Name'),
	address: Joi.string().min(5).max(200).required().label('Address'),
	country: Joi.string().required().label('Country'),
	city: Joi.string().required().label('City'),
	postalCode: Joi.string().min(5).max(5).required().label('Post Code'),
});

export const warehouseManager = Joi.object({
	mangerContact: Joi.string()
		.pattern(new RegExp(/^(9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/))
		.required()
		.label('Contact')
		.messages({
			'string.pattern.base': 'Contact should be a valid no e.g "966512345678"',
		}),
	operationalTimeto: Joi.string()
		.pattern(new RegExp(/^((1[0-2]|0?[1-9]):([0-5][0-9])\s?([AaPp][Mm]))$/))
		.messages({
			'string.pattern.base':
				'Time should be In Format e.g 02:32 PM or 02:32 AM',
		}),
	operationalTimefrom: Joi.string()
		.pattern(new RegExp(/^((1[0-2]|0?[1-9]):([0-5][0-9])\s?([AaPp][Mm]))$/))
		.messages({
			'string.pattern.base':
				'Time should be In Format e.g 02:32 PM or 02:32 AM',
		}),
});
