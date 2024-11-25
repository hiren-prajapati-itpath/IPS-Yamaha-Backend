const nodemailer = require('nodemailer');

const { generateVerificationToken } = require('./jwt.service');

const welcomeEmailTemplate = require('../templates/welcomeEmail.template');
const resetPasswordEmailTemplate = require('../templates/resetPasswordEmail.template');
const verificationEmailTemplate = require('../templates/verificationEmail.template');
const verifiedUserEmailTemplate = require('../templates/verifiedUserEmail.template');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

const sendWelcomeEmail = async (email, fullName) => {
  const mailOptions = {
    from: `Social Space <${process.env.EMAIL}>`,
    to: email,
    subject: 'Welcome to Social Space ! 🖐🏻',
    html: welcomeEmailTemplate(fullName),
  };

  await sendEmail(mailOptions);
};

const sendVerifiedUserEmail = async (email, fullName) => {
  const mailOptions = {
    from: `Social Space <${process.env.EMAIL}>`,
    to: email,
    subject: 'Congratulations! Your Social Space Account is Now Verified ✨',
    html: verifiedUserEmailTemplate(fullName),
  };

  await sendEmail(mailOptions);
};

const sendVerificationEmail = async (user) => {
  const verificationToken = generateVerificationToken(user);
  const url = `${process.env.API_URL}/api/users/verify-email/${verificationToken}`;

  const mailOptions = {
    from: `Social Space <${process.env.EMAIL}>`,
    to: user.email,
    subject: 'Verify Your Social Space Email ✉️',
    html: verificationEmailTemplate(user.fullName, url),
  };

  await sendEmail(mailOptions);
};

const sendResetPasswordEmail = async (email, fullName, resetPassToken) => {
  const url = `${process.env.APP_URL}/createPassword/${resetPassToken}`;

  const mailOptions = {
    from: `Social Space <${process.env.EMAIL}>`,
    to: email,
    subject: 'Reset Password 🛠️',
    html: resetPasswordEmailTemplate(fullName, url),
  };

  await sendEmail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendVerificationEmail,
  sendVerifiedUserEmail,
  sendResetPasswordEmail,
};
