import { useEffect, useState } from "react";
import Nav from './Nav'

const url = 'http://localhost:3000/tasks'

export default function Tasks() {

    interface Task {
        _id: string,
        topic: string
    }

    const [allTasks, setAllTasks] = useState<Task[]>([])

    async function fetchAllTasks(url: string) {
        try {
            const response = await fetch(url)
            const data = await response.json()

            setAllTasks(data)

        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        fetchAllTasks(url)
    }, [])

    return (
        <div>
            <Nav />
            <h1>All Tasks</h1>
            {allTasks.map(item => {
                return <h2 key={item._id}>{item.topic}</h2>
            })}
            {/* <p>{allTasks}</p> */}
        </div>
    )
}