import NavBar from '../components/Navbar';
import SettingsNav from '../components/SettingNav';

const { ipcRenderer } = window.require('electron');

const SettingsData = (props) => {

    const clearFavs = () => {
        ipcRenderer.sendSync('set-data', 'fav_artists', []);
        ipcRenderer.sendSync('set-data', 'fav_tags', []);
        ipcRenderer.sendSync('set-data', 'fav_posts', []);
    }

    return ( 
       <div>
            <SettingsNav/>
            <div className="settings-window left-60 top-14 absolute">
                <button className="btn-navbar" onClick={clearFavs}>Delete Local Favorites</button>
            </div>
            <NavBar/>
       </div> 
    );
}
 
export default SettingsData;