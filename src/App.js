import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TriangleMazeLoader from "./components/TriangleMazeLoader";
import { useAuth } from "./context/AuthContext";
import { MAIN_WEBSITE_URL } from "./common";

import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManagement from "./pages/AdminManagement";
import ManagerManagement from "./pages/ManagerManagement";
import DeveloperManagement from "./pages/DeveloperManagement";
import PartnerManagement from "./pages/PartnerManagement";
import CustomerManagement from "./pages/CustomerManagement";
import AdminFileSettings from "./pages/AdminFileSettings";
import AdminProjects from "./pages/AdminProjects";
import AdminUpdateRequests from "./pages/AdminUpdateRequests";
import AdminWithdrawalManagement from "./pages/AdminWithdrawalManagement";
import AdminPaymentVerification from "./pages/AdminPaymentVerification";
import AdminCouponPage from "./pages/AdminCouponPage";
import AdminTicketsDashboard from "./pages/AdminTicketsDashboard";
import PendingRenewals from "./pages/PendingRenewals";
import KYCVerification from "./pages/KYCVerification";
import AllProducts from "./pages/AllProducts";
import AllCategory from "./pages/AllCategory";
import AllAds from "./pages/AllAds";
import AllDevelopers from "./pages/AllDevelopers";
import AllWelcomeContent from "./pages/AllWelcomeContent";
import WalletManagement from "./pages/WalletManagement";

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
      <div className="App min-h-screen bg-slate-50">
        <Header />
        <main className="min-h-[calc(100vh-160px)]">
          <Routes>
            <Route path="/" element={<Navigate to="/admin-panel" replace />} />
            <Route path="/admin-panel/*" element={<AdminPanel />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="admins" element={<AdminManagement />} />
              <Route path="managers" element={<ManagerManagement />} />
              <Route path="developers" element={<DeveloperManagement />} />
              <Route path="partners" element={<PartnerManagement />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="admin-settings" element={<AdminFileSettings />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="update-requests" element={<AdminUpdateRequests />} />
              <Route path="payment-verification" element={<AdminPaymentVerification />} />
              <Route path="pending-renewals" element={<PendingRenewals />} />
              <Route path="coupon-management" element={<AdminCouponPage />} />
              <Route path="admin-tickets" element={<AdminTicketsDashboard />} />
              <Route path="kyc-verification" element={<KYCVerification />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="all-categories" element={<AllCategory />} />
              <Route path="all-ads" element={<AllAds />} />
              <Route path="all-developers" element={<AllDevelopers />} />
              <Route path="welcome-content" element={<AllWelcomeContent />} />
              <Route path="wallet-management" element={<WalletManagement />} />
              <Route path="partner-withdrawal-requests" element={<AdminWithdrawalManagement />} />
            </Route>
            <Route path="*" element={<Navigate to="/admin-panel" replace />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
