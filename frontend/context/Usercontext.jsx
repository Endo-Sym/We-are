import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // if not have user (refresh page) will fetch from cookie
        if (!user) {
            axios.get(`/profile`)
                .then(({ data }) => {
                    console.log("Fetched user profile from cookie:", data); 
                    setUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user profile from cookie:", error);
                });
        }
        // if have user (login) will fetch from 
        else {
            console.log(user._id);
            axios.get(`/profile/${user._id}`)
                .then(({ data }) => {
                    console.log("Fetched user profile from database:", data); 
                    setUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user profile from database:", error);
                });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
