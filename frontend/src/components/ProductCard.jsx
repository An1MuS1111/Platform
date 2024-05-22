import '@styles/components/ProductCard.css'
import { useState } from 'react'

const ProductCard = () => {

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
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductCard