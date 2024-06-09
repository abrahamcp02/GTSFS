import React, { useState, useEffect } from 'react';
import PerformanceList from './PerformanceList';

const TheatricalPerformances = () => {
    const [performances, setPerformances] = useState([]);

    useEffect(() => {
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
