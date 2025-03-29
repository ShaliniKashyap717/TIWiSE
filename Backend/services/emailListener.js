const Imap = require('imap');
const { simpleParser } = require('mailparser');
const { handleUnsubscription } = require('./newsletterService');

const startEmailListener = () => {
  const imap = new Imap({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.IMAP_HOST || 'imap.gmail.com',
    port: process.env.IMAP_PORT || 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
  });

  
  imap.once('ready', () => {
    imap.openBox('INBOX', false, (err, box) => {
      if (err) throw err;
      
      // Search for unseen messages with specific criteria
      imap.search(['UNSEEN', ['TO', process.env.EMAIL_REPLY_TO]], (err, results) => {
        if (err) throw err;
        
        if (results.length === 0) return;
        
        const fetch = imap.fetch(results, { bodies: '' });
        fetch.on('message', (msg) => {
          let email = '';
          
          msg.on('body', (stream) => {
            stream.on('data', (chunk) => {
              email += chunk.toString('utf8');
            });
            
            stream.once('end', async () => {
              try {
                const parsed = await simpleParser(email);
                const fromEmail = parsed.from.value[0].address;
                const subject = parsed.subject || '';
                const text = parsed.text || '';
                const html = parsed.html || '';

                // Check for unsubscribe keywords
                const unsubscribeKeywords = ['unsubscribe', 'stop', 'cancel', 'opt out'];
                const shouldUnsubscribe = unsubscribeKeywords.some(keyword => 
                  subject.toLowerCase().includes(keyword) || 
                  text.toLowerCase().includes(keyword) ||
                  html.toLowerCase().includes(keyword)
                );

                if (shouldUnsubscribe) {
                  await handleUnsubscription(fromEmail);
                  console.log(`Unsubscribed ${fromEmail} via email reply`);
                }
              } catch (error) {
                console.error('Error processing email:', error);
              }
            });
          });
        });
        
        fetch.once('end', () => {
          imap.end();
        });
      });
    });
  });

  imap.once('error', (err) => {
    console.error('IMAP error:', err);
  });

  imap.once('end', () => {
    console.log('IMAP connection ended');
    // Reconnect after delay
    setTimeout(startEmailListener, 60000); // Retry every minute
  });

  imap.connect();
};

module.exports = { startEmailListener };