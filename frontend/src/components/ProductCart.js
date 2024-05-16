import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductCart, purchaseProducts, removeFromProductCart } from '../services/apiProductCartService';
import {jwtDecode} from 'jwt-decode';
import './Cart.css'; // Puedes reutilizar los estilos del carrito

const ProductCart = () => {
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
        const response = await getProductCart(userId);
        console.log('Response data:', response.data); // Log para ver los datos recibidos
        const items = Array.isArray(response.data) ? response.data : [];
        setCartItems(items);
        calculateTotalPrice(items);
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
        await purchaseProducts(userId);
        alert('Productos comprados exitosamente');
        navigate('/my-products');
      }
    } catch (error) {
      console.error('Error purchasing products:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        await removeFromProductCart(userId, itemId);
        fetchCart(); // Refrescar el carrito después de eliminar un artículo
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart container">
      <h2>Carrito de Productos</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="list-group">
            {cartItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div><strong>Producto:</strong> {item.name}</div>
                  <div><strong>Descripción:</strong> {item.description}</div>
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

export default ProductCart;
