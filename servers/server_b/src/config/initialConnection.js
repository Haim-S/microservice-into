const mongoose = require("mongoose");

const mongoConfig = {
    node_env: process.env.NODE_ENV,
    base_uri: process.env.MONGO_URI,
    folder_pro: process.env.MONGO_FOLDER_NAME_PRO,
    folder_dev: process.env.MONGO_FOLDER_NAME_DEV,
    folder_test: process.env.MONGO_FOLDER_NAME_TEST,
    local_address : process.env.MONGO_ADDRESS,
}


let MONGO_CONNECTION_URI= mongoConfig.base_uri
.replace("<folder_name>", mongoConfig.folder_test);

if (mongoConfig.node_env === 'production'){
    MONGO_CONNECTION_URI = mongoConfig.base_uri
     .replace("<folder_name>", mongoConfig.folder_pro);
 }else if (mongoConfig.node_env === 'test'){
    MONGO_CONNECTION_URI = mongoConfig.base_uri
     .replace("<folder_name>", mongoConfig.folder_test);
 }


const initialMongoConnection = async () => {
    mongoose.set("strictQuery", false);
    return new Promise((resolve, reject) => {
      resolve(mongoose.connect(`${MONGO_CONNECTION_URI}`));
      console.log("ok");
    });
  };

module.exports = initialMongoConnection;