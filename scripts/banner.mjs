import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const banner = `
${CYAN}${BOLD}
    _            _
   | |          (_)
   __ _ _ __   __ _ _   _| | __ _ _ __ _ ___
  / _\` | '_ \\ / _\` | | | | |/ _\` | '__| / __|
 | (_| | | | | (_| | |_| | | (_| | |  | \\__ \\
  \\__,_|_| |_|\\__, |\\__,_|_|\\__,_|_|  | |___/
               __/ |                 _/ |
              |___/                 |__/
${RESET}
  ${GREEN}${BOLD}${pkg.name}${RESET}  ${GREEN}v${pkg.version}${RESET}
`;

console.log(banner);

export default true;