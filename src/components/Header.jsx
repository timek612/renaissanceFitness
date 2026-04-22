
import logo from '../assets/renaissance-final_icon - white.png';
import wordmark from '../assets/renaissance-final_wordmark - white.png';
import combo from '../assets/renaissance-final_combo - white.png';

function Header({ onBookNowClick }) {
    return (
        <header className="bg-black text-white py-2 px-4 sm:px-6 flex items-center justify-between relative">
            {/* Mobile: combo logo only */}
            <div className="flex md:hidden items-center">
                <img src={combo} alt="Renaissance Fitness" className="h-10 w-auto" />
            </div>

            {/* Desktop: icon on the left */}
            <div className="hidden md:flex items-center">
                <img src={logo} alt="Renaissance Fitness" className="h-16 w-auto" />
            </div>

            {/* Desktop: wordmark centered absolutely */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                <img src={wordmark} alt="Renaissance Fitness" className="h-16 w-auto" />
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
