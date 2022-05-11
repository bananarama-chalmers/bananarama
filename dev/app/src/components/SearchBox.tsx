import React, { useEffect, useState } from "react";
import { searchCompleter } from "../model/search-completer";

type SearchBoxProps = {
    placeholder: string;
};

export const SearchBox = ({ placeholder }: SearchBoxProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchResults, setSearchResults] = useState<Array<string>>([]);
    const [selectedResult, setSelectedResult] = useState<string>("");

    const handleSearch = async (query: string) => {
        const sc: searchCompleter = new searchCompleter();
        sc.suggestions(query).then((r: Array<string>) => {
            setSearchResults(r);
        });
    };

    const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
        let s = e.currentTarget.innerText;
        handleSearch(s);
        setSelectedResult(s);
    };

    const searchInput = () => {
        return (
            <input
                className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9 bg-left-sm bg-white rounded-md border h-10 outline-slate-200"
                type="text"
                placeholder={placeholder}
                value={selectedResult}
                onChange={(e) => handleSearch(e.currentTarget.value)}
                onBlur={() => setIsExpanded(false)}
                onFocus={() => setIsExpanded(true)}
            />
        );
    };

    const searchResult = (result: string, key: number) => {
        return (
            <li
                key={key}
                className="w-full block bg-auto hover:bg-slate-100 p-1 hover:cursor-pointer hover:text-blue-400 hover:underline"
                onMouseDown={(e) => handleSelect(e)}
            >
                {result}
            </li>
        );
    };

    const searchResultBox = () => {
        return (
            <ul className="absolute bg-white font-normal z-20 w-56 shadow-md">
                {searchResults.map((result, key) => searchResult(result, key))}
            </ul>
        );
    };

    return isExpanded ? (
        <div>
            {searchInput()} {searchResultBox()}
        </div>
    ) : (
        <div>{searchInput()}</div>
    );
};
