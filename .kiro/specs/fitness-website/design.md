# Design Document: Personal Fitness Website

## Overview

This design describes a React-based single-page application (SPA) for a personal fitness website, deployed on AWS using Amplify. The website features a black and white color scheme and includes: a header with logo and title, an About section (headshot, bio, credentials, fitness philosophy), a Personal Training section (screening process, programming approach, benefits, Falcon description, packages/rates), and a survey form triggered by a "Book Now" button. Survey submissions are sent via email to the business owner using AWS SES.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React SPA                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Header     │  │    About     │  │   Personal   │  │
│  │  (Logo +     │  │   Section    │  │   Training   │  │
│  │   Title)     │  │              │  │   Section    │  │
│  └──────────────┘  └──────────────┘  └──────┬───────┘  │
│                                              │          │
│                                      ┌───────▼───────┐  │
│                                      │   Book Now    │  │
│                                      │    Button     │  │
│                                      └───────┬───────┘  │
│                                              │          │
│                                      ┌───────▼───────┐  │
│                                      │    Survey     │  │
│                                      │    Modal      │  │
│                                      └───────┬───────┘  │
│                                              │          │
│                    ┌─────────────────────────▼────────┐ │
│                    │      AWS Amplify Client          │ │
│                    └─────────────────┬────────────────┘ │
└──────────────────────────────────────┼───────────────────┘
                                       │
                    ┌──────────────────▼────────┐
                    │    AWS Amplify Backend    │
                    └──────────────┬────────────┘
                                   │
              ┌────────────────────┼────────────────┐
              │                    │                │
         ┌────▼────┐          ┌────▼────┐     ┌────▼────┐
         │   SES   │          │   API   │     │ Hosting │
         │ (Email) │          │ Gateway │     │   S3    │
         └─────────┘          └─────────┘     └─────────┘
```

### Technology Stack

- **Frontend**: React 18+ with functional components and hooks
- **Styling**: Tailwind CSS with black and white color scheme
- **State Management**: React local component state
- **Backend**: AWS Amplify (API for email functionality)
- **Email Service**: AWS SES (Simple Email Service) via Amplify API
- **Hosting**: AWS Amplify Hosting

### Design System

**Color Palette:**
- Primary: Black (#000000)
- Secondary: White (#FFFFFF)
- Shades: Gray-50 through Gray-900 for depth and hierarchy
- Text on white backgrounds: Black or dark gray
- Text on black backgrounds: White or light gray

**Typography:**
- Clean, modern sans-serif font (e.g., Inter, Helvetica, or system fonts)
- Clear hierarchy with varied font sizes and weights

## Components and Interfaces

### Frontend Components

#### 1. App Component
Root component that manages routing and global state.

```javascript
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ContentSection />
        <SurveySection />
      </main>
      <Footer />
    </div>
  );
}
```

#### 1. App Component
Root component that manages the overall layout and survey modal state.

```javascript
function App() {
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onBookNowClick={() => setShowSurvey(true)} />
      <main>
        <AboutSection />
        <PersonalTrainingSection onBookNowClick={() => setShowSurvey(true)} />
      </main>
      <Footer />

      {showSurvey && (
        <SurveyModal onClose={() => setShowSurvey(false)} />
      )}
    </div>
  );
}
```

#### 2. Header Component
Displays logo and website title in top-left corner.

```javascript
function Header({ onBookNowClick }) {
  return (
    <header className="bg-black text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-12"
        />
        <h1 className="text-2xl font-bold">[Website Title]</h1>
      </div>
      <button
        onClick={onBookNowClick}
        className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
      >
        Book Now
      </button>
    </header>
  );
}
```

#### 3. AboutSection Component
Displays headshot, bio, credentials, and fitness philosophy.

```javascript
function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-black mb-12">About</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            src="/headshot.jpg"
            alt="Trainer headshot"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-black mb-3">Bio</h3>
            <p className="text-gray-800 leading-relaxed">
              [Bio content goes here]
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-black mb-3">Credentials</h3>
            <ul className="text-gray-800 space-y-2">
              <li>[Credential 1]</li>
              <li>[Credential 2]</li>
              <li>[Credential 3]</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-black mb-3">Fitness Philosophy</h3>
            <p className="text-gray-800 leading-relaxed">
              [Fitness philosophy content goes here]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### 4. PersonalTrainingSection Component
Displays personal training information including screening, programming, benefits, Falcon, and packages.

```javascript
function PersonalTrainingSection({ onBookNowClick }) {
  return (
    <section className="bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Personal Training</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Screening & Assessment Process</h3>
            <p className="text-gray-300 leading-relaxed">
              [Screening and assessment process description]
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Exercise Programming Approach</h3>
            <p className="text-gray-300 leading-relaxed">
              [Exercise programming approach description]
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Benefits</h3>
            <p className="text-gray-300 leading-relaxed">
              [Benefits description]
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Falcon</h3>
            <p className="text-gray-300 leading-relaxed">
              [Falcon description]
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg">
          <h3 className="text-3xl font-bold mb-6">Packages & Rates</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <span className="text-xl">[Package 1 Name]</span>
              <span className="text-xl font-bold">[Price]</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <span className="text-xl">[Package 2 Name]</span>
              <span className="text-xl font-bold">[Price]</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <span className="text-xl">[Package 3 Name]</span>
              <span className="text-xl font-bold">[Price]</span>
            </div>
          </div>

          <button
            onClick={onBookNowClick}
            className="w-full bg-white text-black px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-200 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
```

#### 5. SurveyModal Component
Modal that appears when "Book Now" is clicked, containing the survey form.

```javascript
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

    setIsSubmitting(true);
    try {
      await sendSurveyEmail(formData);
      setSubmitted(true);
    } catch (error) {
      setErrors({ submit: 'Failed to submit survey. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <h3 className="text-2xl font-bold text-black mb-4">Thank You!</h3>
          <p className="text-gray-800 mb-6">
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">Book Your Session</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              What are your fitness goals? *
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            />
            {errors.goals && <p className="text-red-600 text-sm mt-1">{errors.goals}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Experience Level
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Availability
            </label>
            <textarea
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              rows={2}
              placeholder="e.g., Weekday mornings, Weekend afternoons"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            />
          </div>

          {errors.submit && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### Backend Services (AWS Amplify)

#### API Layer
Amplify API provides a REST endpoint for sending emails via AWS SES.

```javascript
// amplify/backend/function/sendSurveyEmail/src/index.js
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { name, email, phone, goals, experience, availability } = body;

  const emailParams = {
    Source: process.env.BUSINESS_EMAIL,
    Destination: {
      ToAddresses: [process.env.BUSINESS_EMAIL]
    },
    Message: {
      Subject: {
        Data: `New Fitness Survey Submission from ${name}`
      },
      Body: {
        Text: {
          Data: `
New Survey Submission:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Fitness Goals: ${goals}
Experience Level: ${experience || 'Not provided'}
Availability: ${availability || 'Not provided'}

Submitted at: ${new Date().toISOString()}
          `
        }
      }
    }
  };

  try {
    await ses.sendEmail(emailParams).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({ message: 'Survey submitted successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
```

#### Email Service Function

```javascript
// Frontend API call
async function sendSurveyEmail(formData) {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/survey`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
  );

  if (!response.ok) {
    throw new Error('Failed to submit survey');
  }

  return response.json();
}
```

## Data Models

### SurveyFormData (Frontend)
```typescript
interface SurveyFormData {
  name: string;           // Required
  email: string;          // Required
  phone?: string;         // Optional
  goals: string;          // Required
  experience?: string;    // Optional (beginner/intermediate/advanced)
  availability?: string;  // Optional
}
```

### AboutContent (Frontend)
```typescript
interface AboutContent {
  headshotUrl: string;
  bio: string;
  credentials: string[];
  fitnessPhilosophy: string;
}
```

### PersonalTrainingContent (Frontend)
```typescript
interface PersonalTrainingContent {
  screening: string;
  programming: string;
  benefits: string;
  falcon: string;
  packages: Package[];
}

interface Package {
  name: string;
  price: string;
  description?: string;
}
```

Note: Survey data is sent via email and not persisted in a database. Content is stored as static data in the React application.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: About section renders all content
*For any* About content configuration (headshot, bio, credentials, philosophy), when rendered by the Website, all content elements should appear in the output.
**Validates: Requirements 1.1, 1.2**

### Property 2: Personal Training section renders all subsections
*For any* Personal Training content configuration, when rendered by the Website, all subsections (screening, programming, benefits, Falcon, packages) should appear in the output.
**Validates: Requirements 1.1, 1.2**

### Property 3: Book Now button triggers survey modal
*For any* state of the application, when the Book Now button is clicked, the survey modal should be displayed.
**Validates: Requirements 2.1**

### Property 4: Incomplete survey validation
*For any* survey with required fields (name, email, goals), when submitted with missing required field values, the Website should display validation errors and prevent the submission from being sent.
**Validates: Requirements 2.2, 2.4**

### Property 5: Survey email delivery
*For any* valid survey response data, when submitted, the email service should successfully send an email containing all the survey data to the business owner.
**Validates: Requirements 2.3**

### Property 6: Survey confirmation display
*For any* successfully submitted survey, the Website should display a confirmation message to the user within the modal.
**Validates: Requirements 2.5**

## Error Handling

### Survey Validation Errors
- Empty required fields: Display field-specific error messages below each field
- Invalid email format: Show "Please enter a valid email address"
- Network failures during submission: Display retry option with error message
- Email service failures: Show "Failed to submit survey. Please try again."

### General Error Handling
- API failures: Show user-friendly error messages and log technical details to console
- Loading states: Display loading indicators during async operations (email sending)
- Form state preservation: Maintain form data if submission fails so user doesn't lose their input

## Testing Strategy

### Dual Testing Approach

This application requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

### Unit Testing

Unit tests should focus on:
- Specific examples of content rendering (About section with specific bio, Personal Training with specific packages)
- Edge cases like empty survey submissions or invalid email formats
- Error conditions such as network failures or email service errors
- Form validation logic for required fields
- User interaction flows (Book Now button click, modal open/close, form submission)
- Modal state management

Example unit tests:
- Test that clicking Book Now opens the survey modal
- Test that submitting an empty required field shows an error
- Test that invalid email format triggers validation error
- Test that confirmation message appears after successful survey submission
- Test that closing modal resets form state

### Property-Based Testing

Property-based tests should use a JavaScript PBT library such as **fast-check** or **jsverify**.

Configuration:
- Each property test should run a minimum of 100 iterations
- Each test must reference its design document property using a comment tag
- Tag format: `// Feature: fitness-website, Property {number}: {property_text}`

Property tests should focus on:
- Universal properties that hold for all inputs
- Comprehensive input coverage through randomization
- Email delivery verification (using mocked SES)
- Invariants that must hold across all operations

Example property tests:
- For any About content, all elements should render (Property 1)
- For any Personal Training content, all subsections should render (Property 2)
- For any survey with required fields, incomplete submission should show errors (Property 4)
- For any valid survey data, email should be sent with all fields (Property 5)

Each correctness property listed above should be implemented as a single property-based test.

### Testing Tools

- **Unit Testing**: Jest + React Testing Library
- **Property-Based Testing**: fast-check
- **Integration Testing**: Cypress or Playwright for end-to-end flows
- **AWS Services Testing**: Mock AWS SES calls in tests using Jest mocks or aws-sdk-mock

### Test Coverage Goals

- Minimum 80% code coverage for business logic
- All 6 correctness properties implemented as property-based tests
- All error handling paths covered by unit tests
- Critical user flows (content display, Book Now flow, survey submission) covered by integration tests
