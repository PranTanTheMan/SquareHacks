const { processPayment } = require('./PaymentAPI');

// Test payment details
const cardNumber = '4111111111111111';
const cvc = '123';
const expirationDate = {
  month: '12',
  year: '2024',
};
const zip = '12345';
const amount = 10.0;

// Process the payment
processPayment(cardNumber, cvc, expirationDate, zip, amount)
  .then((payment) => {
    console.log('Payment processed successfully:', payment);
  })
  .catch((error) => {
    console.error('Payment processing failed:', error);
  });