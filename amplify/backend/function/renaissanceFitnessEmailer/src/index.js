const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const body = JSON.parse(event.body);
    const { name, email, phone, goals, experience, availability } = body;

    const businessEmail = process.env.BUSINESS_EMAIL || 'aj.timek@gmail.com';

    const emailParams = {
        Source: businessEmail,
        Destination: {
            ToAddresses: [businessEmail]
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
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ message: 'Survey submitted successfully' })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ error: 'Failed to send email', details: error.message })
        };
    }
};
