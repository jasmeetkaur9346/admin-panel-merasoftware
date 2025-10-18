import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';
import SummaryApi, { MAIN_WEBSITE_URL } from '../common';
import CookieManager from '../utils/cookieManager';
import StorageService from '../utils/storageService';

const AuthContext = createContext(null);

const normaliseUser = (rawUser) => {
  if (!rawUser) return null;
  return {
    _id: rawUser._id || rawUser.id || null,
    name: rawUser.name || '',
    email: rawUser.email || '',
    role: rawUser.role || rawUser.roles?.[0] || '',
  };
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed');
    error.response = data;
    throw error;
  }
  return data;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialising, setInitialising] = useState(true);

  const resetSession = useCallback(() => {
    setUser(null);
    StorageService.clearAll();
    CookieManager.clearAll();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const initialise = async () => {
      try {
        const cached = StorageService.getUserDetails();
        if (cached && !cancelled) {
          setUser(normaliseUser(cached));
        }

        const data = await fetchJson(SummaryApi.currentUser.url, {
          method: SummaryApi.currentUser.method.toUpperCase(),
          credentials: 'include',
        });

        const payload = data?.data?.user || data?.data || data?.user || null;
        const normalised = normaliseUser(payload);

        if (!normalised || normalised.role !== 'admin') {
          resetSession();
          return;
        }

        if (!cancelled) {
          setUser(normalised);
          StorageService.setUserDetails(normalised);
          CookieManager.setUserDetails({
            id: normalised._id,
            name: normalised.name,
            email: normalised.email,
            role: normalised.role,
          });
        }
      } catch (error) {
        console.warn('Failed to initialise admin session:', error?.message || error);
        resetSession();
      } finally {
        if (!cancelled) {
          setInitialising(false);
        }
      }
    };

    initialise();
    return () => {
      cancelled = true;
    };
  }, [resetSession]);

  const login = useCallback(async ({ email, password }) => {
    const data = await fetchJson(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method.toUpperCase(),
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, role: 'admin' }),
    });

    const payload = data?.data?.user || data?.data || null;
    const normalised = normaliseUser(payload);

    if (!normalised || normalised.role !== 'admin') {
      throw new Error('Admin access only');
    }

    setUser(normalised);
    StorageService.setUserDetails(normalised);
    CookieManager.setUserDetails({
      id: normalised._id,
      name: normalised.name,
      email: normalised.email,
      role: normalised.role,
    });

    return normalised;
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetchJson(SummaryApi.logout.url, {
        method: SummaryApi.logout.method.toUpperCase(),
        credentials: 'include',
      });
    } catch (error) {
      console.warn('Admin logout request failed:', error?.message || error);
    } finally {
      setUser(null);
      StorageService.clearAll();
      CookieManager.clearAll();
      if (MAIN_WEBSITE_URL) {
        window.location.href = MAIN_WEBSITE_URL;
      }
    }
  }, []);

  const value = useMemo(() => ({
    user,
    initialising,
    login,
    logout,
  }), [user, initialising, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
