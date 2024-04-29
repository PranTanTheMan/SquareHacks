// paymentAPI.js
const { Client, Environment } = require('square');
const { randomUUID } = require('crypto');

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { paymentsApi, ordersApi } = client;

async function processPayment(req, res) {
  const { paymentToken, cartItems } = req.body;

  try {
    // Create the order
    const createOrderResponse = await ordersApi.createOrder({
      order: {
        locationId: 'L5PQSYQANTED2',
        lineItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity.toString(),
          basePriceMoney: {
            amount: BigInt(item.price * 100),
            currency: 'USD',
          },
        })),
        totalMoney: {
          amount: BigInt(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100),
          currency: 'USD',
        },
      },
      idempotencyKey: randomUUID(),
    });

    const order = createOrderResponse.result.order;

    // Charge the payment token
    const createPaymentResponse = await paymentsApi.createPayment({
      sourceId: paymentToken,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: order.totalMoney.amount,
        currency: 'USD',
      },
      orderId: order.id,
    });

    const payment = createPaymentResponse.result.payment;

    res.status(200).json({
      paymentId: payment.id,
      orderId: order.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
}

module.exports = { processPayment };
