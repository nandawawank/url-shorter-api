const express = require('express');
const url = require('../models/url');
const router = express.Router();

router.get('/:code', async (request, response) => {
    try {
        const urls = await url.findOne({
            urlCode: req.params.code
        });

        if (urls) {
            return response.redirect(url.longUrl);
        } else {
            return response.status(404).json('No url found');
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json('Server error');
    }
});

module.exports = router;