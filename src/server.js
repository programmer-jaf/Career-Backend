import ConnectDB from "./database/database.js";
import app from "./app/app.js";
import config from "./config/config.js";
const startServer = async () => {
  try {
    ConnectDB()
      .then((result) => {
        const port = config.port || 3000;
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
startServer();