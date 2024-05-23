import '@styles/components/ProductCard.css'
import { useState } from 'react'

const ProductCard = ({ product_name, product_type, product_cost_subtotal }) => {



    // set it "false" for testing
    const [hidden, setHidden] = useState(true)
    return (
        <>
            <div className="productcard__container">
                <div className="outer__canvas" >
                    <div onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)} className="inner__canvas">

                        <img width="100%" src="images/barrett-3-seat-queen-reversible-sleeper-sectional.jpg" alt="" />
                        <span className="left__icon" style={{ opacity: hidden ? "0" : "100" }}>
                            <img src="images/left-arrow.png" alt="" />
                        </span>
                        <span className="right__icon" style={{ opacity: hidden ? "0" : "100" }}>
                            <img src="images/right-arrow.png" alt="" />
                        </span>
                    </div> {/* inner__cnvas */}

                    <div className='product__details'>
                        {/* <p className='product__type'>{product_type}</p>
                        <p className='product__name'>{product_name}</p> */}

                        <p className='product__type'>PRODUCT TYPE</p>
                        <p className='product__name'>Duffle bag size extra large with slight red strip</p>
                    </div>

                    <div className="product__info">
                        <div className="price__section">
                            <p className='price__tag'>PRICE</p>
                            {/* <p>$ {product_cost_subtotal}</p> */}
                            <p>$ 120.09</p>
                        </div>

                        <div className="cart__section"><img src="images/shopping-bag.png" alt="" className="cart__icon" /></div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProductCard