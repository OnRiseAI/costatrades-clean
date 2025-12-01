import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { generateQuoteEmailHTML, generateQuoteEmailText } from "../templates/quote-email";

interface QuoteRequestBody {
  tradesperson: {
    businessName: string;
    slug: string;
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

export const handleSendQuote: RequestHandler = async (req, res) => {
  try {
    const quoteData = req.body as QuoteRequestBody;

    // Validate required fields
    if (!quoteData.customer?.email || !quoteData.customer?.firstName || !quoteData.jobDetails?.description) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Create a test account for development (use real SMTP in production)
    // For production, use environment variables for SMTP configuration
    let transporter;
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Production SMTP configuration
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development: Create a test account
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Generate email content
    const emailHTML = generateQuoteEmailHTML(quoteData);
    const emailText = generateQuoteEmailText(quoteData);

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Costa del Sol TradeFinder" <noreply@tradefinder.com>',
      to: "jon@onrise.ai",
      subject: `New Quote Request for ${quoteData.tradesperson.businessName}`,
      text: emailText,
      html: emailHTML,
    });

    console.log("Quote email sent:", info.messageId);
    
    // For development with Ethereal, log the preview URL
    if (!process.env.SMTP_HOST) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.status(200).json({ 
      success: true, 
      message: "Quote request sent successfully",
      messageId: info.messageId,
      previewUrl: process.env.SMTP_HOST ? undefined : nodemailer.getTestMessageUrl(info)
    });

  } catch (error) {
    console.error("Error sending quote email:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send quote request",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
