import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
    const { code } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const getImageUrl = (selectedProduct) => {
        if (selectedProduct.avatar) {
            return `data:image/jpeg;base64,${selectedProduct.avatar}`;
        } else {
            return selectedProduct.image;
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                if (!code) {
                    navigate('/notfound');
                    return;
                }

                const response = await fetch(`http://localhost:3001/products`);
                const products = await response.json();
                const product = products.find((p) => p.code.toString() === code);

                if (!product) {
                    navigate('/notfound');
                    return;
                }

                setSelectedProduct(product);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [code, navigate]);

    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{selectedProduct.name}</h1>

            <div className="card">
                <div>
                    <img src={getImageUrl(selectedProduct)} alt={selectedProduct.name} className="custom-img" width="175"
                        height="175" />
                </div>
                <div className="card-body">
                    <h5 className="card-tile">{selectedProduct.name}</h5>
                    <h6>
                        <p>{selectedProduct.description}</p>
                        <p>Price: ${selectedProduct.price}</p>
                        <p>Category: {selectedProduct.category}</p>
                        <p>Animal: {selectedProduct.animal}</p>
                    </h6>
                    <div>
                        <p>Comments:</p>
                        <ul>
                            {selectedProduct.comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
