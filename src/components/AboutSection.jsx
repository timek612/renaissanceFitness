import headshot from '../assets/Adobe Express - file.png'

function AboutSection() {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 sm:mb-12 uppercase">About</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <div>
                    <img
                        src={headshot}
                        alt="Trainer headshot"
                        className="w-3/4 mx-auto rounded-lg shadow-lg"
                    />
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                            My name is John Christopherson. I’m an NCSF Certified Personal Trainer and the founder of Renaissance Personal Fitness. I decided to pursue a career as a personal trainer because I want to help people live their best life, and I believe that exercise is an essential part of that. I know that the gym can be an intimidating place for many, so I make it my mission to ensure that training with me is accessible, comfortable, and rewarding for everyone, regardless of fitness level, age, or identity. My goal is to empower you to achieve your fitness goals by providing individualized programming, encouragement, and accountability. Whether you want to get stronger, improve your mobility, build muscle, overcome pain, or simply feel more confident in the gym, I can help you get there.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
