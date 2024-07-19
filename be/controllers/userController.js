const bcrypt = require('bcrypt')
const User = require('../models/User')

const createUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.send(400).json({ message: "All fields are requied" })
    }

    try {
        const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean()
        if (duplicate) {
            return res.status(400).json({ message: "Duplicate username" })
        }

        const hashedPwd = await bcrypt.hash(password, 10)
        const user = await User.create({ username, "password": hashedPwd })

        res.status(201).json({ message: `New user ${username} created` })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = {
    getAllUsers,
    createUser
}