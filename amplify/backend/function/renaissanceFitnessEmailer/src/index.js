const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const ses = new SESClient({ region: 'us-east-1' });

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    try {
        body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (e) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ error: 'Invalid request body' })
        };
    }

    const { name, email, phone, goals, experience, availability } = body;

    const businessEmail = process.env.BUSINESS_EMAIL || 'aj.timek@gmail.com';

    const emailParams = {
        Source: 'Renaissance Fitness <aj.timek@gmail.com>',
        Destination: {
            ToAddresses: [businessEmail, 'renaissancepfllc@gmail.com']
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
        await ses.send(new SendEmailCommand(emailParams));
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
