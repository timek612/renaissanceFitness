# Implementation Plan: Personal Fitness Website

## Overview

This implementation plan breaks down the development of a personal fitness website into discrete coding tasks. The website will be built with React and Tailwind CSS, featuring a black and white color scheme, and deployed on AWS Amplify. The implementation follows a component-based approach, building from the foundation up through individual sections, then integrating the survey functionality and AWS backend.

## Tasks

- [x] 1. Set up project structure and dependencies
  - Initialize React app with Create React App or Vite
  - Install and configure Tailwind CSS with black/white color customization
  - Set up project folder structure (components, utils, assets)
  - Configure environment variables for API endpoints
  - _Requirements: 3.1, 3.4_

- [x] 2. Create Header component
  - [x] 2.1 Implement Header component with logo and title
    - Create Header.jsx with logo image placeholder and title text
    - Style with Tailwind: black background, white text, flexbox layout
    - Add Book Now button in header
    - _Requirements: 1.1, 2.1_

  - [ ]* 2.2 Write property test for Header rendering
    - **Property 1: About section renders all content**
    - **Validates: Requirements 1.1, 1.2**

  - [ ]* 2.3 Write unit tests for Header component
    - Test logo and title render correctly
    - Test Book Now button click handler
    - _Requirements: 1.1, 2.1_

- [-] 3. Create About section component
  - [x] 3.1 Implement AboutSection component
    - Create AboutSection.jsx with grid layout for headshot and text content
    - Add sections for bio, credentials (list), and fitness philosophy
    - Style with Tailwind: white background, black text, responsive grid
    - Use placeholder content for all text fields
    - _Requirements: 1.2_

  - [ ]* 3.2 Write property test for About section
    - **Property 1: About section renders all content**
    - **Validates: Requirements 1.1, 1.2**

  - [ ]* 3.3 Write unit tests for AboutSection
    - Test all subsections render (bio, credentials, philosophy)
    - Test responsive layout behavior
    - _Requirements: 1.2_

- [x] 4. Create Personal Training section component
  - [x] 4.1 Implement PersonalTrainingSection component
    - Create PersonalTrainingSection.jsx with black background
    - Add grid layout for screening, programming, benefits, and Falcon subsections
    - Create packages display with pricing table
    - Add Book Now button at bottom of packages section
    - Style with Tailwind: black background, white text, gray-900 cards
    - _Requirements: 1.3, 2.1_

  - [ ]* 4.2 Write property test for Personal Training section
    - **Property 2: Personal Training section renders all subsections**
    - **Validates: Requirements 1.1, 1.2**

  - [ ]* 4.3 Write unit tests for PersonalTrainingSection
    - Test all subsections render correctly
    - Test packages display with pricing
    - Test Book Now button click handler
    - _Requirements: 1.3, 2.1_

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create survey modal component
  - [x] 6.1 Implement SurveyModal component structure
    - Create SurveyModal.jsx with modal overlay and content container
    - Add form fields: name, email, phone, goals, experience, availability
    - Implement form state management with useState
    - Add close button and modal backdrop click handling
    - Style with Tailwind: white modal on black semi-transparent backdrop
    - _Requirements: 2.2, 2.3_

  - [x] 6.2 Implement form validation logic
    - Create validateForm utility function
    - Validate required fields: name, email, goals
    - Validate email format using regex
    - Display field-specific error messages
    - _Requirements: 2.4, 2.6_

  - [ ]* 6.3 Write property test for Book Now button triggering modal
    - **Property 3: Book Now button triggers survey modal**
    - **Validates: Requirements 2.1**

  - [ ]* 6.4 Write property test for incomplete survey validation
    - **Property 4: Incomplete survey validation**
    - **Validates: Requirements 2.2, 2.4**

  - [ ]* 6.5 Write unit tests for SurveyModal
    - Test modal opens and closes correctly
    - Test form field inputs update state
    - Test validation errors display for empty required fields
    - Test invalid email format shows error
    - _Requirements: 2.2, 2.3, 2.4, 2.6_

- [x] 7. Implement survey submission confirmation
  - [x] 7.1 Add confirmation state and UI
    - Add submitted state to SurveyModal
    - Create confirmation message UI within modal
    - Add close button to confirmation view
    - Style confirmation with Tailwind
    - _Requirements: 2.7_

  - [ ]* 7.2 Write property test for survey confirmation display
    - **Property 6: Survey confirmation display**
    - **Validates: Requirements 2.5**

  - [ ]* 7.3 Write unit tests for confirmation flow
    - Test confirmation message displays after successful submission
    - Test close button on confirmation resets modal
    - _Requirements: 2.7_

- [ ] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Set up AWS Amplify backend
  - [x] 9.1 Initialize Amplify project
    - Run `amplify init` to set up Amplify project
    - Configure Amplify with project settings
    - _Requirements: 3.1_

  - [x] 9.2 Create Lambda function for email sending
    - Run `amplify add function` to create sendSurveyEmail function
    - Implement Lambda handler to send emails via AWS SES
    - Configure environment variables for business owner email
    - Add error handling and logging
    - _Requirements: 3.2, 3.3_

  - [x] 9.3 Create API endpoint
    - Run `amplify add api` to create REST API
    - Configure POST endpoint /survey to trigger Lambda function
    - Enable CORS for frontend access
    - _Requirements: 3.2, 3.3_

  - [x] 9.4 Configure AWS SES
    - Verify business owner email address in AWS SES
    - Configure SES permissions for Lambda function
    - Test email sending from Lambda
    - _Requirements: 3.2, 3.3_

- [ ] 10. Integrate frontend with AWS backend
  - [ ] 10.1 Implement sendSurveyEmail API call
    - Create API utility function to call Amplify endpoint
    - Add error handling for network failures
    - Add loading state during submission
    - _Requirements: 2.5, 3.3_

  - [] 10.2 Connect SurveyModal to API
    - Call sendSurveyEmail on form submission
    - Handle success and error responses
    - Display error message on failure
    - Show confirmation on success
    - _Requirements: 2.5, 2.7_

  - [ ]* 10.3 Write property test for survey email delivery
    - **Property 5: Survey email delivery**
    - **Validates: Requirements 2.3**
    - Use mocked AWS SES for testing

  - [ ]* 10.4 Write integration tests for survey submission
    - Test complete flow from form submission to email sending
    - Test error handling for API failures
    - Test loading states during submission
    - _Requirements: 2.5, 2.7_

- [] 11. Create main App component and integrate all sections
  - [] 11.1 Implement App component
    - Create App.jsx with survey modal state management
    - Import and render Header, AboutSection, PersonalTrainingSection
    - Add Footer component (simple black background with white text)
    - Pass onBookNowClick handler to Header and PersonalTrainingSection
    - Conditionally render SurveyModal based on state
    - _Requirements: 1.1, 1.2, 1.3, 2.1_

  - [ ]* 11.2 Write integration tests for App component
    - Test all sections render on page load
    - Test Book Now button in header opens modal
    - Test Book Now button in Personal Training section opens modal
    - Test modal closes correctly
    - _Requirements: 1.1, 1.2, 1.3, 2.1_

- [] 12. Implement responsive design
  - [] 12.1 Add responsive breakpoints
    - Configure Tailwind breakpoints for mobile, tablet, desktop
    - Test layouts at different screen sizes
    - Adjust grid layouts for mobile (single column)
    - Ensure modal is responsive and scrollable on mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 12.2 Write unit tests for responsive behavior
    - Test component rendering at different viewport sizes
    - Test modal scrollability on small screens
    - _Requirements: 4.1, 4.2, 4.3_

- [] 13. Deploy to AWS Amplify
  - [] 13.1 Configure Amplify hosting
    - Run `amplify add hosting` to set up hosting
    - Configure build settings for React app
    - _Requirements: 3.1, 3.4_

  - [x] 13.2 Deploy application
    - Run `amplify push` to deploy backend resources
    - Run `amplify publish` to deploy frontend
    - Verify deployment and test live site
    - _Requirements: 3.1, 3.4_

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- The implementation builds incrementally: structure → components → integration → backend → deployment
