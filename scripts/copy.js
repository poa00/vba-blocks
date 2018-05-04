const { join } = require('path');
const { copy } = require('fs-extra');

main().catch(err => {
  console.error(err);
  process.exit(1);
});

async function main() {
  await copy(
    join(__dirname, '../node_modules/dugite/git'),
    join(__dirname, '../dist/git'),
    { overwrite: false }
  );

  await copy(
    join(__dirname, '../run-scripts'),
    join(__dirname, '../dist/run-scripts'),
    { overwrite: true }
  );

  await copy(
    join(__dirname, '../addins/build'),
    join(__dirname, '../dist/addins'),
    { overwrite: true }
  );
}
