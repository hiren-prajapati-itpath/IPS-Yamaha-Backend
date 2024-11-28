const verifiedUserEmailTemplate = (fullName) => {
  return `
      <html>
        <body>
          <h1>Congratulations, ${fullName}!</h1>
          <p>Your email has been successfully verified. You can now start enjoying all the features of Social Space.</p>
          <p>If you have any issues or need help, feel free to reach out to us at any time.</p>
          <p>Best regards,<br/>The Social Space Team</p>
        </body>
      </html>
    `;
};

module.exports = verifiedUserEmailTemplate;
