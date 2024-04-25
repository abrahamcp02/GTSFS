// Asegúrate de que `fetchProductById` esté implementado correctamente para obtener los datos del producto.
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/apiService';
import './ProductDetails.css'; // Crea este archivo CSS para los estilos.

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProductById(productId);
        console.log(response.data);
        setProduct(response.data); // Axios envuelve la respuesta en el objeto `data`.
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-ref">Referencia {product.reference}</p>
        <p className="product-price">{product.price} €</p>
        <p className="product-description">{product.description}</p>
        <div className="product-size-quantity">
          <div className="product-size">
            {/* Aquí agregarías el componente o lógica para seleccionar la talla */}
          </div>
          <div className="product-quantity">
            {/* Aquí agregarías el componente o lógica para seleccionar la cantidad */}
          </div>
        </div>
        <button className="add-to-cart-button">Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductDetails;
