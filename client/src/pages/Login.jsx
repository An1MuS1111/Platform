import { Link, useNavigate } from 'react-router-dom';
import { Label } from "@/ui-components/ui/label"
import { Input } from "@/ui-components/ui/input"
import { Button } from "@/ui-components/ui/button"
import { useAuth } from '../auth/AuthProvider';
import { useState } from 'react';
import axios from 'axios';


export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4444/auths/login", formData);
            localStorage.setItem('user', JSON.stringify(res.data));
            setToken(res.data.accessToken);

            navigate('/', { replace: true });
        } catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 ">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link className="font-medium text-indigo-600 hover:underline dark:text-indigo-400" to='/signin' >Sign in</Link>

                    </p>
                </div>
                <form className="space-y-6">
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </Label>
                        <div className="mt-1">
                            <Input
                                onChange={handleChange}
                                id="email"
                                name="email"
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
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Enter your password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-3 h-10 w-10 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-600 dark:hover:text-gray-400"
                            >
                                <EyeIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
                        >
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function EyeIcon(props) {
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
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}