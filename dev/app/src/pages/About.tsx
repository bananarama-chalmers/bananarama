import React from 'react';

export const AboutPage = (): JSX.Element => { 
    // Här har vi logik och kod

    // Det som returneras är HTML som App.tsx ritar ut för oss och webbläsaren
    return (
        <div className="bg-white dark:bg-neutral-900 w-screen h-screen py-40 px-10">
            <div className="grid grid-cols-8 m-auto w-3/4 spacing-2">
                <div className='col-span-4'>
                    <h1 className='dark:text-white text-7xl font-bold pb-9'>{"About us"}</h1>
                    <p className='dark:text-white mt-5'>
                        <span className='dark:text-white text-purple-600 font-bold'>{"DiDRiK "}</span>{"is about being sustainable and fast - an interest in co-creation and speedy transportation."}
                    </p>
                    <p className='dark:text-white mt-3 text-justify'>
                    <span className='dark:text-white text-purple-600 font-bold'>{"DiDRiK "}</span>{"came as a result of the Swedish way of sporting. In 2022, we recognised the need of traveling together when doing sports. Since sporting in Sweden is based on voluntarily contributions, so should also the way of traveling be. Therefore we create "} <span className='dark:text-white text-purple-600 font-bold'>{"DiDRiK "}</span> {"- the easy way of traveling together to a common destination."}
                    </p>
                    <p className='dark:text-white mt-3 text-justify'>
                        {"We are still ruled by our interest in voluntarily contributions and collaboration. Therefore joy, curiosity and openness are our prime characteristics."}
                    </p>
                    <p className='dark:text-white mt-3 text-justify'>
                        {"With our presence we push boundaries and allow for new interpersonal interactions."}
                    </p>
                    <p className='dark:text-white mt-5 font-bold text-xl'>
                        {"We are: "}<span className='dark:text-white text-purple-600 font-bold'>{"DiDRiK "}</span>
                    </p>
                </div>
                <div className='col-start-6 col-end-9 mt-32 bg-purple-500'>
                    <ul className='pl-7 text-white text-2xl pt-5'>
                        <li className="py-[7px] font-bold">Adam Landberg</li>
                        <li className="py-[7px] font-bold">Axel Söderberg</li>
                        <li className="py-[7px] font-bold">Eric Erlandsson</li>
                        <li className="py-[7px] font-bold">Hugo Mårdbrink</li>
                        <li className="py-[7px] font-bold">Ludvig Digné</li>
                        <li className="py-[7px] font-bold">Samuel Kajava</li>
                        <li className="py-[7px] font-bold">Simon Johnsson</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}