// Asegúrate de importar useEffect y useState de React.
import React, { useEffect, useState } from 'react';
// useParams se utiliza para obtener el id del producto de la URL.
import { useParams } from 'react-router-dom';
// fetchProductById es la función que obtiene los datos del producto de tu API.
import { fetchProductById } from '../services/apiService';
// Asegúrate de tener el archivo CSS para estilos.
import './ProductDetails.css';

const ProductDetails = () => {
  // Obtiene el productId de la URL.
  const { productId } = useParams();
  // El estado del producto inicia como null y se actualizará con los datos del producto.
  const [product, setProduct] = useState(null);
  // Controla la visualización del indicador de carga.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect para llamar a la API cuando el componente se monta o cuando cambia productId.
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true); // Inicia la carga.
      try {
        const response = await fetchProductById(productId); // Llamada a la API.
        setProduct(response.data); // Actualiza el estado del producto.
      } catch (error) {
        console.error('Failed to fetch product:', error); // Manejo de errores.
      } finally {
        setIsLoading(false); // Finaliza la carga independientemente del resultado.
      }
    };

    fetchProductDetails(); // Invoca la función asincrónica.
  }, [productId]); // Depende del productId para reaccionar a los cambios de URL.

  // Renderiza mientras carga los datos.
  if (isLoading) return <div>Loading...</div>;

  // Si no se encontró el producto, renderiza esto.
  if (!product) return <div>Product not found</div>;

  console.log('Product in render:', product);

  // Renderizado condicional basado en el estado del producto.
  return (
    <div className="product-details-container">
      {product ? (  // Check if product is not null
        <React.Fragment> {/* Fragment to wrap multiple elements without adding extra nodes to the DOM */}
          <div className="product-image-container">
            {/* Access the first product in the array */}
            <img src={product[0].image} alt={product[0].name} className="product-image" />
          </div>
          <div className="product-info">
            {/* Access the properties of the first product in the array */}
            <h1 className="product-title">{product[0].name}</h1>
            <p className="product-price">{product[0].price} €</p>
            <p className="product-description">{product[0].description}</p>
          </div>
        </React.Fragment>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default ProductDetails;
