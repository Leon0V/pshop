import { useLocation } from 'react-router-dom';
export default function Navbar() {

    const location = useLocation();
    const { pathname } = location;

    return (
        <header>
            <div class="px-3 py-2 text-bg-dark border-bottom">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                        </a>
                        <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <li>
                                <a href="/" class="nav-link text-secondary">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"></svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"></svg>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/orders" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"></svg>
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a href="/shop" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"></svg>
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="/login" class="nav-link text-white">
                                    <svg class="bi d-block mx-auto mb-1" width="24" height="24"></svg>
                                    Customer Area
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="px-3 py-2 border-bottom mb-3">
                <div class="container d-flex flex-wrap justify-content-center">
                    <div class="text-end">
                        {pathname !== '/login' && (
                            <a href="/login">
                                <button type="button" className="btn btn-light text-dark me-2">
                                    Login
                                </button>
                            </a>
                        )}
                        {pathname !== '/register' && (
                            <a href="/register">
                                <button type="button" class="btn btn-primary">Sign-up</button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}