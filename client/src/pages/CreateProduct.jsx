
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/ui-components/ui/card"
import { Label } from "@/ui-components/ui/label"
import { Input } from "@/ui-components/ui/input"
import { Textarea } from "@/ui-components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/ui-components/ui/select"
import { Button } from "@/ui-components/ui/button"

export default function CreateProduct() {
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
                        <Select id="category" defaultValue="electronics">
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="clothing">Clothing</SelectItem>
                                <SelectItem value="home">Home & Garden</SelectItem>
                                <SelectItem value="sports">Sports & Outdoors</SelectItem>
                                <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subcategory">Sub-Category</Label>
                        <Select id="subcategory" defaultValue="laptops">
                            <SelectTrigger>
                                <SelectValue placeholder="Select sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Electronics</SelectLabel>
                                    <SelectItem value="laptops">Laptops</SelectItem>
                                    <SelectItem value="smartphones">Smartphones</SelectItem>
                                    <SelectItem value="tvs">TVs</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Clothing</SelectLabel>
                                    <SelectItem value="shirts">Shirts</SelectItem>
                                    <SelectItem value="pants">Pants</SelectItem>
                                    <SelectItem value="dresses">Dresses</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Home & Garden</SelectLabel>
                                    <SelectItem value="furniture">Furniture</SelectItem>
                                    <SelectItem value="decor">Home Decor</SelectItem>
                                    <SelectItem value="kitchen">Kitchen</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="inventory">Inventory</Label>
                        <Select id="inventory" defaultValue="in-stock">
                            <SelectTrigger>
                                <SelectValue placeholder="Select inventory status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="in-stock">In Stock</SelectItem>
                                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                <SelectItem value="backorder">Backorder</SelectItem>
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
                        <Select id="discount" defaultValue="none">
                            <SelectTrigger>
                                <SelectValue placeholder="Select discount" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="10">10%</SelectItem>
                                <SelectItem value="15">15%</SelectItem>
                                <SelectItem value="20">20%</SelectItem>
                                <SelectItem value="25">25%</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input id="sku" placeholder="Enter SKU" />
                    </div>

                </div>

                <div className="grid gap-2">
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
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Save Product</Button>
            </CardFooter>
        </Card>
    )
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
    )
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
    )
}