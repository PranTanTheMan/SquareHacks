// Payment.tsx
import { useState, FC } from 'react';
import Image from 'next/image';
interface PaymentProps {
    onOrderPlaced: () => void;  // Define the type for the onOrderPlaced prop
  }

const Payment: FC<PaymentProps> = ({ onOrderPlaced }) => {
  const ratio = 660 / 400;
  const cardNumberWidth = 150 * ratio;
  const mmWidth = 40 * ratio; // Adjusted width for month dropdown
  const yyWidth = 45 * ratio; // Adjusted width for year dropdown
  const cvcWidth = 35 * ratio;
  const zipWidth = 65 * ratio;

  const [showDetails, setShowDetails] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
    if (value.length <= 16) {
      // Add a space after every 4th digit
      value = value.replace(/(.{4})/g, '$1 ').trim();
      setCardNumber(value);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvc(value);
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 5 && /^\d*$/.test(value)) {
      setZip(value);
    }
  };

  const handleOrderClick = () => {
    if (allFieldsValid()) {
      setOrderPlaced(true);
      onOrderPlaced();
    }
  };
  const allFieldsValid = () => {
    // Adjust the validation to account for the spaces added to the card number
    return cardNumber.replace(/ /g, '').length === 16 && month && year && cvc.length === 3 && zip.length === 5;
  };
 

  return (
    <div style={{ width: '675px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
      <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>Payment Method</h2>
      <button
        style={{
          height: '50px',
          borderRadius: '10px',
          width: '350px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 10px',
          fontWeight: 'bold'
        }}
        onClick={() => setShowDetails(!showDetails)}
      >
        <p>Credit or Debit Card</p>
        <Image src="/card.png" alt="card icon" width={40} height={15} />
      </button>
      {showDetails && (
        <>
          <p style={{ fontWeight: 'bold', textAlign: 'left' }}>Enter your card details</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '660px', height: '150px' }}>
            <input
              style={{ width: `${cardNumberWidth}px`, height: '140px' }}
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <select
              style={{ width: `${mmWidth}px`, height: '140px' }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month.toString().padStart(2, '0')}>
                  {month.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <select
              style={{ width: `${yyWidth}px`, height: '140px' }}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from({ length: 17 }, (_, i) => i + 24).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <input
              style={{ width: `${cvcWidth}px`, height: '140px' }}
              placeholder="CVC"
              value={cvc}
              onChange={handleCvcChange}
              type="password"
            />
            <input
              style={{ width: `${zipWidth}px`, height: '140px' }}
              placeholder="Zip"
              value={zip}
              onChange={handleZipChange}
            />
          </div>
          <button
            style={{
                width: '120px',
                height: '50px',
                borderRadius: '10px',
                backgroundColor: orderPlaced ? 'lightgreen' : (allFieldsValid() ? 'black' : 'lightgrey'),
                color: orderPlaced ? 'darkgreen' : (allFieldsValid() ? 'white' : 'darkgrey'),
                textAlign: 'center',
                fontWeight: 'bold',
                cursor: allFieldsValid() && !orderPlaced ? 'pointer' : 'default'
              }}
              disabled={!allFieldsValid() || orderPlaced}
              onClick={handleOrderClick}
            >
              {orderPlaced ? '✔Enjoy!' : 'Place Order'}
            </button>
        </>
      )}
    </div>
  );
};

export default Payment;