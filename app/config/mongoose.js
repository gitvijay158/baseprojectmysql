const mongoose = require("mongoose");

//const { MONGO_URI } = process.env;

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;


//mongoose.connect('mongodb://host.docker.internal:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });
//.
exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(`mongodb://host.docker.internal:27017/${DB_NAME}`, {
     /* useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, */
    })
    .then(() => {
      console.log("Successfully connected to Mongos database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

// exports.connect = () => {
//   // Connecting to the database
//   mongoose
//     .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
//      /* useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false, */
//     })
//     .then(() => {
//       console.log("Successfully connected to Mongos database");
//     })
//     .catch((error) => {
//       console.log("database connection failed. exiting now...");
//       console.error(error);
//       process.exit(1);
//     });
// };