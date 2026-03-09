import { useState } from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import PersonalTrainingSection from './components/PersonalTrainingSection';
import SurveyModal from './components/SurveyModal';

function App() {
    const [showSurvey, setShowSurvey] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <Header onBookNowClick={() => setShowSurvey(true)} />
            <main>
                <AboutSection />
                <PersonalTrainingSection onBookNowClick={() => setShowSurvey(true)} />
            </main>
            <footer className="bg-black text-white py-8 px-6 text-center">
                <p className="text-gray-300">© 2026 Renaissance Fitness. All rights reserved.</p>
            </footer>

            {showSurvey && (
                <SurveyModal onClose={() => setShowSurvey(false)} />
            )}
        </div>
    );
}

export default App;
