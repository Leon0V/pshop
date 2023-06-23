import stockEcomm from '../../assets/images/stockEcomm.png';
import Products from '../../components/products/Products';

export default function Shop() {
    return (
        <main>
            <div className="container marketing">
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">Pet Shop E-Comm <span className="text-body-secondary">Shopping made easy</span></h2>
                        <p className="lead">Check out our wares!</p>
                    </div>
                    <div className="col-md-5">
                        <img src={stockEcomm} alt="Stock Ecommerce" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="150" height="150" />
                    </div>
                </div>
            </div>
            <div>
                <Products />
            </div>
        </main>
    );
}
