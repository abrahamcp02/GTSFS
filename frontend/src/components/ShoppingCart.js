import React from 'react';

const ShoppingCart = () => {
    // Supongamos que 'cartItems' es un estado que viene desde arriba o se maneja aquí
    const cartItems = [];

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.quantity} x €{item.price}
                            <button onClick={() => console.log('Eliminar del carrito')}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShoppingCart;
