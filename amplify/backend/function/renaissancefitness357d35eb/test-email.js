#!/usr/bin/env node

/**
 * Test script for AWS SES email sending
 *
 * This script tests the Lambda function's email sending capability
 * by invoking it locally with test data.
 *
 * Usage:
 *   node test-email.js
 *
 * Prerequisites:
 *   - AWS credentials configured (via AWS CLI or environment variables)
 *   - Business email verified in AWS SES
 *   - BUSINESS_EMAIL environment variable set
 */

const AWS = require('aws-sdk');

// Configuration
const REGION = process.env.AWS_REGION || 'us-east-1';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'owner@example.com';

// Initialize SES client
const ses = new AWS.SES({ region: REGION });

// Test survey data
const testSurveyData = {
    name: 'Test User',
    email: 'testuser@example.com',
    phone: '555-0123',
    goals: 'Build strength and improve overall fitness',
    experience: 'intermediate',
    availability: 'Weekday evenings'
};

async function testEmailSending() {
    console.log('🧪 Testing AWS SES Email Sending...\n');
    console.log('Configuration:');
    console.log(`  Region: ${REGION}`);
    console.log(`  Business Email: ${BUSINESS_EMAIL}`);
    console.log(`  Test Data:`, testSurveyData);
    console.log('\n---\n');

    // Prepare email parameters
    const emailParams = {
        Source: BUSINESS_EMAIL,
        Destination: {
            ToAddresses: [BUSINESS_EMAIL]
        },
        Message: {
            Subject: {
                Data: `[TEST] New Fitness Survey Submission from ${testSurveyData.name}`
            },
            Body: {
                Text: {
                    Data: `
🧪 THIS IS A TEST EMAIL 🧪

New Survey Submission:

Name: ${testSurveyData.name}
Email: ${testSurveyData.email}
Phone: ${testSurveyData.phone || 'Not provided'}
Fitness Goals: ${testSurveyData.goals}
Experience Level: ${testSurveyData.experience || 'Not provided'}
Availability: ${testSurveyData.availability || 'Not provided'}

Submitted at: ${new Date().toISOString()}
          `
                }
            }
        }
    };

    try {
        console.log('📧 Sending test email...');
        const result = await ses.sendEmail(emailParams).promise();
        console.log('✅ Email sent successfully!');
        console.log(`   Message ID: ${result.MessageId}`);
        console.log('\n📬 Check your inbox at:', BUSINESS_EMAIL);
        console.log('   (Don\'t forget to check spam/junk folder)\n');
        return true;
    } catch (error) {
        console.error('❌ Failed to send email:\n');

        if (error.code === 'MessageRejected') {
            console.error('   Error: Email address not verified in SES');
            console.error('   Action: Verify your email address in AWS SES console');
        } else if (error.code === 'AccessDenied') {
            console.error('   Error: Insufficient permissions');
            console.error('   Action: Check IAM role has ses:SendEmail permission');
        } else if (error.code === 'ConfigurationSetDoesNotExist') {
            console.error('   Error: SES configuration issue');
            console.error('   Action: Check SES setup in AWS console');
        } else {
            console.error('   Error:', error.message);
            console.error('   Code:', error.code);
        }

        console.error('\n📖 See SES_SETUP_GUIDE.md for troubleshooting steps\n');
        return false;
    }
}

// Run the test
testEmailSending()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
