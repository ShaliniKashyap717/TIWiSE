const Subscriber = require('../models/Subscriber');
const { sendWelcomeEmail, sendNewsletterEmail } = require('./emailService');
const { takeScreenshot } = require('./screenshotService');
const fs = require('fs');

exports.handleSubscription = async (email, fullName) => {
  const existingSubscriber = await Subscriber.findOne({ email });
  if (existingSubscriber) {
    throw new Error('This email is already subscribed');
  }
  
  const newSubscriber = await Subscriber.create({ email, fullName });
  await sendWelcomeEmail(email, fullName);
  console.log(`Welcome Email sent to ${fullName} `)
  return newSubscriber;
};

exports.handleUnsubscription = async (email) => {
  const subscriber = await Subscriber.findOneAndUpdate(
    { email },
    { isActive: false },
    { new: true }
  );

  if (!subscriber) {
    throw new Error('Email not found in subscribers list');
  }
  
  return subscriber;
};

exports.sendScheduledEmails = async () => {
  try {
    const activeSubscribers = await Subscriber.find({ isActive: true });
    
    if (activeSubscribers.length === 0) {
      console.log('No active subscribers found');
      return { success: true, count: 0 };
    }

    const screenshotPath = await takeScreenshot();
    console.log('Screenshot taken successfully:', screenshotPath);

    const results = await Promise.allSettled(
      activeSubscribers.map(subscriber => 
        sendNewsletterEmail(subscriber.email, subscriber.fullName, screenshotPath)
          .then(() => ({ success: true, email: subscriber.email }))
          .catch(error => ({ success: false, email: subscriber.email, error }))
      ))

    if (screenshotPath && fs.existsSync(screenshotPath)) {
      fs.unlinkSync(screenshotPath);
      console.log('Temporary screenshot file removed');
    }

    const successfulSends = results.filter(r => r.value?.success).length;
    console.log(`Newsletter sent to ${successfulSends}/${activeSubscribers.length} subscribers`);
    
    return { 
      success: true, 
      count: successfulSends,
      total: activeSubscribers.length,
      details: results.map(r => r.value) 
    };
  } catch (error) {
    console.error('Error in sendScheduledEmails:', error);
    throw error;
  }
};