const httpStatus = require('http-status');
const { User } = require('../../database/models');
const ApiError = require('../../shared/utils/ApiError');
const { rolesServices } = require('../roles');

const createUser = async (userBody) => {
  const { username, email, password, role } = userBody;

  if (await User.findOne({ where: { email } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }

  const roleRecord = await rolesServices.getRoleByName(role);
  if (!roleRecord) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role');
  }

  const newUser = await User.create({
    username,
    email,
    password,
    role_id: roleRecord.id,
  });

  return { message: 'User registered successfully', user: newUser };
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
