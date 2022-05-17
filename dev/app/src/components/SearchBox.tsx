import React, { useState } from "react";
import { searchCompleter } from "../model/search-completer";

type SearchBoxProps = {
    placeholder: string;
    textSetter: Function;
};

/**
 * SearchBox is a component responsible for receiving user input regarding location. It autocompletes queries and updates the location upon selection.
 * @param placeholder placeholder text for input box before user input is received.
 * @param textSetter setter for updating state coming from parent component.
 * @returns JSX.Element
 */
export const SearchBox = ({ placeholder, textSetter }: SearchBoxProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchResults, setSearchResults] = useState<Array<string>>([]);
    const [currentInput, setCurrentInput] = useState<string>("");

    const handleSearch = async (query: string) => {
        const sc: searchCompleter = new searchCompleter();
        sc.suggestions(query).then((r: Array<string>) => {
            setSearchResults(r);
        });
        setCurrentInput(query);
    };

    const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
        let s = e.currentTarget.innerText;
        handleSearch(s);
        setCurrentInput(s);
        textSetter(s);
    };

    const searchInput = () => {
        return (
            <input
                className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9 bg-left-sm bg-white rounded-md border h-10 outline-slate-200 dark:bg-black dark:text-white dark:outline-neutral-800 dark:border-neutral-800"
                type="text"
                placeholder={placeholder}
                value={currentInput}
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
                className="w-full block bg-auto dark:bg-black dark:text-white dark:hover:bg-neutral-900   hover:bg-slate-100 p-1 hover:cursor-pointer hover:text-blue-400 hover:underline"
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
