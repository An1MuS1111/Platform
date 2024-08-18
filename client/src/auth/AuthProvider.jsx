import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem('token'));
    const [user, setUser_] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    const setToken = (newToken) => {
        setToken_(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const setUser = (newUser) => {
        setUser_(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const refreshToken = async () => {
        try {
            const res = await axios.post('http://localhost:4444/auths/refresh', { token: user.refreshToken });
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            setToken(res.data.accessToken);
            return res.data;
        } catch (err) {
            console.log(err);
            logout();
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            if (user) {
                let currentDate = new Date();
                const decodedToken = jwtDecode(user.accessToken);
                if (decodedToken.exp * 1000 < currentDate.getTime()) {
                    const data = await refreshToken();
                    config.headers['Authorization'] = 'Bearer ' + data.accessToken;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            user,
            axiosJWT,
            logout,
        }),
        [token, user]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
