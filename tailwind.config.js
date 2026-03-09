/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#000000',
                secondary: '#FFFFFF',
            },
            screens: {
                'sm': '640px',   // Mobile landscape / Small tablets
                'md': '768px',   // Tablets
                'lg': '1024px',  // Desktop
                'xl': '1280px',  // Large desktop
            },
        },
    },
    plugins: [],
}
