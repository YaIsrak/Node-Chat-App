const express = require('express');
const {
	getUsers,
	addUser,
	removeUser,
} = require('../controller/usersController');
const deocorateHTMLResponse = require('../middlewares/common/decorateHTMLResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { check } = require('express-validator');
const {
	addUserValidators,
	addUserValidationHandler,
} = require('../middlewares/users/userValidaion');

const router = express.Router();

// Users page
router.get('/', deocorateHTMLResponse('Users'), getUsers);

router.post(
	'/',
	avatarUpload,
	addUserValidators,
	addUserValidationHandler,
	addUser,
);

router.delete('/:id', removeUser);

module.exports = router;
