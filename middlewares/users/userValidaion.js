const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../../models/poeple');
const { unlink } = require('fs');
const path = require('path');

const addUserValidators = [
	check('name')
		.isLength({ min: 1 })
		.withMessage('Name is required')
		.isAlpha('en-US', { ignore: ' -' })
		.withMessage('Name must be alphabetic')
		.trim(),
	check('email')
		.isEmail()
		.withMessage('Email must be valid')
		.trim()
		.custom(async (value) => {
			try {
				const user = await User.findOne({ email: value });

				if (user) {
					throw createError('Email already in use');
				}
			} catch (error) {
				throw createError(error.message);
			}
		}),
	check('mobile')
		.isMobilePhone('bn-BD', {
			strictMode: true,
		})
		.withMessage('Enter valid mobile number')
		.custom(async (value) => {
			try {
				const user = await User.findOne({ mobile: value });

				if (user) {
					throw createError('Mobile number already in use');
				}
			} catch (error) {
				throw createError(error.message);
			}
		}),
	check('password')
		.isStrongPassword()
		.withMessage(
			'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
		),
];

const addUserValidationHandler = (req, res, next) => {
	const errors = validationResult(req);
	const mappedErrors = errors.mapped();

	if (Object.keys(mappedErrors).length === 0) {
		next();
	} else {
		if (req.files.length > 0) {
			const { filename } = req.files[0];
			unlink(
				path.join(__dirname, `../public/uploads/avatars/${filename}`),
				(err) => {
					if (err) {
						console.log(err);
					}
				},
			);
		}
	}

	res.status(500).json({
		errors: mappedErrors,
	});
};

module.exports = {
	addUserValidators,
	addUserValidationHandler,
};
