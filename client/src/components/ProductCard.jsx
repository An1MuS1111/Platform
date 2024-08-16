
import { Card } from "@/ui-components/ui/card"
import { Button } from "@/ui-components/ui/button"
import { useState } from "react"

export default function ProductCard({ product }) {




    const [hidden, setHidden] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        )
    }

    return (
        <Card className="max-w-sm mx-auto w-full mb-1">
            <div onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)} className="max-w-sm mx-auto">
                <div className="relative">

                    <img src={`http://localhost:4444/${product.images[currentIndex]}`} alt={product.name} className="w-full h-auto" />

                    <HeartIcon className="absolute top-4 right-4 h-6 w-6" />
                    <ChevronLeftIcon
                        onClick={prevImage}
                        style={{ opacity: hidden ? "0" : "100", cursor: "pointer" }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-6 bg-white"
                    />
                    <ChevronRightIcon
                        onClick={nextImage}
                        style={{ opacity: hidden ? "0" : "100", cursor: "pointer" }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-6 bg-white"
                    />
                </div>
                <div className="flex items-center justify-center space-x-2 py-4">
                    <CircleIcon className="h-3 w-3" />
                    <CircleIcon className="h-3 w-3" />
                    <CircleIcon className="h-3 w-3" />
                    <CircleIcon className="h-3 w-3" />
                    <Button variant="ghost" className="text-sm">
                        + More
                    </Button>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold px-1">{product.name}</h3>
                    <p className="text-xl font-bold">{`$${product.price}`}</p>
                </div>
            </div>
        </Card>
    )
}

function ChevronLeftIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}


function ChevronRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}


function CircleIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
}


function HeartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}