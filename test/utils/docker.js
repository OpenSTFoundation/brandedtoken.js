const childProcess = require('child_process');
const path = require('path');
const waitPort = require('wait-port');
const config = require('./configReader');

const composeFilePath = path.join(__dirname, './docker-compose.yml');

const asyncSleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// docker-compose is expected to be available in the test environment
//    (e.g., it is installed automatically in Travis CI's "trusty" build)
const dockerSetup = () => {
  const dockerCompose = childProcess.spawn('docker-compose', ['-f', composeFilePath, 'up', '--force-recreate']);

  if (process.env.TEST_STDOUT) {
    dockerCompose.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    dockerCompose.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  }

  const waitForOriginNode = waitPort({ port: config.originPort, output: 'silent' });
  return Promise.all([waitForOriginNode])
    .then(() => {
      // even after the port is available, the node needs a bit of time to get online
      return asyncSleep(5000);
    })
    .then(() => ({
      rpcEndpointOrigin: `http://localhost:${config.originPort}`
    }));
};

const dockerTeardown = () => {
  const dockerComposeDown = childProcess.spawnSync('docker-compose', ['-f', composeFilePath, 'down']);
  if (process.env.TEST_STDOUT) {
    process.stdout.write(dockerComposeDown.stdout);
    process.stderr.write(dockerComposeDown.stderr);
  }
};

module.exports = {
  asyncSleep,
  dockerSetup,
  dockerTeardown
};
