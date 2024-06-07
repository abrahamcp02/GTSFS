import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Store from './components/Store';
import TheatricalPerformances from './components/TheatricalPerformances';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import ProductCart from './components/ProductCart';
import PerformanceDetails from './components/PerformanceDetails';
import NewsDetails from './components/NewsDetails';
import SeatConfiguration from './components/SeatConfiguration';
import SeatSelectionPage from './components/SeatSelectionPage';
import SeatPriceConfiguration from './components/SeatPriceConfiguration';
import TheaterSelection from './components/TheaterSelection';
import EditPerformance from './components/EditPerformance';
import EditProduct from './components/EditProduct';
import CreatePerformance from './components/CreatePerformance';
import CreateProduct from './components/CreateProduct';
import DeletePerformance from './components/DeletePerformance';
import DeleteProduct from './components/DeleteProduct';
import Cart from './components/Cart';
import MyTickets from './components/MyTickets';
import EventDetails from './components/EventCard';
import MyOrders from './components/MyOrders';
import CreateNews from './components/CreateNews';
import EditNews from './components/EditNews';
import DeleteNews from './components/DeleteNews';
import { UserProvider } from './context/UserContext';
import AuthWrapper from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <NavBar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<Store />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/product-cart" element={<AuthWrapper><ProductCart /></AuthWrapper>} />
              <Route path="/news/:newsId" element={<NewsDetails />} />
              <Route path="/performances" element={<TheatricalPerformances />} />
              <Route path="/performances/:performanceId" element={<PerformanceDetails />} />
              <Route path="/select-seats/:performanceId" element={<SeatSelectionPage />} />
              <Route path="/theater-selection" element={<AuthWrapper><TheaterSelection /></AuthWrapper>} />
              <Route path="/configure-seats/:theaterId" element={<AuthWrapper adminOnly={true}><SeatConfiguration /></AuthWrapper>} />
              <Route path="/cart" element={<AuthWrapper><Cart /></AuthWrapper>} />
              <Route path="/configure-seat-prices/:performanceId/:theaterId" element={<AuthWrapper adminOnly={true}><SeatPriceConfiguration /></AuthWrapper>} />
              <Route path="/my-tickets" element={<AuthWrapper><MyTickets /></AuthWrapper>} />
              <Route path="/event-details/:performanceId" element={<EventDetails />} />
              <Route path="/edit-performance/:performanceId" element={<AuthWrapper adminOnly={true}><EditPerformance /></AuthWrapper>} />
              <Route path="/edit-product/:productId" element={<AuthWrapper adminOnly={true}><EditProduct /></AuthWrapper>} />
              <Route path="/edit-news/:newsId" element={<AuthWrapper adminOnly={true}><EditNews /></AuthWrapper>} />
              <Route path="/create-performance" element={<AuthWrapper adminOnly={true}><CreatePerformance /></AuthWrapper>} />
              <Route path="/create-product" element={<AuthWrapper adminOnly={true}><CreateProduct /></AuthWrapper>} />
              <Route path="/create-news" element={<AuthWrapper adminOnly={true}><CreateNews /></AuthWrapper>} />
              <Route path="/delete-product/:productId" element={<AuthWrapper adminOnly={true}><DeleteProduct /></AuthWrapper>} />
              <Route path="/delete-news/:newsId" element={<AuthWrapper adminOnly={true}><DeleteNews /></AuthWrapper>} />
              <Route path="/delete-performance/:performanceId" element={<AuthWrapper adminOnly={true}><DeletePerformance /></AuthWrapper>} />
              <Route path="/my-orders" element={<AuthWrapper><MyOrders /></AuthWrapper>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
