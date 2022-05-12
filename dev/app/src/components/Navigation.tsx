import React, { useState } from "react";
import { Link } from "react-router-dom";

type NavItem = {
    url: string;
    key: string;
    text: string;
};

type NavigationProps = {
    toggleTheme: Function;
};

export const Navigation = ({ toggleTheme }: NavigationProps) => {
    const navItems: Array<NavItem> = [
        { url: "/map", key: "about", text: "About us" },
        { url: "/", key: "home", text: "How to use" },
        { url: "/map", key: "map", text: "Map" },
    ];
    const [theme, setTheme] = useState("🌝");
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTheme(theme === "🌚" ? "🌝" : "🌚");
        toggleTheme(theme === "🌚" ? "" : "dark");
    };

    return (
        <nav className="fixed z-30 left-0 top-0 w-full px-3 py-2 dark:bg-neutral-900 dark:text-white bg-white border-b border-slate-200 dark:border-none shadow-md ">
            <ul className="list-none">
                <li className="float-left p-2 font-bold text-2xl text-violet-500 hover:text-violet-600 dark:text-white dark:hover:text-violet-200">
                    <Link to="/">{"pooler."}</Link>
                </li>
                <li className="float-right my-2">
                    <button
                        onClick={handleOnClick}
                        className="text-2xl pl-4 h-full"
                    >
                        {theme}
                    </button>
                </li>
                {navItems.map((item) => (
                    <li className="float-right p-2 font-medium my-auto leading-loose dark:text-white dark:hover:text-violet-200  hover:text-blue-500">
                        <Link to={item.url}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
