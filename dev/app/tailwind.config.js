module.exports = {
    content: ["./public/index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: {
                "400px": "400px",
                "input-height": "25px",
                "1px": "1px",
            },
            width: {
                "box-width": "350px",
            },
            backgroundImage: {
                "search-icon": "url('./assets/search.svg')",
                "expand-icon": "url('./assets/expand.svg')",
            },
            backgroundSize: {
                sm: "1.4rem",
            },
            backgroundPosition: {
                "left-sm": "center left 0.5rem",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
