const app = require('./src/app');
const connectDatabase = require('./src/config/database');
const config = require('./src/config/env');

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
