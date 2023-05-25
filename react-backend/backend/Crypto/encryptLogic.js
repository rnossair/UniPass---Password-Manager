let crypto = require("crypto");
let generatePassword = require("password-generator");
function encrypt(masterPass, pass){
    const algorithm = 'aes-256-cbc';
    const salt = generatePassword(18, false);
    const key = crypto.scryptSync(masterPass, salt, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(pass, 'utf8', 'hex');

    // Getting the buffer data of cipher 
    encrypted += cipher.final('hex');
    return {encrypted: encrypted, salt: salt, iv: iv.toString("hex")};
}
module.exports = encrypt;