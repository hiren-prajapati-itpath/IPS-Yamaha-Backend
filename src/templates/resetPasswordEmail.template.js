const resetPasswordEmailTemplate = (fullName, url) => {
  return `
      <html>
        <body>
          <h1>Hello, ${fullName}!</h1>
          <p>We received a request to reset your password for your Social Space account.</p>
          <p>To reset your password, click the link below:</p>
          <p><a href="${url}">Reset Password</a></p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,<br/>The Social Space Team</p>
        </body>
      </html>
    `;
};

module.exports = resetPasswordEmailTemplate;
