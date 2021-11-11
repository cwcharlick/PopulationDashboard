import { AppProvider } from './contexts/AppContext';
import { Dashboards } from './pages/Dashboards';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Help } from './pages/Help';
import { TouchPlan } from './pages/TouchPlan';
import WebFont from 'webfontloader';
import { useEffect } from 'react';

import './App.css';
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Helvetica Neue'],
      },
    });
  }, []);

  return (
    <Router>
      <div className="page">
        <AppProvider>
          <nav>
            <img
              alt="Paddle Logo"
              src="https://d33wubrfki0l68.cloudfront.net/d44ced5032e91f413d47138a1f9107f2b3a90543/da230/assets/svg/logo-primary.svg"
              style={{ width: 96, marginTop: 30 }}
            />
            <ul>
              <li>
                <Link to="/">Help</Link>
              </li>
              <li>Dashboards</li>
              <li>
                <Link to="/dashboards">Global Population</Link>
              </li>
              <li>Tools</li>
              <li>
                <Link to="/touchplan">Touch Plan</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/dashboards" element={<Dashboards />} />
            <Route exact path="/touchplan" element={<TouchPlan />} />
            <Route path="/" element={<Help />} />
          </Routes>
        </AppProvider>
      </div>
    </Router>
  );
}

export default App;
