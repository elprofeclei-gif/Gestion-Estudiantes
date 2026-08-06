const mongoose = require('mongoose');

const env = require('../../../config/env');

async function main() {
  await mongoose.connect(env.mongoUri);

  console.log('');
  console.log('==============================');
  console.log(' SIGE DATABASE SEEDER');
  console.log('==============================');
  console.log('');

  const seeds = [
    require('./seeds/01-permissions.seed'),
    require('./seeds/02-roles.seed'),
    require('./seeds/03-users.seed'),
  ];

  for (const seed of seeds) {
    await seed.run();
  }

  console.log('');
  console.log('==============================');
  console.log(' Seed finalizado');
  console.log('==============================');

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
