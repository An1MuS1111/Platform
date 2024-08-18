
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui-components/ui/dropdown-menu"
import { Button } from "@/ui-components/ui/button"


import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/ui-components/ui/pagination"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"
import { ScrollArea } from "@/ui-components/ui/scroll-area"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios, { isCancel } from 'axios'
import { useAuth } from "@/auth/AuthProvider"
// import Navbar from "@/components/Navbar"

export default function Landing() {


    const [isOpen, setIsOpen] = useState(false);
    const [productCategories, setProductCategories] = useState([]);
    const [productSubcategories, setProductSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });
    const { name } = user
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Function to fetch products based on query params
        const fetchProducts = async () => {
            const query = new URLSearchParams({
                category_id: categoryId || '',
                sub_category_id: subCategoryId || '',
                min_price: minPrice || '',
                max_price: maxPrice || '',
                search: search || '',
                page: currentPage,
            }).toString();

            try {
                const response = await axios.get(`http://localhost:4444/products?${query}`);
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [categoryId, subCategoryId, minPrice, maxPrice, search, currentPage]);


    // Fetch product categories and subcategories
    useEffect(() => {
        // Function to fetch categories and subcategories
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get("http://localhost:4444/productcategories/");
                setProductCategories(categoriesResponse.data);

                const subcategoriesResponse = await axios.get("http://localhost:4444/productsubcategories/");
                setProductSubcategories(subcategoriesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    // Helper function to get subcategories for a specific category
    const getSubcategories = (categoryId) => {
        return productSubcategories.filter(subcategory => subcategory.category_id === categoryId);
    };

    const handleCategoryChange = (id) => {
        setCategoryId(id);
        setSubCategoryId(null);
        navigate({ search: `?category_id=${id}` });
    };

    const handleSubCategoryChange = (subCategoryId) => {
        // Find the category associated with the selected sub-category
        const selectedSubCategory = productSubcategories.find(subcategory => subcategory.id === subCategoryId);

        if (selectedSubCategory) {
            const categoryId = selectedSubCategory.category_id;

            // Set both category_id and sub_category_id in the state
            setCategoryId(categoryId);
            setSubCategoryId(subCategoryId);

            // Update the URL with both category_id and sub_category_id
            navigate(`?category_id=${categoryId}&sub_category_id=${subCategoryId}`);
        }
    };


    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        navigate({ search: `?category_id=${categoryId}&sub_category_id=${subCategoryId}&min_price=${e.target.value}` });
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        navigate({ search: `?category_id=${categoryId}&sub_category_id=${subCategoryId}&max_price=${e.target.value}` });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
        navigate({ search: `?search=${e.target.value}` });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate({ search: `?page=${page}` });
    };

    return (
        <div className="bg-white">



            <header className="flex justify-between items-center p-4 bg-slate-50 md:px-6">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-xl font-bold">
                        <h1>Platform</h1>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">

                    <Input type="search" placeholder="Search product..." className="w-64" value={search} onChange={handleSearchChange} />
                    {/* <UserIcon className="w-6 h-6" /> */}
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <UserIcon className="w-6 h-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel align="middle">{name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to={'/editprofile'}>
                                        Edit Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Button className="w-full bg-red-600 hover:bg-slate-600 text-white hover:text-black"
                                        onClick={logout}
                                        variant="destructive">Logout</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <ShoppingCartIcon className="w-6 h-6" />
                </div>
            </header>


            {/* Navbar ens here */}
            <div className="flex">
                <ScrollArea className="h-screen w-70 rounded-md border-none">
                    <aside className="w-75 p-4 space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold">Categories</h2>
                            <nav className="space-y-1">

                                <Accordion type="single" collapsible className="w-full">


                                    {productCategories.map(category => (
                                        <AccordionItem key={category.id} value={`item-${category.id}`}>
                                            <div className="flex items-center justify-between">
                                                <button onClick={() => handleCategoryChange(category.id)}>{category.name}</button>
                                                <AccordionTrigger />
                                            </div>
                                            <AccordionContent>
                                                {getSubcategories(category.id).map(subcategory => (
                                                    <button key={subcategory.id} onClick={() => handleSubCategoryChange(subcategory.id)}>{subcategory.name}</button>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>

                                {/* ends here */}


                            </nav>

                            {/* Here ends */}
                            <h2 className="text-lg font-bold">Price</h2>
                            <div className="flex space-x-2">
                                <Input placeholder="Minimum Price" className="w-3/4" value={minPrice} onChange={handleMinPriceChange} />
                                <div className="flex items-center">$</div>
                            </div>
                            <div className="flex space-x-2">
                                <Input placeholder="Maximum Price" className="w-3/4" value={maxPrice} onChange={handleMaxPriceChange} />
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
                <main className="flex-1 p-4 bg-slate-300">
                    <div className="flex justify-between items-center mb-4">

                        <h2 className="text-2xl font-bold">Products {products.length}</h2>

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

                        {
                            products.map((product) => (
                                <ProductCard product={product} />
                            ))
                        }



                    </div>
                    {/* Here goes the pagination     */}
                    <div className="flex justify-center mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationPrevious disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index} onClick={() => handlePageChange(index + 1)}>
                                        <PaginationLink isActive={currentPage === index + 1}>{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationNext disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
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
