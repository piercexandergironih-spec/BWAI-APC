import { getEvent } from './src/lib/api';

async function run() {
  const event = await getEvent('369eaf12-7094-8166-adf8-fd09b3bfe73c');
  console.log(event);
}
run();
