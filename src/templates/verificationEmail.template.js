const verificationEmailTemplate = (fullName, url) => {
  return `
      <html>
        <body>
          <h1>Hello, ${fullName}!</h1>
          <p>Thank you for registering with Social Space. To complete your registration, please verify your email address by clicking the link below:</p>
          <p><a href="${url}">Verify Email</a></p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br/>The Social Space Team</p>
        </body>
      </html>
    `;
};

module.exports = verificationEmailTemplate;
