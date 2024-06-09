import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { fetchPerformanceById } from '../services/apiPerformanceService';
import ReactPlayer from 'react-player';
import './styles/PerformanceDetails.css';

const PerformanceDetails = () => {
  const { performanceId } = useParams();
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPerformanceById(performanceId);
        setPerformance(response.data);
      } catch (error) {
        console.error('Failed to fetch performance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformanceDetails();
  }, [performanceId]);

  const handleBuyTickets = () => {
    navigate(`/select-seats/${performanceId}`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!performance) return <div>Performance not found</div>;

  console.log('Performance in render:', performance);

  return (
    <div className="performance-details-container">
      {performance ? (
        <React.Fragment> {}
          <div className="performance-image-container">
            {}
            <img src={performance[0].image} alt={performance[0].title} className="performance-image" />
          </div>
          <div className="performance-info">
            {}
            <h1 className="performance-title">{performance[0].title}</h1>
            <p className="performance-date">{performance[0].date} </p>
            <p className="performance-description">{performance[0].description}</p>
            <div className="performance-buy">
              <button type="button" class="btn btn-primary" onClick={handleBuyTickets}>Comprar entradas</button>
            </div>
            <div className="ratio ratio-16x9">
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
