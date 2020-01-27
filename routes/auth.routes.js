const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const config = require('config')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min password length 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try{
            console.log('req', req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Registration error'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'There is already user with such email'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json('User created')

        } catch (e) {
            console.error('Registration Error: ',e)
            res.status(500).json({message: 'Can\'t register. Try again later'})
        }
    })

router.post(
    '/login',
    [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'Please enter password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Login error'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: 'User is not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: 'Wrong password'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: 'Can\'t login. Try again later'})
    }
})

module.exports = router