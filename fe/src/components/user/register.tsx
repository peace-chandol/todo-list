import { useState } from "react"

const url = 'http://localhost:3000/user'

export default function Register() {
    
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    
    async function createNewUser(url: string, username: string, password: string) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                throw new Error(`Error creating post: ${response.status}`)
            }
    
            const data = await response.json()
    
            console.log('Post created successfully:', data)
    
        } catch (error) {
            setErrorMsg('Duplicated username')
            console.error('Error creating post:', error)
        }
    }
    
    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (!username || !password) {
            setErrorMsg('All fields are required')
        }
        
        createNewUser(url, username, password)

    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <p>{errorMsg}</p>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}