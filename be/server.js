require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URI)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('To-Do List API')
})

app.use('/user', require('./routes/userRoute'))
app.use('/tasks', require('./routes/taskRoute'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})