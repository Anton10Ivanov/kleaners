
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  darkMode: boolean;
  language: string;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface UserSettingsState {
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setDarkMode: (enabled: boolean) => void;
  setLanguage: (language: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setEmailNotifications: (enabled: boolean) => void;
  setSmsNotifications: (enabled: boolean) => void;
  resetToDefaults: () => void;
}

const defaultPreferences: UserPreferences = {
  darkMode: false,
  language: 'en',
  notificationsEnabled: true,
  emailNotifications: true,
  smsNotifications: false,
};

/**
 * User settings store using Zustand
 * Manages user preferences with persistence
 */
const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set) => ({
      preferences: { ...defaultPreferences },
      isLoading: false,
      error: null,
      
      setDarkMode: (enabled) => 
        set((state) => ({
          preferences: { ...state.preferences, darkMode: enabled }
        })),
        
      setLanguage: (language) => 
        set((state) => ({
          preferences: { ...state.preferences, language }
        })),
        
      setNotificationsEnabled: (enabled) => 
        set((state) => ({
          preferences: { ...state.preferences, notificationsEnabled: enabled }
        })),
        
      setEmailNotifications: (enabled) => 
        set((state) => ({
          preferences: { ...state.preferences, emailNotifications: enabled }
        })),
        
      setSmsNotifications: (enabled) => 
        set((state) => ({
          preferences: { ...state.preferences, smsNotifications: enabled }
        })),
        
      resetToDefaults: () => 
        set({
          preferences: { ...defaultPreferences }
        }),
    }),
    {
      name: 'user-settings-storage',
    }
  )
);

export default useUserSettingsStore;
