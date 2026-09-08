import {execFileSync} from 'node:child_process';
import {copyFileSync,mkdirSync} from 'node:fs';
const filename=execFileSync('npm',['pack','--ignore-scripts','--silent'],{encoding:'utf8'}).trim();
mkdirSync('public',{recursive:true});
copyFileSync(filename,`public/${filename}`);
