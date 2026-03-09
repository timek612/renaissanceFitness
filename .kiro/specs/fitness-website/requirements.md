# Requirements Document

## Introduction

This document specifies the requirements for a personal fitness website built with React and AWS. The website features a black and white color scheme and includes: a header with logo and title, an About section (headshot, bio, credentials, fitness philosophy), a Personal Training section (screening process, programming approach, benefits, Falcon description, packages/rates), and a survey form triggered by a "Book Now" button that emails responses to the business owner.

## Glossary

- **Website**: The personal fitness web application
- **Header**: The top section containing logo and website title
- **About_Section**: Section displaying trainer information (headshot, bio, credentials, philosophy)
- **Personal_Training_Section**: Section displaying training services information
- **Book_Now_Button**: Button that triggers the survey modal
- **Survey_Modal**: Modal dialog containing the survey form
- **Survey**: A form that collects user information and fitness goals
- **User**: A visitor to the website who can view content and complete surveys
- **Survey_Response**: Data collected from a completed survey submission
- **Business_Owner**: The recipient of survey submission emails

## Requirements

### Requirement 1: Display Website Content

**User Story:** As a user, I want to view information about the trainer and services, so that I can learn about the fitness offerings.

#### Acceptance Criteria

1. THE Website SHALL display a Header with a logo in the top-left and website title
2. THE Website SHALL display an About_Section containing a headshot, bio, credentials, and fitness philosophy
3. THE Website SHALL display a Personal_Training_Section containing screening process, programming approach, benefits, Falcon description, and packages with rates
4. THE Website SHALL maintain readable formatting for all content across different screen sizes
5. THE Website SHALL use a black and white color scheme with black as primary and white as secondary

### Requirement 2: Survey Functionality

**User Story:** As a user, I want to complete a fitness survey after clicking "Book Now", so that I can provide my information and fitness goals to the business owner.

#### Acceptance Criteria

1. THE Website SHALL display a Book_Now_Button in the Header and Personal_Training_Section
2. WHEN a user clicks the Book_Now_Button, THE Website SHALL display the Survey_Modal
3. THE Survey_Modal SHALL contain form fields for name, email, phone, goals, experience level, and availability
4. WHEN a user submits the Survey, THE Website SHALL validate that required fields (name, email, goals) are completed
5. WHEN a user submits a valid Survey, THE Website SHALL send an email to the Business_Owner containing the Survey_Response
6. WHEN a user submits an incomplete Survey, THE Website SHALL display validation errors and prevent submission
7. WHEN a Survey is successfully submitted, THE Website SHALL display a confirmation message within the Survey_Modal

### Requirement 3: AWS Infrastructure

**User Story:** As a developer, I want the website deployed on AWS using Amplify, so that the application is scalable and maintainable.

#### Acceptance Criteria

1. THE Website SHALL be deployed using AWS Amplify
2. THE Website SHALL use AWS SES (Simple Email Service) for sending survey emails
3. WHEN a Survey is submitted, THE Website SHALL send the Survey_Response via AWS SES to the Business_Owner email address
4. THE Website SHALL serve static assets through AWS Amplify hosting

### Requirement 4: Responsive Design

**User Story:** As a user, I want the website to work on different devices, so that I can access it from my phone, tablet, or computer.

#### Acceptance Criteria

1. THE Website SHALL render correctly on mobile devices (screens < 768px wide)
2. THE Website SHALL render correctly on tablet devices (screens 768px - 1024px wide)
3. THE Website SHALL render correctly on desktop devices (screens > 1024px wide)
4. WHEN the screen size changes, THE Website SHALL adjust the layout without losing functionality
