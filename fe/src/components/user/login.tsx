import { useState } from "react"
import Nav from './nav' 

const url = 'http://localhost:3000/auth'

export default function Login() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [accessToken, setAccessToken] = useState(null)

    function setCookie(name: string, value: string, minute: number) {
        let expires: string = "";
        if (minute) {
            const d = new Date();
            d.setTime(d.getTime() + (minute * 60 * 1000));
            expires = "; expires=" + d.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";

    }

    async function login(url: string, username: string, password: string) {
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

            setCookie('jwt', data.refreshToken, 10)

            setAccessToken(data.accessToken)
            console.log('Post created successfully:', data)

        } catch (error) {
            setErrorMsg('Error Login')
            console.error('Error creating post:', error)
        }
    }

    const handleLogin = (e: any) => {
        e.preventDefault()

        if (!username || !password) {
            setErrorMsg('All fields are required')
        }

        login(url, username, password)
    }

    return (
        <div>
            <Nav />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}