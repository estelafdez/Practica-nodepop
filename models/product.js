'use strict';

const mongoose = require('mongoose');
//define product shema

const productSchema = mongoose.Schema({
    name: { type: String, index: true },
    onSale: { type: Boolean, index: true },
    price: { type: Number, index: true },
    image: { type: String, index: true },
    tags: { type: [String], index: true },
});

productSchema.statics.array = function (filter, skip, limit) {
    const query = Product.find(filter);
    query.skip(skip);
    query.limit(limit);
    return query.exec();

}

productSchema.statics.tagsArray = function (cb) {
    return new Promise(function (resolve, reject) {

        const query = Product.find().distinct('tags', function (err, results) {

            if (err) {
                if (cb) {
                    return;
                }
                reject(err);
            }
            if (cb) {
                cb(null, results);
                return;
            }

            resolve(results);
        });

    });
};

// create model

const Product = mongoose.model ('Product', productSchema)

// export model 

module.exports = Product;
