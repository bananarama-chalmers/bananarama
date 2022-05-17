module.exports = {
    darkMode: "class",
    content: ["./public/index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: {
                "400px": "400px",
                "input-height": "25px",
                "1px": "1px",
                "2px": "2px",
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
            spacing: {
                "66px": "66px",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
