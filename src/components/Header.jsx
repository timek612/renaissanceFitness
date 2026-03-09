function Header({ onBookNowClick }) {
    return (
        <header className="bg-black text-white py-4 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-8 w-8 sm:h-12 sm:w-12"
                />
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">[Website Title]</h1>
            </div>
            <button
                onClick={onBookNowClick}
                className="bg-white text-black px-3 py-1.5 sm:px-6 sm:py-2 rounded text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors"
            >
                Book Now
            </button>
        </header>
    );
}

export default Header;
