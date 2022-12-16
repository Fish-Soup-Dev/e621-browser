import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const Account = (props) => {
    const [user, setUser] = useState('');
    const [key, setKey] = useState('');
    const [logedIn, setLogedIn] = useState(false);

    const getData = () => {
        setLogedIn(ipcRenderer.sendSync('get-data', 'loged_in'));
        if (ipcRenderer.sendSync('get-data', 'loged_in') === true) {
            let userName = ipcRenderer.sendSync('get-data', 'user_name');
            let userKey = ipcRenderer.sendSync('get-data', 'user_api_key');
            setUser(userName);
            setKey(userKey);
            setLogedIn(true);
        }
    }

    const login = () => {
        if (user && key) {
            ipcRenderer.sendSync('set-data', 'user_name', user);
            ipcRenderer.sendSync('set-data', 'user_api_key', key);
            ipcRenderer.sendSync('set-data', 'loged_in', true);
            setLogedIn(true);
        }
    }

    const log_out = () => {
        ipcRenderer.sendSync('set-data', 'user_name', '');
        ipcRenderer.sendSync('set-data', 'user_api_key', '');
        ipcRenderer.sendSync('set-data', 'loged_in', false);
        setUser('');
        setKey('');
        setLogedIn(false);
    }

    useEffect(() => {
        getData();
    }, []);

    return ( 
       <div>
            <NavBar/>
            <div className="acount-window">
                <div>
                    <div className="bg-cool-gray-0 grid rounded place-items-center px-40 py-10">
                        {logedIn ? <h1 className="e6-font m-2 text-good-green">Loged in</h1> : <h1 className="e6-font m-2 text-bad-red">Not loged in</h1>}
                        <div>
                            <input value={user} onChange={(e) => setUser(e.target.value)} className="search-bar" type="text" placeholder="UserName"/>
                        </div>
                        <div>
                            <input value={key} onChange={(e) => setKey(e.target.value)} className="search-bar" type="text" placeholder="ApiKey"/>
                        </div>
                        <div>
                            {logedIn ?
                                <button className="bg-cool-gray-2 hover:bg-cool-gray-1 font-bold py-2 px-7 m-2 rounded text-white align-middle" onClick={log_out}>Log out</button> :
                                <button className="bg-cool-gray-2 hover:bg-cool-gray-1 font-bold py-2 px-7 m-2 rounded text-white align-middle" onClick={login}>Log in</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
       </div> 
    );
}
 
export default Account;