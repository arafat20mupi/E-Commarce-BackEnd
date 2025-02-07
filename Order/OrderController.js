const OrderSchema = require("./OrderSchema");

const PostOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, customerId, phone, items, totalPrice, status, paymentMethod, deliveryAddress } = req.body;
        const newOrder = new OrderSchema({ customerName, customerEmail, customerId, phone, items, totalPrice, status, paymentMethod, deliveryAddress });
        const order = await newOrder.save();
        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetOrder = async (req, res) => {
    try {
        const data = await OrderSchema.find();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
        if (!id || !status) {
            return res.status(400).json({ success: false, message: "ID and status are required" });
        }

        const updatedOrder = await OrderSchema.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await OrderSchema.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order deleted successfully" ,deletedOrder});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = { PostOrder, GetOrder, UpdateStatus, DeleteOrder };
