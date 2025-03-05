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
        customerId: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
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
                size : {
                    type: String,
                },
                color: {
                    type: String,
                }
            },
        ],
        totalPrice: {
            type: Number
        },
        status: {
            type: String,
            require:true,
            enum: ['todo',"pending", "processing", "shipped", "delivered", "cancelled"],
            default: "todo",
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", ],
        },     
        deliveryAddress: {
            type: String
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", OrderSchema);
