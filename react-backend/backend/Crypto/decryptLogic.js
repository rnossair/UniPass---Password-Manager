let crypto = require("crypto");
function decrypt(masterPass, salt, iv, encrypted){
    const algorithm = 'aes-256-cbc';
    const niv = Buffer.from(iv, "hex");
    const key = crypto.scryptSync(masterPass, salt, 32);
    const decipher = crypto.createDecipheriv(algorithm, key, niv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    // Getting the buffer data of cipher 
    decrypted += decipher.final('utf8');
    
    return {decrypted: decrypted}
}
module.exports = decrypt;