const express = require('express');
const path = require('path');
const rootDir = require('../util/path')
const router = express.Router();

router.get('/add-product',(req, res, next) => { // here the first arg of get() method is the route next is a callback function w/ request, response and next as args
    console.log('add-product page');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html')
    ); // sendFile method allows you to send back a file as a reponse, in this case it's pointing to an external local html file created
}); // the join method of path joins paths together, so it combines rootDir w/ views and add-product

router.post('/add-product', (req, res, next) => { // post method is like a use() method, but limited to POST requests, where as .use() is for all
    console.log(req.body);
    res.redirect('/'); // redirect method redirects to where you want
});

module.exports = router;