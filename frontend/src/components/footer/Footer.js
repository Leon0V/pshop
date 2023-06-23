export default function Footer() {
    return (
        <div class="container">
            <footer class="py-3 my-4">
                <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    <li class="nav-item"><a href="/" class="nav-link px-2 text-body-secondary">Home</a></li>
                    <li class="nav-item"><a href="/about" class="nav-link px-2 text-body-secondary">About</a></li>
                    <li class="nav-item"><a href="/orders" class="nav-link px-2 text-body-secondary">Orders</a></li>
                    <li class="nav-item"><a href="/shop" class="nav-link px-2 text-body-secondary">Products</a></li>
                    <li class="nav-item"><a href="/login" class="nav-link px-2 text-body-secondary">Customer Area</a></li>
                </ul>
                <p class="text-center text-body-secondary">© 2023 Company, Inc</p>
            </footer>
        </div>
    );
}