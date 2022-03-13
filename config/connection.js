const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(`mongodb://${process.env.DB_USER}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
