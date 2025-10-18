import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-160px)] bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-slate-800">
          Welcome back, {user?.name || 'Admin'}
        </h1>
        <p className="mt-2 text-slate-600">
          Use the navigation above to manage projects, users, and requests. This placeholder dashboard will be expanded with full admin widgets soon.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
