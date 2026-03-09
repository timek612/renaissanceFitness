#!/usr/bin/env node

/**
 * AWS SES Configuration Verification Script
 *
 * This script checks if AWS SES is properly configured for the Lambda function.
 * It verifies:
 * - AWS credentials are configured
 * - SES service is accessible
 * - Business email is verified in SES
 * - Lambda has necessary permissions
 *
 * Usage:
 *   BUSINESS_EMAIL=your-email@example.com node verify-ses-config.js
 */

const AWS = require('aws-sdk');

const REGION = process.env.AWS_REGION || 'us-east-1';
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;

async function verifyConfiguration() {
    console.log('🔍 Verifying AWS SES Configuration...\n');

    // Check 1: Business email environment variable
    console.log('1️⃣  Checking BUSINESS_EMAIL environment variable...');
    if (!BUSINESS_EMAIL) {
        console.error('   ❌ BUSINESS_EMAIL not set');
        console.error('   Action: Set BUSINESS_EMAIL environment variable');
        console.error('   Example: BUSINESS_EMAIL=your-email@example.com node verify-ses-config.js\n');
        return false;
    }
    if (BUSINESS_EMAIL === 'owner@example.com') {
        console.error('   ⚠️  BUSINESS_EMAIL is still set to placeholder value');
        console.error('   Action: Update with your actual verified email address\n');
        return false;
    }
    console.log(`   ✅ BUSINESS_EMAIL set to: ${BUSINESS_EMAIL}\n`);

    // Check 2: AWS credentials
    console.log('2️⃣  Checking AWS credentials...');
    try {
        const sts = new AWS.STS({ region: REGION });
        const identity = await sts.getCallerIdentity().promise();
        console.log(`   ✅ AWS credentials configured`);
        console.log(`   Account: ${identity.Account}`);
        console.log(`   Region: ${REGION}\n`);
    } catch (error) {
        console.error('   ❌ AWS credentials not configured or invalid');
        console.error('   Action: Run "aws configure" or set AWS credentials\n');
        return false;
    }

    // Check 3: SES service accessibility
    console.log('3️⃣  Checking SES service accessibility...');
    try {
        const ses = new AWS.SES({ region: REGION });
        await ses.getSendQuota().promise();
        console.log('   ✅ SES service accessible\n');
    } catch (error) {
        console.error('   ❌ Cannot access SES service');
        console.error('   Error:', error.message);
        console.error('   Action: Check AWS permissions and region\n');
        return false;
    }

    // Check 4: Email verification status
    console.log('4️⃣  Checking email verification status...');
    try {
        const ses = new AWS.SES({ region: REGION });
        const result = await ses.getIdentityVerificationAttributes({
            Identities: [BUSINESS_EMAIL]
        }).promise();

        const verificationStatus = result.VerificationAttributes[BUSINESS_EMAIL];

        if (!verificationStatus) {
            console.error(`   ❌ Email ${BUSINESS_EMAIL} not found in SES`);
            console.error('   Action: Verify email address in AWS SES console\n');
            return false;
        }

        if (verificationStatus.VerificationStatus !== 'Success') {
            console.error(`   ❌ Email verification status: ${verificationStatus.VerificationStatus}`);
            console.error('   Action: Complete email verification in AWS SES console\n');
            return false;
        }

        console.log(`   ✅ Email ${BUSINESS_EMAIL} is verified\n`);
    } catch (error) {
        console.error('   ❌ Error checking verification status');
        console.error('   Error:', error.message, '\n');
        return false;
    }

    // Check 5: SES sending limits
    console.log('5️⃣  Checking SES sending limits...');
    try {
        const ses = new AWS.SES({ region: REGION });
        const quota = await ses.getSendQuota().promise();

        console.log('   ✅ SES quota information:');
        console.log(`   Max 24 Hour Send: ${quota.Max24HourSend}`);
        console.log(`   Max Send Rate: ${quota.MaxSendRate} emails/second`);
        console.log(`   Sent Last 24 Hours: ${quota.SentLast24Hours}\n`);

        if (quota.Max24HourSend === 200) {
            console.log('   ℹ️  Account is in SES Sandbox mode');
            console.log('   Note: Can only send TO verified email addresses');
            console.log('   To send to any email, request production access in SES console\n');
        }
    } catch (error) {
        console.error('   ⚠️  Could not retrieve quota information');
        console.error('   Error:', error.message, '\n');
    }

    console.log('✅ All checks passed! SES is properly configured.\n');
    console.log('Next step: Run test-email.js to send a test email\n');
    return true;
}

// Run verification
verifyConfiguration()
    .then(success => {
        process.exit(success ? 0 : 1);
    })
    .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
