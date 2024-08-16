
import { Card } from "@/ui-components/ui/card"
import { Button } from "@/ui-components/ui/button"
import { useState } from "react"

export default function ProductCard() {

    const [hidden, setHidden] = useState(true)

    return (
        <Card className="max-w-sm mx-auto w-full mb-1">
            <div onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)} className="max-w-sm mx-auto">
                <div className="relative">
                    {/* <img src="barrett-3-seat-queen-reversible-sleeper-sectional.jpg" alt="Axis Bench 2-Piece Sectional Sofa" className="w-full h-auto" /> */}
                    <img src="http://localhost:4444/uploads/file-1723783722049-861202159.png" alt="Axis Bench 2-Piece Sectional Sofa" className="w-full h-auto" />

                    <HeartIcon className="absolute top-4 right-4 h-6 w-6" />
                    <ChevronLeftIcon style={{ opacity: hidden ? "0" : "100" }} className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-6 bg-white" />
                    <ChevronRightIcon style={{ opacity: hidden ? "0" : "100" }} className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-6 bg-white" />
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
                    <h3 className="text-lg font-semibold px-1">Axis Bench 2-Piece Sectional Sofa</h3>
                    <p className="text-xl font-bold">$3,498.00</p>
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