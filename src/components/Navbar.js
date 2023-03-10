import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <div>
            <nav className="navbar">
                <Link to="/" className="btn-navbar">Home</Link>
                <Link to="/posts" className="btn-navbar">Posts</Link>
                <Link to="/settings" className="btn-navbar">Settings</Link>
            </nav>
        </div>
    );
}
 
export default NavBar;