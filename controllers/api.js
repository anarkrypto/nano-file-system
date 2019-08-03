let nanoBase32 = require('nano-base32')
let hexToArrayBuffer = require('hex-to-array-buffer')
let arrayBufferToHex = require('array-buffer-to-hex')
let blake = require('blakejs')
let bs58 = require('bs58')


function getIndex(req, res, next) {
	res.render('index')
	res.end()
  return
}

function ipfsToNano(req, res, next) {
  const hashReceiving = req.query.hash
  if (hashReceiving === null | hashReceiving.length != 46) {
    res.send({ "message": "Invalid IPFS Hash '" + hashReceiving + "'. IPFS hashs must contains 46 characters (including Qm)" })
    res.end()
    return
  }
  if (!hashReceiving.startsWith("Qm")) {
    res.send({ "message": "Invalid IPFS Hash '" + hashReceiving + "'. Must starts with 'Qm'. Other hashs types are not supported" })
    res.end()
    return
  }
  let hashBase58 = hashReceiving
  let bytes = bs58.decode(hashBase58)
  let pubKey = bytes.toString('hex').substr(4, 64) //remove Qm
  let buffer = new Uint8Array(hexToArrayBuffer(pubKey))
  let encoded = nanoBase32.encode(buffer)
  let checksum = blake.blake2b(buffer, null, 5).reverse()
  let checksumEncoded = nanoBase32.encode(checksum)
  let address = `xrb_${encoded}${checksumEncoded}`
  res.send({ "successful": address })
  res.end()
}

function nanoToIpfs(req, res, next){
  const walletReceiving  = req.query.wallet
  if (walletReceiving === null | walletReceiving.length < 64 | walletReceiving.length > 65 ) {
    res.send({ "message": "Invalid Nano Wallet '" + walletReceiving + "'. Nano wallets must contains 64 characters (including xrb_) or 65 characters (including nano_)" })
    res.end()
    return
  }
  let walletStart = 4
  if (walletReceiving.startsWith("nano_")){
      walletStart = 5
  } else {
    if (walletReceiving.startsWith("xrb_")) {
      walletStart = 4
    } else {
      res.send({ "message": "Invalid Nano Wallet '" + walletReceiving + "'. Must starts with 'nano_' or 'xrb_'" })
      res.end()
      return
    }
  }
  let encoded = walletReceiving.substr(walletStart, 52)
  let decoded = nanoBase32.decode(encoded)
  let checksum = blake.blake2b(decoded, null, 5).reverse()
  let checksumEncoded = nanoBase32.encode(checksum)
  if (checksumEncoded != walletReceiving.substr(56, 8)) {
    res.send({ "message": "Invalid Nano Wallet '" + walletReceiving + "'. Invalid checksum" })
    res.end()
    return
  }
  let decodedHex = "1220" + arrayBufferToHex(decoded.buffer).toUpperCase() // 1220 is HEX of "Qm"
  let bytes = Buffer.from(decodedHex, 'hex')
  let toBase58 = bs58.encode(bytes)
  res.send({ "successful": toBase58 })
  res.end()
}

module.exports = { getIndex, ipfsToNano, nanoToIpfs }


//examples
/*
let IPFShash = "Qmdhk33FBzu91dnxR5VeMqhpysEXMzjCbPUqCvX6LkJeuM"
let hashIPFStoNanoWallet = ipfsToNano (IPFShash)
console.log (IPFShash + " -----> " + hashIPFStoNanoWallet)

let NanoWallet = "xrb_3s48ir3zow4zhpxw7abo64fdzyhpcphprajpqwnrhf8p71n6gi6arfaa4ms5"
let nanoWalletToIPFS = nanoToIpfs (NanoWallet)
console.log (NanoWallet + " -----> " + nanoWalletToIPFS)
*/
