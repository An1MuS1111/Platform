
import { Label } from "@/ui-components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/ui-components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/ui-components/ui/select"
import { Button } from "@/ui-components/ui/button"

export default function Component() {
    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-2xl mx-auto py-6">
            <div className="relative group">
                <img
                    src="/placeholder.svg"
                    alt="Product Image"
                    width={600}
                    height={600}
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                />
                <button className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/50 hover:bg-white rounded-full p-2 transition-colors dark:bg-gray-950/50 dark:hover:bg-gray-950">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    <span className="sr-only">Previous</span>
                </button>
                <button className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/50 hover:bg-white rounded-full p-2 transition-colors dark:bg-gray-950/50 dark:hover:bg-gray-950">
                    <ChevronRightIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    <span className="sr-only">Next</span>
                </button>
            </div>
            <div className="grid gap-4 md:gap-8">
                <div className="grid gap-1">
                    <h1 className="font-bold text-2xl sm:text-3xl">Acme Circles T-Shirt</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">(23 reviews)</span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <p className="text-gray-500 dark:text-gray-400">60% combed ringspun cotton/40% polyester jersey tee.</p>
                    <div className="text-4xl font-bold">$99</div>
                </div>
                <form className="grid gap-4 md:gap-8">
                    <div className="grid gap-2">
                        <Label htmlFor="color" className="text-base">
                            Color
                        </Label>
                        <RadioGroup id="color" defaultValue="black" className="flex items-center gap-2">
                            <Label
                                htmlFor="color-black"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="color-black" value="black" />
                                Black
                            </Label>
                            <Label
                                htmlFor="color-white"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="color-white" value="white" />
                                White
                            </Label>
                            <Label
                                htmlFor="color-blue"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="color-blue" value="blue" />
                                Blue
                            </Label>
                        </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="size" className="text-base">
                            Size
                        </Label>
                        <RadioGroup id="size" defaultValue="m" className="flex items-center gap-2">
                            <Label
                                htmlFor="size-xs"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="size-xs" value="xs" />
                                XS
                            </Label>
                            <Label
                                htmlFor="size-s"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="size-s" value="s" />
                                S
                            </Label>
                            <Label
                                htmlFor="size-m"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="size-m" value="m" />
                                M
                            </Label>
                            <Label
                                htmlFor="size-l"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="size-l" value="l" />
                                L
                            </Label>
                            <Label
                                htmlFor="size-xl"
                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            >
                                <RadioGroupItem id="size-xl" value="xl" />
                                XL
                            </Label>
                        </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="quantity" className="text-base">
                            Quantity
                        </Label>
                        <Select defaultValue="1">
                            <SelectTrigger className="w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button size="lg">Add to cart</Button>
                        <Button size="lg" variant="outline">
                            <HeartIcon className="w-4 h-4 mr-2" />
                            Add to wishlist
                        </Button>
                    </div>
                </form>
            </div>
        </div>
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


function StarIcon(props) {
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}