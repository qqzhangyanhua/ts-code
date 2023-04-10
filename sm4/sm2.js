const smCrypto = require('sm-crypto');
const sm4 = smCrypto.sm4;

function stringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i).toString(16);
      hex += code.padStart(2, '0');
    }
    return hex;
  }
  
  const inputStr = 'log!123@inFo3124';
  const hexStr = stringToHex(inputStr);
const key = 'log!123@inFo3124'; // 16字节的密钥，用于加密和解密
const plaintext = '这是一段用于加密的文本'; // 需要加密的明文

// 使用SM4加密
const cipherText = sm4.encrypt(plaintext, stringToHex(key));
console.log('加密后的密文:', cipherText);

// 使用SM4解密
const decryptedText = sm4.decrypt(cipherText, stringToHex(key));
console.log('解密后的明文:', decryptedText);
