import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui-components/ui/card"
import { Label } from "@/ui-components/ui/label"
import { Input } from "@/ui-components/ui/input"
import { Textarea } from "@/ui-components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/ui-components/ui/select"
import { Button } from "@/ui-components/ui/button"
export default function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [imagesData, setImagesData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);


    console.log(imagesData)
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post("http://localhost:4444/uploads/single", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setImagesData([...imagesData, response.data]);
                setSelectedFile(null);
                console.log("File uploaded successfully:", response.data);
            })
            .catch(error => {
                console.error("Error uploading file:", error);
            });
    };

    const handleDeleteImage = (index) => {
        setImagesData(imagesData.filter((_, i) => i !== index));
    };


    useEffect(() => {
        // Fetch categories
        axios.get("http://localhost:4444/productcategories")
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));

        // Fetch subcategories
        axios.get("http://localhost:4444/productsubcategories")
            .then(response => setSubcategories(response.data))
            .catch(error => console.error("Error fetching subcategories:", error));

        // Fetch discounts
        axios.get("http://localhost:4444/discounts")
            .then(response => setDiscounts(response.data))
            .catch(error => console.error("Error fetching discounts:", error));

        // Fetch inventories
        axios.get("http://localhost:4444/productinventories")
            .then(response => setInventories(response.data))
            .catch(error => console.error("Error fetching inventories:", error));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            // Filter subcategories based on selected category
            const filtered = subcategories.filter(subcategory => subcategory.category_id === selectedCategory);
            setFilteredSubcategories(filtered);
        } else {
            setFilteredSubcategories([]);
        }
    }, [selectedCategory, subcategories]);

    return (
        <Card className="w-full max-w-2xl ml-auto mr-auto mt-10">
            <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Fill out the details for your new product.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">

                <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea id="description" placeholder="Describe your product in detail" rows={4} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            id="category"
                            onValueChange={(value) => setSelectedCategory(parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                {categories.map(category => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subcategory">Sub-Category</Label>
                        <Select
                            id="subcategory"
                            disabled={!selectedCategory}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredSubcategories.map(subcategory => (
                                    <SelectItem key={subcategory.id} value={subcategory.id}>
                                        {subcategory.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="inventory">Inventory</Label>
                        <Select id="inventory">
                            <SelectTrigger>
                                <SelectValue placeholder="Select inventory status" />
                            </SelectTrigger>
                            <SelectContent>
                                {inventories.map(inventory => (
                                    <SelectItem key={inventory.id} value={inventory.id}>
                                        {inventory.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" placeholder="Enter product price" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="discount">Discount</Label>
                        <Select id="discount">
                            <SelectTrigger>
                                <SelectValue placeholder="Select discount" />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                {discounts.map(discount => (
                                    <SelectItem key={discount.id} value={discount.id}>
                                        {discount.name} ({discount.discount_percent}%)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input id="sku" placeholder="Enter SKU" />
                    </div>
                </div>
                {/* this is for images */}
                {/* <div className="grid gap-2">
                    <Label htmlFor="images">Images</Label>
                    <div className="flex gap-2 items-center">
                        <Button variant="outline" className="flex-1">
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Image
                        </Button>
                        <Input id="images" type="file" className="hidden" />
                    </div>
                    <div className="flex gap-2 items-center justify-between bg-slate-200">
                        <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md">Image 1</div>
                        <Button variant="ghost" size="icon" className="text-destructive">
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Delete image</span>
                        </Button>
                    </div>
                </div> */}
                {/* this is for images */}


                <div className="grid gap-2">
                    <Label htmlFor="images">Images</Label>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <Input
                            id="images"
                            type="file"
                            className="grid gap-2"
                            onChange={handleFileChange}
                        />
                        <Button className='grid gap-2 items-center' variant="outline" onClick={handleUpload}>
                            Add Image +
                        </Button>
                    </div>
                    {imagesData.map((image, index) => (
                        <div
                            key={index}
                            className="flex gap-2 items-center justify-between bg-slate-200 mt-2"
                        >
                            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md">
                                {image.originalname}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDeleteImage(index)}
                            >
                                <XIcon className="w-4 h-4" />
                                <span className="sr-only">Delete image</span>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Save Product</Button>
            </CardFooter>
        </Card>
    );
}

function PlusIcon(props) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

function XIcon(props) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}