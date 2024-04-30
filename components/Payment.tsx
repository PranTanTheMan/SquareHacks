'use client';
import { useState, FC } from 'react';
import Image from 'next/image';

interface PaymentProps {
  onOrderPlaced: () => void;
}

const Payment: FC<PaymentProps> = ({ onOrderPlaced }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [zip, setZip] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
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
    return cardNumber.replace(/ /g, '').length === 16 && month && year && cvc.length === 3 && zip.length === 5;
  };

  return (
    <div style={{ width: '90%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px', backgroundColor: 'white' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '150px' }}>
            <input
              style={{ width: '37.5%', height: '140px' }}
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <select
              style={{ width: '10%', height: '140px' }}
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
              style={{ width: '11.25%', height: '140px' }}
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
              style={{ width: '4%', height: '140px' }}
              placeholder="CVC"
              value={cvc}
              onChange={handleCvcChange}
              type="password"
            />
            <input
              style={{ width: '16.25%', height: '140px' }}
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
