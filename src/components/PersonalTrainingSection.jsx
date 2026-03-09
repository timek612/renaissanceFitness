function PersonalTrainingSection({ onBookNowClick }) {
    return (
        <section className="bg-black text-white px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">Personal Training</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Screening & Assessment Process</h3>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            [Screening and assessment process description]
                        </p>
                    </div>

                    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Exercise Programming Approach</h3>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            [Exercise programming approach description]
                        </p>
                    </div>

                    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Benefits</h3>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            [Benefits description]
                        </p>
                    </div>

                    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Falcon</h3>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            [Falcon description]
                        </p>
                    </div>
                </div>

                <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Packages & Rates</h3>
                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        <div className="flex justify-between items-center border-b border-gray-700 pb-3 sm:pb-4">
                            <span className="text-base sm:text-lg md:text-xl">[Package 1 Name]</span>
                            <span className="text-base sm:text-lg md:text-xl font-bold">[Price]</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-700 pb-3 sm:pb-4">
                            <span className="text-base sm:text-lg md:text-xl">[Package 2 Name]</span>
                            <span className="text-base sm:text-lg md:text-xl font-bold">[Price]</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-700 pb-3 sm:pb-4">
                            <span className="text-base sm:text-lg md:text-xl">[Package 3 Name]</span>
                            <span className="text-base sm:text-lg md:text-xl font-bold">[Price]</span>
                        </div>
                    </div>

                    <button
                        onClick={onBookNowClick}
                        className="w-full bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </section>
    );
}

export default PersonalTrainingSection;
