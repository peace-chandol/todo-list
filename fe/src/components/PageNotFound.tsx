import { Link } from "react-router-dom"

export default function PageNotFound() {
    return (
        <div>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <Link to='/'>Visit Home Page</Link>
        </div>
    )
}