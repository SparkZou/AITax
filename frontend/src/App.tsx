import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BankImport from './pages/BankImport';
import GSTReturns from './pages/GSTReturns';
import Contracts from './pages/Contracts';
import Timesheets from './pages/Timesheets';
import Payroll from './pages/Payroll';
import Invoices from './pages/Invoices';
import TaxReports from './pages/TaxReports';
import AIAssistant from './pages/AIAssistant';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bank-import" element={<BankImport />} />
            <Route path="gst-returns" element={<GSTReturns />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="timesheets" element={<Timesheets />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="tax-reports" element={<TaxReports />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
