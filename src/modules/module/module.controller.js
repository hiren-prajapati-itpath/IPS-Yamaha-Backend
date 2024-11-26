const httpStatus = require('http-status');
const ApiError = require('../../shared/utils/ApiError');
const catchAsync = require('../../shared/utils/catchAsync');
const moduleService = require('./module.service');

const createModule = catchAsync(async (req, res) => {
  const module = await moduleService.createModule(req.body);
  res.status(httpStatus.CREATED).send(module);
});

const getModules = catchAsync(async (req, res) => {
  const result = await moduleService.getModules();
  res.send(result);
});

const getModule = catchAsync(async (req, res) => {
  const module = await moduleService.getModuleById(req.params.moduleId);
  if (!module) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  res.send(module);
});

const updateModule = catchAsync(async (req, res) => {
  const module = await moduleService.updateModuleById(req.params.moduleId, req.body);
  return res.send(module);
});

const deleteModule = catchAsync(async (req, res) => {
  await moduleService.deleteModuleById(req.params.moduleId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createModule,
  getModules,
  getModule,
  updateModule,
  deleteModule,
};
