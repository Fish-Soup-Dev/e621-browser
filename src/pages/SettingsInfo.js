import NavBar from '../components/Navbar';
import SettingsNav from '../components/SettingNav';

const SettingsInfo = (props) => {
    return ( 
       <div>
            <SettingsNav/>
            <div className="postveiw">
                <h1 className="e6-font">V 0.3.1</h1>
            </div>
            <NavBar/>
       </div> 
    );
}
 
export default SettingsInfo;