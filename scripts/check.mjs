import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
async function files(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?files(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const htmlFiles=(await files(root)).filter(f=>f.endsWith('.html'));
const failures=[];
let links=0;
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');
 assert.match(html,/<html lang="it">/);assert.match(html,/<title>.+<\/title>/);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: un solo H1`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`${file}: ID unici`);
 const references=[...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
 for(const [,srcset] of html.matchAll(/\bsrcset="([^"]+)"/g))references.push(...srcset.split(',').map(candidate=>candidate.trim().split(/\s+/)[0]));
 for(const ref of references){
  if(/^(?:https?:|mailto:|tel:|data:)/.test(ref))continue;
  const [url,anchor]=ref.split('#');
  const local=url.split('?')[0];
  let target=local.startsWith('/lp/')?path.join(root,local.slice(4)):path.resolve(path.dirname(file),local||path.basename(file));
  if(local.endsWith('/'))target=path.join(target,'index.html');
  try{
   const info=await stat(target);if(info.isDirectory())target=path.join(target,'index.html');
   if(anchor){const text=await readFile(target,'utf8');if(!text.includes(`id="${anchor}"`))throw new Error('ancora assente');}
   links++;
  }catch{failures.push(`${path.relative(root,file)} → ${ref}`);}
 }
}
const css=await readFile(path.join(root,'assets/style.css'),'utf8');
for(const [,ref] of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)){await stat(path.resolve(root,'assets',ref));}
const fontCss=await readFile(path.join(root,'assets/fonts/fonts.css'),'utf8');
assert.ok(!fontCss.includes('https://'),'Tutti i font sono locali');
for(const [,ref] of fontCss.matchAll(/url\(([^)]+)\)/g)){const s=await stat(path.resolve(root,'assets/fonts',ref));assert.ok(s.size>1000);}
const contact=await readFile(path.join(root,'contatti/index.html'),'utf8');
assert.match(contact,/action="https:\/\/formsubmit.co\/martinasegreteria@chiesapostolica.it" method="POST"/);
assert.match(contact,/type="email"[^>]+required/);assert.match(contact,/type="checkbox"[^>]+required/);
assert.ok(!contact.includes('_captcha'),'Protezione antispam del provider attiva');
const iban='IT25A0103078931000001725550';
const numeric=(iban.slice(4)+iban.slice(0,4)).replace(/[A-Z]/g,c=>String(c.charCodeAt(0)-55));
assert.equal(BigInt(numeric)%97n,1n,'IBAN valido');
for(const name of ['sunday-service','prayer-time']){const calendar=await readFile(path.join(root,`assets/calendars/${name}.ics`),'utf8');assert.match(calendar,/TZID:Europe\/Rome/);assert.match(calendar,/RRULE:FREQ=WEEKLY;BYDAY=(SU|TH)/);}
assert.equal(failures.length,0,`Collegamenti mancanti:\n${failures.join('\n')}`);
console.log(`Verificate ${htmlFiles.length} pagine e ${links} riferimenti locali. Font locali, IBAN, modulo e calendari corretti.`);
