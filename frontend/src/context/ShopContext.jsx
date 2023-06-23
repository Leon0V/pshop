import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const data = window.localStorage.getItem("cart");
        if (data !== null) setCartItems(JSON.parse(data));
        console.log('data', data)
        console.log("cart");
    }, []);

    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((response) => response.json())
            .then((products) => setProducts(products));
    }, []);

    const addToCart = (code) => {
        if (products.length === 0) {
            return;
        }

        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.code === code);

            if (existingItem) {
                return prev.map((item) => {
                    if (item.code === code) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
            } else {
                return [...prev, { code, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (code) => {
        if (products.length === 0) {
            return;
        }

        setCartItems((prev) => {
            const updatedItems = [...prev];
            const existingItem = updatedItems.find((item) => item.code === code);

            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity <= 0) {
                    const index = updatedItems.indexOf(existingItem);
                    updatedItems.splice(index, 1);
                }
            }

            return updatedItems;
        });
    };

    const updateCartItemCount = (newAmount, code) => {
        if (products.length === 0) {
            return;
        }

        setCartItems((prev) => {
            const updatedItems = [...prev];
            const existingItem = updatedItems.find((item) => item.code === code);

            if (existingItem) {
                existingItem.quantity = newAmount;
            }

            return updatedItems;
        });
    };

    const checkout = () => {
        setCartItems([]);
    };

    const contextValue = {
        cartItems,
        addToCart,
        updateCartItemCount,
        removeFromCart,
        checkout,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
