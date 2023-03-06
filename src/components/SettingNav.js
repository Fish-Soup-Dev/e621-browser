import { Link } from "react-router-dom";

const SettingsNav = (props) => {
    return ( 
       <div className="settings-nav">
            <div>
                <Link to="/settings/theme" className="btn-settings-nav">Theme</Link>
                <Link to="/settings/account" className="btn-settings-nav">Account</Link>
                <Link to="/settings/data" className="btn-settings-nav">Data</Link>
                <Link to="/settings/info" className="btn-settings-nav">Info</Link>
            </div>
       </div> 
    );
}
 
export default SettingsNav;