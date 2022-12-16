import Home from './pages/Home';
import Pools from './pages/Pools';
import Posts from './pages/Posts';
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import SettingsTheme from './pages/SettingsTheme';
import SettingsData from './pages/SettingsData';
import SettingsAccount from './pages/SettingsAccount';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main-window">
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/pools" element={<Pools />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/favorites" element={<Favorites />}/>
            <Route path="/settings/theme" element={<SettingsTheme />}/>
            <Route path="/settings/data" element={<SettingsData />}/>
            <Route path="/settings/account" element={<SettingsAccount />}/>
            <Route path="*" element={<Home />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
