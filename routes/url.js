const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const url = require('../models/url');

router.post('/shorten', async (request, response) => {
    const { longUrl } = request.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        return response.status(401).json('Invalid base url');
    }

    const urlCode = shortId.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            let urls = await url.findOne({ longUrl });

            if (urls) {
                return response.json(urls);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                urls = new url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date(),
                });

                return response.json(urls);
            }
        } catch (error) {
            console.error(error);
            return response.status(500).json('Server error');
        }
    } else {
        return response.status(401).json('Invalid long url');
    }
});

module.exports = router;