const express = require('express')
const router = express.Router()

const controllers = require('../controllers/api.js')

/* GET HOME PAGE */
router.get('/', controllers.getIndex)

/* GET IPFS-TO-NANO */
router.get('/api/ipfs-to-nano', controllers.ipfsToNano)

/* GET NANO-TO-IPFS */
router.get('/api/nano-to-ipfs', controllers.nanoToIpfs)

module.exports = router
