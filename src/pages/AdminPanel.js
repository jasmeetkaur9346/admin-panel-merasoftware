import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser, FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import {
  MdDashboard,
  MdAdminPanelSettings,
  MdShoppingCart,
  MdPeople,
  MdWeb,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const basePath = '/admin-panel';

  const isActive = useCallback(
    (path) => {
      const currentPath = location.pathname;
      if (path === '') {
        return currentPath === basePath || currentPath === `${basePath}/`;
      }
      return currentPath.includes(path);
    },
    [location.pathname],
  );

  useEffect(() => {
    const currentPath = location.pathname;

    if (
      currentPath.includes('coupon-management') ||
      currentPath.includes('payment-verification') ||
      currentPath.includes('pending-renewals') ||
      currentPath.includes('admin-settings') ||
      currentPath.includes('admin-tickets') ||
      currentPath.includes('partner-withdrawal-requests') ||
      currentPath.includes('wallet-management') ||
      currentPath.includes('update-requests') ||
      currentPath.includes('projects') ||
      currentPath.includes('kyc-verification')
    ) {
      setOpenSection('adminPanel');
    } else if (currentPath.includes('all-categories') || currentPath.includes('all-products')) {
      setOpenSection('productManagement');
    } else if (
      currentPath.includes('admins') ||
      currentPath.includes('managers') ||
      currentPath.includes('customers') ||
      currentPath.includes('developers') ||
      currentPath.includes('partners')
    ) {
      setOpenSection('userManagement');
    } else if (currentPath.includes('welcome-content') || currentPath.includes('all-ads')) {
      setOpenSection('websiteManagement');
    }
  }, [location.pathname]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const profile = useMemo(
    () => ({
      name: user?.name || 'Admin',
      email: user?.email || '',
      role: user?.role || 'admin',
      profilePic: user?.profilePic,
    }),
    [user],
  );

  return (
    <div className="min-h-[calc(100vh-160px)] bg-slate-50 md:flex">
      <aside className="hidden w-full max-w-60 overflow-y-auto border-r border-slate-200 bg-slate-800 md:block">
        <div className="flex h-32 flex-col items-center justify-center border-b border-slate-700">
          <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-blue-500 bg-slate-700">
            {profile.profilePic ? (
              <img src={profile.profilePic} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <FaRegCircleUser className="text-4xl text-gray-300" />
            )}
          </div>
          <p className="text-base font-semibold text-white">{profile.name}</p>
          <p className="text-xs uppercase tracking-wide text-blue-300">{profile.role}</p>
          {profile.email && <p className="text-[11px] text-slate-400">{profile.email}</p>}
        </div>

        <div className="p-3">
          <nav className="space-y-1 text-sm">
            <Link
              to="dashboard"
              className={`flex items-center rounded-md px-3 py-2 transition-colors ${
                isActive('dashboard') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <MdDashboard className="mr-3 text-lg" />
              Dashboard
            </Link>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => toggleSection('adminPanel')}
                className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 hover:text-white"
              >
                <span className="flex items-center">
                  <MdAdminPanelSettings className="mr-3 text-base text-blue-400" />
                  Admin Controls
                </span>
                {openSection === 'adminPanel' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openSection === 'adminPanel' && (
                <div className="space-y-1 rounded-md bg-slate-900 px-2 py-1">
                  {[
                    { to: 'projects', label: 'Projects' },
                    { to: 'update-requests', label: 'Update Requests' },
                    { to: 'coupon-management', label: 'Coupon Codes' },
                    { to: 'payment-verification', label: 'Payment Verification' },
                    { to: 'pending-renewals', label: 'Pending Renewals' },
                    { to: 'partner-withdrawal-requests', label: 'Partner Requests' },
                    { to: 'admin-settings', label: 'Storage Settings' },
                    { to: 'admin-tickets', label: 'Support Panel' },
                    { to: 'wallet-management', label: 'Wallet Requests' },
                    { to: 'kyc-verification', label: 'KYC Verification' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                        isActive(item.to) ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => toggleSection('userManagement')}
                className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 hover:text-white"
              >
                <span className="flex items-center">
                  <MdPeople className="mr-3 text-base text-green-400" />
                  User Management
                </span>
                {openSection === 'userManagement' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openSection === 'userManagement' && (
                <div className="space-y-1 rounded-md bg-slate-900 px-2 py-1">
                  {[
                    { to: 'admins', label: 'Admins' },
                    { to: 'managers', label: 'Managers' },
                    { to: 'developers', label: 'Developers' },
                    { to: 'partners', label: 'Partners' },
                    { to: 'customers', label: 'Customers' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                        isActive(item.to) ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => toggleSection('productManagement')}
                className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 hover:text-white"
              >
                <span className="flex items-center">
                  <MdShoppingCart className="mr-3 text-base text-purple-400" />
                  Product Management
                </span>
                {openSection === 'productManagement' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openSection === 'productManagement' && (
                <div className="space-y-1 rounded-md bg-slate-900 px-2 py-1">
                  {[
                    { to: 'all-products', label: 'All Products' },
                    { to: 'all-categories', label: 'Categories' },
                    { to: 'all-ads', label: 'Banner & Ads' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                        isActive(item.to) ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => toggleSection('websiteManagement')}
                className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 hover:text-white"
              >
                <span className="flex items-center">
                  <MdWeb className="mr-3 text-base text-pink-400" />
                  Website Content
                </span>
                {openSection === 'websiteManagement' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openSection === 'websiteManagement' && (
                <div className="space-y-1 rounded-md bg-slate-900 px-2 py-1">
                  {[
                    { to: 'welcome-content', label: 'Welcome Content' },
                    { to: 'all-ads', label: 'Promotional Assets' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                        isActive(item.to) ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      <section className="flex-1 bg-white">
        <div className="min-h-full px-4 py-6 md:px-6">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
