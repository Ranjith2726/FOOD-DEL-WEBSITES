import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {

    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order,
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Backend Failed",
        });
    }
};

export { placeOrder };