// Asegúrate de importar useEffect y useState de React.
import React, { useEffect, useState } from 'react';
// useParams se utiliza para obtener el id del espectáculo de la URL.
import { useParams } from 'react-router-dom';
// fetchperformanceById es la función que obtiene los datos del espectáculo de tu API.
import { fetchPerformanceById } from '../services/apiPerformanceService';
import ReactPlayer from 'react-player';
// Asegúrate de tener el archivo CSS para estilos.
import './PerformanceDetails.css';

const PerformanceDetails = () => {
  // Obtiene el performanceId de la URL.
  const { performanceId } = useParams();
  // El estado del espectáculo inicia como null y se actualizará con los datos del espectáculo.
  const [performance, setPerformance] = useState(null);
  // Controla la visualización del indicador de carga.
  const [isLoading, setIsLoading] = useState(true);

  // useEffect para llamar a la API cuando el componente se monta o cuando cambia performanceId.
  useEffect(() => {
    const fetchPerformanceDetails = async () => {
      setIsLoading(true); // Inicia la carga.
      try {
        const response = await fetchPerformanceById(performanceId); // Llamada a la API.
        setPerformance(response.data); // Actualiza el estado del espectáculo.
      } catch (error) {
        console.error('Failed to fetch performance:', error); // Manejo de errores.
      } finally {
        setIsLoading(false); // Finaliza la carga independientemente del resultado.
      }
    };

    fetchPerformanceDetails(); // Invoca la función asincrónica.
  }, [performanceId]); // Depende del performanceId para reaccionar a los cambios de URL.

  // Renderiza mientras carga los datos.
  if (isLoading) return <div>Loading...</div>;

  // Si no se encontró el espectáculo, renderiza esto.
  if (!performance) return <div>Performance not found</div>;

  console.log('Performance in render:', performance);

  // Renderizado condicional basado en el estado del espectáculo.
  return (
    <div className="performance-details-container">
      {performance ? (  // Check if performance is not null
        <React.Fragment> {/* Fragment to wrap multiple elements without adding extra nodes to the DOM */}
          <div className="performance-image-container">
            {/* Access the first performance in the array */}
            <img src={performance[0].image} alt={performance[0].title} className="performance-image" />
          </div>
          <div className="performance-info">
            {/* Access the properties of the first performance in the array */}
            <h1 className="performance-title">{performance[0].title}</h1>
            <p className="performance-date">{performance[0].date} </p>
            <p className="performance-description">{performance[0].description}</p>
            <div className="performance-video">
              <ReactPlayer
                url={performance[0].video}
                controls
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div>performance not found</div>
      )}
    </div>
  );
};

export default PerformanceDetails;
