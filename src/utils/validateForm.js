/**
 * Validates survey form data
 * @param {Object} formData - The form data to validate
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.goals - User's fitness goals
 * @returns {Object} Object containing field-specific error messages
 */
export function validateForm(formData) {
    const errors = {};

    // Validate required field: name
    if (!formData.name || formData.name.trim() === '') {
        errors.name = 'Name is required';
    }

    // Validate required field: email
    if (!formData.email || formData.email.trim() === '') {
        errors.email = 'Email is required';
    } else {
        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
    }

    // Validate required field: goals
    if (!formData.goals || formData.goals.trim() === '') {
        errors.goals = 'Fitness goals are required';
    }

    return errors;
}
