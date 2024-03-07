// MininalBasket.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

const MinimalBasket = () => {
  const arr = useSelector((st) => st.order.basket);
  const navigate = useNavigate();

  const sum = () => {
    let sum = 0;
    arr.forEach((element) => {
      sum += +element.amount;
    });
    return sum;
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        width: '300px', // Adjust the width as needed
        maxHeight: '400px', // Adjust the maximum height to make it scrollable
        overflowY: 'auto', // Enable vertical scrolling if content exceeds the maximum height
        background: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '10px',
        zIndex: '999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <b style={{ fontSize: '14px', marginBottom: '10px', position: 'sticky', top: '0', background: '#fff' }}>סך הכל מוצרים: {sum()}</b>
      <ul id="ulAllProductsInMiniBasket" style={{ listStyle: 'none', padding: 0 }}>
        {arr.map((item) => (
          <li key={item._id} style={{ textAlign: 'center', borderBottom: '1px solid #ccc', padding: '8px 0' }}>
            <div onClick={() => navigate('/basket')} style={{ border: 'solid 1px beige', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image src={item.src} size="tiny" /> {/* Adjust the size as needed */}
              <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '5px 0' }}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MinimalBasket;



