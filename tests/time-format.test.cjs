// Run: node --test tests/time-format.test.cjs
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const source=html.match(/function fmt\(x\)\{.*?\}function save\(/s);
assert.ok(source,'format function must be present');
const context=vm.createContext({$:()=>({value:'hm'})});
vm.runInContext(source[0].slice(0,-'function save('.length),context);
for(const [input,expected] of [[-.5,'-0 h 30 min'],[-1.999,'-2 h 00 min'],[1.999,'2 h 00 min'],[0,'0 h 00 min'],[-.001,'0 h 00 min']]){
 test('format '+input,()=>assert.equal(context.fmt(input),expected));
}
