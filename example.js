let nanoBase32 = require('nano-base32')
let hexToArrayBuffer = require('hex-to-array-buffer')
let arrayBufferToHex = require('array-buffer-to-hex')
let blake = require('blakejs')
let bs58 = require('bs58')

function ipfsToNano(hashReceiving) {
  if (hashReceiving === null | hashReceiving.length != 46) {
    return "Invalid IPFS Hash '" + hashReceiving + "'. IPFS hashs must contains 46 characters (including Qm)"
  }
  if (!hashReceiving.startsWith("Qm")) {
    return "Invalid IPFS Hash '" + hashReceiving + "'. Must starts with 'Qm'. Other hashs types are not supported"
  }
  let hashBase58 = hashReceiving
  let bytes = bs58.decode(hashBase58)
  let pubKey = bytes.toString('hex').substr(4, 64) //remove Qm
  let buffer = new Uint8Array(hexToArrayBuffer(pubKey))
  let encoded = nanoBase32.encode(buffer)
  let checksum = blake.blake2b(buffer, null, 5).reverse()
  let checksumEncoded = nanoBase32.encode(checksum)
  let address = `xrb_${encoded}${checksumEncoded}`
  return address
}

function nanoToIpfs(walletReceiving){
  if (walletReceiving === null | walletReceiving.length < 64 | walletReceiving.length > 65 ) {
    return "Invalid Nano Wallet '" + walletReceiving + "'. Nano wallets must contains 64 characters (including xrb_) or 65 characters (including nano_)"
  }
  let walletStart = 4
  if (walletReceiving.startsWith("nano_")){
      walletStart = 5
  } else {
    if (walletReceiving.startsWith("xrb_")) {
      walletStart = 4
    } else {
      return "Invalid Nano Wallet '" + walletReceiving + "'. Must starts with 'nano_' or 'xrb_'"
    }
  }
  let encoded = walletReceiving.substr(walletStart, 52)
  let decoded = nanoBase32.decode(encoded)
  let checksum = blake.blake2b(decoded, null, 5).reverse()
  let checksumEncoded = nanoBase32.encode(checksum)
  if (checksumEncoded != walletReceiving.substr(56, 8)) {
    return "Invalid Nano Wallet '" + walletReceiving + "'. Invalid checksum"
  }
  let decodedHex = "1220" + arrayBufferToHex(decoded.buffer).toUpperCase() // 1220 is HEX of "Qm"
  let bytes = Buffer.from(decodedHex, 'hex')
  let toBase58 = bs58.encode(bytes)
  return toBase58
}

//examples
let IPFShash = "Qmdhk33FBzu91dnxR5VeMqhpysEXMzjCbPUqCvX6LkJeuM"
let hashIPFStoNanoWallet = ipfsToNano (IPFShash)
console.log (IPFShash + " -----> " + hashIPFStoNanoWallet)

let NanoWallet = "xrb_3s48ir3zow4zhpxw7abo64fdzyhpcphprajpqwnrhf8p71n6gi6arfaa4ms5"
let nanoWalletToIPFS = nanoToIpfs (NanoWallet)
console.log (NanoWallet + " -----> " + nanoWalletToIPFS)
