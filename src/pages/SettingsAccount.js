import NavBar from '../components/Navbar';
import SettingsNav from '../components/SettingNav';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const SettingsAccount = (props) => {
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
            <div className="postveiw">
                {logedIn ? <h1 className="e6-font m-4 text-good-green">Loged in</h1> : <h1 className="e6-font m-2 text-bad-red">Not loged in</h1>}
                <div>
                    <input value={user} onChange={(e) => setUser(e.target.value)} className="search-bar bg-gray-800 w-96" type="text" placeholder="UserName"/>
                </div>
                <div>
                    <input value={key} onChange={(e) => setKey(e.target.value)} className="search-bar bg-gray-800 w-96" type="text" placeholder="ApiKey"/>
                </div>
                <div>
                    {logedIn ?
                        <button className="btn-navbar align-middle" onClick={log_out}>Log out</button> :
                        <button className="btn-navbar align-middle" onClick={login}>Log in</button>
                    }
                </div>
            </div>
            
            <SettingsNav/>
            <NavBar/>
       </div> 
    );
}
 
export default SettingsAccount;