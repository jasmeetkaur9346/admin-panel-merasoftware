import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import TriangleMazeLoader from './components/TriangleMazeLoader';
import { useAuth } from './context/AuthContext';
import { MAIN_WEBSITE_URL } from './common';

function App() {
  const { user, initialising } = useAuth();

  if (initialising) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <TriangleMazeLoader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Admin session required</h1>
        <p className="text-slate-600 max-w-md mb-6">
          Please sign in through the Staff Login on the main website to access the admin dashboard.
        </p>
        {MAIN_WEBSITE_URL && (
          <a
            href={MAIN_WEBSITE_URL}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to MeraSoftware.com
          </a>
        )}
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
