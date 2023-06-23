import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export const CartItem = (props) => {
    const { code, name, price, image } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(
        ShopContext
    );

    return (
        <div className="cartItem">
            <img src={image} alt={name} />
            <div className="description">
                <p>
                    <b>{name}</b>
                </p>
                <p>Price: ${price}</p>
                <div className="countHandler">
                    <button onClick={() => removeFromCart(code)}>-</button>
                    <input
                        value={cartItems.find((item) => item.code === code)?.quantity || 0}
                        onChange={(e) => updateCartItemCount(Number(e.target.value), code)}
                    />
                    <button onClick={() => addToCart(code)}>+</button>
                </div>
            </div>
        </div>
    );
};
