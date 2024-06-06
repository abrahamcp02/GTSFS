import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './styles/OrderCard.css'; // Asegúrate de tener estilos para este componente

const OrderCard = ({ dateTime, orders }) => {
  const productCount = orders.reduce((acc, order) => {
    if (!acc[order.product_id]) {
      acc[order.product_id] = { ...order, quantity: 0 };
    }
    acc[order.product_id].quantity += 1;
    return acc;
  }, {});

  const products = Object.values(productCount);

  const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="order-card card mb-4">
      <div className="card-header">
        <h5>Orden No. {orders[0].order_number}</h5> {/* Muestra el número de orden */}
      </div>
      <div className="card-body">
        <Carousel indicators={false} controls={products.length > 1}>
          {products.map((product, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex flex-column align-items-center">
                <img src={product.image} alt={product.name} className="product-image" /> {/* Muestra la imagen del producto */}
                <div><strong>Producto:</strong> {product.name}</div>
                <div><strong>Descripción:</strong> {product.description}</div>
                <div><strong>Precio:</strong> {product.price}€</div>
                <div><strong>Cantidad:</strong> {product.quantity}</div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="total-price">
          <strong>Total de la compra:</strong> {totalPrice}€
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">Fecha y hora de compra: {dateTime}</small>
      </div>
    </div>
  );
};

export default OrderCard;
