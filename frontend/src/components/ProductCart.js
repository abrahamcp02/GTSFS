import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductCart, purchaseProducts, removeFromProductCart } from '../services/apiProductCartService';
import { jwtDecode } from 'jwt-decode';
import ProcessingPopup from './ProcessingWindow'; // Importar el componente ProcessingPopup
import PaymentPopup from './PaymentWindow'; // Importar el componente PaymentPopup
import './styles/Cart.css';

const ProductCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
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
        const items = Array.isArray(response.data) ? response.data : [];
        const groupedItems = groupItemsByProduct(items);
        setCartItems(groupedItems);
        calculateTotalPrice(groupedItems);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const groupItemsByProduct = (items) => {
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.product_id]) {
        acc[item.product_id] = { ...item, quantity: 0 };
      }
      acc[item.product_id].quantity += 1;
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    setProcessingMessage('Procesando compra...');
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        await purchaseProducts(userId);
        navigate('/my-orders');
      }
    } catch (error) {
      console.error('Error purchasing products:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000); // Aumentar el tiempo a 3000 ms (3 segundos)
    }
  };

  const handleRemove = async (productId) => {
    setIsProcessing(true);
    setProcessingMessage('Eliminando producto del carrito...');
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const itemToRemove = cartItems.find(item => item.product_id === productId);
        if (itemToRemove.quantity > 1) {
          for (let i = 0; i < itemToRemove.quantity; i++) {
            await removeFromProductCart(userId, itemToRemove.itemId); // Removing one by one from the DB
          }
        } else {
          await removeFromProductCart(userId, itemToRemove.itemId);
        }
        fetchCart(); // Refrescar el carrito después de eliminar un artículo
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000); // Mantener el tiempo a 1000 ms (1 segundo) para la eliminación
    }
  };

  const handleOpenPaymentPopup = () => {
    setShowPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  const handlePayment = () => {
    handleClosePaymentPopup();
    handlePurchase();
  };

  return (
    <div className="cart container">
      <h2>Carrito de Productos</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="list-group">
            {cartItems.map(item => (
              <li key={item.product_id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div><strong>Producto:</strong> {item.name}</div>
                  <div><strong>Descripción:</strong> {item.description}</div>
                  <div><strong>Precio:</strong> {item.price}€</div>
                  <div><strong>Cantidad:</strong> {item.quantity}</div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.product_id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3 className="mt-3">Total: {totalPrice}€</h3>
          <button className="btn btn-primary mt-3" onClick={handleOpenPaymentPopup}>
            Comprar
          </button>
        </>
      ) : (
        <p>No hay artículos en el carrito.</p>
      )}
      {isProcessing && <ProcessingPopup message={processingMessage} />}
      {showPaymentPopup && <PaymentPopup onClose={handleClosePaymentPopup} onPayment={handlePayment} />}
    </div>
  );
};

export default ProductCart;
