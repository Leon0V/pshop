import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export const CartItem = (props) => {
    const { code, name, price, avatar, quantity } = props.data;
    const { addToCart, removeFromCart, updateCartItemCount } = useContext(
        ShopContext
    );

    const getImageUrl = (avatar) => {
        if (avatar.startsWith("data:image")) {
            return avatar;
        } else {
            return `data:image/jpeg;base64,${avatar}`;
        }
    };

    return (
        <div className="cartItem">
            <img src={getImageUrl(avatar)} alt={name} width="75" height="75" />
            <div className="description">
                <p>
                    <b>{name}</b>
                </p>
                <p>Price: ${price}</p>
                <div className="countHandler">
                    <div className="input-group">
                        <button className="btn btn-secondary" onClick={() => removeFromCart(code)}>-</button>
                        <input
                            type="text"
                            className="form-control"
                            value={quantity}
                            onChange={(e) => updateCartItemCount(Number(e.target.value), code)}
                        />
                        <button className="btn btn-secondary" onClick={() => addToCart(code)}>+</button>
                    </div>
                </div>

            </div>
        </div>
    );
};
