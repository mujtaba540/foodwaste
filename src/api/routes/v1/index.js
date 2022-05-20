const express = require('express');
const user=require("./user.routes")
const appointment=require("./appointment.routes")
const quiz=require("./quiz.routes")
const journal=require("./journal.routes")

const router = express.Router();

/**
 * GET v1/status
 */
// router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/user',user);
router.use('/appointment',appointment);
router.use('/quiz',quiz);
router.use('/journal',journal);


module.exports = router;
