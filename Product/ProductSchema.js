const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productCategory: {
            type: String,
            required: true,
        },
        productOriginalPrice: {
            type: Number,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productDiscount: {
            type: String,
        },
        productDescription: {
            type: String,
            required: true,
        },
        productColors: [{
            type: String,
            required: true,
        }],
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
                },
                verified: {
                    type: Boolean,
                },
                stars: {
                    type: Number,
                },
                text: {
                    type: String,
                },
                date: {
                    type: String,
                },
            },
        ],
        remainingProducts: {
            type: Number,
            required: true,
        },
        sales: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", ProductSchema);
