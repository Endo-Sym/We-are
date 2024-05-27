import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user data is stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // If no user data in localStorage, fetch from server
            axios.get(`/profile`)
                .then(({ data }) => {
                    console.log("Fetched user profile from cookie:", data); 
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                })
                .catch((error) => {
                    console.error("Error fetching user profile from cookie:", error);
                });
        }
    }, []);

    useEffect(() => {
        if (user) {
            // If user state changes, fetch updated profile from server
            axios.get(`/profile/${user._id}`)
                .then(({ data }) => {
                    console.log("Fetched user profile from database:", data); 
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                })
                .catch((error) => {
                    console.error("Error fetching user profile from database:", error);
                });
        }
    }, [user]);

    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser: saveUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
