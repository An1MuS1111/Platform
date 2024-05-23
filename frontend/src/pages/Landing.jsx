import '@styles/pages/Landing.css'
import ProductCard from '@components/ProductCard'

const Landing = () => {
    return (
        <>
            <div className="landing__container"><div className="navbar"></div>
                <div className="sidebar"></div>
                <div className="main"></div>
                <div className="productlist__container">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />



                    <ProductCard />

                    <ProductCard />


                </div>
            </div>

        </>
    )
}

export default Landing