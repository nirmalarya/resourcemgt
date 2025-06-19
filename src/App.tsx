import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import TeamManagement from './components/teams/TeamManagement';
import ProjectManagement from './components/projects/ProjectManagement';
import AllocationManagement from './components/allocations/AllocationManagement';
import ResourceCalendar from './components/calendar/ResourceCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="allocations" element={<AllocationManagement />} />
          <Route path="calendar" element={<ResourceCalendar />} />
          <Route path="reports" element={<Dashboard />} /> {/* Placeholder */}
          <Route path="settings" element={<Dashboard />} /> {/* Placeholder */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
