/**
 * Send survey data to the backend API
 * @param {Object} formData - Survey form data
 * @param {string} formData.name - User's name (required)
 * @param {string} formData.email - User's email (required)
 * @param {string} formData.phone - User's phone number (optional)
 * @param {string} formData.goals - User's fitness goals (required)
 * @param {string} formData.experience - User's experience level (optional)
 * @param {string} formData.availability - User's availability (optional)
 * @returns {Promise<Object>} Response from the API
 * @throws {Error} If the API call fails
 */
export async function sendSurveyEmail(formData) {
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

    if (!apiEndpoint) {
        throw new Error('API endpoint not configured');
    }

    try {
        const response = await fetch(`${apiEndpoint}/survey`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to submit survey');
        }

        return await response.json();
    } catch (error) {
        // Network failures or other errors
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Network error: Unable to connect to the server');
        }
        throw error;
    }
}
