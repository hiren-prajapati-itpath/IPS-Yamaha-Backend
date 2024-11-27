const httpStatus = require('http-status');
const { Module } = require('../../database/models');
const ApiError = require('../../shared/utils/ApiError');

const createModule = async (ModuleBody) => {
  return Module.create(ModuleBody);
};

const getModules = async () => {
  const Modules = await Module.findAll();
  return Modules;
};

const getModuleById = async (id) => {
  const module = await Module.findByPk(id);
  return module;
};

const updateModuleById = async (ModuleId, updateBody) => {
  const module = await getModuleById(ModuleId);
  if (!module) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  const updateModule = await Module.update(updateBody, { where: { ModuleId } });
  return updateModule;
};

const deleteModuleById = async (ModuleId) => {
  const module = await getModuleById(ModuleId);
  if (!module) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  await Module.remove();
  return Module;
};

module.exports = {
  createModule,
  getModules,
  getModuleById,
  updateModuleById,
  deleteModuleById,
};
