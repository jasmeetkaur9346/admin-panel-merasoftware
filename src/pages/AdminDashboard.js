import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-800">
        Welcome back, {user?.name || "Admin"}
      </h1>
      <p className="mt-3 text-slate-600">
        Use the navigation on the left to manage projects, users, and website content. This dashboard will soon include full analytics and quick actions tailored for admin workflows.
      </p>
    </div>
  );
};

export default AdminDashboard;
