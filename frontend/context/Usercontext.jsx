import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            axios.get('/profile')
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
