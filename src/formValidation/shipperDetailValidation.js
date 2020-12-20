import Joi from 'joi';

export const shipperDetailSchema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
	lastName: Joi.string().required().label('Last Name'),
	contact: Joi.string()
		.pattern(new RegExp(/^(9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/))
		.required()
		.label('Contact')
		.messages({
			'string.pattern.base': 'Contact should be a valid no e.g "966512345678"',
		}),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: false })
		.required()
		.label('Email Address'),
    nicNumber:Joi.string()
        .min(10)
        .max(10)
        .required()
        .label('Iqama Number'),
    vatNumber:Joi.string()
        .min(10)
        .max(10)
        .required()
        .label('VAT Number'),
    crNumber: Joi.string()
        .min(10)
        .max(10)
        .required()
        .label('Commercial Registration (CR)'),
    bank: Joi.string().required(),
    iban:Joi.string()
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
    country: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().min(5).max(200).required(),
    postCode: Joi.string().min(5).max(5).required().label('Post Code'),
    userName: Joi.string().alphanum().label('User Name'),
    userPassword: Joi.string().alphanum().label('Password')
});