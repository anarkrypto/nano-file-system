const nanoBase32 = require('nano-base32')
const hexToArrayBuffer = require('hex-to-array-buffer')
const arrayBufferToHex = require('array-buffer-to-hex')
const blake = require('blakejs')
const bs58 = require('bs58')


const hashBase58 = "Qmdhk33FBzu91dnxR5VeMqhpysEXMzjCbPUqCvX6LkJeuM"

const bytes = bs58.decode(hashBase58)

const pubKey = bytes.toString('hex').substr(4, 64)
const buffer = new Uint8Array(hexToArrayBuffer(pubKey))

const encoded = nanoBase32.encode(buffer)

const checksum = blake.blake2b(buffer, null, 5).reverse()

const checksumEncoded = nanoBase32.encode(checksum)

const address = `xrb_${encoded}${checksumEncoded}`

const decoded = nanoBase32.decode(encoded)
const decodedHex = "1220" + arrayBufferToHex(decoded.buffer).toUpperCase()

const decodedChecksum = nanoBase32.decode(checksumEncoded)

const bytes2 = Buffer.from(decodedHex, 'hex')
const toBase58 = bs58.encode(bytes2)



console.log("IPFS Base58 Hash: " + hashBase58);
console.log ("Decoded To Hex: " + "1220" + pubKey)
console.log("Encoded NanoWallet: " + address)
console.log ("Decoded to Hex:      " + decodedHex)
console.log ("Decoded to Base58:   " + toBase58)
