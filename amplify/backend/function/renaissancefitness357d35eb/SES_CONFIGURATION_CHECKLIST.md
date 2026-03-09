# AWS SES Configuration Checklist

Complete these steps to configure AWS SES for your fitness website survey emails.

## ✅ Checklist

### 1. Verify Business Owner Email in AWS SES

- [ ] Log into AWS Console
- [ ] Navigate to Amazon SES service
- [ ] Click "Verified identities" in left sidebar
- [ ] Click "Create identity" button
- [ ] Select "Email address" as identity type
- [ ] Enter your business owner email address
- [ ] Click "Create identity"
- [ ] Check email inbox for verification email
- [ ] Click verification link in email
- [ ] Confirm email shows "Verified" status in SES console

### 2. Update Lambda Environment Variable

- [ ] Open file: `amplify/backend/function/renaissancefitness357d35eb/renaissancefitness357d35eb-cloudformation-template.json`
- [ ] Find the "Environment" section under "LambdaFunction" properties
- [ ] Replace `"BUSINESS_EMAIL": "owner@example.com"` with your verified email
- [ ] Save the file

### 3. Verify SES Permissions (Already Configured)

The Lambda function already has these permissions configured:
- ✅ `ses:SendEmail` - Allows sending emails
- ✅ `ses:SendRawEmail` - Allows sending raw email messages
- ✅ IAM role properly attached to Lambda function

No action needed for this step.

### 4. Deploy Backend Changes

Run this command to deploy your updated configuration:

```bash
amplify push
```

This will:
- Update the Lambda function with your business email
- Deploy the SES permissions
- Update the API Gateway endpoint

### 5. Test Email Sending

After deployment, test the email functionality:

```bash
cd amplify/backend/function/renaissancefitness357d35eb
BUSINESS_EMAIL=your-verified-email@example.com node test-email.js
```

Replace `your-verified-email@example.com` with your actual verified email.

Expected output:
```
✅ Email sent successfully!
   Message ID: [some-message-id]

📬 Check your inbox at: your-verified-email@example.com
```

### 6. Verify Email Received

- [ ] Check your business email inbox
- [ ] Look for email with subject: "[TEST] New Fitness Survey Submission from Test User"
- [ ] If not in inbox, check spam/junk folder
- [ ] Verify email contains all survey fields

## 🚨 Important Notes

### SES Sandbox Mode
By default, AWS SES accounts are in "Sandbox" mode with these limitations:
- Can only send TO verified email addresses
- Limited to 200 emails per day
- Maximum send rate of 1 email per second

For production use, request production access:
1. Go to SES console → "Account dashboard"
2. Click "Request production access"
3. Fill out the request form
4. Wait for AWS approval (usually 24-48 hours)

### Region Configuration
The Lambda function uses `us-east-1` by default. If you need a different region:
1. Update the region in `src/index.js`
2. Verify your email in that region's SES console
3. Redeploy with `amplify push`

## 📚 Additional Resources

- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [Amplify Lambda Functions](https://docs.amplify.aws/cli/function/)
- [SES Sandbox Mode](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
