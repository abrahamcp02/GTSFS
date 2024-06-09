import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';


const Store = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Tienda de Merchandising</h1>
            <ProductList products={products} />
        </div>
    );
};

export default Store;
