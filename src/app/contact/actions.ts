"use server";
import nodemailer from "nodemailer";

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export async function submitEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const website = formData.get("website") as string;
  const building = formData.get("building") as string;
  const provider = formData.get("provider") as string;
  const message = formData.get("message") as string;

  const htmlContent = `
    <h2>New Website Enquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Website:</strong> ${website}</p>
    <p><strong>What they are building:</strong> ${building}</p>
    <p><strong>Current AI provider:</strong> ${provider}</p>
    <br/>
    <h3>Message:</h3>
    <p>${message.replace(/\n/g, '<br/>')}</p>
  `;

  try {
    if (process.env.SMTP_PASSWORD && process.env.SMTP_PASSWORD !== "your-gmail-16-digit-app-password-here") {
      const transporter = getTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: "aegis.ai.redteam@gmail.com",
        subject: "New Enquiry - Aegis Website",
        html: htmlContent,
        replyTo: email,
      });
      console.log("Real email sent successfully via Nodemailer!");
    } else {
      console.log("--- MOCK EMAIL ENQUIRY (No SMTP_PASSWORD set in .env.local) ---");
      console.log(htmlContent);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Email delivery failed." };
  }
}

export async function submitFeedback(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const feedback = formData.get("feedback") as string;

  const htmlContent = `
    <h2>Website Feedback</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <br/>
    <h3>Feedback:</h3>
    <p>${feedback.replace(/\n/g, '<br/>')}</p>
  `;

  try {
    if (process.env.SMTP_PASSWORD && process.env.SMTP_PASSWORD !== "your-gmail-16-digit-app-password-here") {
      const transporter = getTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: "aegis.ai.redteam@gmail.com",
        subject: "Website Feedback - Aegis",
        html: htmlContent,
        replyTo: email,
      });
      console.log("Real feedback email sent successfully via Nodemailer!");
    } else {
      console.log("--- MOCK EMAIL FEEDBACK (No SMTP_PASSWORD set in .env.local) ---");
      console.log(htmlContent);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to send feedback email:", error);
    return { success: false, error: "Email delivery failed." };
  }
}
