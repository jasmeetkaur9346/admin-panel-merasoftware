import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, initialising } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <div className="font-semibold text-slate-800">MeraSoftware Admin</div>
        <div className="flex items-center gap-4">
          {!initialising && user ? (
            <>
              <div className="text-sm text-slate-600">
                <span className="font-medium text-slate-800">{user.name || 'Admin'}</span>
                <span className="ml-2 text-xs uppercase tracking-wide text-blue-600">{user.role}</span>
              </div>
              <button
                onClick={logout}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <span className="text-sm text-slate-500">Checking session…</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
