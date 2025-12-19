import './index.css';
import Navbar from './components/navbar';
import React, { useContext, useEffect } from 'react';
import { OverallContext } from './components/context/Overall';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/home';
import LoginComponent from './pages/login';
import UserUpdate from './components/blocks/userupdate';
import CreateTaskModal from './components/blocks/createTask';
import SignupComponent from './pages/signup';
import { checkServer } from './components/utils/demo_data';

function App() {
  const { user,showToast } = useContext(OverallContext);
  useEffect(() => {
    let msg=checkServer()
    if(msg){
      showToast("Please wait a moment, the server is starting up.", "info");
    }
  },[])
  return (
    <Router>
      <div className="flex flex-col min-h-screen h-screen bg-gray-50">
        <Navbar />

        <div className="flex flex-1 relative bg-gray-50 overflow-hidden">
          <main className="flex-1 overflow-auto">
            {/* Overlay components for logged-in users */}
            {user?.email && (
              <>
                <UserUpdate />
                <CreateTaskModal />
              </>
            )}

            {/* Single Routes block */}
            <Routes>
              {/* Dashboard only accessible if logged in */}
              <Route
                path="/"
                element={user?.email ? <Dashboard /> : <Navigate to="/login" replace />}
              />

              {/* Login page accessible only if not logged in */}
              <Route
                path="/login"
                element={!user?.email ? <LoginComponent /> : <Navigate to="/" replace />}
              />

              <Route
                path="/signup"
                element={!user?.email ? <SignupComponent /> : <Navigate to="/" replace />}
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to={user?.email ? "/" : "/login"} replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
