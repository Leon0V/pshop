import { useState, useEffect, useContext } from 'react';
import Division from './Division';
import { ShopContext } from '../../context/ShopContext';

export default function Products(props) {
    const [products, setProducts] = useState([]);
    const { addToCart, cartItems } = useContext(ShopContext);
    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then((response) => response.json())
            .then((products) => setProducts(products));
    }, []);

    const getImageUrl = (product) => {
        if (product.avatar) {
            return `data:image/jpeg;base64,${product.avatar}`;
        } else {
            return product.image;
        }
    };

    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    const getCartItemAmount = (code) => {
        const cartItem = cartItems.find((item) => item.code === code);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className="container-fluid text-center">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category}>
                    <Division category={category} />
                    <div className="row">
                        {categoryProducts.map((product) => (
                            <div className="col-md-4" key={product.code}>
                                <div className="card">
                                    <img
                                        src={getImageUrl(product)}
                                        alt={product.name}
                                        className="card-img-center round img-detail mx-auto"
                                        width="175"
                                        height="175"
                                    />
                                    <div className="card-body">
                                        <h3 className="card-tile">{product.name}</h3>
                                        <p className="card-text">{product.description}</p>
                                        <h6>
                                            <p>Price: ${product.price}</p>
                                            <p>Category: {product.category}</p>
                                            <p>Animal: {product.animal}</p>
                                        </h6>
                                        <div className="container">
                                            <a href={`/details/${product.code}`}>
                                                <div className="btn btn-primary">Details</div>
                                            </a>
                                        </div>
                                        <div className="container">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => addToCart(product.code)}
                                            >
                                                Add to Cart {getCartItemAmount(product.code) > 0 && <>({getCartItemAmount(product.code)}) </>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
