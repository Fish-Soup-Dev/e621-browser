import NavBar from '../components/Navbar';
import SettingsNav from '../components/SettingNav';

const Settings = (props) => {
    return ( 
       <div>
            <SettingsNav/>
            <div className="settings-window left-60 top-14 absolute">
                <h1 className="font-bold text-white text-5xl m-5">Settings change stuff here</h1>
            </div>
            <NavBar/>
       </div> 
    );
}
 
export default Settings;