import React, { useEffect, useState } from "react";

type SearchBoxProps = {
    callback: Function;
    placeholder: string;
};

export const SearchBox = ({ callback, placeholder }: SearchBoxProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchString: string = e.target.value;
        callback(searchString);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsExpanded(true);
        console.log(isExpanded);
    };

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsExpanded(false);
        console.log(isExpanded);
    };

    return (
        <div>
            <input
                className="w-full bg-search-icon bg-sm bg-no-repeat p-1 pl-9 bg-left-sm bg-white rounded-md border h-10 outline-slate-200"
                type="text"
                placeholder={placeholder}
                onChange={handleOnChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
        </div>
    );
};
