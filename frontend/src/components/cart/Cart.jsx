import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

import { CartItem } from "./Cart-Item";
import { useNavigate } from "react-router-dom";

import "./cart.css";

export const Cart = () => {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount;
    const navigate = useNavigate();
    return (
        <div className="cart">
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className="cart-items">
                {cartItems.map((cartItem) => (
                    <CartItem key={cartItem.code} data={cartItem} />
                ))}
            </div>
            {totalAmount > 0 ? (
                <div className="checkout">
                    <p>Subtotal: ${totalAmount}</p>
                    <button onClick={() => navigate("/")}>Continue Shopping</button>
                    <button
                        onClick={() => {
                            checkout();
                            navigate("/checkout");
                        }}
                    >
                        Checkout
                    </button>
                </div>
            ) : (
                <h1>Your Shopping Cart is Empty</h1>
            )}
        </div>
    );
};