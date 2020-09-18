import './config/env';
import Server from './server';

const main = async () => {
  const server = new Server();
  
  await server.routes();
  await server.run();

  return server.app;
}

export default main();
