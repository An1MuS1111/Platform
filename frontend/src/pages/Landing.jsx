

import '@styles/pages/Landing.css';
import ProductCard from '@components/ProductCard';
import Navbar from '@components/Navbar';
import { useFetch } from '@hooks/useFetch';

const Landing = () => {
    const { isLoading, apiData, serverError } = useFetch('http://localhost:4444/products');

    return (
        <div className="landing__container">
            <Navbar />
            <div className="sidebar"></div>
            <div className="main"></div>
            <div className="productlist__container">
                {isLoading && <div>Loading...</div>}
                {serverError && <div>Error: {serverError.message}</div>}
                {apiData && Array.isArray(apiData) && apiData.length > 0 ? (
                    apiData.map((item, index) => (
                        <ProductCard
                            key={index}
                            product_name={item.product_name}
                            product_type={item.product_type}
                            product_cost_subtotal={item.product_cost_subtotal}
                        />
                    ))
                ) : (
                    !isLoading && <div>No products available</div>
                )}
            </div>
        </div>
    );
};

export default Landing;
