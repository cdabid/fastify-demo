const fp = require("fastify-plugin");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

module.exports = fp(async function(fastify, opts) {
  let privateCertificate = path.join(opts.rootDir, "certificates");
  let publicCertificate = path.join(opts.rootDir, "certificates");

  var encryptStringWithRsaPublicKey = function(toEncrypt) {
    let absolutePath = path.resolve(publicCertificate + "/public.crt");
    let publicKey = fs.readFileSync(absolutePath, "utf8");
    let buffer = Buffer.from(toEncrypt);
    let encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
  };

  var decryptStringWithRsaPrivateKey = function(toDecrypt) {
    let absolutePath = path.resolve(privateCertificate + "/private.pem");
    let privateKey = fs.readFileSync(absolutePath, "utf8");
    let buffer = Buffer.from(toDecrypt, "base64");
    let decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
  };

  fastify.decorate("encrypt", encryptStringWithRsaPublicKey);
  fastify.decorate("decrypt", decryptStringWithRsaPrivateKey);
});
