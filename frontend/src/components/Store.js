import React, { useState, useEffect } from 'react';
import ProductList from './ProductList'; // Componente para listar productos
import ShoppingCart from './ShoppingCart'; // Componente para el carrito de compras


const Store = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Simular la carga de productos desde una API
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Tienda de Merchandising</h1>
            <ProductList products={products} />
            <ShoppingCart />
        </div>
    );
};

export default Store;
