import Home from './pages/Home';
import Pools from './pages/Pools';
import Posts from './pages/Posts';
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";

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
            <Route path="/account" element={<Account />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/favorites" element={<Favorites />}/>
            <Route path="*" element={<Home />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
