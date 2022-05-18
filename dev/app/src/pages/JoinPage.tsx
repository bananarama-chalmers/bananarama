import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const JoinPage = () => {
    const [joinLink, setJoinLink] = useState("")

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "../map/" + joinLink;
        navigate(path);
    }

    const handleSubmit = (event:any) => {
        event.preventDefault()
        console.log(joinLink)
        routeChange()
    };


    return (
        <div className="content-center bg-white dark:bg-neutral-900 w-screen h-screen py-40 px-10">
            <h1 className="leading-none my-4 font-bold dark:text-white text-7xl text-center">
                {"Join a pool with your link here"}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center border-b dark:border-violet-600 border-blue-500 py-2">
                    <label>
                        <input
                            type="text"
                            className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-white text-4xl mr-3 py-1 px-2 focus:outline-none"
                            placeholder="Enter your link"
                            value={joinLink}
                            onChange={(e) => setJoinLink(e.target.value)}
                        />
                    </label>
                </div>
                <div className="flex place-items-center">
                    <button className="my-2 py-2 mx-auto w-64 rounded-lg text-2xl font-bold dark:bg-violet-600 dark:hover:bg-violet-700 bg-blue-500 hover:bg-blue-600 text-white text-center">
                        Join Pool
                    </button>
                </div>
            </form>
        </div>
    );
};
