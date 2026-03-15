import { spawn } from 'child_process';
import { resolve } from 'path';

const args = process.argv.slice(2);

const showBannerOn = ['serve', 's', 'build', 'b', 'test', 't'];

if (showBannerOn.includes(args[0])) {
    await import('./banner.mjs');
}

const ngBin = resolve('./node_modules/.bin/ng');
const child = spawn(ngBin, args, { stdio: 'inherit', shell: false });

child.on('exit', (code) => process.exit(code ?? 0));