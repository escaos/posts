const path = require("path");
const rnResolver = require("react-native/jest/resolver");

module.exports = (request, options) => {
  const aliasPrefix = "@/";

  if (request.startsWith(aliasPrefix)) {
    const modulePath = `./src/${request.slice(aliasPrefix.length)}`;

    return rnResolver(modulePath, options);
  }

  try {
    return rnResolver(request, options);
  } catch (error) {
    return options.defaultResolver(request, options);
  }
};

