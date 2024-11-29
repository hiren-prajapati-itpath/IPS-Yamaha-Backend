const httpStatus = require('http-status');
const catchAsync = require('../../shared/utils/catchAsync');
const { loginUserWithEmailAndPassword } = require('./auth.service');
const { usersServices } = require('../users');
const { generateToken } = require('../../services/jwt.service');

const register = catchAsync(async (req, res) => {
  const user = await usersServices.createUser(req.body);
  return res.successResponse(httpStatus.CREATED, { data: user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserWithEmailAndPassword(email, password);

  const { id: userId, Role } = user;
  const { id: roleId, role: roleName } = Role;

  const token = generateToken({ userId, roleId, roleName });
  return res.successResponse(httpStatus.OK, { data: { token }, message: 'Login successful !' });
});

module.exports = {
  register,
  login,
};
