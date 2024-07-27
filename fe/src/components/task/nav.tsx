import { Link } from "react-router-dom"

export default function LoginNav() {

    return (
        <>
            <nav>
                <div>Todo-List</div>
                <div>
                    <ul>
                        <li>
                            <Link to={`/tasks`}>Home</Link>
                        </li>
                        <li>
                            <Link to={`/new`}>Create</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}