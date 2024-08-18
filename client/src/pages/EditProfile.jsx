import { Label } from "@/ui-components/ui/label";
import { Input } from "@/ui-components/ui/input";
import { Button } from "@/ui-components/ui/button";
import { useFetch } from '../hooks/useFetch';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile() {
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    const { id } = user;
    const navigate = useNavigate();

    const { isLoading, apiData, serverError } = useFetch('http://localhost:4444/users/' + id);
    console.log(apiData);

    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        telephone: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword)
    }

    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword)
    }

    useEffect(() => {
        if (apiData) {
            setFormData({
                ...formData,
                name: apiData.name,
                email: apiData.email,
                telephone: apiData.telephone
            });
        }
    }, [apiData]);

    if (isLoading) {
        return <div>...Loading</div>;
    }

    if (serverError) {
        return <div>Error: {serverError.message}</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (formData.password !== apiData.password) {
            alert('Your current password is incorrect');
            return;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('New Passwords do not match');
            return;
        }

        if (formData.newPassword === apiData.password) {
            alert('New password cannot be the same as current password');
            return;
        }

        const formInfo = {
            name: formData.name,
            email: formData.email,
            password: formData.newPassword,
            telephone: formData.telephone,
        };
        console.log(formInfo);
        axios.put('http://localhost:4444/users/' + id, formInfo)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.error(err));
    };


    const handleCancel = () => {
        navigate('/');
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Edit Profile</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Update your personal information.</p>
                </div>
                <form className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </Label>
                        <div className="mt-1">
                            <Input
                                onChange={handleChange}
                                value={formData.name}
                                id="name"
                                name="name"
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
                                value={formData.email}
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
                        <Label htmlFor="telephone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Telephone
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="telephone"
                                name="telephone"
                                onChange={handleChange}
                                value={formData.telephone}
                                type="tel"
                                autoComplete="tel"
                                required
                                placeholder="Enter your telephone number"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Current Password
                        </Label>
                        <div className="mt-1 flex items-center">
                            <Input
                                id="password"
                                name="password"
                                onChange={handleChange}

                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                placeholder="Enter your current password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                            <Button
                                variant="ghost"
                                onClick={togglePasswordVisibility}
                                size="icon"
                                className="ml-3 h-10 w-10 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-600 dark:hover:text-gray-400"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Password
                        </Label>
                        <div className="mt-1 flex items-center">
                            <Input
                                id="newPassword"
                                onChange={handleChange}

                                name="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                autoComplete="newPassword"
                                required
                                placeholder="Enter your new password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                            <Button
                                variant="ghost"
                                onClick={toggleNewPasswordVisibility}
                                size="icon"
                                className="ml-3 h-10 w-10 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-600 dark:hover:text-gray-400"
                            >
                                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}

                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm New Password
                        </Label>
                        <div className="mt-1 flex items-center">
                            <Input
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                onChange={handleChange}

                                type={showConfirmNewPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                placeholder="Confirm your new password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
                            />
                            <Button
                                variant="ghost"
                                onClick={toggleConfirmNewPasswordVisibility}
                                size="icon"
                                className="ml-3 h-10 w-10 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-600 dark:hover:text-gray-400"
                            >
                                {showConfirmNewPassword ? <EyeOff className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}

                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button onClick={handleCancel} variant="outline">Cancel</Button>
                        <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
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