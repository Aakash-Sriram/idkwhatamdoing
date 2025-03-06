import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Notes from './pages/Notes';
import Tasks from './pages/Tasks';
import CreateNew from './pages/CreateNew';
import PricingPlans from './components/PricingPlans';
import ParentDashboard from './pages/ParentDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="notes" element={<Notes />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="create" element={<CreateNew />} />
          <Route path="pricing" element={<PricingPlans />} />
          <Route path="parent" element={<ParentDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;