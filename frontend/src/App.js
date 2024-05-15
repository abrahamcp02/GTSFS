import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Store from './components/Store';
import Information from './components/Information';
import TheatricalPerformances from './components/TheatricalPerformances';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import PerformanceDetails from './components/PerformanceDetails';
import NewsDetails from './components/NewsDetails';
import SeatConfiguration from './components/SeatConfiguration';
import SeatSelectionPage from './components/SeatSelectionPage';
import SeatPriceConfiguration from './components/SeatPriceConfiguration';
import TheaterSelection from './components/TheaterSelection';
import PrivateRoute from './components/PrivateRoute';
import Cart from './components/Cart';
import { UserProvider } from './context/UserContext';
import MyTickets from './components/MyTickets';
import EventDetails from './components/EventCard';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';
import CreateProduct from './components/CreateProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <NavBar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<Store />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/news/:newsId" element={<NewsDetails />} />
              <Route path="/information" element={<Information />} />
              <Route path="/performances" element={<TheatricalPerformances />} />
              <Route path="/performances/:performanceId" element={<PerformanceDetails />} />
              <Route path="/select-seats/:performanceId" element={<SeatSelectionPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/theater-selection" element={<TheaterSelection />} />
              <Route path="/configure-seats/:theaterId" element={<SeatConfiguration />} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/configure-seat-prices/:performanceId/:theaterId" element={<SeatPriceConfiguration />} />
              <Route path="/my-tickets" element={<MyTickets />} />
              <Route path="/event-details/:performanceId" element={<EventDetails />} />
              <Route path="/edit-product/:productId" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
              <Route path="/delete-product/:productId" element={<PrivateRoute><DeleteProduct /></PrivateRoute>} />
              <Route path="/create-product" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </UserProvider>
      </div>
    </Router>
  );
};

export default App;
