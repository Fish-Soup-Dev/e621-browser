import Home from './pages/Home';
import Posts from './pages/Posts';
import PostPage from './pages/PostPage';
import Settings from "./pages/Settings";
import SettingsData from './pages/SettingsData';
import SettingsAccount from './pages/SettingsAccount';
import SettingsInfo from './pages/SettingsInfo';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main-window">
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/posts/:id" element={<PostPage />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/settings/data" element={<SettingsData />}/>
            <Route path="/settings/account" element={<SettingsAccount />}/>
            <Route path="/settings/info" element={<SettingsInfo />}/>
            <Route path="*" element={<Home />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
