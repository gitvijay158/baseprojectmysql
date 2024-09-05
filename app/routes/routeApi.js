const express = require('express');
const router = express.Router();

const user = require('../controller/apiController.js');

router.get('/userlist', user.getServerLogDetails);

router.get('/usermsg', user.getRoleDetails);
router.get('/userprofile', user.getProfile);

router.get('/school', user.getSchool);


module.exports = router