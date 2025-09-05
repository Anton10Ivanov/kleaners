
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
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
  setLanguage: (language: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setEmailNotifications: (enabled: boolean) => void;
  setSmsNotifications: (enabled: boolean) => void;
  resetToDefaults: () => void;
}

const defaultPreferences: UserPreferences = {
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
