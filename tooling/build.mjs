import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// These limits are per runtime/pool, not a cap on total build memory or threads.
const result = spawnSync(
  process.execPath,
  [require.resolve('next/dist/bin/next'), 'build', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      RAYON_NUM_THREADS: process.env.RAYON_NUM_THREADS || '1',
      TOKIO_WORKER_THREADS: process.env.TOKIO_WORKER_THREADS || '1',
      NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --max-old-space-size=3072`.trim(),
    },
  }
);
if (result.error) {
  process.stderr.write(`Build could not start: ${result.error.message}\n`);
}
process.exit(result.status ?? 1);
