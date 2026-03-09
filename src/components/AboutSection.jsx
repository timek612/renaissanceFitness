function AboutSection() {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 sm:mb-12">About</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <div>
                    <img
                        src="/headshot.jpg"
                        alt="Trainer headshot"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">Bio</h3>
                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                            [Bio content goes here]
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">Credentials</h3>
                        <ul className="text-gray-800 space-y-2 text-sm sm:text-base">
                            <li>[Credential 1]</li>
                            <li>[Credential 2]</li>
                            <li>[Credential 3]</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">Fitness Philosophy</h3>
                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                            [Fitness philosophy content goes here]
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
