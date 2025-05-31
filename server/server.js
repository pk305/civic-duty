const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "../src")));

// Mailgun configuration
const Mailgun = require("mailgun.js");
const formData = require("form-data");
const mailgun = new Mailgun(formData);

// Initialize Mailgun client
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_URL || "https://api.mailgun.net", // Use EU endpoint if needed
});

// Recipients configuration
const recipients = {
  clerk: {
    name: "Clerk of the National Assembly",
    email: "clerk@parliament.go.ke,cna@parliament.go.ke",
  },
  finance: {
    name: "Finance Committee (Departmental Committee on Finance and National Planning)",
    email: "cna@parliament.go.ke",
  },
  speaker: {
    name: "Speaker of the National Assembly",
    email: "nationalassembly@parliament.go.ke",
  },
  treasury: {
    name: "Cabinet Secretary for the National Treasury",
    email: "cabinetsecretary@treasury.go.ke,pstnt@treasury.go.ke",
  },
  president: {
    name: "Office of the President",
    email: "info@statehouse.go.ke",
  },
  judiciary: {
    name: "Chief Justice of Kenya",
    email: "chiefjustice@court.go.ke,registrarsupremecourt@court.go.ke",
  },
};

// Email sending endpoint
app.post("/send-email", async (req, res) => {
  try {
    const { selectedRecipients, subject, content, senderName, senderEmail } =
      req.body;

    // Validation
    if (!selectedRecipients || selectedRecipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one recipient",
      });
    }

    if (!senderName || !senderEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name and email address",
      });
    }

    if (!subject || !content) {
      return res.status(400).json({
        success: false,
        message: "Subject and content are required",
      });
    }

    // Collect all recipient emails
    const recipientEmails = [];
    const recipientNames = [];

    selectedRecipients.forEach((recipientKey) => {
      if (recipients[recipientKey]) {
        const emails = recipients[recipientKey].email
          .split(",")
          .map((email) => email.trim());
        recipientEmails.push(...emails);
        recipientNames.push(recipients[recipientKey].name);
      }
    });

    // Remove duplicates
    const uniqueEmails = [...new Set(recipientEmails)];

    // Prepare email content
    const emailContent = content.replace("{{Name}}", senderName);
    const htmlContent = emailContent.replace(/\n/g, "<br>");

    // Send email using Mailgun
    const emailData = {
      from: `${senderName} <${process.env.MAILGUN_FROM_EMAIL}>`,
      to: uniqueEmails,
      subject: subject,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h2>OBJECTION TO THE FINANCE BILL 2025</h2>
            <p style="margin: 0; opacity: 0.9;">National Assembly Bills No. 19 of 2025</p>
          </div>
          <div style="padding: 30px; background: white;">
            ${htmlContent}
          </div>
          <div style="background: #f8f9fa; padding: 20px; border-top: 1px solid #e1e5e9; text-align: center; font-size: 12px; color: #666;">
            <p>This email was sent via the Government Petition Email Composer</p>
            <p>Sender: ${senderName} &lt;${senderEmail}&gt;</p>
          </div>
        </div>
      `,
      "h:Reply-To": senderEmail,
      "h:X-Mailgun-Variables": JSON.stringify({
        sender_name: senderName,
        sender_email: senderEmail,
        petition_type: "finance_bill_2025",
      }),
    };

    console.log("Sending email to:", uniqueEmails);
    console.log("From:", emailData.from);

    const result = await mg.messages.create(
      process.env.MAILGUN_DOMAIN,
      emailData
    );

    console.log("Email sent successfully:", result);

    res.json({
      success: true,
      message: `Email sent successfully to ${uniqueEmails.length} recipient(s)`,
      recipients: recipientNames,
      messageId: result.id,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    // Handle specific Mailgun errors
    let errorMessage = "Failed to send email. Please try again.";

    if (error.status === 401) {
      errorMessage =
        "Authentication failed. Please check Mailgun configuration.";
    } else if (error.status === 402) {
      errorMessage = "Payment required. Please check your Mailgun account.";
    } else if (error.status === 400) {
      errorMessage = "Invalid email data. Please check your input.";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    mailgun_configured: !!(
      process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN
    ),
  });
});

// Test endpoint to verify Mailgun configuration
app.get("/test-mailgun", async (req, res) => {
  try {
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      return res.json({
        configured: false,
        message: "Mailgun API key or domain not configured",
      });
    }

    // Test Mailgun connection by getting domain info
    const domain = await mg.domains.get(process.env.MAILGUN_DOMAIN);

    res.json({
      configured: true,
      domain: domain.name,
      state: domain.state,
    });
  } catch (error) {
    res.json({
      configured: false,
      error: error.message,
    });
  }
});

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
  console.log(
    `Mailgun configured: ${!!(
      process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN
    )}`
  );
});
