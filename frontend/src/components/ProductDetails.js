import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { fetchProductById, addToProductCart } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';
import './styles/ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Inicializa useNavigate

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
      await addToProductCart(userId, product.id);
      console.log('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price} €</p>
        <p className="product-description">{product.description}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductDetails;
