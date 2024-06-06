import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/apiService';
import { addToProductCart } from '../services/apiProductCartService';
import { jwtDecode } from 'jwt-decode';
import { Form, InputGroup, Button, Modal } from 'react-bootstrap';
import './styles/ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProductById(productId);
        setProduct(response.data[0]); // Suponiendo que la respuesta es un array con un solo producto
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirige a la página de login si el usuario no está autenticado
        navigate('/login');
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;
      await addToProductCart(userId, product.id, quantity); // Send quantity
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          onClick={handleImageClick} // Click handler for image
        />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price} €</p>
        <p className="product-description">{product.description}</p>
        <InputGroup className="mb-3">
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
          />
          <Button variant="primary" onClick={handleAddToCart}>
            Añadir al carrito
          </Button>
        </InputGroup>
      </div>

      {/* Modal for enlarged image */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          <img src={product.image} alt={product.name} className="product-image-large" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetails;
