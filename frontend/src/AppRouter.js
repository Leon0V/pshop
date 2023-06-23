import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Register from './components/register/Register';
import NotFound from './pages/error/Error';
import Shop from './pages/shop/Shop';
import Details from './components/details/ProductDetails';
import Orders from './components/orders/Orders';
import { Cart } from './components/cart/Cart';
import { ShopContextProvider } from './context/ShopContext';
function AppRouter() {
    return (
        <div>
            <ShopContextProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/shop' element={<Shop />} />
                        <Route path='/details/:code' element={<Details />} />
                        <Route path='*' element={<NotFound />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/cart' element={<Cart />} />
                    </Routes>
                    <Footer />
                </Router>
            </ShopContextProvider>


        </div>
    );
}

export default AppRouter;