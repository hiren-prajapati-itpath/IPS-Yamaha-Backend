const extractBaseRoute = (url, prefix = '/api') => {
  return url.split('?')[0].replace(new RegExp(`^${prefix}`), '');
};

module.exports = extractBaseRoute;
