import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, purchaseTickets, removeFromCart } from '../services/apiTicketService';
import {jwtDecode} from 'jwt-decode';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const response = await getCart(userId);
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        await purchaseTickets(userId);
        navigate('/my-tickets');
      }
    } catch (error) {
      console.error('Error purchasing tickets:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        await removeFromCart(userId, itemId);
        fetchCart(); // Refrescar el carrito después de eliminar un artículo
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart container">
      <h2>Carrito</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="list-group">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div><strong>Asiento:</strong> {item.seat_number} <strong>Fila:</strong> {item.row_number}</div>
                  <div><strong>Función:</strong> {item.performance_title}</div>
                  <div><strong>Fecha:</strong> {new Date(item.performance_date).toLocaleDateString()}</div>
                  <div><strong>Hora:</strong> {new Date(item.performance_date).toLocaleTimeString()}</div>
                  <div><strong>Precio:</strong> {item.price}€</div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3 className="mt-3">Total: {totalPrice}€</h3>
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
