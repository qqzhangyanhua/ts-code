const CryptoJS = require("crypto-js");

// 加密函数
function SM4Encrypt(key, data) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.SM4.encrypt(data, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

// 解密函数
function SM4Decrypt(key, ciphertext) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.SM4.decrypt(ciphertext, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

const key = "1234567890abcdef"; // SM4 密钥，16个字节，即128位
const data = "Hello, world!"; // 需要加密的数据

// // 加密数据
// const ciphertext = SM4Encrypt(key, data);
// console.log("加密后的数据: " + ciphertext);

// // 解密数据
// const plaintext = SM4Decrypt(key, ciphertext);
// console.log("解密后的数据: " + plaintext);
console.log( CryptoJS.evpkdf.SM4);