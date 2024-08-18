import { useState, useEffect } from 'react'
import axios from 'axios'
import { Label } from "@/ui-components/ui/label"
import { Input } from "@/ui-components/ui/input"
import { Button } from "@/ui-components/ui/button"
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match')
            setError('Passwords do not match')
            return
        }
        const formInfo = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }
        console.log(formInfo)
        axios.post('http://localhost:4444/users/add', formInfo)
            .then(res => {
                console.log(res)
                navigate('/login')
            })
            .catch(err => console.error(err))


    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Create an account</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link className="font-medium text-indigo-600 hover:underline dark:text-indigo-400" to='/login'>Log in</Link>
                    </p>
                </div>
                <form className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="name"
                                name="name"
                                onChange={handleChange}
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="Enter your name"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="email"
                                name="email"
                                onChange={handleChange}

                                type="email"
                                autoComplete="email"
                                required
                                placeholder="name@example.com"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </Label>
                        <div className="mt-1 flex items-center">
                            <Input
                                id="password"
                                name="password"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                placeholder="Enter your password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                            <Button
                                type='button'
                                onClick={togglePasswordVisibility}
                                variant="ghost"
                                size="icon"
                                className="ml-3 h-10 w-10 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-600 dark:hover:text-gray-400"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}

                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </Label>
                        <div className="mt-1 flex items-center">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                placeholder="Confirm your password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                            <Button
                                type='button'
                                onClick={toggleConfirmPasswordVisibility}
                                variant="ghost"
                                size="icon"
                                className="ml-3 h-10 w-10 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-600 dark:hover:text-gray-400"
                            >
                                {/* <EyeIcon className="h-5 w-5" /> */}
                                {/* <EyeOff className="h-5 w-5" /> */}
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}

                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function EyeIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
    )
}


function EyeOff(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
    )
}