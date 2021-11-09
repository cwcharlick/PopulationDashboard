
import { DashboardProvider } from './contexts/dashboard';
import { GlobalPopulation } from './dashboards/GlobalPopulation';

import './App.css';
function App() {
  

  return (
    <div className="page">
      <nav>
        <img src="https://d33wubrfki0l68.cloudfront.net/d44ced5032e91f413d47138a1f9107f2b3a90543/da230/assets/svg/logo-primary.svg" style={{width:96, marginTop: 30}}/>
        <ul>
          <li>Help</li>
          <li>Dashboards</li>
          <li>Global Population</li>
          <li>Tools</li>
          <li>Touchplan</li>
          </ul>
      </nav>
      <div className="content">
        <DashboardProvider>
          <GlobalPopulation />
        </DashboardProvider>
      </div>
    </div>
  );
}

export default App;
