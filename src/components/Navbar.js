import { Link } from "react-router-dom";

const NavBar = (props) => {
    return ( 
        <div>
            <nav className="navbar  bg-cool-gray-1">
                <Link to="/" className="btn-navbar">Home</Link>
                <Link to="/posts" className="btn-navbar">Posts</Link>
                <Link to="/pools" className="btn-navbar">Pools</Link>
                <Link to="/favorites" className="btn-navbar">Favorites</Link>
                <Link to="/account" className="btn-navbar">Account</Link>
                <Link to="/settings" className="btn-navbar">Settings</Link>
            </nav>
        </div>
    );
}
 
export default NavBar;