const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../shared/utils/ApiError');
const config = require('../config/config');
const { verifyToken } = require('../services/jwt.service');
const { User } = require('../database/models');

const secretKey = config.jwt.secret;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication token is missing');
    }

    const decoded = verifyToken(token, secretKey);
    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid authentication token');
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
