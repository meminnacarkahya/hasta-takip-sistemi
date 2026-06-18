import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PatientRecord, Language } from '../types/patient';
import * as api from '../services/api';

const PATIENTS_STORAGE_KEY = 'hasta-takip-patients';

const loadPatientsFromStorage = (): PatientRecord[] => {
  try {
    const raw = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PatientRecord[];
  } catch {
    return [];
  }
};

const savePatientsToStorage = (patients: PatientRecord[]) => {
  try {
    window.localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patients));
  } catch {
    // Ignore write errors in unsupported environments.
  }
};

interface AppContextType {
  patients: PatientRecord[];
  language: Language;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginError: string | null;
  setLanguage: (lang: Language) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  addPatient: (patient: Omit<PatientRecord, 'id' | 'createdAt'>) => Promise<void>;
  updatePatient: (id: string, updatedPatient: Partial<PatientRecord>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [language, setLanguage] = useState<Language>('TR');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return window.localStorage.getItem('hasta-takip-auth') === 'true';
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem('hasta-takip-auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    const storedPatients = loadPatientsFromStorage();

    if (storedPatients.length > 0) {
      setPatients(storedPatients);
      setLoading(false);
      return;
    }

    let mounted = true;
    api
      .getPatients()
      .then((data) => {
        if (!mounted) return;
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      savePatientsToStorage(patients);
    }
  }, [patients, loading]);

  const login = async (username: string, password: string) => {
    // Basit lokal doğrulama, demo amaçlı.
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      setLoginError(null);
      return;
    }

    setIsAuthenticated(false);
    setLoginError('invalidCredentials');
    throw new Error('invalidCredentials');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Local Ekleme
  const addPatient = async (newPatient: Omit<PatientRecord, 'id' | 'createdAt'>) => {
    const created = await api.createPatient(newPatient);
    setPatients((prev) => [created, ...prev]);
  };

  // Local Düzenleme
  const updatePatient = async (id: string, updatedFields: Partial<PatientRecord>) => {
    const updated = await api.updatePatient(id, updatedFields);
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  // Local Silme
  const deletePatient = async (id: string) => {
    await api.deletePatient(id);
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        patients,
        language,
        loading,
        error,
        isAuthenticated,
        loginError,
        setLanguage,
        login,
        logout,
        addPatient,
        updatePatient,
        deletePatient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp bir AppProvider içinde kullanılmalıdır.');
  return context;
};