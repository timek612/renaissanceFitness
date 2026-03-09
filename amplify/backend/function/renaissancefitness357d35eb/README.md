# Survey Email Lambda Function

This Lambda function handles survey submissions from the fitness website and sends them via email using AWS SES.

## Configuration Steps

Follow these steps in order to configure AWS SES:

### 1. Verify Your Email Address

Before you can send emails, you must verify your business email address in AWS SES:

```bash
# Open AWS Console and navigate to Amazon SES
# Follow the detailed steps in SES_SETUP_GUIDE.md
```

See [SES_SETUP_GUIDE.md](./SES_SETUP_GUIDE.md) for detailed instructions.

### 2. Update Business Email

Edit the CloudFormation template to use your verified email:

**File**: `renaissancefitness357d35eb-cloudformation-template.json`

Find this line:
```json
"BUSINESS_EMAIL": "owner@example.com"
```

Replace with your verified email:
```json
"BUSINESS_EMAIL": "your-verified-email@example.com"
```

### 3. Verify Configuration

Run the verification script to check everything is set up correctly:

```bash
BUSINESS_EMAIL=your-verified-email@example.com node verify-ses-config.js
```

This will check:
- AWS credentials are configured
- SES service is accessible
- Your email is verified in SES
- SES sending limits and sandbox status

### 4. Deploy Changes

Deploy the updated configuration to AWS:

```bash
amplify push
```

### 5. Test Email Sending

Send a test email to verify everything works:

```bash
BUSINESS_EMAIL=your-verified-email@example.com node test-email.js
```

Check your inbox for the test email (including spam folder).

## Files in This Directory

- `index.js` - Lambda function handler code
- `package.json` - Node.js dependencies
- `event.json` - Sample event for local testing
- `SES_SETUP_GUIDE.md` - Detailed AWS SES setup instructions
- `SES_CONFIGURATION_CHECKLIST.md` - Step-by-step checklist
- `verify-ses-config.js` - Script to verify SES configuration
- `test-email.js` - Script to test email sending
- `renaissancefitness357d35eb-cloudformation-template.json` - AWS infrastructure definition

## Troubleshooting

### Email not received
- Verify email address is verified in SES console (shows "Verified" status)
- Check CloudWatch logs for Lambda errors
- Check spam/junk folder
- Ensure you're using the correct AWS region

### Permission errors
- Verify CloudFormation template has SES permissions (already configured)
- Check Lambda execution role in AWS IAM console
- Ensure `amplify push` completed successfully

### SES Sandbox limitations
In sandbox mode, you can only send emails TO verified addresses. To send to any email:
1. Go to SES console → "Account dashboard"
2. Click "Request production access"
3. Complete the request form
4. Wait for AWS approval

## Lambda Function Details

**Runtime**: Node.js 20.x
**Timeout**: 25 seconds
**Memory**: Default (128 MB)
**Permissions**: CloudWatch Logs, SES SendEmail

The function validates required fields (name, email, goals) and sends formatted emails to the business owner.
