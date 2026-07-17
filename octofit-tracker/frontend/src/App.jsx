import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function AppShell() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
            <h1 className="h2 mb-2">Fitness insights for your team</h1>
            <p className="text-muted mb-0">
              Connect your members, teams, activities, workouts, and leaderboards from the backend API.
            </p>
          </div>
          <div className="alert alert-info mb-0 py-2 px-3">
            <small>
              Set VITE_CODESPACE_NAME in .env.local to use the Codespaces API URL.
            </small>
          </div>
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap mb-4">
        <NavLink className="nav-link" to="/">Members</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
        <NavLink className="nav-link" to="/activities">Activities</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
