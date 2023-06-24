import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const data = window.localStorage.getItem("cart");
        if (data !== null) {
            setCartItems(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((products) => setProducts(products));
    }, []);

    const updateCartItems = (items) => {
        setCartItems(items);
        window.localStorage.setItem("cart", JSON.stringify(items));
    };

    const addToCart = (code) => {
        if (products.length === 0) {
            return;
        }

        const existingItem = cartItems.find((item) => item.code === code);

        if (existingItem) {
            const updatedItems = cartItems.map((item) => {
                if (item.code === code) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            updateCartItems(updatedItems);
        } else {
            updateCartItems([...cartItems, { code, quantity: 1 }]);
        }
    };

    const removeFromCart = (code) => {
        if (products.length === 0) {
            return;
        }

        const updatedItems = cartItems.map((item) => {
            if (item.code === code) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        const filteredItems = updatedItems.filter((item) => item.quantity > 0);
        updateCartItems(filteredItems);
    };

    const updateCartItemCount = (newAmount, code) => {
        if (products.length === 0) {
            return;
        }

        const updatedItems = cartItems.map((item) => {
            if (item.code === code) {
                return { ...item, quantity: newAmount };
            }
            return item;
        });

        updateCartItems(updatedItems);
    };

    const checkout = () => {
        updateCartItems([]);
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item of cartItems) {
            const itemInfo = products.find((product) => product.code === item.code);
            if (itemInfo) {
                totalAmount += item.quantity * itemInfo.price;
            }
        }
        return totalAmount;
    };

    return (
        <ShopContext.Provider
            value={{
                products,
                cartItems,
                addToCart,
                updateCartItemCount,
                removeFromCart,
                checkout,
                getTotalCartAmount,
            }}
        >
            {props.children}
        </ShopContext.Provider>
    );
};
