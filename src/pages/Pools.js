import NavBar from '../components/Navbar';
import Pool from '../components/Pool';

import Axios from 'axios';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const Pools = (props) => {
    const [pools, setPools] = useState([]);
    const [search, setSearch] = useState("");

    const getData = () => {
        if (ipcRenderer.sendSync('get-data', 'loged_in') === true) {
            let userName = ipcRenderer.sendSync('get-data', 'user_name');
            let userKey = ipcRenderer.sendSync('get-data', 'user_api_key');
            let base64key = Buffer.from(userName + ":" + userKey).toString('base64');
            return base64key;
        }
    }

    const getPools = (name) => {
        if (name === "") {
            Axios.get("https://e621.net/pools?limit=75", {
            headers: {
                //"User-Agent": "e621dl/2.0 (by silly fella)", // idk about this
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Basic " + getData()
            },
            }).then((response) => {
                setPools(response.data);
            });
        } else {
            Axios.get("https://e621.net/pools?limit=75&search[name_matches]=" + name, {
            headers: {
                //"User-Agent": "e621dl/2.0 (by silly fella)", // idk about this
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Basic " + getData()
            },
            }).then((response) => {
                setPools(response.data);
            });
        }
    };

    useEffect(() => {
        getPools("");
    }, []);

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getPools(search)
        }
    }

    return ( 
       <div>
            <div className="bg-cool-gray-3 w-60 h-screen fixed top-14">
                <input className="search-bar" type="text" placeholder="Search" onKeyDown={_handleKeyDown} value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="pools grid top-14 left-60 absolute">
                {pools.map((pool) => (
                    <Pool pool={pool} key={pool.id}/>
                ))}
            </div>
            <NavBar/>
       </div> 
    );
}
 
export default Pools;