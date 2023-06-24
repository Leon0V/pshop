import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { CartItem } from "../cart/Cart-Item";

export default function Orders() {
    const { cartItems, getTotalCartAmount, products } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary">Your cart</span>
                    <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                </h4>
                <ul className="list-group mb-3">
                    {cartItems.map((item) => {
                        const product = products.find((p) => p.code === item.code);
                        return product ? (
                            <CartItem key={product.code} data={{ ...product, quantity: item.quantity }} />
                        ) : null;
                    })}
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>${totalAmount.toFixed(2)}</strong>
                    </li>
                </ul>
                <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
            </div>
        </div>
    );
}
