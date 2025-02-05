const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,    
        },
        costomerID: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        items: [
            {
                productName: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", ],
            required: true,
        },     
        deliveryAddress: {
            type: String,
            required: true,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", OrderSchema);
