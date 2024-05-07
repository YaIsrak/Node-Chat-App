const express = require('express');
const { getInbox } = require('../controller/inboxController');
const decorateHTMLResponse = require('../middlewares/common/decorateHTMLResponse');

const router = express.Router();

// Inbox page
router.get('/', decorateHTMLResponse('Inbox'), getInbox);

module.exports = router;
