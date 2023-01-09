const {
  hashSync,
  aesEncrypt,
  aesDecrypt,
  decode,
  encode,
} = require(`../../src/modules/crypto`);

console.log(`hashySync ${hashSync('!231231')}`);

const a = '1233';
const key = 'AERRAWERAERRAWER';

const enc = aesEncrypt(a, key);

console.log(`encrypt : ${enc}`);

console.log(`decrypt : ${aesDecrypt(enc, key)}`);

const e = encode(enc);

console.log(`encode : ${e}`);

console.log(`decode : ${decode(e)}`);
