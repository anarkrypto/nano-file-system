# nano-file-system
A decentralized and distributed sharing network based on Nano and IPFS
* PoC version: A interface for converting IPFS hashes to Nano wallets and vice-versa. 


[<h3>Try this online DEMO</h3>](https://nanofilesystem.herokuapp.com/)

Install  all modules and run the test script
```bash
npm i
npm test
```
If all went well, the return of the test script should be this:
```bash
Qmdhk33FBzu91dnxR5VeMqhpysEXMzjCbPUqCvX6LkJeuM -----> xrb_3s48ir3zow4zhpxw7abo64fdzyhpcphprajpqwnrhf8p71n6gi6arfaa4ms5
xrb_3s48ir3zow4zhpxw7abo64fdzyhpcphprajpqwnrhf8p71n6gi6arfaa4ms5 -----> Qmdhk33FBzu91dnxR5VeMqhpysEXMzjCbPUqCvX6LkJeuM
```
So, start the node (port 3000 by default):
```bash
npm start
```


<h2>Presentation:</h2>
This project makes it possible to index files within Nano transactions.

<h3>Introduction:</h3>
<strong>Nano Wallet</strong>
In addition to being identified starting with nano_ or xrb_, a Nano wallet is created from blake encoded 32-byte public key (for checksum) and represented in base32. Exemplified as follows:

"nano_" + base32 (pubKey) + base32 (blake2b (pubKey))

This means that the opposite process brings your 32-byte public key back.

<h3>Taking advantages:</h3>
The basic idea of ​​this NanoFileSystem project is that we can create Nano wallets by replacing the public key with 32 "customizable" bytes, such as messages, which did not necessarily derive from a private key. So while values ​​sent to this wallet cannot be redeemed, it carries a 32-byte message inside that can be read through the decryption process.
If someone sends a value to this wallet, they will be associating it with your transaction history. So it's like sending messages through Nano transactions.

One way to know which wallet has a message behind it would be by sending specific values, as if they were "flags". 
Nano supports up to 30 decimal places and there are no fees, so it can be done extremely cheaply. (I will show the incredible potential of these "flags" in the future)

<h3>Problem:</h3>
However, we would still be limited to only 32 bytes per transaction. If we wanted to send a message larger than 32 bytes we would need more transactions. And we would be limited to texts. An image would consume thousands or even millions of transactions. Videos then ... are unthinkable. Assuming a computer took 1 second to calculate each transaction, it would take more than 1 week to complete every single 10MB video transaction! Besides that could be a kind of spam, after all would be 625000 transactions. Impracticable!

<h3>Solution:</h3>
The purpose of this project is to allow indexing files in Nano, using only 1 transaction per file. As:
Using the Interplanetary File System (IPFS), a P2P network similar to BitTorrent. We saved the file to IPFS and its hash in transaction Nano!

<strong>IPFS hashes</strong>

A common IPFS hash, such as this one, consists of 2 specific identifying bytes at its beginning (0x12, 0x20) + checksum sha256 from file (32bytes), converted to base58.

hex-to-base58 (0x12 + 0x20 + hex (SHA256 (file)))

That is, the information that really matters to us, the sha256 checksum of the file, is exactly 32 bytes, so after separating it from the IPFS hash, we can convert it to Nano wallet format. Using it in place of the public key and marking the transaction with a specific Nano value (flag).
To convert back to hash, just do the reverse process.

<h3>Conclusion:</h3>
Soon we have a Nano wallet, which hashes out any file in IPFS.



<h2> Guide - Installing and Running (node ​​js): </h2>

First resolve the dependencies (git, npm and nodeJS)

### Debian / Ubuntu: ###
```bash
  sudo apt update && sudo apt upgrade

  sudo apt install curl python-software-properties

  curl -sL https://deb.nodesource.com/setup_12.x | sudo -and bash-

  sudo apt install nodejs

  sudo apt install git
```

To verify the installed versions:
```bash
node -v
npm -v
git --version
```

Download this git project and install all modules listed as dependencies in package.json
  

```bash
git clone https://github.com/anarkrypto/nano-file-system.git

cd nano-file-system

npm install
```

Run the test script:
```bash
npm test
```

Output:
```bash
Qmdhk33FBzu91dnxR5VeMqhpysEXMzjCbPUqCvX6LkJeuM -----> xrb_3s48ir3zow4zhpxw7abo64fdzyhpcphprajpqwnrhf8p71n6gi6arfaa4ms5
xrb_3s48ir3zow4zhpxw7abo64fdzyhpcphprajpqwnrhf8p71n6gi6arfaa4ms5 -----> Qmdhk33FBzu91dnxR5VeMqhpysEXMzjCbPUqCvX6LkJeuM
```


Start the node server locally, (port 3000 by default):
```bash
npm start
```
Output:
```bash
Server listening on https://localhost:3000
```
So you can open this address in your browser.

This is a interface for converting IPFS hashes to Nano wallets and vice-versa. 
For now only a Proof of Concept. But this project will soon become the basis for a decentralized and distributed sharing network. Wait...


