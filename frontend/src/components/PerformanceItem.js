import React from 'react';

const PerformanceItem = ({ performance }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
            <h3>{performance.title}</h3>
            <p>{performance.date}</p>
            <p>{performance.venue}</p>
            <button>Comprar Entradas</button>
        </div>
    );
};

export default PerformanceItem;
