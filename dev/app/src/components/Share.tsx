import React from "react";

// <Share location={"Location"} />
function Share({location}: {location: string}) {
    return (
        <div className="grid grid-cols-3 drop-shadow-lg gap-0 p-2 rounded-lg fixed m-4 left-50 top-0 z-10 relative w-1/5 bg-white">
            <h1 className="col-span-3 text-center font-semibold text-slate-800"> Share invite with friends</h1>
            <button className="col-span-3 font-semibold bg-slate-800 hover:bg-slate-900 text-white h-10 rounded-lg w-200 mt-1" onClick={() => {navigator.clipboard.writeText(generateInvite(location))}}> Copy invite </button>
            <p className="col-span-3 text-center text-gray-500"> or </p>
            <a className="col-span-3 font-semibold bg-slate-50 hover:bg-slate-100 text-gray-500 h-10 rounded-lg mt-1 outline outline-offset-1 outline-1 outline-slate-400 text-center self-center" href={generateMailRef(location)}> Invite by email</a>
        </div>
    );

}

function generateMailRef(location: string) {
    // Special characters such as blank space and newline must be encoded with percent encoding
    return "mailto:?to=&subject=Pool%20with%20me!&body=Lets%20go%20to%20" + location
        + "%20together!%20Send%20your%20location%20to%20me%20and%20'I’ll%20find%20a%20meeting%20point%20%0A%0A"

}

function generateInvite(location: string) {
    return "Lets go to " + location + " together! Send your location to me and 'I’ll find a meeting point";
}

export default Share;
