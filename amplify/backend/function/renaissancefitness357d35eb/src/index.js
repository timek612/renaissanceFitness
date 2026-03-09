const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: process.env.AWS_REGION || 'us-east-1' });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    try {
        // Parse request body
        const body = JSON.parse(event.body);
        const { name, email, phone, goals, experience, availability } = body;

        // Validate required fields
        if (!name || !email || !goals) {
            console.error('Missing required fields:', { name: !!name, email: !!email, goals: !!goals });
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify({ error: 'Missing required fields: name, email, and goals are required' })
            };
        }

        // Get business owner email from environment variable
        const businessEmail = process.env.BUSINESS_EMAIL;
        if (!businessEmail) {
            console.error('BUSINESS_EMAIL environment variable not configured');
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify({ error: 'Email service not configured' })
            };
        }

        // Prepare email parameters
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

        // Send email via AWS SES
        console.log('Sending email to:', businessEmail);
        await ses.sendEmail(emailParams).promise();
        console.log('Email sent successfully');

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ message: 'Survey submitted successfully' })
        };

    } catch (error) {
        console.error('Error processing survey submission:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
};
