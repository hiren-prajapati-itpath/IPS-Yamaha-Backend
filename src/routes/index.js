const express = require('express');
const { authRoute } = require('../modules/auth');
const { usersRoutes } = require('../modules/users');
const { rolesRoutes } = require('../modules/roles');
const { moduleRoutes } = require('../modules/module');

const docsRoute = require('./docs.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/roles',
    route: rolesRoutes,
  },
  {
    path: '/modules',
    route: moduleRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
