const NavBar = (props) => {
    const home = () => {
        props.searchFunction("", 1);
        props.setSearchText("");
        props.setPage1();
    }
    const favorites = () => {
        props.searchFunction("fav:sillyfella", 1);
        props.setSearchText("fav:sillyfella");
    }

    return ( 
        <nav className="navbar  bg-cool-gray-1">
            <button className="btn-navbar" onClick={home}>Home</button>
            <button className="btn-navbar">Posts</button>
            <button className="btn-navbar">Pools</button>
            <button className="btn-navbar" onClick={favorites}>Favorites</button>
            <button className="btn-navbar">Account</button>
            <button className="btn-navbar">Settings</button>
            <button className="btn-refresh" onClick={props.refresh}>Refresh</button>
        </nav>
    );
}
 
export default NavBar;