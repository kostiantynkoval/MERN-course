const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req,res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if (link) {
            link.clicks++
            await link.save()
            // console.log('wsListener', global.wss)
            if(global.wssClient) {
                global.wssClient.send(JSON.stringify({messageType: 'link_changed', link}))
                console.log(global.wssClient)
            }
            console.log(global.wssClient)
            return res.redirect(link.from)
        }
        res.status(404).jsom({message: 'Link not found'})
    } catch (e) {
        res.status(500).json({message: 'Can\'t login. Try again later'})
    }
})

module.exports = router
