import { Link } from "react-router-dom";

import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const NavBar = () => {

    const [updateAvalable, setUpdateAvalable] = useState(false);

    let updateButton;

    const updateButtonAction = () => {
        ipcRenderer.sendSync('restart-and-update');
    }

    useEffect(() => {
        const interval = setInterval(() => {
          console.log('This will be called every 10 seconds');
          let r = ipcRenderer.sendSync('get-is-update-avalable');
          setUpdateAvalable(r);
        }, 20000);
      
        return () => clearInterval(interval);
    }, []);

    if (updateAvalable === true)
    {
        updateButton = (
            <button className="btn-navbar fixed right-0 bg-good-green text-gray-700" onClick={updateButtonAction}>Update</button>
        )
    }

    return ( 
        <div>
            <nav className="navbar">
                <Link to="/" className="btn-navbar">Home</Link>
                <Link to="/posts" className="btn-navbar">Posts</Link>
                <Link to="/settings" className="btn-navbar">Settings</Link>
            </nav>

            {updateButton}
        </div>
    );
}
 
export default NavBar;