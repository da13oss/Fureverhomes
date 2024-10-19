const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Event Details Page');
});

module.exports = router;
