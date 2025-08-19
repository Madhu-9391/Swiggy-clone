import './App.css';
import Cart from './components/Cart'; 
import Header from './components/Header';
import Parts from './components/Parts';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function AppLayout() {
  const location = useLocation();
  const hideLayoutRoutes = ['/swiggy/login', '/swiggy/register','/swiggy/cart'];  // routes without Header/Footer/Parts
  const isMinimalLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="App1">
      {!isMinimalLayout && <Header />}

      <Routes>
        <Route path="/swiggy/login" element={<Login />} />
        <Route path="/swiggy/register" element={<Register />} />
        <Route path="/swiggy/cart" element={<Cart/>}/>
        {/* Add more routes here */}
      </Routes>

      {!isMinimalLayout && <Parts />}
      {!isMinimalLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
