import Joi from 'joi';

export const DealerPointSchema = Joi.object({
	ownerId: Joi.string().required().label('Owner'),
	dealerPointName: Joi.string().required().label('Bank'),
	commercialRegistrationNumber: Joi.string()
		.min(10)
		.max(10)
		.required()
		.label('Commercial Registration Number'),
	operatorName: Joi.string().required().label('Operator Name'),
	operatorContact: Joi.string()
		.pattern(new RegExp(/^(9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/))
		.required()
		.label('Contact')
		.messages({
			'string.pattern.base': 'Contact should be a valid no e.g "966512345678"',
		}),
	country: Joi.string().required(),
	city: Joi.string().required().label('City'),
	postalCode: Joi.string().min(5).max(5).required().label('Post Code'),
	userName: Joi.string().alphanum().required().label('Username'),
	password: Joi.string().required().label('Password'),
});
