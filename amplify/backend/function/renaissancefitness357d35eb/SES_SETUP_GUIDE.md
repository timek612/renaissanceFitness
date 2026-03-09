# AWS SES Configuration Guide

## Overview
This guide walks you through configuring AWS SES to send emails from your Lambda function.

## Prerequisites
- AWS account with access to SES console
- Business owner email address to verify
- Amplify CLI configured with AWS credentials

## Step 1: Verify Business Owner Email Address

1. Open the AWS Console and navigate to Amazon SES
2. Go to "Verified identities" in the left sidebar
3. Click "Create identity"
4. Select "Email address"
5. Enter your business owner email address
6. Click "Create identity"
7. Check your email inbox for a verification email from AWS
8. Click the verification link in the email

**Note**: In SES Sandbox mode (default), you can only send emails TO verified addresses. To send to any email, you need to request production access.

## Step 2: Update Lambda Environment Variable

Update the BUSINESS_EMAIL environment variable in the CloudFormation template:

File: `amplify/backend/function/renaissancefitness357d35eb/renaissancefitness357d35eb-cloudformation-template.json`

Replace `"BUSINESS_EMAIL": "owner@example.com"` with your actual verified email address.

## Step 3: Verify SES Permissions

The Lambda function already has the required SES permissions configured:
- `ses:SendEmail`
- `ses:SendRawEmail`

These are defined in the CloudFormation template's IAM policy.

## Step 4: Deploy Changes

After updating the email address, deploy the changes:

```bash
amplify push
```

## Step 5: Test Email Sending

Use the provided test script to verify email sending works:

```bash
node amplify/backend/function/renaissancefitness357d35eb/test-email.js
```

## Troubleshooting

### Email not received
- Verify the email address is verified in SES console
- Check Lambda CloudWatch logs for errors
- Ensure you're in the correct AWS region (us-east-1 by default)
- Check spam/junk folder

### Permission errors
- Verify the Lambda execution role has SES permissions
- Check CloudFormation template has the SES policy statements

### SES Sandbox limitations
- In sandbox mode, you can only send TO verified email addresses
- To send to any email, request production access in SES console
- Go to "Account dashboard" → "Request production access"
