import { Link } from "react-router-dom";

type NavItem = {
    url: string;
    key: string;
    text: string;
};

export const Navigation = () => {
    const navItems: Array<NavItem> = [
        { url: "/map", key: "about", text: "About us" },
        { url: "/", key: "home", text: "How to use" },
        { url: "/map", key: "map", text: "Map" },
    ];
    return (
        <nav className="fixed z-30 left-0 top-0 w-full px-3 py-2 bg-white border-b border-slate-200 ">
            <ul className="list-none">
                <li className="float-left p-2 font-bold text-2xl text-violet-500 hover:text-violet-600">
                    <Link to="/">{"pooler."}</Link>
                </li>
                {navItems.map((item) => (
                    <li className="float-right p-2 font-medium my-auto leading-loose hover:text-blue-500">
                        <Link to={item.url}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
