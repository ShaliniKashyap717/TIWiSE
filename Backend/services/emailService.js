const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailTemplates = {
  welcome: (fullName, unsubscribeLink) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2d3748; text-align: center;">Welcome to WanderWise Travel, ${fullName}!</h1>
      <p>Dear ${fullName},</p>
      <p>Thank you for subscribing to our travel newsletter. Here's what you can expect:</p>
      <ul>
        <li>Weekly curated travel destination highlights</li>
        <li>Exclusive hotel and flight deals</li>
        <li>Mood-based movie recommendations for travel inspiration</li>
        <li>Seasonal travel tips and packing guides</li>
      </ul>
      <p>Your first travel inspiration newsletter will arrive soon!</p>
      <p style="text-align: center; font-size: 12px; color: #718096; margin-top: 30px;">
        <small>You can check for more information  <a href="${unsubscribeLink||'http://localhost:8080/'}">here</a>.</small>
      </p>
    </div>
  `,

  newsletter: (fullName, unsubscribeLink, screenshotPath) => {
    const hasScreenshot = screenshotPath && fs.existsSync(screenshotPath);
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <h1 style="color: #2d3748; text-align: center;">WanderWise Travel Picks for ${fullName}</h1>
        ${hasScreenshot ? '<img src="cid:newsletter-screenshot" alt="Weekly Travel Newsletter" style="max-width: 100%; margin-bottom: 20px;">' : ''}
        <p>Dear ${fullName},</p>
        <p>Here are this week's top travel recommendations just for you:</p>
        
       <h2>🏨 Featured Hotel Deal</h2>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0;">The Ritz Paris ★★★★★</h3>
        <p><strong>Special Offer:</strong> 3 nights + breakfast from €1,200 (save 25%)</p>
        <p>Luxury accommodation in the heart of Paris with Eiffel Tower views</p>
      </div>
      
      <!-- Travel Package -->
      <h2>✈️ Top Destination Package</h2>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Bali Explorer - 7 Day Adventure</h3>
        <p><strong>Package Includes:</strong></p>
        <ul>
          <li>Return flights from major cities</li>
          <li>6 nights in 4-star beachfront resort</li>
          <li>Daily breakfast + 3 dinners</li>
          <li>Temple tours & waterfall excursions</li>
          <li>Airport transfers</li>
        </ul>
        <p><strong>Price:</strong> €899 per person</p>
      </div>

      <!-- Movie Recommendation -->
      <h2>🎬 Your Mood Matched Movie</h2>
      <div style="display: flex; margin-bottom: 20px;">
        <div>
          <h3 style="margin-top: 0;">The Secret Life of Walter Mitty ★★★★☆ (4.2/5)</h3>
          <div>
            <span style="background: #f39c12; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px; margin-right: 5px;">Adventure</span>
            <span style="background: #9b59b6; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px;">Iceland</span>
          </div>
          <p>A daydreamer embarks on an extraordinary journey through Iceland's stunning landscapes.</p>
        </div>
      </div>
      
        <p style="text-align: center; font-size: 12px; color: #718096; margin-top: 30px;">
          <small>You can access full dashboard  <a href="${unsubscribeLink||'http://localhost:8080/'}">here</a>.</small>
        </p>
      </div>
    `;
  }
};

const getEmailHeaders = () => ({
  'Reply-To': process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
  'List-Unsubscribe': `<mailto:${process.env.EMAIL_UNSUBSCRIBE}>, <${process.env.FRONTEND_URL}/unsubscribe>`,
  'Precedence': 'bulk'
});

const sendWelcomeEmail = async (email, fullName) => {
  try {
    const unsubscribeLink = `${process.env.FRONTEND_URL}`;
    
    const mailOptions = {
      from: `"WonderWise Travel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to WonderWise Travel Insights, ${fullName}!`,
      html: emailTemplates.welcome(fullName, unsubscribeLink),
      headers: getEmailHeaders()
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(`Error sending welcome email to ${email}:`, error);
    throw error;
  }
};

const sendNewsletterEmail = async (email, fullName, screenshotPath) => {
  try {
    const unsubscribeLink = `${process.env.FRONTEND_URL}`;
    const attachments = [];
    
    if (screenshotPath && fs.existsSync(screenshotPath)) {
      attachments.push({
        filename: 'travel-newsletter.png',
        path: screenshotPath,
        cid: 'newsletter-screenshot'
      });
    }

    const mailOptions = {
      from: `"WonderWise Travel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${fullName}, Your Weekly Travel Inspiration is Here!`,
      html: emailTemplates.newsletter(fullName, unsubscribeLink, screenshotPath),
      attachments,
      headers: getEmailHeaders()
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(`Error sending newsletter to ${email}:`, error);
    throw error;
  }
};

module.exports = { 
  sendWelcomeEmail, 
  sendNewsletterEmail 
};