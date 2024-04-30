const { Client, Environment } = require('square');
require('dotenv').config();

// Initialize the Square client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { paymentsApi } = client;

// Function to process a payment
async function processPayment(cardNumber, cvc, expirationDate, zip, amount) {
  try {
    // Generate a unique idempotency key to prevent duplicate charges
    const idempotencyKey = require('crypto').randomBytes(16).toString('hex');

    // Create a payment request using the provided card details and amount
    const paymentRequest = {
      sourceId: 'cnon:card-nonce-ok', // Replace with a valid nonce in production
      idempotencyKey,
      amountMoney: {
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'USD',
      },
      verificationToken: cvc, // Not a PCI compliant field, for example purposes only
      billingAddress: {
        postalCode: zip,
      },
      cardDetails: {
        card: {
          number: cardNumber,
          cvv: cvc,
          expirationDate: `${expirationDate.month}/${expirationDate.year}`,
          postalCode: zip,
        },
      },
    };

    // Call the Square API to create the payment
    const paymentResponse = await paymentsApi.createPayment(paymentRequest);
    return paymentResponse.result.payment;
  } catch (error) {
    console.error('Failed to process payment:', error);
    throw error;
  }
}

module.exports = { processPayment };