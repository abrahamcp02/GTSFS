import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, purchaseTickets } from '../services/apiTicketService';
import { jwtDecode } from "jwt-decode";
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');      
      if (token) {
        const decoded = jwtDecode(token);
        const userId=decoded.id;
      const response = await getCart(userId);
      setCartItems(response.data);}
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handlePurchase = async () => {
    try {
      await purchaseTickets();
      navigate('/confirmation');
    } catch (error) {
      console.error('Error purchasing tickets:', error);
    }
  };

  return (
    <div className="cart container">
      <h2>Carrito</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="list-group">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item">
                Asiento {item.seat_id} - Performance {item.performance_id}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-3" onClick={handlePurchase}>
            Comprar
          </button>
        </>
      ) : (
        <p>No hay artículos en el carrito.</p>
      )}
    </div>
  );
};

export default Cart;
