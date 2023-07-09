const defaultConfig = require("./env/default.json");
const environmentConfig = require(`./env/${process.env.NODE_ENV}`)
const finalConfig = {...defaultConfig, ...environmentConfig}

module.exports = finalConfig;