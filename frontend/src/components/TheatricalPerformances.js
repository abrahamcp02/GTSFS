import React, { useState, useEffect } from 'react';
import PerformanceList from './PerformanceList'; // Componente para listar funciones

const TheatricalPerformances = () => {
    const [performances, setPerformances] = useState([]);

    useEffect(() => {
        // Simular la carga de funciones desde una API
        fetch('/api/performances')
            .then(response => response.json())
            .then(data => setPerformances(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Funciones Teatrales</h1>
            <PerformanceList performances={performances} />
        </div>
    );
};

export default TheatricalPerformances;
