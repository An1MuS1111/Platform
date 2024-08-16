
import { Input } from "@/ui-components/ui/input"
import { Progress } from "@/ui-components/ui/progress"
import { Checkbox } from "@/ui-components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/ui-components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui-components/ui/accordion"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/ui-components/ui/pagination"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"
import { ScrollArea } from "@/ui-components/ui/scroll-area"
import { useState } from "react"

export default function Component() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white">
            <div className="flex justify-between items-center p-4 bg-[#f8f8f8]">
                <div className="flex items-center space-x-4">
                    {/* <MenuIcon className="w-6 h-6" /> */}
                    <h1 className="text-xl font-bold">Platform</h1>
                    <nav className="flex space-x-4">

                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Input type="search" placeholder="Search product..." className="w-64" />
                    <UserIcon className="w-6 h-6" />
                    <ShoppingCartIcon className="w-6 h-6" />
                </div>
            </div>
            <div className="flex">
                <ScrollArea className="h-screen w-70 rounded-md border-none">
                    <aside className="w-75 p-4 space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold">Categories</h2>
                            <nav className="space-y-1">


                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1 " >
                                        <div className="flex items-center justify-between" ><button>Bags</button>
                                            <AccordionTrigger></AccordionTrigger></div>
                                        <AccordionContent>
                                            <button>Sub Bag 1</button>
                                        </AccordionContent>
                                    </AccordionItem>

                                </Accordion>

                                {/* ends here */}


                            </nav>

                            {/* Here ends */}
                            <h2 className="text-lg font-bold">Price</h2>
                            <div className="flex space-x-2">
                                <Input placeholder="Minimum Price" className="w-3/4" />
                                <div className="flex items-center">$</div>
                            </div>
                            <div className="flex space-x-2">
                                <Input placeholder="Maximum Price" className="w-3/4" />
                                <div className="flex items-center">$</div>
                            </div>
                            <div className="flex justify-between">
                                <span>$88</span>
                                <span>$200</span>
                            </div>
                            <Progress value={50} className="w-full" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold">Location</h2>
                            <div className="space-y-1 bg-gray-100 p-4 rounded-md">
                                <Checkbox id="jakarta" className="flex items-center space-x-2">
                                    <div className="w-4 h-4 rounded-md bg-white border border-gray-300 flex items-center justify-center">
                                        <CheckIcon className="w-3 h-3 text-white" />
                                    </div>
                                    <label htmlFor="jakarta" className="text-sm text-gray-700">
                                        DKI Jakarta
                                    </label>
                                </Checkbox>
                                <Checkbox id="jabodetabek" className="flex items-center space-x-2">
                                    <div className="w-4 h-4 rounded-md bg-white border border-gray-300 flex items-center justify-center">
                                        <CheckIcon className="w-3 h-3 text-white" />
                                    </div>
                                    <label htmlFor="jabodetabek" className="text-sm text-gray-700">
                                        Jabodetabek
                                    </label>
                                </Checkbox>
                                <Checkbox id="bandung" className="flex items-center space-x-2">
                                    <div className="w-4 h-4 rounded-md bg-white border border-gray-300 flex items-center justify-center">
                                        <CheckIcon className="w-3 h-3 text-white" />
                                    </div>
                                    <label htmlFor="bandung" className="text-sm text-gray-700">
                                        Bandung
                                    </label>
                                </Checkbox>
                                <Checkbox id="medan" className="flex items-center space-x-2">
                                    <div className="w-4 h-4 rounded-md bg-white border border-gray-300 flex items-center justify-center">
                                        <CheckIcon className="w-3 h-3 text-white" />
                                    </div>
                                    <label htmlFor="medan" className="text-sm text-gray-700">
                                        Medan
                                    </label>
                                </Checkbox>
                                <Checkbox id="surabaya" className="flex items-center space-x-2">
                                    <div className="w-4 h-4 rounded-md bg-white border border-gray-300 flex items-center justify-center">
                                        <CheckIcon className="w-3 h-3 text-white" />
                                    </div>
                                    <label htmlFor="surabaya" className="text-sm text-gray-700">
                                        Surabaya
                                    </label>
                                </Checkbox>
                            </div>

                        </div>
                    </aside>
                </ScrollArea >
                <main className="flex-1 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">New Featured (216 Products)</h2>


                        <div className="flex items-center space-x-2">
                            <span className="text-sm">Sort by:</span>
                            <Select>
                                <SelectTrigger id="sort">
                                    <SelectValue placeholder="Newest Product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* <SelectItem value="newest">Newest Product</SelectItem> */}
                                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-0">
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
                    {/* Here goes the pagination     */}
                    <div className="flex justify-center mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </main>
            </div>
        </div>
    )
}

function CheckIcon(props) {
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}


function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function ShoppingCartIcon(props) {
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
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}


function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

function ChevronDownIcon(props) {
    return (
        <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
        </svg>
    );
}
