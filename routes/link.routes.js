const {Router} = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()

router.post('/generate', auth, async (req,res) => {
    try{
        const {fromLink} = req.body
        const existing = await Link.findOne({fromLink})
        if (existing) {
            return res.json({link: existing})
        }

        const baseUrl = config.get('baseUrl')
        const code = shortid.generate()
        const to = baseUrl + '/t/' + code

        const link = new Link({code, to, fromLink, owner: req.user.userId})
        await link.save()
        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({message: 'Can\'t handle this. Try again later'})
    }
})

router.get('/', auth, async (req,res) => {
    try{
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Can\'t handle this. Try again later'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try{
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Can\'t handle this. Try again later'})
    }
})

module.exports = router