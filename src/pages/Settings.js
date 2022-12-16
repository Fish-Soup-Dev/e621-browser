import NavBar from '../components/Navbar';
import SettingsNav from '../components/SettingNav';

const Settings = (props) => {
    return ( 
       <div>
            <SettingsNav/>
            <div className="settings-window">
            </div>
            <NavBar/>
       </div> 
    );
}
 
export default Settings;