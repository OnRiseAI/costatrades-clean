interface QuoteEmailData {
  tradesperson: {
    businessName: string;
    email?: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    postcode: string;
  };
  jobDetails: {
    description: string;
    timing: string;
  };
}

const getTimingLabel = (timing: string): string => {
  const timingLabels: Record<string, string> = {
    flexible: "I'm flexible on the start date",
    urgent: "It's urgent (within 48 hours)",
    "2weeks": "Within 2 weeks",
    "1month": "Within 1 month",
    budgeting: "I'm budgeting / researching",
  };
  return timingLabels[timing] || timing;
};

export function generateQuoteEmailHTML(data: QuoteEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f3f4f6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #0a1f44 0%, #1e3a8a 100%);
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            color: #e0e7ff;
            margin: 10px 0 0;
            font-size: 16px;
        }
        .content {
            padding: 40px 30px;
        }
        .section {
            margin-bottom: 35px;
        }
        .section-title {
            color: #0a1f44;
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
        }
        .info-card {
            background-color: #f9fafb;
            border-left: 4px solid #0a1f44;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        .info-row {
            display: flex;
            margin-bottom: 12px;
        }
        .info-row:last-child {
            margin-bottom: 0;
        }
        .info-label {
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            min-width: 120px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-value {
            color: #111827;
            font-size: 16px;
            font-weight: 500;
        }
        .job-description {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            color: #374151;
            font-size: 15px;
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .badge {
            display: inline-block;
            background-color: #dbeafe;
            color: #1e40af;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            color: #6b7280;
            font-size: 14px;
            margin: 0 0 10px;
        }
        .footer a {
            color: #0a1f44;
            text-decoration: none;
            font-weight: 600;
        }
        .cta-button {
            display: inline-block;
            background-color: #0a1f44;
            color: #ffffff;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            margin-top: 20px;
        }
        .highlight-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #93c5fd;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
        }
        .highlight-box h2 {
            color: #1e40af;
            margin: 0 0 10px;
            font-size: 20px;
        }
        .highlight-box p {
            color: #1e3a8a;
            margin: 0;
            font-size: 15px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>🔔 New Quote Request</h1>
            <p>You have received a new quote request from Costa del Sol TradeFinder</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Highlight -->
            <div class="highlight-box">
                <h2>Action Required</h2>
                <p>A customer is interested in your services. Review the details below and respond promptly!</p>
            </div>

            <!-- Customer Information -->
            <div class="section">
                <h2 class="section-title">👤 Customer Information</h2>
                <div class="info-card">
                    <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${data.customer.firstName} ${data.customer.lastName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value"><a href="mailto:${data.customer.email}" style="color: #0a1f44; text-decoration: none;">${data.customer.email}</a></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Phone:</span>
                        <span class="info-value"><a href="tel:${data.customer.phone}" style="color: #0a1f44; text-decoration: none;">${data.customer.phone}</a></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Postcode:</span>
                        <span class="info-value">${data.customer.postcode}</span>
                    </div>
                </div>
            </div>

            <!-- Job Details -->
            <div class="section">
                <h2 class="section-title">📋 Job Details</h2>
                <div class="info-card">
                    <div class="info-row">
                        <span class="info-label">Timing:</span>
                        <span class="badge">${getTimingLabel(data.jobDetails.timing)}</span>
                    </div>
                </div>
                <p style="margin: 15px 0 8px; color: #374151; font-weight: 600; font-size: 14px;">Job Description:</p>
                <div class="job-description">${data.jobDetails.description}</div>
            </div>

            <!-- Specialist Info -->
            <div class="section">
                <h2 class="section-title">🏢 Request For</h2>
                <div class="info-card">
                    <div class="info-row">
                        <span class="info-label">Business:</span>
                        <span class="info-value">${data.tradesperson.businessName}</span>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div style="text-align: center; margin-top: 35px;">
                <a href="mailto:${data.customer.email}?subject=Re: Quote Request for ${data.tradesperson.businessName}" class="cta-button">
                    Reply to Customer
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Costa del Sol TradeFinder</strong></p>
            <p>Connecting homeowners with trusted professionals across Costa del Sol</p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                This email was sent because a customer requested a quote through your TradeFinder profile.
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();
}

export function generateQuoteEmailText(data: QuoteEmailData): string {
  return `
NEW QUOTE REQUEST

You have received a new quote request from Costa del Sol TradeFinder

CUSTOMER INFORMATION
Name: ${data.customer.firstName} ${data.customer.lastName}
Email: ${data.customer.email}
Phone: ${data.customer.phone}
Postcode: ${data.customer.postcode}

JOB DETAILS
Timing: ${getTimingLabel(data.jobDetails.timing)}

Job Description:
${data.jobDetails.description}

REQUEST FOR
Business: ${data.tradesperson.businessName}

---
Costa del Sol TradeFinder
Connecting homeowners with trusted professionals across Costa del Sol
  `.trim();
}
