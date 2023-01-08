'use strict';

const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// GET /apiv1/products
// return an array of products

router.get('/', async (req, res, next) => {
    try {
        // get data from querystring 
        const tags = req.query.tags;
        const onSale = req.query.onSale;
        const name = req.query.name;
        const price = req.query.price;

        const skip = req.query.skip;
        const limit = req.query.limit;

        const fields = req.query.fields;

        //filters
        const filter = {};

        if (tags) {
            filter.tags = tags;
        }

        if (onSale) {
            filter.onSale = onSale;
        }

        if (name) {
            filter.name = new RegExp('^' + name, 'i');
        }

        if (price) {

            const priceRange = price.split('-');

            if (priceRange.length === 1) {
                filter.price = price;
            } else {
                if (priceRange[0] !== '' & priceRange[1] === '') {
                    filter.price = { '$lte': priceRange[1] };
                };
                if (priceRange[1] !== '' & priceRange[0] === '') {
                    filter.price = { '$lte': priceRange[1] };
                };
                if (priceRange[1] !== '' & priceRange[0] !== '') {
                    filter.price = { '$gte:': priceRange[0], '$lte': priceRange[1] };
                };
            }
        };

        const products = await Product.array(filter, skip, limit);
        res.json({results: products});

    }catch (err) {
        next (err);
    }

});

// create a new product (productData)
router.post ('/', async (req, res, next) => {
    try{
        const productData = req.body;
        const product = new Product (productData);
        const savedProduct = await product.save();
        res.json ({ result: savedProduct});
    }catch (err) {
        next (err);
    }
});

router.get('/tags', function(req, res){
    Product.tagsArray (function(err, tags){
        if (err){
            return res.json({err});
        }
        res.json({tags});
    });
});

module.exports = router;