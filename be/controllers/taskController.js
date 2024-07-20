const Task = require('../models/Task')
const User = require('../models/User')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().lean()
        if (!tasks?.length) {
            return res.status(200).json({ message: 'No tasks was created' })
        }

        // add username for all tasks
        const taskWithUser = await Promise.all(tasks.map(async (task) => {
            const user = await User.findById(task.user).lean()
            return { ...task, "username": user.username }
        }))
        res.json(taskWithUser)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const createNewTask = async (req, res) => {
    const { topic, detail, status, user } = req.body
    if (!topic || !user || typeof status !== "boolean") {
        return res.status(400).json({ message: 'All fields are required' })
    }

    try {
        const validUser = await User.findById(user).lean()
        if (!validUser) {
            return res.status(400).json({ message: 'Invalid user data' })
        }

        const task = await Task.create({ topic, detail, status, user })
        return res.status(201).json({ message: `New task ${topic} created` })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const getTask = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'Task ID required' })
    }

    try {
        const task = await Task.findById(id).lean()
        if (!task) {
            return res.status(400).json({ message: 'No task found' })
        }

        const user = await User.findById(task.user)
        if (!user) {
            return res.status(500).json({ message: 'Invalid task' })
        }
        const taskWithUser =  { ...task, username: user.username }
        res.status(200).json(taskWithUser)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

// edit task
const updateTask = async (req, res) => {
    const { id } = req.params
    const { topic, detail, status } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Task ID required' })
    }

    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(400).json({ message: 'No task found' })
        }
        
        if (topic) {
            task.topic = topic
        }
        if (detail) {
            task.detail = detail
        }
        if (typeof status === 'boolean') {
            task.status = status
        }

        const updatedTask = await task.save()
        res.json({ message: `Task ${updatedTask.topic} updated` })
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}



const deleteTask = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'Task ID required' })
    }

    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(200).json({ message: 'Task not found' })
        }
        
        const messageRes = `Task ${task.topic} with ID ${task._id} deleted`
        const deleteTask = await task.deleteOne()
        res.status(200).json({ message: messageRes })
    
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = {
    getAllTasks,
    createNewTask,
    getTask,
    updateTask,
    deleteTask
}