const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productRating: {
            type: String,
            required: true,
        },
        productCategory: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productOriginalPrice: {
            type: Number,
            required: true,
        },
        productDiscount: {
            type: String,
            required: true,
        },
        productDescription: {
            type: String,
            required: true,
        },
        productColors: [{
            type: String,
            required: true,
        }],
        dressStyle: {
            type: String,
            required: true,
        },
        productSizes: [{
            type: String,
            required: true,
        }],
        productImages: [{
            type: String,
            required: true,
        }],
        productDetails: [{
            type: String,
            required: true,
        }],
        faqs: [
            {
                question: {
                    type: String,
                    required: true,
                },
                answer: {
                    type: String,
                    required: true,
                },
            },
        ],
        reviews: [
            {
                name: {
                    type: String,
                    required: true,
                },
                verified: {
                    type: Boolean,
                    required: true,
                },
                stars: {
                    type: Number,
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                date: {
                    type: String,
                    required: true,
                },
            },
        ],
        remainingProducts: {
            type: Number,
            required: true,
        },
        sales: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", ProductSchema);
