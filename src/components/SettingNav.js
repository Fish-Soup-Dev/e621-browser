import { Link } from "react-router-dom";

const SettingsNav = (props) => {
    return ( 
       <div className="settings-nav">
            <div>
                <Link to="/settings/theme" className="btn-settings-nav">Theme</Link>
                <Link to="/settings/account" className="btn-settings-nav">Account</Link>
            </div>
       </div> 
    );
}
 
export default SettingsNav;