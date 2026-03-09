import { useState } from 'react';
import { validateForm } from '../utils/validateForm';
import { sendSurveyEmail } from '../utils/api';

function SurveyModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        goals: '',
        experience: '',
        availability: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear errors if validation passes
        setErrors({});
        setIsSubmitting(true);

        try {
            await sendSurveyEmail(formData);
            setSubmitted(true);
        } catch (error) {
            setErrors({ submit: error.message || 'Failed to submit survey. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Show confirmation view after successful submission
    if (submitted) {
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                onClick={handleBackdropClick}
            >
                <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Thank You!</h3>
                    <p className="text-gray-800 mb-4 sm:mb-6 text-sm sm:text-base">
                        Your information has been submitted successfully. We'll be in touch soon!
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-black">Book Your Session</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-black text-2xl flex-shrink-0 ml-2"
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-sm sm:text-base"
                        />
                        {errors.name && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-sm sm:text-base"
                        />
                        {errors.email && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                            What are your fitness goals? *
                        </label>
                        <textarea
                            value={formData.goals}
                            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                            rows={4}
                            className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-sm sm:text-base"
                        />
                        {errors.goals && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.goals}</p>}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                            Experience Level
                        </label>
                        <select
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-sm sm:text-base"
                        >
                            <option value="">Select...</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-black mb-1 sm:mb-2">
                            Availability
                        </label>
                        <textarea
                            value={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            rows={2}
                            placeholder="e.g., Weekday mornings, Weekend afternoons"
                            className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none text-sm sm:text-base"
                        />
                    </div>

                    {errors.submit && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 sm:p-4">
                            <p className="text-red-600 text-xs sm:text-sm">{errors.submit}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SurveyModal;
