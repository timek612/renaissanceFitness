import { useState } from 'react';
import img1 from '../assets/IMG_1706.jpeg';
import img2 from '../assets/IMG_1707.jpeg';
import img3 from '../assets/IMG_1720.jpeg';
import img4 from '../assets/IMG_1723.jpeg';
import img5 from '../assets/IMG_1725.jpeg';
import img6 from '../assets/IMG_1726.jpeg';

const images = [img1, img2, img3, img4, img5, img6];

function PersonalTrainingSection({ onBookNowClick }) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    return (
        <section className="bg-black text-white px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 uppercase">Personal Training</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            At Renaissance Personal Fitness, your goals are always top priority. That’s why your Renaissance journey begins with a free assessment, consisting of an intake interview and a movement evaluation. This first step is critical because it gives me the information I need to build an individually tailored program that specifically targets your goals. Your program will take into account your personal strengths, limitations, interests, experience, and body mechanics so that it fits you like a glove.                         </p>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base mt-5">
                            I train out of Falcon Training Facility in Lake View East. The gym is well-maintained, semi-private, and contains a wide array of high-quality fitness equipment suited to all types of training.
                        </p>
                    </div>

                    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg relative overflow-hidden">
                        <div className="relative w-full h-64 sm:h-80">
                            {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`Training photo ${i + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover rounded transition-opacity duration-500 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={prev}
                            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-80 leading-none text-center"
                            aria-label="Previous image"
                        >
                            <span className="block -mt-px">‹</span>
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-80 leading-none text-center"
                            aria-label="Next image"
                        >
                            <span className="block -mt-px">›</span>
                        </button>
                        <div className="flex justify-center mt-3 space-x-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full ${i === current ? 'bg-white' : 'bg-gray-600'}`}
                                    aria-label={`Go to image ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 uppercase">Packages & Rates</h3>

                    <div className="mb-6">
                        <div className="space-y-2">
                            {[{ freq: '1x / week', rate: '$90 / session' }, { freq: '2x / week', rate: '$80 / session' }, { freq: '3x / week', rate: '$70 / session' }].map(({ freq, rate }) => (
                                <div key={freq} className="flex justify-between text-sm sm:text-base border-b border-gray-700 pb-2">
                                    <span className="text-gray-400">{freq}</span>
                                    <span className="font-semibold">{rate}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
                        {[
                            { label: '1-Month', prices: [{ freq: '1x / week', price: '$360' }, { freq: '2x / week', price: '$640' }, { freq: '3x / week', price: '$840' }] },
                            { label: '2-Month', prices: [{ freq: '1x / week', price: '$700' }, { freq: '2x / week', price: '$1,240' }, { freq: '3x / week', price: '$1,620' }] },
                            { label: '3-Month', prices: [{ freq: '1x / week', price: '$1,020' }, { freq: '2x / week', price: '$1,800' }, { freq: '3x / week', price: '$2,340' }] },
                        ].map(({ label, prices }) => (
                            <div key={label} className="bg-black rounded-lg p-4">
                                <h4 className="text-lg font-bold mb-3 border-b border-gray-700 pb-2">{label}</h4>
                                <div className="space-y-2">
                                    {prices.map(({ freq, price }) => (
                                        <div key={freq} className="flex justify-between text-sm sm:text-base">
                                            <span className="text-gray-400">{freq}</span>
                                            <span className="font-semibold">{price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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
