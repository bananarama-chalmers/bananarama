import React from "react";

// <Share location={"Location"} />
function Share({location}: {location: string}) {
    return (
        <div>
            <a href={generateMailRef(location)}> Invite by email</a>
        </div>
    );
}

function generateMailRef(location: string) {
    // Special characters such as blank space and newline must be encoded with percent encoding
    return "mailto:?to=&subject=Pool%20with%20me!&body=Lets%20go%20to%20" + location
        + "%20together!%20Send%20your%20location%20to%20me%20and%20'I’ll%20find%20a%20meeting%20point%20%0A%0A"

}

export default Share;
