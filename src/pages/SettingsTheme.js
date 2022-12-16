import NavBar from '../components/Navbar';
import SettingsNav from '../components/SettingNav';

const SettingsTheme = (props) => {
    return ( 
       <div>
            <SettingsNav/>
            <div className="postveiw">
                <h1>Theme</h1>
            </div>
            <NavBar/>
       </div> 
    );
}
 
export default SettingsTheme;