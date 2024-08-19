require("dotenv").config();
const Order = require("../Models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  try {
    const { user, items, totalAmount } = req.body;
    console.log(user);
    console.log(items);
    console.log(totalAmount);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "TRY",
            product_data: {
              name: "Payment",
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    if (session.id) {
      const newOrder = new Order({
        user,
        items,
        totalAmount,
        session,
      });
      await newOrder.save();
      await Order.findByIdAndUpdate(newOrder._id, {
        session: session.id,
      });
      res.status(200).json({
        message: "Siparis olusturuldu",
        success: true,
        data: session,
        sessionId: session.id,
      });
    } else {
      res.status(500).json({ message: "Siparis olusturulamadı" });
    }
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createOrder };
