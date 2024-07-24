import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component
export const MyThemeProvider = ({ children }) => {
    // Initialize the theme state from localStorage, default to 'dark' if not found
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme : 'dark';
    });

    // Update localStorage whenever the theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
