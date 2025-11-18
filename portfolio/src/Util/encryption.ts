import CryptoJS from 'crypto-js';

const SECRET_KEY = 'my_super_secret_key'; 

export const encryptData = (data: unknown): string => {
  const jsonData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string): any => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};
