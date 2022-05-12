import { Link } from "react-router-dom";

export const LandingPage = () => {
    return (
        <div className="bg-slate-100 w-screen h-screen">
            <div className="grid grid-cols-2 m-auto w-3/4">
                <div className="col-span-1">
                    <h1 className="leading-none my-4 font-bold text-7xl text-center">
                        {"What's your destination?"}
                    </h1>
                    <p className="text-xl mb-4 text-center">
                        {"Find the perfect place to meet up when carpooling. "}
                        <br />
                        {"Travel together and save the planet!"}
                    </p>
                    <div className="my-2 mx-auto w-64 rounded-lg text-md font-bold bg-blue-500 hover:bg-blue-600 text-white text-center">
                        <Link className="block w-full p-2 " to="/map">
                            {"Create a pool"}
                        </Link>
                    </div>
                    <div className="my-2 mx-auto col-span-2 w-64 rounded-lg text-md font-bold bg-white hover:border-slate-300 text-black border-2 border-slate-200 text-center">
                        <Link className="block w-full p-2 " to="/map">
                            {"Learn how to use"}
                        </Link>
                    </div>
                </div>
                <div className="col-span-1 bg-black">img</div>
            </div>
        </div>
    );
};
